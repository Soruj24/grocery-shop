"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
  color: string;
  suffix?: string;
  loading?: boolean;
}

export default function StatCard({ title, value, change, changeLabel, icon: Icon, color, suffix, loading }: StatCardProps) {
  const trend = change !== undefined ? (change > 0 ? "up" : change < 0 ? "down" : "neutral") : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-5 overflow-hidden group hover:shadow-lg transition-shadow duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{title}</p>
          {loading ? (
            <div className="h-8 w-24 rounded-lg bg-gray-100 dark:bg-gray-800 animate-pulse" />
          ) : (
            <p className="text-2xl font-bold text-gray-900 dark:text-white">
              {value}{suffix && <span className="text-sm font-medium text-gray-500 dark:text-gray-400 ml-1">{suffix}</span>}
            </p>
          )}
          {change !== undefined && (
            <div className="flex items-center gap-1">
              {trend === "up" && <TrendingUp className="h-3 w-3 text-emerald-500" />}
              {trend === "down" && <TrendingDown className="h-3 w-3 text-red-500" />}
              {trend === "neutral" && <Minus className="h-3 w-3 text-gray-400" />}
              <span className={`text-xs font-semibold ${trend === "up" ? "text-emerald-600 dark:text-emerald-400" : trend === "down" ? "text-red-600 dark:text-red-400" : "text-gray-400"}`}>
                {change > 0 ? "+" : ""}{change}%
              </span>
              {changeLabel && <span className="text-[10px] text-gray-400 dark:text-gray-500">{changeLabel}</span>}
            </div>
          )}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${color}`}>
          <Icon className="h-5 w-5 text-white" />
        </div>
      </div>
      <div className="absolute -bottom-8 -right-8 h-24 w-24 rounded-full bg-gradient-to-br from-gray-100 to-transparent dark:from-gray-800/50 opacity-50 group-hover:scale-150 transition-transform duration-500" />
    </motion.div>
  );
}
