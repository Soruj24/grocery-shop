"use client";

import { useLanguage } from "@/providers/LanguageContext";

interface OrderStatusBadgeProps {
  status: string;
}

export default function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  const { t } = useLanguage();

  const getStatusLabel = (s: string) => {
    switch (s) {
      case "pending":
        return t("status_pending");
      case "processing":
        return t("status_processing");
      case "shipped":
        return t("status_shipped");
      case "delivered":
        return t("status_delivered");
      case "cancelled":
        return t("status_cancelled");
      default:
        return s;
    }
  };

  const getStatusStyle = (s: string) => {
    switch (s) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "processing":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "shipped":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "delivered":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(status)}`}
    >
      {getStatusLabel(status)}
    </span>
  );
}
