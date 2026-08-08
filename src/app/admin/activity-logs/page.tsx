"use client";

import { useState } from "react";
import { useGetActivityLogsQuery } from "@/redux/apiSlice";
import AdminPageHeader from "@/features/admin/shared/AdminPageHeader";
import { motion } from "framer-motion";
import { Activity, ShoppingCart, User, Settings, Package, Shield, RefreshCw, AlertTriangle, LogIn } from "lucide-react";
import { cn } from "@/utils/utils";

const iconMap: Record<string, { icon: React.ElementType; color: string }> = {
  order: { icon: ShoppingCart, color: "bg-success-subtle text-success" }, user: { icon: User, color: "bg-primary/10 text-primary" },
  settings: { icon: Settings, color: "bg-warning-subtle text-warning" }, product: { icon: Package, color: "bg-accent/10 text-accent" },
  security: { icon: Shield, color: "bg-danger-subtle text-danger" }, system: { icon: RefreshCw, color: "bg-muted text-muted-foreground" },
  alert: { icon: AlertTriangle, color: "bg-warning-subtle text-warning" }, login: { icon: LogIn, color: "bg-info/10 text-info" },
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
            className={cn("px-3 py-1.5 rounded-xl text-xs font-semibold capitalize transition-colors", type === t ? "bg-primary text-white" : "bg-muted text-muted-foreground hover:text-foreground")}>{t || "All"}</button>
        ))}
      </div>
      {isLoading ? (
        <div className="space-y-2">{[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-14 rounded-xl bg-muted animate-pulse" />)}</div>
      ) : (
        <div className="rounded-xl border border-border bg-card p-1">
          <div className="divide-y divide-border/50">
            {logs.map((log, i) => {
              const cfg = iconMap[log.type as string] || iconMap.system;
              const Icon = cfg.icon;
              const time = log.createdAt ? new Date(log.createdAt as string).toLocaleString() : "";
              return (
                <motion.div key={log._id as string} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.02 }}
                  className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors">
                  <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl", cfg.color)}><Icon className="h-4 w-4" /></div>
                  <div className="flex-1 min-w-0"><p className="text-sm text-foreground truncate">{log.action as string}</p><p className="text-[10px] text-muted-foreground">by {log.user as string}</p></div>
                  <span className="text-[10px] text-muted-foreground whitespace-nowrap">{time}</span>
                </motion.div>
              );
            })}
            {logs.length === 0 && <div className="p-12 text-center"><Activity className="mx-auto h-8 w-8 text-gray-300 mb-2" /><p className="text-sm text-muted-foreground">No activity logs yet</p></div>}
          </div>
        </div>
      )}
    </div>
  );
}
