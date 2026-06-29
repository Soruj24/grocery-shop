import { Package, Clock, CheckCircle2, XCircle } from "lucide-react";
import type { ReactNode } from "react";
import type { TranslationKey } from "@/lib/constants/translations";

export function getStatusColor(status: string): string {
  switch (status) {
    case "pending": return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50";
    case "confirmed": return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/50";
    case "delivered": return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/50";
    case "cancelled": return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50";
    default: return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
  }
}

export function getStatusLabel(status: string, t: (key: TranslationKey) => string): string {
  switch (status) {
    case "pending": return t("status_pending");
    case "confirmed": return t("status_confirmed");
    case "delivered": return t("status_delivered");
    case "cancelled": return t("status_cancelled");
    default: return status;
  }
}

export function getStatusIcon(status: string): ReactNode {
  switch (status) {
    case "pending": return <Clock className="w-4 h-4" />;
    case "confirmed": return <CheckCircle2 className="w-4 h-4" />;
    case "delivered": return <CheckCircle2 className="w-4 h-4" />;
    case "cancelled": return <XCircle className="w-4 h-4" />;
    default: return <Package className="w-4 h-4" />;
  }
}
