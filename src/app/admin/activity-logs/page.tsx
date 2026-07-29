"use client";

import { useState } from "react";
import { useGetActivityLogsQuery } from "@/redux/apiSlice";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { motion } from "framer-motion";
import { Activity, ShoppingCart, User, Settings, Package, Shield, RefreshCw, AlertTriangle, LogIn } from "lucide-react";

const iconMap: Record<string, { icon: React.ElementType; color: string }> = {
  order: { icon: ShoppingCart, color: "bg-emerald-50 text-emerald-500" }, user: { icon: User, color: "bg-blue-50 text-blue-500" },
  settings: { icon: Settings, color: "bg-amber-50 text-amber-500" }, product: { icon: Package, color: "bg-violet-50 text-violet-500" },
  security: { icon: Shield, color: "bg-rose-50 text-rose-500" }, system: { icon: RefreshCw, color: "bg-gray-100 text-gray-500" },
  alert: { icon: AlertTriangle, color: "bg-orange-50 text-orange-500" }, login: { icon: LogIn, color: "bg-teal-50 text-teal-500" },
};

export default function ActivityLogsPage() {
  const [type, setType] = useState("");
  const { data, isLoading } = useGetActivityLogsQuery(type ? { type } as Record<string, string | number> : undefined);
  const logs = (data?.data || []) as Record<string, unknown>[];

  return (
    <div className="space-y-6">
      <AdminPageHeader title="Activity Logs" description="Track all admin and system activities" />
      <div className="flex gap-2 flex-wrap">
        {["", "order", "user", "product", "settings", "security", "login", "alert", "system"].map((t) => (
          <button key={t} onClick={() => setType(t)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors ${type === t ? "bg-emerald-500 text-white" : "bg-gray-100 text-gray-500 hover:text-gray-700"}`}>{t || "All"}</button>
        ))}
      </div>
      {isLoading ? (
        <div className="space-y-2">{[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-14 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse" />)}</div>
      ) : (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-1">
          <div className="divide-y divide-gray-50 dark:divide-gray-800/50">
            {logs.map((log, i) => {
              const cfg = iconMap[log.type as string] || iconMap.system;
              const Icon = cfg.icon;
              const time = log.createdAt ? new Date(log.createdAt as string).toLocaleString() : "";
              return (
                <motion.div key={log._id as string} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                  className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${cfg.color}`}><Icon className="h-4 w-4" /></div>
                  <div className="flex-1 min-w-0"><p className="text-sm text-gray-900 dark:text-white truncate">{log.action as string}</p><p className="text-[10px] text-gray-400">by {log.user as string}</p></div>
                  <span className="text-[10px] text-gray-400 whitespace-nowrap">{time}</span>
                </motion.div>
              );
            })}
            {logs.length === 0 && <div className="p-12 text-center"><Activity className="mx-auto h-8 w-8 text-gray-300 mb-2" /><p className="text-sm text-gray-400">No activity logs yet</p></div>}
          </div>
        </div>
      )}
    </div>
  );
}
