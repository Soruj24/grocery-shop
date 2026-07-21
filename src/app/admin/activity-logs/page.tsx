"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Activity, ShoppingCart, User, Settings, Package, Shield, RefreshCw, AlertTriangle, Bell, LogIn } from "lucide-react";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";

const iconMap: Record<string, { icon: React.ElementType; color: string }> = {
  order: { icon: ShoppingCart, color: "bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30" },
  user: { icon: User, color: "bg-blue-50 text-blue-500 dark:bg-blue-950/30" },
  settings: { icon: Settings, color: "bg-amber-50 text-amber-500 dark:bg-amber-950/30" },
  product: { icon: Package, color: "bg-violet-50 text-violet-500 dark:bg-violet-950/30" },
  security: { icon: Shield, color: "bg-rose-50 text-rose-500 dark:bg-rose-950/30" },
  system: { icon: RefreshCw, color: "bg-gray-100 text-gray-500 dark:bg-gray-800" },
  alert: { icon: AlertTriangle, color: "bg-orange-50 text-orange-500 dark:bg-orange-950/30" },
  login: { icon: LogIn, color: "bg-teal-50 text-teal-500 dark:bg-teal-950/30" },
};

const mockLogs = [
  { id: 1, type: "order", action: "New order #ORD-8A3F2C placed", user: "Rahim Uddin", time: "2 minutes ago" },
  { id: 2, type: "login", action: "Admin logged in", user: "Admin User", time: "15 minutes ago" },
  { id: 3, type: "product", action: "Product 'Fresh Mango 2kg' stock updated", user: "Manager Rahim", time: "1 hour ago" },
  { id: 4, type: "order", action: "Order #ORD-5B7D1E shipped", user: "System", time: "2 hours ago" },
  { id: 5, type: "user", action: "New user registered: Karim Ahmed", user: "System", time: "3 hours ago" },
  { id: 6, type: "security", action: "Failed login attempt detected", user: "Unknown", time: "4 hours ago" },
  { id: 7, type: "settings", action: "Store settings updated", user: "Admin User", time: "5 hours ago" },
  { id: 8, type: "alert", action: "Low stock alert: Organic Eggs 12pc", user: "System", time: "6 hours ago" },
  { id: 9, type: "order", action: "Refund processed for #ORD-3C9A1F", user: "Support Agent", time: "8 hours ago" },
  { id: 10, type: "product", action: "New category 'Organic' created", user: "Admin User", time: "1 day ago" },
];

export default function ActivityLogsPage() {
  return (
    <div className="space-y-6">
      <AdminPageHeader title="Activity Logs" description="Track all admin and system activities." />

      <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1">
        <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
          {mockLogs.map((log, i) => {
            const cfg = iconMap[log.type] || iconMap.system;
            const Icon = cfg.icon;
            return (
              <motion.div key={log.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.03 }} className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${cfg.color}`}><Icon className="h-4 w-4" /></div>
                <div className="flex-1 min-w-0"><p className="text-sm text-gray-900 dark:text-white truncate">{log.action}</p><p className="text-[10px] text-gray-400">by {log.user}</p></div>
                <span className="text-[10px] text-gray-400 whitespace-nowrap">{log.time}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
