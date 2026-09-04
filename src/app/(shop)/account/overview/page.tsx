"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package,
  Heart,
  Wallet,
  ShoppingBag,
  ArrowRight,
  Truck,
  Clock,
  CreditCard,
  TrendingUp,
} from "lucide-react";
import { AdminOrder as Order } from "@/types/admin";
import { useWishlist } from "@/contexts/WishlistContext";
import { useNotifications } from "@/contexts/NotificationContext";

export default function OverviewPage() {
  const { data: session } = useSession();
  const { wishlist } = useWishlist();
  const { notifications } = useNotifications();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders/user")
      .then((r) => r.json())
      .then(setOrders)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const recentOrders = orders.slice(0, 4);
  const totalSpent = orders.reduce(
    (sum, o) => sum + o.total,
    0
  );
  const pendingOrders = orders.filter(
    (o) =>
      o.status === "pending" ||
      o.status === "processing"
  ).length;

  const stats = [
    {
      label: "Total Orders",
      value: orders.length,
      icon: Package,
      trend: "+2 this month",
    },
    {
      label: "Total Spent",
      value: `৳${totalSpent.toLocaleString()}`,
      icon: Wallet,
      trend: "Lifetime",
    },
    {
      label: "Wishlist",
      value: wishlist.length,
      icon: Heart,
      trend: "Saved items",
    },
    {
      label: "Pending",
      value: pendingOrders,
      icon: Truck,
      trend: "In progress",
    },
  ];

  const quickActions = [
    {
      label: "Browse Products",
      href: "/products",
      icon: ShoppingBag,
    },
    {
      label: "Track Order",
      href: "/track",
      icon: Truck,
    },
    {
      label: "My Wishlist",
      href: "/account/wishlist",
      icon: Heart,
    },
    {
      label: "Support",
      href: "/account/support",
      icon: CreditCard,
    },
  ];

  const statusColors: Record<string, string> = {
    pending:
      "bg-amber-500/[0.08] text-amber-600 dark:text-amber-400",
    confirmed:
      "bg-blue-500/[0.08] text-blue-600 dark:text-blue-400",
    processing:
      "bg-violet-500/[0.08] text-violet-600 dark:text-violet-400",
    shipped:
      "bg-cyan-500/[0.08] text-cyan-600 dark:text-cyan-400",
    delivered:
      "bg-emerald-500/[0.08] text-emerald-600 dark:text-emerald-400",
    cancelled:
      "bg-danger-subtle text-danger",
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          Welcome back,{" "}
          {session?.user?.name?.split(" ")[0] ||
            "there"}
        </h1>
        <p className="text-sm text-muted-foreground/50 mt-1">
          Here&apos;s what&apos;s happening with your
          account
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.06,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="rounded-2xl border border-border bg-card p-4 shadow-xs hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted">
                <stat.icon className="h-4 w-4 text-muted-foreground/60" />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground">
              {stat.value}
            </p>
            <p className="text-[11px] text-muted-foreground/50 mt-0.5">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {quickActions.map((action, i) => (
          <motion.div
            key={action.href}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.05 }}
          >
            <Link
              href={action.href}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3.5 hover:shadow-sm transition-all group"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-muted group-hover:bg-foreground group-hover:text-background transition-all">
                <action.icon className="h-4 w-4" />
              </div>
              <span className="text-[13px] font-medium text-foreground">
                {action.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs"
        >
          <div className="flex items-center justify-between p-5 pb-4 border-b border-border">
            <h2 className="text-sm font-bold text-foreground">
              Recent Orders
            </h2>
            <Link
              href="/account/orders"
              className="text-[11px] font-medium text-muted-foreground/50 hover:text-foreground transition-colors flex items-center gap-1"
            >
              View All
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {loading ? (
              <div className="p-8 text-center">
                <div className="h-4 w-20 mx-auto rounded bg-muted animate-pulse" />
              </div>
            ) : recentOrders.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground/50">
                No orders yet
              </div>
            ) : (
              recentOrders.map((order) => (
                <div
                  key={order._id}
                  className="p-4 hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-sm font-mono font-semibold text-foreground">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                    <span
                      className={`text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-full ${statusColors[order.status] || ""}`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-[11px] text-muted-foreground/50">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                    <p className="text-sm font-bold text-foreground">
                      ৳{order.total.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Recent Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs"
        >
          <div className="flex items-center justify-between p-5 pb-4 border-b border-border">
            <h2 className="text-sm font-bold text-foreground">
              Notifications
            </h2>
            <Link
              href="/account/notifications"
              className="text-[11px] font-medium text-muted-foreground/50 hover:text-foreground transition-colors flex items-center gap-1"
            >
              View All
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-border">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-sm text-muted-foreground/50">
                No notifications
              </div>
            ) : (
              notifications.slice(0, 4).map((n) => (
                <div
                  key={n.id}
                  className="p-4"
                >
                  <p className="text-sm font-medium text-foreground">
                    {n.title}
                  </p>
                  <p className="text-[11px] text-muted-foreground/50 mt-0.5 line-clamp-1">
                    {n.message}
                  </p>
                  <p className="text-[10px] text-muted-foreground/40 mt-1.5">
                    {new Date(
                      n.timestamp
                    ).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
