"use client";

import { useState, useCallback, useMemo } from "react";
import {
  useGetAdminOrdersQuery,
  useUpdateAdminOrderMutation,
  useBulkOrdersMutation,
} from "@/redux/apiSlice";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import OrdersTable from "@/features/admin/shared/OrdersTable";
import OrderDetailsDrawer from "@/features/admin/components/OrderDetailsDrawer";
import { useToast } from "@/components/ui/system/Toast";
import { AlertTriangle } from "lucide-react";
import type { AdminOrder } from "@/types/admin";

export default function AdminOrdersPage() {
  /* ─── State ─── */
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [statusFilter, setStatusFilter] = useState("");
  const [paymentFilter, setPaymentFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [drawerOrder, setDrawerOrder] = useState<AdminOrder | null>(null);

  /* ─── API ─── */
  const { data, isLoading, isError } = useGetAdminOrdersQuery({
    page,
    limit: 20,
    search,
    sort,
    sortDir,
    ...(statusFilter && { status: statusFilter }),
    ...(paymentFilter && { paymentStatus: paymentFilter }),
    ...(dateFrom && { dateFrom }),
    ...(dateTo && { dateTo }),
  });

  const [update, { isLoading: updating }] = useUpdateAdminOrderMutation();
  const [bulkOp, { isLoading: bulkLoading }] = useBulkOrdersMutation();
  const { success, error: toastError } = useToast();

  const orders = data?.data || [];
  const totalCount = data?.totalCount || 0;
  const totalPages = data?.totalPages || 0;

  /* ─── Handlers ─── */
  const handleSearch = useCallback((v: string) => {
    setSearch(v);
    setPage(1);
    setSelectedIds([]);
  }, []);

  const handleSort = useCallback((key: string) => {
    setSort((prev) => {
      if (prev === key) {
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
        return key;
      }
      setSortDir("asc");
      return key;
    });
  }, []);

  const handleStatusFilter = useCallback((v: string) => {
    setStatusFilter(v);
    setPage(1);
    setSelectedIds([]);
  }, []);

  const handlePaymentFilter = useCallback((v: string) => {
    setPaymentFilter(v);
    setPage(1);
    setSelectedIds([]);
  }, []);

  const handleDateChange = useCallback((from: string, to: string) => {
    setDateFrom(from);
    setDateTo(to);
    setPage(1);
    setSelectedIds([]);
  }, []);

  const handleSelectToggle = useCallback((id: string) => {
    setSelectedIds((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  }, []);

  const handleSelectAll = useCallback(() => {
    if (orders.every((o) => selectedIds.includes(o._id))) {
      setSelectedIds([]);
    } else {
      setSelectedIds(orders.map((o) => o._id));
    }
  }, [orders, selectedIds]);

  const handleRowClick = useCallback((order: AdminOrder) => {
    setDrawerOrder(order);
  }, []);

  const handleStatusChange = useCallback(async (orderId: string, status: string) => {
    try {
      await update({ id: orderId, body: { status: status as AdminOrder["status"] } }).unwrap();
      success("Status Updated", `Order status changed to "${status}".`);
      // Update drawer if same order
      setDrawerOrder((prev) => prev?._id === orderId ? { ...prev, status: status as AdminOrder["status"] } : prev);
    } catch {
      toastError("Update Failed", "Could not update order status.");
    }
  }, [update, success, toastError]);

  const handlePaymentStatusChange = useCallback(async (orderId: string, paymentStatus: string) => {
    try {
      await update({ id: orderId, body: { paymentStatus: paymentStatus as AdminOrder["paymentStatus"] } }).unwrap();
      success("Payment Updated", `Payment status changed to "${paymentStatus}".`);
      setDrawerOrder((prev) => prev?._id === orderId ? { ...prev, paymentStatus: paymentStatus as AdminOrder["paymentStatus"] } : prev);
    } catch {
      toastError("Update Failed", "Could not update payment status.");
    }
  }, [update, success, toastError]);

  /* ─── Bulk Operations ─── */
  const handleBulkStatus = useCallback(async (status: string) => {
    try {
      await bulkOp({ action: "bulkUpdate", ids: selectedIds, data: { status } }).unwrap();
      success("Bulk Update", `${selectedIds.length} orders updated to "${status}".`);
      setSelectedIds([]);
    } catch {
      toastError("Update Failed", "Could not update orders.");
    }
  }, [selectedIds, bulkOp, success, toastError]);

  const handleBulkPaymentStatus = useCallback(async (paymentStatus: string) => {
    try {
      await bulkOp({ action: "bulkUpdate", ids: selectedIds, data: { paymentStatus } }).unwrap();
      success("Bulk Update", `${selectedIds.length} orders payment updated to "${paymentStatus}".`);
      setSelectedIds([]);
    } catch {
      toastError("Update Failed", "Could not update orders.");
    }
  }, [selectedIds, bulkOp, success, toastError]);

  const handleBulkExport = useCallback(() => {
    const exportOrders = selectedIds.length > 0
      ? orders.filter((o) => selectedIds.includes(o._id))
      : orders;

    const headers = ["Order ID", "Customer", "Phone", "Total", "Status", "Payment Method", "Payment Status", "Date"];
    const rows = exportOrders.map((o) => [
      o._id.slice(-6).toUpperCase(),
      o.name || o.guestInfo?.name || o.phone || "Unknown",
      o.phone,
      o.total,
      o.status,
      o.paymentMethod || "cod",
      o.paymentStatus || "unpaid",
      new Date(o.createdAt).toLocaleDateString(),
    ]);

    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    success("Export Complete", `${exportOrders.length} orders exported to CSV.`);
  }, [selectedIds, orders, success]);

  /* ─── Error State ─── */
  if (isError) {
    return (
      <div className="space-y-6">
        <AdminPageHeader title="Orders" description="Manage customer orders" />
        <div className="rounded-xl border border-border bg-card flex flex-col items-center justify-center py-20">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-danger-subtle mb-4">
            <AlertTriangle className="h-6 w-6 text-danger" />
          </div>
          <p className="text-base font-semibold text-foreground">Failed to load orders</p>
          <p className="text-sm text-muted-foreground mt-1">Check your connection and try again.</p>
        </div>
      </div>
    );
  }

  /* ─── Main Render ─── */
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Orders" description="Manage customer orders" />

      <OrdersTable
        data={orders}
        totalCount={totalCount}
        currentPage={data?.currentPage || page}
        totalPages={totalPages}
        loading={isLoading}
        search={search}
        onSearchChange={handleSearch}
        sort={sort}
        sortDir={sortDir}
        onSort={handleSort}
        page={page}
        onPageChange={(p) => { setPage(p); setSelectedIds([]); }}
        statusFilter={statusFilter}
        onStatusFilterChange={handleStatusFilter}
        paymentFilter={paymentFilter}
        onPaymentFilterChange={handlePaymentFilter}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateChange={handleDateChange}
        selectedIds={selectedIds}
        onSelectToggle={handleSelectToggle}
        onSelectAll={handleSelectAll}
        onBulkStatus={handleBulkStatus}
        onBulkPaymentStatus={handleBulkPaymentStatus}
        onBulkExport={handleBulkExport}
        onRowClick={handleRowClick}
        onStatusChange={handleStatusChange}
        bulkLoading={bulkLoading}
      />

      <OrderDetailsDrawer
        order={drawerOrder}
        isOpen={!!drawerOrder}
        onClose={() => setDrawerOrder(null)}
        onStatusChange={handleStatusChange}
        onPaymentStatusChange={handlePaymentStatusChange}
        updating={updating}
      />
    </div>
  );
}
