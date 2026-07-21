"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Eye, MoreHorizontal, Package, Truck, CheckCircle2, XCircle } from "lucide-react";
import DataTable from "@/features/admin/shared/DataTable";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { AdminOrder } from "@/types/admin";

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  confirmed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  processing: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  shipped: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  delivered: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

const statusIcons: Record<string, React.ElementType> = {
  pending: Package,
  confirmed: CheckCircle2,
  processing: Package,
  shipped: Truck,
  delivered: CheckCircle2,
  cancelled: XCircle,
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetch("/api/admin/orders")
      .then((r) => r.json())
      .then((d) => setOrders(Array.isArray(d) ? d : d.orders || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const columns = [
    {
      key: "_id", label: "Order ID", sortable: true,
      render: (item: AdminOrder) => (
        <span className="font-mono text-xs font-semibold text-gray-900 dark:text-white">#{item._id.slice(-6).toUpperCase()}</span>
      ),
    },
    {
      key: "customer", label: "Customer",
      render: (item: AdminOrder) => (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{typeof item.customer === "object" ? item.customer?.name : item.phone}</p>
          <p className="text-[10px] text-gray-400">{item.phone}</p>
        </div>
      ),
    },
    {
      key: "items", label: "Items", sortable: true,
      render: (item: AdminOrder) => <span className="text-sm text-gray-600 dark:text-gray-400">{item.items.length} items</span>,
    },
    {
      key: "total", label: "Total", sortable: true,
      render: (item: AdminOrder) => <span className="text-sm font-bold text-gray-900 dark:text-white">৳{item.total.toLocaleString()}</span>,
    },
    {
      key: "status", label: "Status",
      render: (item: AdminOrder) => {
        const Icon = statusIcons[item.status] || Package;
        return (
          <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${statusColors[item.status] || ""}`}>
            <Icon className="h-3 w-3" /> {item.status}
          </span>
        );
      },
    },
    {
      key: "createdAt", label: "Date", sortable: true,
      render: (item: AdminOrder) => <span className="text-xs text-gray-500 dark:text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</span>,
    },
    {
      key: "actions", label: "",
      render: (item: AdminOrder) => (
        <button className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Orders"
        description="Manage and fulfill customer orders."
        actions={
          <div className="flex gap-2">
            {["all", "pending", "processing", "shipped", "delivered"].map((s) => (
              <button key={s} onClick={() => setFilter(s)} className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${filter === s ? "bg-emerald-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"}`}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        }
      />
      <DataTable
        columns={columns}
        data={filtered}
        searchable
        searchKeys={["_id", "phone", "address"]}
        searchPlaceholder="Search orders..."
      />
    </div>
  );
}
