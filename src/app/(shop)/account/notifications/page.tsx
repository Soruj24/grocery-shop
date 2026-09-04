"use client";

import { useNotifications } from "@/contexts/NotificationContext";
import { motion } from "framer-motion";
import {
  Bell,
  CheckCircle2,
  AlertCircle,
  Info,
  CheckCheck,
} from "lucide-react";

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const colorMap = {
  success: "text-success bg-success-subtle",
  error: "text-danger bg-danger-subtle",
  info: "text-info bg-info-subtle",
};

export default function NotificationsPage() {
  const {
    notifications,
    markAsRead,
    unreadCount,
  } = useNotifications();

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            Notifications
          </h1>
          <p className="text-sm text-muted-foreground/50 mt-1">
            {unreadCount > 0
              ? `${unreadCount} unread`
              : "All caught up"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={() =>
              notifications.forEach(
                (n) => !n.read && markAsRead(n.id)
              )
            }
            className="flex items-center gap-1.5 rounded-xl bg-muted px-3.5 py-2 text-[11px] font-semibold text-muted-foreground/60 hover:bg-muted transition-all"
          >
            <CheckCheck className="h-3.5 w-3.5" /> Mark
            all read
          </button>
        )}
      </motion.div>

      {notifications.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-border bg-card p-12 text-center shadow-xs"
        >
          <Bell className="mx-auto h-10 w-10 text-muted-foreground/20 mb-3" />
          <p className="text-sm font-semibold text-foreground">
            No notifications
          </p>
          <p className="text-[11px] text-muted-foreground/50 mt-1">
            You&apos;re all caught up!
          </p>
        </motion.div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n, i) => {
            const Icon = iconMap[n.type] || Info;
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.03,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                onClick={() => markAsRead(n.id)}
                className={`rounded-2xl border p-4 cursor-pointer transition-all ${
                  n.read
                    ? "border-border bg-card shadow-xs"
                    : "border-foreground/10 bg-foreground/[0.02] dark:bg-foreground/[0.02] shadow-sm"
                }`}
              >
                <div className="flex items-start gap-3.5">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${colorMap[n.type]}`}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {n.title}
                    </p>
                    <p className="text-[11px] text-muted-foreground/50 mt-0.5">
                      {n.message}
                    </p>
                    <p className="text-[10px] text-muted-foreground/35 mt-1.5">
                      {new Date(
                        n.timestamp
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  {!n.read && (
                    <div className="h-2 w-2 rounded-full bg-foreground shrink-0 mt-1" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
