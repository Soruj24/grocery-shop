"use client";

import { useNotifications } from "@/contexts/NotificationContext";
import { motion } from "framer-motion";
import { Bell, CheckCircle2, AlertCircle, Info, Trash2, CheckCheck } from "lucide-react";

const iconMap = {
  success: CheckCircle2,
  error: AlertCircle,
  info: Info,
};

const colorMap = {
  success: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30",
  error: "text-red-500 bg-red-50 dark:bg-red-950/30",
  info: "text-blue-500 bg-blue-50 dark:bg-blue-950/30",
};

export default function NotificationsPage() {
  const { notifications, markAsRead, unreadCount } = useNotifications();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Notifications</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={() => notifications.forEach((n) => !n.read && markAsRead(n.id))}
            className="flex items-center gap-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-2 text-xs font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <CheckCheck className="h-3.5 w-3.5" /> Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-12 text-center">
          <Bell className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-sm font-semibold text-gray-900 dark:text-white">No notifications</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">You&apos;re all caught up!</p>
        </div>
      ) : (
        <div className="space-y-2">
          {notifications.map((n, i) => {
            const Icon = iconMap[n.type] || Info;
            return (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                onClick={() => markAsRead(n.id)}
                className={`rounded-xl border p-4 cursor-pointer transition-all ${
                  n.read
                    ? "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
                    : "border-emerald-200 dark:border-emerald-800 bg-emerald-50/50 dark:bg-emerald-950/10"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${colorMap[n.type]}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{n.title}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{n.message}</p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-500 mt-1">
                      {new Date(n.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  {!n.read && <div className="h-2 w-2 rounded-full bg-emerald-500 shrink-0 mt-1" />}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
