"use client";

import { useLanguage } from "@/providers/LanguageContext";

interface PriceBreakdownProps {
  totalPrice: number;
  deliveryFee: number;
  vat: number;
  discount: number;
  freeDeliveryThreshold: number;
}

export default function PriceBreakdown({
  totalPrice,
  deliveryFee,
  vat,
  discount,
  freeDeliveryThreshold,
}: PriceBreakdownProps) {
  const { t } = useLanguage();
  const finalTotal = totalPrice + deliveryFee + vat - discount;

  return (
    <div className="space-y-4 pt-4">
      <div className="flex justify-between items-center text-sm font-bold text-gray-500">
        <span>{t("subtotal")}</span>
        <span className="text-gray-900 dark:text-white">
          {t("currency_symbol")}
          {totalPrice.toLocaleString("bn-BD")}
        </span>
      </div>

      <div className="flex justify-between items-center text-sm font-bold text-gray-500">
        <div className="flex items-center gap-2">
          <span>{t("delivery_charge")}</span>
          {totalPrice > freeDeliveryThreshold && (
            <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full">
              {t("free")}
            </span>
          )}
        </div>
        <span className="text-gray-900 dark:text-white">
          {deliveryFee === 0
            ? `${t("currency_symbol")}${(0).toLocaleString("bn-BD")}`
            : `${t("currency_symbol")}${deliveryFee.toLocaleString("bn-BD")}`}
        </span>
      </div>

      <div className="flex justify-between items-center text-sm font-bold text-gray-500">
        <span>
          {t("vat")} {t("vat_percentage")}
        </span>
        <span className="text-gray-900 dark:text-white">
          {t("currency_symbol")}
          {vat.toLocaleString("bn-BD")}
        </span>
      </div>

      {discount > 0 && (
        <div className="flex justify-between items-center text-sm font-bold text-green-600">
          <span>{t("discount")}</span>
          <span>
            -{t("currency_symbol")}
            {discount.toLocaleString("bn-BD")}
          </span>
        </div>
      )}

      <div className="h-px bg-gray-100 dark:bg-gray-800 my-4" />

      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-gray-400">
            {t("grand_total")}
          </span>
          <div className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">
            {t("currency_symbol")}
            {finalTotal.toLocaleString("bn-BD")}
          </div>
        </div>
      </div>
    </div>
  );
}
