"use client";

import { ClipboardList, Clock, CreditCard, ArrowLeft, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { CheckoutFormData, PaymentMethod } from "@/types/checkout";

interface ReviewStepProps {
  formData: CheckoutFormData;
  deliverySlot: string;
  paymentMethod: PaymentMethod;
  onSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  onPrev: () => void;
}

export default function ReviewStep({
  formData,
  deliverySlot,
  paymentMethod,
  onSubmit,
  loading,
  onPrev,
}: ReviewStepProps) {
  const { t } = useLanguage();

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-800 space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-orange-50 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-600">
          <ClipboardList className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">
          {t("order_review")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-[32px] border border-gray-100 dark:border-gray-800">
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
            {t("delivery_address_label")}
          </h4>
          <p className="font-bold text-gray-800 dark:text-gray-200">
            {formData.name}
          </p>
          <p className="text-sm text-gray-500 font-medium">{formData.phone}</p>
          <p className="text-sm text-gray-500 font-medium mt-2">
            {formData.address}
          </p>
        </div>

        <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-[32px] border border-gray-100 dark:border-gray-800">
          <h4 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
            {t("time_and_payment")}
          </h4>
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-4 h-4 text-green-500" />
            <span className="text-sm font-bold">{deliverySlot}</span>
          </div>
          <div className="flex items-center gap-3">
            <CreditCard className="w-4 h-4 text-green-500" />
            <span className="text-sm font-bold uppercase">
              {t(`${paymentMethod}_payment`)}
            </span>
          </div>
        </div>
      </div>



      <div className="flex gap-4">
        <button
          onClick={onPrev}
          className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-600 py-6 rounded-[32px] font-black transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-6 h-6" />
          {t("back_to_prev")}
        </button>
        <button
          onClick={onSubmit}
          disabled={loading}
          className="flex-[2] bg-green-600 hover:bg-green-700 text-white py-6 rounded-[32px] font-black text-xl transition-all flex items-center justify-center gap-4 shadow-xl shadow-green-600/20 active:scale-95 disabled:opacity-50"
        >
          {loading ? t("ordering_status") : t("confirm_order")}
          <CheckCircle2 className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
