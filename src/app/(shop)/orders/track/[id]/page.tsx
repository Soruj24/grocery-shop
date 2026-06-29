"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Calendar, ArrowLeft } from "lucide-react";
import Link from "next/link";
import PageBackground from "@/components/ui/PageBackground";
import { useOrderTracking } from "@/features/orders/hooks/useOrderTracking";
import OrderTrackingTimeline from "@/features/orders/components/OrderTrackingTimeline";
import DeliveryInfoSection from "@/features/orders/components/DeliveryInfoSection";

export default function OrderTrackingPage() {
  const { id } = useParams();
  const { order, isLoading, steps, currentStepIndex, t } = useOrderTracking(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600" />
      </div>
    );
  }

  if (!order || (order as { error?: string }).error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t("order_not_found")}</h2>
        <p className="text-gray-500">{t("order_not_found_desc")}</p>
        <Link href="/orders" className="text-green-600 font-bold hover:underline">{t("back_to_order_list")}</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative overflow-hidden">
      <PageBackground />
      <div className="relative z-10 space-y-12">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Link href="/orders" className="flex items-center gap-2 text-green-600 font-bold hover:gap-3 transition-all mb-4">
              <ArrowLeft className="w-4 h-4" /> {t("go_back")}
            </Link>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">{t("order_tracking_label")}</h1>
            <p className="text-gray-500 font-bold">
              {t("order_id_label")}: <span className="text-gray-900 dark:text-white font-black">#{order._id.slice(-8).toUpperCase()}</span>
            </p>
          </div>
          <div className="bg-green-600 text-white px-6 py-3 rounded-2xl shadow-lg shadow-green-600/20 flex items-center gap-3">
            <Calendar className="w-5 h-5" />
            <span className="font-bold">{t("expected_delivery")}</span>
          </div>
        </div>

        <OrderTrackingTimeline steps={steps} currentStepIndex={currentStepIndex} updatedAt={order.updatedAt} t={t} />

        <DeliveryInfoSection address={order.address} phone={order.phone} deliveryBoy={order.deliveryBoy} t={t} />
      </div>
    </div>
  );
}
