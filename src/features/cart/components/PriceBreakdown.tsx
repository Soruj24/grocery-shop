"use client";

import { useLanguage } from "@/contexts/LanguageContext";

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
  const finalTotal =
    totalPrice + deliveryFee + vat - discount;

  return (
    <div className="space-y-3 pt-2">
      <div className="flex justify-between items-center text-sm font-medium text-muted-foreground/60">
        <span>{t("subtotal")}</span>
        <span className="text-foreground">
          {t("currency_symbol")}
          {totalPrice.toLocaleString("bn-BD")}
        </span>
      </div>

      <div className="flex justify-between items-center text-sm font-medium text-muted-foreground/60">
        <div className="flex items-center gap-2">
          <span>{t("delivery_charge")}</span>
          {totalPrice > freeDeliveryThreshold && (
            <span className="text-[9px] font-semibold bg-emerald-500/[0.06] text-emerald-600 dark:text-emerald-400 px-1.5 py-0.5 rounded">
              {t("free")}
            </span>
          )}
        </div>
        <span className="text-foreground">
          {deliveryFee === 0
            ? `${t("currency_symbol")}${(0).toLocaleString("bn-BD")}`
            : `${t("currency_symbol")}${deliveryFee.toLocaleString("bn-BD")}`}
        </span>
      </div>

      <div className="flex justify-between items-center text-sm font-medium text-muted-foreground/60">
        <span>
          {t("vat")} {t("vat_percentage")}
        </span>
        <span className="text-foreground">
          {t("currency_symbol")}
          {vat.toLocaleString("bn-BD")}
        </span>
      </div>

      {discount > 0 && (
        <div className="flex justify-between items-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
          <span>{t("discount")}</span>
          <span>
            -{t("currency_symbol")}
            {discount.toLocaleString("bn-BD")}
          </span>
        </div>
      )}

      <div className="h-px bg-black/[0.04] dark:bg-white/[0.04] my-3" />

      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/50">
            {t("grand_total")}
          </span>
          <div className="text-2xl font-bold text-foreground tracking-tight">
            {t("currency_symbol")}
            {finalTotal.toLocaleString("bn-BD")}
          </div>
        </div>
      </div>
    </div>
  );
}
