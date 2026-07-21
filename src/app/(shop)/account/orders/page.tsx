"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Package, Search, Filter, ChevronRight } from "lucide-react";
import { AdminOrder as Order } from "@/types/admin";
import { LoadingState } from "@/components/ui";

const statusColors: Record<string, string> = {
  pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  confirmed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
  processing: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
  shipped: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
  delivered: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
  cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export default function AccountOrdersPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/orders/user")
      .then((r) => r.json())
      .then(setOrders)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const filtered = orders.filter((o) => {
    if (filter !== "all" && o.status !== filter) return false;
    if (search && !o._id.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  if (loading) return <div className="py-20 flex justify-center"><LoadingState /></div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Orders</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Track and manage your orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 pl-10 pr-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 outline-none"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {["all", "pending", "processing", "shipped", "delivered", "cancelled"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`shrink-0 rounded-lg px-3 py-2 text-xs font-semibold transition-all ${
                filter === s
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-12 text-center">
          <Package className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-sm font-semibold text-gray-900 dark:text-white">No orders found</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {orders.length === 0 ? "You haven't placed any orders yet" : "Try a different filter"}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((order, i) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                      <Package className="h-5 w-5 text-gray-500" />
                    </div>
                    <div>
                      <p className="text-sm font-mono font-bold text-gray-900 dark:text-white">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {new Date(order.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${statusColors[order.status] || ""}`}>
                      {order.status}
                    </span>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">৳{order.total.toLocaleString()}</p>
                    <ChevronRight className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {order.items.slice(0, 3).map((item, j) => (
                    <span key={j} className="text-[10px] bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
                      {item.name} × {item.quantity}
                    </span>
                  ))}
                  {order.items.length > 3 && (
                    <span className="text-[10px] text-gray-400">+{order.items.length - 3} more</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
