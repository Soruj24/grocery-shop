"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Package, Heart, Star, Wallet, ShoppingBag, TrendingUp,
  ArrowRight, Clock, MapPin, CreditCard, Truck, CheckCircle2,
} from "lucide-react";
import { AdminOrder as Order } from "@/types/admin";
import { useWishlist } from "@/contexts/WishlistContext";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { useNotifications } from "@/contexts/NotificationContext";

export default function OverviewPage() {
  const { data: session } = useSession();
  const { wishlist } = useWishlist();
  const { recentlyViewed } = useRecentlyViewed();
  const { notifications, unreadCount } = useNotifications();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/orders/user")
      .then((r) => r.json())
      .then(setOrders)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const recentOrders = orders.slice(0, 3);
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const pendingOrders = orders.filter((o) => o.status === "pending" || o.status === "processing").length;

  const stats = [
    { label: "Total Orders", value: orders.length, icon: Package, color: "from-blue-500 to-blue-600", bg: "bg-blue-50 dark:bg-blue-950/30" },
    { label: "Total Spent", value: `৳${totalSpent.toLocaleString()}`, icon: Wallet, color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
    { label: "Wishlist Items", value: wishlist.length, icon: Heart, color: "from-pink-500 to-pink-600", bg: "bg-pink-50 dark:bg-pink-950/30" },
    { label: "Pending Orders", value: pendingOrders, icon: Truck, color: "from-amber-500 to-amber-600", bg: "bg-amber-50 dark:bg-amber-950/30" },
  ];

  const quickActions = [
    { label: "Browse Products", href: "/products", icon: ShoppingBag, color: "bg-emerald-500" },
    { label: "Track Order", href: "/track", icon: Truck, color: "bg-blue-500" },
    { label: "My Wishlist", href: "/account/wishlist", icon: Heart, color: "bg-pink-500" },
    { label: "Support", href: "/account/support", icon: Star, color: "bg-violet-500" },
  ];

  const statusColors: Record<string, string> = {
    pending: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
    confirmed: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
    processing: "bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-400",
    shipped: "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-400",
    delivered: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
    cancelled: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Welcome back, {session?.user?.name?.split(" ")[0] || "there"}
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Here&apos;s what&apos;s happening with your account
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.bg}`}>
                <stat.icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
              </div>
            </div>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex items-center gap-3 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 hover:shadow-md transition-all group"
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${action.color} text-white`}>
              <action.icon className="h-4 w-4" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white">
              {action.label}
            </span>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
            <Link href="/account/orders" className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {loading ? (
              <div className="p-8 text-center text-sm text-gray-400">Loading...</div>
            ) : recentOrders.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-400">No orders yet</div>
            ) : (
              recentOrders.map((order) => (
                <div key={order._id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-mono font-semibold text-gray-900 dark:text-white">
                      #{order._id.slice(-8).toUpperCase()}
                    </p>
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${statusColors[order.status] || ""}`}>
                      {order.status}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">৳{order.total.toLocaleString()}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Notifications */}
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
          <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Notifications</h2>
            <Link href="/account/notifications" className="text-xs font-medium text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1">
              View All <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="divide-y divide-gray-100 dark:divide-gray-800">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-sm text-gray-400">No notifications</div>
            ) : (
              notifications.slice(0, 4).map((n) => (
                <div key={n.id} className={`p-4 ${!n.read ? "bg-emerald-50/50 dark:bg-emerald-950/10" : ""}`}>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{n.title}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 line-clamp-1">{n.message}</p>
                  <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                    {new Date(n.timestamp).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
