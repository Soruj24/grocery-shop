"use client";

import { MapPin, User, Phone, ArrowRight } from "lucide-react";
import { useLanguage } from "@/providers/LanguageContext";
import type { CheckoutFormData } from "@/types/checkout";

interface ShippingStepProps {
  formData: CheckoutFormData;
  onChange: (data: Partial<CheckoutFormData>) => void;
  onNext: () => void;
}

export default function ShippingStep({
  formData,
  onChange,
  onNext,
}: ShippingStepProps) {
  const { t } = useLanguage();

  const isValid =
    formData.name.trim() !== "" &&
    formData.phone.trim().length >= 11 &&
    formData.address.trim() !== "";

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-800 space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600">
          <MapPin className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">
          {t("checkout_step_1")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
            {t("full_name")}
          </label>
          <div className="relative group">
            <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-600 transition-colors" />
            <input
              type="text"
              required
              placeholder={t("name_placeholder")}
              className="w-full pl-16 pr-6 py-5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-[24px] focus:ring-4 focus:ring-green-500/10 focus:border-green-600 outline-none transition-all font-bold"
              value={formData.name}
              onChange={(e) => onChange({ name: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
            {t("phone_number")}
          </label>
          <div className="relative group">
            <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-600 transition-colors" />
            <input
              type="tel"
              required
              placeholder={t("phone_placeholder")}
              className="w-full pl-16 pr-6 py-5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-[24px] focus:ring-4 focus:ring-green-500/10 focus:border-green-600 outline-none transition-all font-bold"
              value={formData.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest ml-1">
            {t("detailed_address")}
          </label>
          <div className="relative group">
            <MapPin className="absolute left-6 top-6 w-5 h-5 text-gray-300 group-focus-within:text-green-600 transition-colors" />
            <textarea
              required
              placeholder={t("address_placeholder")}
              className="w-full pl-16 pr-6 py-6 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-[24px] focus:ring-4 focus:ring-green-500/10 focus:border-green-600 outline-none transition-all h-32 font-bold"
              value={formData.address}
              onChange={(e) => onChange({ address: e.target.value })}
            />
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!isValid}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-6 rounded-[32px] font-black text-xl transition-all flex items-center justify-center gap-4 shadow-xl shadow-green-600/20 disabled:opacity-50 active:scale-95"
      >
        {t("continue")}
        <ArrowRight className="w-6 h-6" />
      </button>
    </div>
  );
}
