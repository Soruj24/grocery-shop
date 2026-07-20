"use client";

import { MapPin, User, Phone, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
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
    <div className="bg-card p-8 rounded-xl shadow-sm border border-border space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-primary-subtle rounded-lg flex items-center justify-center text-primary">
          <MapPin className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black text-foreground">
          {t("checkout_step_1")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">
            {t("full_name")}
          </label>
          <div className="relative group">
            <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="text"
              required
              placeholder={t("name_placeholder")}
              className="w-full pl-16 pr-6 py-5 bg-muted border border-border rounded-lg focus:ring-4 focus:ring-primary-subtle focus:border-primary outline-none transition-all font-bold"
              value={formData.name}
              onChange={(e) => onChange({ name: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">
            {t("phone_number")}
          </label>
          <div className="relative group">
            <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input
              type="tel"
              required
              placeholder={t("phone_placeholder")}
              className="w-full pl-16 pr-6 py-5 bg-muted border border-border rounded-lg focus:ring-4 focus:ring-primary-subtle focus:border-primary outline-none transition-all font-bold"
              value={formData.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
            />
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-black text-muted-foreground uppercase tracking-widest ml-1">
            {t("detailed_address")}
          </label>
          <div className="relative group">
            <MapPin className="absolute left-6 top-6 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <textarea
              required
              placeholder={t("address_placeholder")}
              className="w-full pl-16 pr-6 py-6 bg-muted border border-border rounded-lg focus:ring-4 focus:ring-primary-subtle focus:border-primary outline-none transition-all h-32 font-bold"
              value={formData.address}
              onChange={(e) => onChange({ address: e.target.value })}
            />
          </div>
        </div>
      </div>

      <button
        onClick={onNext}
        disabled={!isValid}
        className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-6 rounded-lg font-black text-xl transition-all flex items-center justify-center gap-4 shadow-primary disabled:opacity-50 active:scale-95"
      >
        {t("continue")}
        <ArrowRight className="w-6 h-6" />
      </button>
    </div>
  );
}
