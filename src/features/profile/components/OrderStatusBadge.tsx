"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from "@/components/ui";
import type { Tone } from "@/components/ui";

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

  const getStatusTone = (s: string): Tone => {
    switch (s) {
      case "pending":
        return "warning";
      case "processing":
        return "info";
      case "shipped":
        return "accent";
      case "delivered":
        return "success";
      case "cancelled":
        return "danger";
      default:
        return "neutral";
    }
  };

  return (
    <Badge tone={getStatusTone(status)} size="sm" className="uppercase tracking-widest">
      {getStatusLabel(status)}
    </Badge>
  );
}
