"use client";

import { useState } from "react";
import { useGetAdminNotificationsQuery, useMarkNotificationReadMutation, useMarkAllNotificationsReadMutation } from "@/redux/apiSlice";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, CheckCheck, ShoppingCart, Package, AlertTriangle, User, Settings, Megaphone } from "lucide-react";
import { cn } from "@/utils/utils";

const iconMap: Record<string, React.ElementType> = { order: ShoppingCart, product: Package, alert: AlertTriangle, user: User, system: Settings, promotion: Megaphone };
const typeColors: Record<string, string> = {
  order: "bg-success-subtle text-success", product: "bg-accent/10 text-accent", alert: "bg-warning-subtle text-warning",
  user: "bg-primary/10 text-primary", system: "bg-muted text-muted-foreground", promotion: "bg-danger-subtle text-danger",
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
        actions={unreadCount > 0 ? <button onClick={() => markAll()} className="flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-sm font-medium text-muted-foreground hover:bg-muted"><CheckCheck className="h-4 w-4" /> Mark all read</button> : undefined}
      />
      <div className="flex gap-2">
        {(["all", "unread"] as const).map((f) => (
          <button key={f} onClick={() => setFilter(f)}
            className={cn("px-4 py-2 rounded-xl text-xs font-semibold capitalize transition-colors", filter === f ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground")}>{f} {f === "unread" && unreadCount > 0 && `(${unreadCount})`}</button>
        ))}
      </div>
      {isLoading ? (
        <div className="space-y-2">{[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />)}</div>
      ) : (
        <div className="rounded-xl border border-border bg-card divide-y divide-border/50">
          <AnimatePresence>
            {filtered.map((n) => {
              const Icon = iconMap[n.type as string] || Bell;
              return (
                <motion.div key={n._id as string} initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  className={cn("flex items-center gap-4 p-4 transition-colors", n.read ? "opacity-60" : "bg-success-subtle/30")}>
                  <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", typeColors[n.type as string] || "bg-muted")}><Icon className="h-5 w-5" /></div>
                  <div className="flex-1 min-w-0"><p className="text-sm font-medium text-foreground">{n.title as string}</p><p className="text-xs text-muted-foreground truncate">{n.message as string}</p></div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground">{n.createdAt ? new Date(n.createdAt as string).toLocaleDateString() : ""}</span>
                    {!n.read && <button onClick={() => markRead(n._id as string)} className="p-1.5 rounded-lg text-muted-foreground hover:bg-success-subtle hover:text-success"><Check className="h-3.5 w-3.5" /></button>}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
          {filtered.length === 0 && <div className="p-12 text-center"><Bell className="mx-auto h-8 w-8 text-gray-300 mb-2" /><p className="text-sm text-muted-foreground">No notifications</p></div>}
        </div>
      )}
    </div>
  );
}
