"use client";

import { useQuery } from "@tanstack/react-query";
import { Clock, CheckCircle2, Package, Truck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export interface OrderTrackingData {
  _id: string;
  status: string;
  address: string;
  phone: string;
  updatedAt: string;
  deliveryBoy?: { name: string; phone: string };
}

export function useOrderTracking(id: string | string[]) {
  const { t } = useLanguage();

  const { data: order, isLoading } = useQuery<OrderTrackingData>({
    queryKey: ["order-tracking", id],
    queryFn: async () => {
      const res = await fetch(`/api/orders/track?id=${id}`);
      return res.json();
    },
  });

  const steps = [
    { key: "pending", label: t("order_received"), icon: Clock, desc: t("order_received_desc") },
    { key: "confirmed", label: t("order_confirmed"), icon: CheckCircle2, desc: t("order_confirmed_desc") },
    { key: "processing", label: t("packing_in_progress"), icon: Package, desc: t("packing_in_progress_desc") },
    { key: "shipped", label: t("shipped"), icon: Truck, desc: t("shipped_desc") },
    { key: "delivered", label: t("delivered"), icon: CheckCircle2, desc: t("delivered_desc") },
  ];

  const currentStepIndex = order ? steps.findIndex((s) => s.key === order.status) : -1;

  return { order, isLoading, steps, currentStepIndex, t };
}
