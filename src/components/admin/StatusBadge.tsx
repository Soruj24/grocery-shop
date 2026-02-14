"use client";

import { LucideIcon } from "lucide-react";

interface StatusBadgeProps {
  status: string | boolean;
  label: string;
  icon?: LucideIcon;
  type?: "order" | "product" | "category";
}

export default function StatusBadge({
  status,
  label,
  icon: Icon,
  type = "product",
}: StatusBadgeProps) {
  const getStyles = () => {
    if (typeof status === "boolean") {
      return status
        ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 border-green-100 dark:border-green-800/50"
        : "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-800/50";
    }

    switch (status) {
      case "pending":
        return "bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400 border-amber-100 dark:border-amber-800/50";
      case "processing":
        return "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-800/50";
      case "shipped":
        return "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 border-purple-100 dark:border-purple-800/50";
      case "delivered":
        return "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-800/50";
      case "cancelled":
        return "bg-rose-50 dark:bg-rose-900/20 text-rose-600 dark:text-rose-400 border-rose-100 dark:border-rose-800/50";
      default:
        return "bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-100 dark:border-gray-700";
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-wider border ${getStyles()}`}
    >
      {Icon ? (
        <Icon className="w-3.5 h-3.5" />
      ) : (
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            status === true || status === "delivered"
              ? "bg-green-500"
              : status === false || status === "cancelled"
                ? "bg-rose-500"
                : "bg-current"
          } animate-pulse`}
        />
      )}
      {label}
    </span>
  );
}
