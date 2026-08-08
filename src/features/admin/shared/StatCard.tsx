"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/utils/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  color?: "blue" | "green" | "amber" | "red" | "purple" | "neutral";
  suffix?: string;
  loading?: boolean;
}

const colorMap: Record<string, { bg: string; icon: string }> = {
  blue: { bg: "bg-primary/10", icon: "text-primary" },
  green: { bg: "bg-success-subtle", icon: "text-success" },
  amber: { bg: "bg-warning-subtle", icon: "text-warning" },
  red: { bg: "bg-danger-subtle", icon: "text-danger" },
  purple: { bg: "bg-accent/10", icon: "text-accent" },
  neutral: { bg: "bg-muted", icon: "text-muted-foreground" },
};

export default function StatCard({ title, value, change, changeLabel, icon: Icon, color = "blue", suffix, loading }: StatCardProps) {
  const trend = change !== undefined ? (change > 0 ? "up" : change < 0 ? "down" : "neutral") : null;
  const colors = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative rounded-xl border border-border bg-card p-6",
        "overflow-hidden group hover:shadow-md transition-shadow duration-300",
      )}
      role="region"
      aria-label={title}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</p>
          {loading ? (
            <div className="h-9 w-28 rounded-lg bg-muted animate-pulse" aria-busy="true" aria-label="Loading" />
          ) : (
            <p className="text-3xl font-bold text-foreground tracking-tight">
              {value}{suffix && <span className="text-sm font-medium text-muted-foreground ml-1">{suffix}</span>}
            </p>
          )}
          {change !== undefined && (
            <div className="flex items-center gap-1.5">
              {trend === "up" && <TrendingUp className="h-3.5 w-3.5 text-success" aria-label="Trending up" />}
              {trend === "down" && <TrendingDown className="h-3.5 w-3.5 text-danger" aria-label="Trending down" />}
              {trend === "neutral" && <Minus className="h-3.5 w-3.5 text-muted-foreground" aria-label="No change" />}
              <span className={cn(
                "text-xs font-semibold",
                trend === "up" && "text-success",
                trend === "down" && "text-danger",
                trend === "neutral" && "text-muted-foreground",
              )}>
                {change > 0 ? "+" : ""}{change}%
              </span>
              {changeLabel && <span className="text-[10px] text-muted-foreground">{changeLabel}</span>}
            </div>
          )}
        </div>
        <div className={cn("flex h-11 w-11 items-center justify-center rounded-xl", colors.bg)}>
          <Icon className={cn("h-5 w-5", colors.icon)} />
        </div>
      </div>
      <div className="absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-gradient-to-br from-muted to-transparent opacity-30 group-hover:scale-150 transition-transform duration-500" aria-hidden="true" />
    </motion.div>
  );
}
