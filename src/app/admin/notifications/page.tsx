"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, CheckCheck, Trash2, Filter, ShoppingCart, Package, AlertTriangle, User, Settings, Megaphone } from "lucide-react";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";

const iconMap: Record<string, React.ElementType> = {
  order: ShoppingCart,
  product: Package,
  alert: AlertTriangle,
  user: User,
  system: Settings,
  promotion: Megaphone,
};

const typeColors: Record<string, string> = {
  order: "bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30",
  product: "bg-violet-50 text-violet-500 dark:bg-violet-950/30",
  alert: "bg-orange-50 text-orange-500 dark:bg-orange-950/30",
  user: "bg-blue-50 text-blue-500 dark:bg-blue-950/30",
  system: "bg-gray-100 text-gray-500 dark:bg-gray-800",
  promotion: "bg-rose-50 text-rose-500 dark:bg-rose-950/30",
};

const mockNotifications = [
  { id: "1", type: "order", title: "New order received", message: "Order #ORD-8A3F2C from Dhaka", read: false, time: "2 min ago" },
  { id: "2", type: "alert", title: "Low stock alert", message: "Fresh Mango 2kg - only 5 left", read: false, time: "15 min ago" },
  { id: "3", type: "user", title: "New user registered", message: "Karim Ahmed joined the platform", read: false, time: "1 hour ago" },
  { id: "4", type: "product", title: "Product updated", message: "Price updated for Basmati Rice 5kg", read: true, time: "3 hours ago" },
  { id: "5", type: "system", title: "System update completed", message: "Database migration successful", read: true, time: "5 hours ago" },
  { id: "6", type: "order", title: "Order shipped", message: "Order #ORD-5B7D1E dispatched", read: true, time: "1 day ago" },
  { id: "7", type: "promotion", title: "Campaign completed", message: "Summer Sale Campaign finished", read: true, time: "2 days ago" },
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const filtered = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const markRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Notifications" description="Stay updated with store activities."
        actions={
          <button onClick={markAllRead} className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
            <CheckCheck className="h-4 w-4" /> Mark all read {unreadCount > 0 && <span className="ml-1 h-5 w-5 rounded-full bg-emerald-500 text-[10px] font-bold text-white flex items-center justify-center">{unreadCount}</span>}
          </button>
        }
      />

      <div className="flex gap-2">
        {(["all", "unread"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-colors ${filter === f ? "bg-emerald-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"}`}>{f} {f === "unread" && unreadCount > 0 && `(${unreadCount})`}</button>
        ))}
      </div>

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 divide-y divide-gray-50 dark:divide-gray-800/50">
        <AnimatePresence>
          {filtered.map((n) => {
            const Icon = iconMap[n.type] || Bell;
            return (
              <motion.div key={n.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={`flex items-center gap-4 p-4 transition-colors ${n.read ? "opacity-60" : "bg-emerald-50/30 dark:bg-emerald-950/10"}`}>
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${typeColors[n.type]}`}><Icon className="h-5 w-5" /></div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">{n.title}</p>
                  <p className="text-xs text-gray-400 truncate">{n.message}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-gray-400">{n.time}</span>
                  {!n.read && <button onClick={() => markRead(n.id)} className="p-1.5 rounded-lg text-gray-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 hover:text-emerald-500 transition-colors"><Check className="h-3.5 w-3.5" /></button>}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
