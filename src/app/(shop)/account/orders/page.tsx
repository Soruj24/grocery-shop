"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package,
  Search,
  ChevronRight,
  Eye,
} from "lucide-react";
import { AdminOrder as Order } from "@/types/admin";
import { LoadingState } from "@/components/ui";

const statusColors: Record<string, string> = {
  pending:
    "bg-warning-subtle text-warning-subtle-foreground",
  confirmed:
    "bg-info-subtle text-info-subtle-foreground",
  processing:
    "bg-accent-subtle text-accent-subtle-foreground",
  shipped:
    "bg-accent-subtle text-accent-subtle-foreground",
  delivered:
    "bg-success-subtle text-success-subtle-foreground",
  cancelled:
    "bg-danger-subtle text-danger-subtle-foreground",
};

const filters = [
  "all",
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

export default function AccountOrdersPage() {
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
    if (filter !== "all" && o.status !== filter)
      return false;
    if (
      search &&
      !o._id.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    return true;
  });

  if (loading)
    return (
      <div className="py-20 flex justify-center">
        <LoadingState />
      </div>
    );

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          Orders
        </h1>
        <p className="text-sm text-muted-foreground/50 mt-1">
          Track and manage your orders
        </p>
      </motion.div>

      {/* Search + Filters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="space-y-3"
      >
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
          <input
            type="text"
            placeholder="Search by order ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-border bg-card pl-11 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/30 focus:border-foreground/20 focus:ring-2 focus:ring-foreground/10 outline-none transition-all"
          />
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {filters.map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`shrink-0 rounded-xl px-3.5 py-2 text-[11px] font-semibold transition-all ${
                filter === s
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground/60 hover:bg-muted"
              }`}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Orders List */}
      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-border bg-card p-12 text-center shadow-xs"
        >
          <Package className="mx-auto h-10 w-10 text-muted-foreground/20 mb-3" />
          <p className="text-sm font-semibold text-foreground">
            No orders found
          </p>
          <p className="text-[11px] text-muted-foreground/50 mt-1">
            {orders.length === 0
              ? "You haven't placed any orders yet"
              : "Try a different filter"}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-2">
          {filtered.map((order, i) => (
            <motion.div
              key={order._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.04,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
            >
              <Link
                href={`/orders/track/${order._id}`}
                className="block rounded-2xl border border-border bg-card p-5 hover:shadow-sm transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-muted group-hover:bg-foreground group-hover:text-background transition-all">
                      <Package className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-mono font-bold text-foreground">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                      <p className="text-[11px] text-muted-foreground/50 mt-0.5">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${statusColors[order.status] || ""}`}
                    >
                      {order.status}
                    </span>
                    <p className="text-lg font-bold text-foreground">
                      ৳{order.total.toLocaleString()}
                    </p>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-foreground transition-colors" />
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {order.items
                    .slice(0, 3)
                    .map((item, j) => (
                      <span
                        key={j}
                        className="text-[10px] bg-muted text-muted-foreground/60 px-2 py-0.5 rounded-full"
                      >
                        {item.name} × {item.quantity}
                      </span>
                    ))}
                  {order.items.length > 3 && (
                    <span className="text-[10px] text-muted-foreground/40">
                      +{order.items.length - 3} more
                    </span>
                  )}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
