"use client";

import { useParams } from "next/navigation";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useOrderTracking } from "@/features/orders/hooks/useOrderTracking";
import OrderTrackingTimeline from "@/features/orders/components/OrderTrackingTimeline";
import DeliveryInfoSection from "@/features/orders/components/DeliveryInfoSection";

export default function OrderTrackingPage() {
  const { id } = useParams();
  const {
    order,
    isLoading,
    steps,
    currentStepIndex,
    t,
  } = useOrderTracking(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-foreground" />
      </div>
    );
  }

  if (
    !order ||
    (order as { error?: string }).error
  ) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h2 className="text-xl font-bold text-foreground">
          {t("order_not_found")}
        </h2>
        <p className="text-sm font-medium text-muted-foreground/60">
          {t("order_not_found_desc")}
        </p>
        <Link
          href="/orders"
          className="text-sm font-semibold text-foreground hover:underline"
        >
          {t("back_to_order_list")}
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-2">
          <Link
            href="/orders"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground/60 hover:text-foreground hover:gap-3 transition-all mb-3"
          >
            <ArrowLeft className="w-4 h-4" />{" "}
            {t("go_back")}
          </Link>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            {t("order_tracking_label")}
          </h1>
          <p className="text-sm font-medium text-muted-foreground/60">
            {t("order_id_label")}:{" "}
            <span className="text-foreground font-bold">
              #
              {order._id
                .slice(-8)
                .toUpperCase()}
            </span>
          </p>
        </div>
        <div className="bg-foreground text-background px-5 py-2.5 rounded-lg flex items-center gap-2.5">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-semibold">
            {t("expected_delivery")}
          </span>
        </div>
      </div>

      <OrderTrackingTimeline
        steps={steps}
        currentStepIndex={currentStepIndex}
        updatedAt={order.updatedAt}
        t={t}
      />

      <DeliveryInfoSection
        address={order.address}
        phone={order.phone}
        deliveryBoy={order.deliveryBoy}
        t={t}
      />
    </div>
  );
}
