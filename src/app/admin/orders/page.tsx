"use client";

import { useState } from "react";
import { useGetAdminOrdersQuery, useUpdateAdminOrderMutation } from "@/redux/apiSlice";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import StatusBadge from "@/features/admin/components/StatusBadge";
import { useToast } from "@/components/ui/system/Toast";
import { ShoppingCart } from "lucide-react";
import { cn } from "@/utils/utils";

const statusFilters = ["", "pending", "confirmed", "processing", "shipped", "delivered", "cancelled"] as const;

export default function AdminOrdersPage() {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const { data, isLoading } = useGetAdminOrdersQuery({ page, status: status || undefined });
  const [update] = useUpdateAdminOrderMutation();
  const { success, error: toastError } = useToast();

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await update({ id: orderId, body: { status: newStatus as any } }).unwrap();
      success("স্ট্যাটাস আপডেট", `অর্ডার স্ট্যাটাস "${newStatus}" এ পরিবর্তন করা হয়েছে।`);
    } catch {
      toastError("আপডেট ব্যর্থ", "অর্ডার স্ট্যাটাস আপডেট করা যায়নি।");
    }
  };

  const columns = [
    { key: "_id", label: "Order", render: (item: any) => (
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center">
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm font-mono font-semibold text-foreground">#{item._id?.slice(-6).toUpperCase()}</p>
          <p className="text-xs text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</p>
        </div>
      </div>
    )},
    { key: "phone", label: "Customer", render: (item: any) => <span className="text-sm text-muted-foreground">{item.name || item.phone}</span> },
    { key: "total", label: "Total", sortable: true, render: (item: any) => <span className="text-sm font-semibold text-foreground">৳{Number(item.total).toLocaleString()}</span> },
    { key: "status", label: "Status", render: (item: any) => (
      <select
        value={item.status}
        onChange={(e) => handleStatusChange(item._id, e.target.value)}
        aria-label={`Order status for ${item._id?.slice(-6).toUpperCase()}`}
        className={cn(
          "text-xs font-semibold px-3 py-1.5 rounded-lg border border-border bg-muted",
          "text-foreground cursor-pointer outline-none focus:ring-2 focus:ring-ring",
        )}
      >
        {statusFilters.filter(Boolean).map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>
    )},
    { key: "paymentMethod", label: "Payment", render: (item: any) => <span className="text-xs text-muted-foreground uppercase font-medium">{item.paymentMethod || "---"}</span> },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Orders" description="Manage customer orders" />
      <div className="flex gap-2 flex-wrap">
        {statusFilters.map((s) => (
          <button key={s} onClick={() => { setStatus(s); setPage(1); }}
            aria-pressed={status === s}
            className={cn(
              "px-3.5 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors",
              status === s ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:text-foreground",
            )}>{s || "All"}</button>
        ))}
      </div>
      <DataTable columns={columns} data={data?.data || []} searchable searchKeys={["phone", "name"]} searchPlaceholder="Search orders..." pageSize={10} loading={isLoading} />
    </div>
  );
}
