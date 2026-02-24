"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  Calendar,
  ChevronRight,
  ArrowLeft
} from "lucide-react";
import Link from "next/link";
import PageBackground from "@/components/ui/PageBackground";

import { useLanguage } from "@/components/LanguageContext";

export default function OrderTrackingPage() {
  const { id } = useParams();
  const { t } = useLanguage();

  const { data: order, isLoading } = useQuery({
    queryKey: ["order-tracking", id],
    queryFn: async () => {
      const res = await fetch(`/api/orders/track?id=${id}`);
      return res.json();
    },
  });

  const steps = [
    { key: "pending", label: t('order_received'), icon: Clock, desc: t('order_received_desc') },
    { key: "confirmed", label: t('order_confirmed'), icon: CheckCircle2, desc: t('order_confirmed_desc') },
    { key: "processing", label: t('packing_in_progress'), icon: Package, desc: t('packing_in_progress_desc') },
    { key: "shipped", label: t('shipped'), icon: Truck, desc: t('shipped_desc') },
    { key: "delivered", label: t('delivered'), icon: CheckCircle2, desc: t('delivered_desc') },
  ];

  const getCurrentStepIndex = (status: string) => {
    return steps.findIndex((step) => step.key === status);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!order || order.error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{t('order_not_found')}</h2>
        <p className="text-gray-500">{t('order_not_found_desc')}</p>
        <Link href="/orders" className="text-green-600 font-bold hover:underline">{t('back_to_order_list')}</Link>
      </div>
    );
  }

  const currentStepIndex = getCurrentStepIndex(order.status);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 relative overflow-hidden">
      <PageBackground />
      
      <div className="relative z-10 space-y-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <Link href="/orders" className="flex items-center gap-2 text-green-600 font-bold hover:gap-3 transition-all mb-4">
              <ArrowLeft className="w-4 h-4" /> {t('go_back')}
            </Link>
            <h1 className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
              {t('order_tracking_label')}
            </h1>
            <p className="text-gray-500 font-bold">
              {t('order_id_label')}: <span className="text-gray-900 dark:text-white font-black">#{order._id.slice(-8).toUpperCase()}</span>
            </p>
          </div>
          <div className="bg-green-600 text-white px-6 py-3 rounded-2xl shadow-lg shadow-green-600/20 flex items-center gap-3">
            <Calendar className="w-5 h-5" />
            <span className="font-bold">{t('expected_delivery')}</span>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 md:p-12 rounded-[48px] border border-gray-100 dark:border-white/5 shadow-xl">
          <div className="space-y-12">
            {steps.map((step, index) => {
              const isCompleted = index <= currentStepIndex;
              const isCurrent = index === currentStepIndex;
              
              return (
                <div key={step.key} className="relative flex gap-8 group">
                  {/* Line */}
                  {index !== steps.length - 1 && (
                    <div 
                      className={`absolute left-6 top-12 w-0.5 h-16 transition-colors duration-500 ${
                        index < currentStepIndex ? "bg-green-600" : "bg-gray-200 dark:bg-gray-800"
                      }`}
                    />
                  )}
                  
                  {/* Icon */}
                  <div 
                    className={`relative z-10 w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-all duration-500 ${
                      isCompleted 
                        ? "bg-green-600 text-white shadow-lg shadow-green-600/20" 
                        : "bg-gray-100 dark:bg-gray-800 text-gray-400"
                    } ${isCurrent ? "scale-125 ring-4 ring-green-600/10" : ""}`}
                  >
                    <step.icon className="w-6 h-6" />
                  </div>

                  {/* Text */}
                  <div className="flex-1 pt-1">
                    <h3 className={`text-lg font-black transition-colors ${
                      isCompleted ? "text-gray-900 dark:text-white" : "text-gray-400"
                    }`}>
                      {step.label}
                    </h3>
                    <p className={`text-sm font-bold transition-colors ${
                      isCompleted ? "text-gray-500 dark:text-gray-400" : "text-gray-500"
                    }`}>
                      {step.desc}
                    </p>
                    {isCurrent && order.updatedAt && (
                      <p className="text-xs text-green-600 font-black mt-2 bg-green-50 dark:bg-green-500/10 px-3 py-1 rounded-lg inline-block">
                        {t('last_updated')}: {new Date(order.updatedAt).toLocaleTimeString('bn-BD')}
                      </p>
                    )}
                  </div>

                  {isCompleted && (
                    <div className="hidden md:flex items-center gap-2 text-green-600">
                      <CheckCircle2 className="w-5 h-5" />
                      <span className="text-xs font-black uppercase tracking-widest">{t('completed')}</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Delivery Info */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 rounded-[40px] border border-gray-100 dark:border-white/5 shadow-xl space-y-6">
            <h3 className="text-xl font-black flex items-center gap-3">
              <MapPin className="text-rose-500" />
              {t('delivery_address')}
            </h3>
            <div className="space-y-2">
              <p className="font-bold text-gray-600 dark:text-gray-400">{order.address}</p>
              <p className="font-black text-gray-900 dark:text-white flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-600" /> {order.phone}
              </p>
            </div>
          </div>

          {order.deliveryBoy && (
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 rounded-[40px] border border-gray-100 dark:border-white/5 shadow-xl space-y-6">
              <h3 className="text-xl font-black flex items-center gap-3">
                <Truck className="text-blue-500" />
                {t('delivery_boy')}
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                  <Package className="w-7 h-7" />
                </div>
                <div>
                  <p className="font-black text-lg text-gray-900 dark:text-white">{order.deliveryBoy.name}</p>
                  <p className="font-bold text-blue-600 flex items-center gap-2">
                    <Phone className="w-4 h-4" /> {order.deliveryBoy.phone}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
