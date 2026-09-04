"use client";

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
  sparkline?: number[];
  className?: string;
}

const colorMap: Record<string, { bg: string; icon: string; sparkStroke: string; sparkFill: string }> = {
  blue: { bg: "bg-primary/10", icon: "text-primary", sparkStroke: "hsl(var(--primary))", sparkFill: "hsl(var(--primary) / 0.1)" },
  green: { bg: "bg-success-subtle", icon: "text-success", sparkStroke: "hsl(var(--success))", sparkFill: "hsl(var(--success) / 0.1)" },
  amber: { bg: "bg-warning-subtle", icon: "text-warning", sparkStroke: "hsl(var(--warning))", sparkFill: "hsl(var(--warning) / 0.1)" },
  red: { bg: "bg-danger-subtle", icon: "text-danger", sparkStroke: "hsl(var(--danger))", sparkFill: "hsl(var(--danger) / 0.1)" },
  purple: { bg: "bg-accent/10", icon: "text-accent", sparkStroke: "hsl(var(--accent))", sparkFill: "hsl(var(--accent) / 0.1)" },
  neutral: { bg: "bg-muted", icon: "text-muted-foreground", sparkStroke: "hsl(var(--muted-foreground))", sparkFill: "hsl(var(--muted-foreground) / 0.1)" },
};

function MiniSparkline({ data, stroke, fill }: { data: number[]; stroke: string; fill: string }) {
  if (!data.length) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const width = 80;
  const height = 32;
  const padding = 2;

  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1)) * (width - padding * 2);
    const y = padding + (1 - (v - min) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const linePath = `M${points.join("L")}`;
  const areaPath = `${linePath}L${width - padding},${height - padding}L${padding},${height - padding}Z`;

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="shrink-0" aria-hidden="true">
      <defs>
        <linearGradient id={`spark-${stroke.replace(/[^a-z0-9]/g, "")}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={fill.replace(/\/ 0\.1\)/, "/ 0.2)")} />
          <stop offset="100%" stopColor={fill.replace(/\/ 0\.1\)/, "/ 0)")} />
        </linearGradient>
      </defs>
      <path d={areaPath} fill={`url(#spark-${stroke.replace(/[^a-z0-9]/g, "")})`} />
      <path d={linePath} fill="none" stroke={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function StatCard({ title, value, change, changeLabel, icon: Icon, color = "blue", suffix, loading, sparkline, className }: StatCardProps) {
  const trend = change !== undefined ? (change > 0 ? "up" : change < 0 ? "down" : "neutral") : null;
  const colors = colorMap[color] || colorMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative rounded-xl border border-border bg-card p-5",
        "overflow-hidden transition-shadow duration-200 hover:shadow-md",
        className,
      )}
      role="region"
      aria-label={`${title}: ${loading ? "loading" : value}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1.5 min-w-0 flex-1">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">{title}</p>
          {loading ? (
            <div className="h-8 w-28 rounded-lg bg-muted animate-pulse" aria-busy="true" aria-label="Loading" />
          ) : (
            <div className="flex items-end gap-2.5">
              <p className="text-2xl font-bold text-foreground tracking-tight tabular-nums leading-none">
                {value}{suffix && <span className="text-xs font-medium text-muted-foreground ml-1">{suffix}</span>}
              </p>
              {sparkline && <MiniSparkline data={sparkline} stroke={colors.sparkStroke} fill={colors.sparkFill} />}
            </div>
          )}
          {change !== undefined && (
            <div className="flex items-center gap-1.5">
              {trend === "up" && <TrendingUp className="h-3 w-3 text-success" aria-label="Trending up" />}
              {trend === "down" && <TrendingDown className="h-3 w-3 text-danger" aria-label="Trending down" />}
              {trend === "neutral" && <Minus className="h-3 w-3 text-muted-foreground" aria-label="No change" />}
              <span className={cn(
                "text-[11px] font-semibold",
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
        <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl shrink-0", colors.bg)}>
          <Icon className={cn("h-4.5 w-4.5", colors.icon)} />
        </div>
      </div>
    </motion.div>
  );
}
