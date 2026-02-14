"use client";

import { useState, useEffect } from "react";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import Pagination from "@/components/admin/Pagination";
import AdminTable from "@/components/admin/AdminTable";
import OrderTableRow from "@/components/admin/orders/OrderTableRow";
import { AdminOrder } from "@/types/admin";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();
      setOrders(data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id: string, status: string) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredOrders = orders.filter(
    (order: AdminOrder) =>
      order.phone.includes(search) || order._id.includes(search),
  );

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <AdminHeader
        title="অর্ডার ম্যানেজমেন্ট"
        count={orders.length}
        countLabel="Orders"
        searchTerm={search}
        onSearchChange={(val) => {
          setSearch(val);
          setCurrentPage(1);
        }}
        searchPlaceholder="অর্ডার আইডি বা ফোন নম্বর দিয়ে সার্চ করুন..."
      />

      <AdminTable
        columns={[
          { header: "অর্ডার আইডি" },
          { header: "কাস্টমার" },
          { header: "মোট টাকা" },
          { header: "পেমেন্ট" },
          { header: "স্ট্যাটাস" },
          { header: "অ্যাকশন", className: "text-right" },
        ]}
        loading={loading}
        emptyMessage="কোন অর্ডার পাওয়া যায়নি"
      >
        {paginatedOrders.map((order) => (
          <OrderTableRow
            key={order._id}
            order={order}
            onStatusUpdate={updateStatus}
          />
        ))}
      </AdminTable>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          totalItems={filteredOrders.length}
          itemsPerPage={itemsPerPage}
          label="Orders"
        />
    </div>
  );
}
