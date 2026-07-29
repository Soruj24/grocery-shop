"use client";

import { useState } from "react";
import { useGetAdminNotificationsQuery, useMarkNotificationReadMutation, useMarkAllNotificationsReadMutation } from "@/redux/apiSlice";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, CheckCheck, ShoppingCart, Package, AlertTriangle, User, Settings, Megaphone } from "lucide-react";

const iconMap: Record<string, React.ElementType> = { order: ShoppingCart, product: Package, alert: AlertTriangle, user: User, system: Settings, promotion: Megaphone };
const typeColors: Record<string, string> = {
  order: "bg-emerald-50 text-emerald-500", product: "bg-violet-50 text-violet-500", alert: "bg-orange-50 text-orange-500",
  user: "bg-blue-50 text-blue-500", system: "bg-gray-100 text-gray-500", promotion: "bg-rose-50 text-rose-500",
};

export default function AdminNotificationsPage() {
  const { data, isLoading } = useGetAdminNotificationsQuery();
  const [markRead] = useMarkNotificationReadMutation();
  const [markAll] = useMarkAllNotificationsReadMutation();
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const notifications = (data?.data || []) as Record<string, unknown>[];
  const filtered = filter === "unread" ? notifications.filter((n) => !n.read) : notifications;
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Notifications" description="Stay updated with store activities"
        actions={unreadCount > 0 ? <button onClick={() => markAll()} className="flex items-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"><CheckCheck className="h-4 w-4" /> Mark all read</button> : undefined}
      />
      <div className="flex gap-2">
        {(["all", "unread"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-colors ${filter === f ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-500 hover:text-gray-700"}`}>{f} {f === "unread" && unreadCount > 0 && `(${unreadCount})`}</button>
        ))}
      </div>
      {isLoading ? (
        <div className="space-y-2">{[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />)}</div>
      ) : (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 divide-y divide-gray-50 dark:divide-gray-800/50">
          <AnimatePresence>
            {filtered.map((n) => {
              const Icon = iconMap[n.type as string] || Bell;
              return (
                <motion.div key={n._id as string} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className={`flex items-center gap-4 p-4 transition-colors ${n.read ? "opacity-60" : "bg-emerald-50/30 dark:bg-emerald-950/10"}`}>
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${typeColors[n.type as string] || "bg-gray-100"}`}><Icon className="h-5 w-5" /></div>
                  <div className="flex-1 min-w-0"><p className="text-sm font-medium text-gray-900 dark:text-white">{n.title as string}</p><p className="text-xs text-gray-400 truncate">{n.message as string}</p></div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-gray-400">{n.createdAt ? new Date(n.createdAt as string).toLocaleDateString() : ""}</span>
                    {!n.read && <button onClick={() => markRead(n._id as string)} className="p-1.5 rounded-lg text-gray-400 hover:bg-emerald-50 hover:text-emerald-500"><Check className="h-3.5 w-3.5" /></button>}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {filtered.length === 0 && <div className="p-12 text-center"><Bell className="mx-auto h-8 w-8 text-gray-300 mb-2" /><p className="text-sm text-gray-400">No notifications</p></div>}
        </div>
      )}
    </div>
  );
}
