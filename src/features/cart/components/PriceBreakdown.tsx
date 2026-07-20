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
  const finalTotal = totalPrice + deliveryFee + vat - discount;

  return (
    <div className="space-y-4 pt-4">
      <div className="flex justify-between items-center text-sm font-bold text-muted-foreground">
        <span>{t("subtotal")}</span>
        <span className="text-foreground">
          {t("currency_symbol")}
          {totalPrice.toLocaleString("bn-BD")}
        </span>
      </div>

      <div className="flex justify-between items-center text-sm font-bold text-muted-foreground">
        <div className="flex items-center gap-2">
          <span>{t("delivery_charge")}</span>
          {totalPrice > freeDeliveryThreshold && (
            <span className="text-[10px] bg-primary-subtle text-primary px-2 py-0.5 rounded-full">
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

      <div className="flex justify-between items-center text-sm font-bold text-muted-foreground">
        <span>
          {t("vat")} {t("vat_percentage")}
        </span>
        <span className="text-foreground">
          {t("currency_symbol")}
          {vat.toLocaleString("bn-BD")}
        </span>
      </div>

      {discount > 0 && (
        <div className="flex justify-between items-center text-sm font-bold text-primary">
          <span>{t("discount")}</span>
          <span>
            -{t("currency_symbol")}
            {discount.toLocaleString("bn-BD")}
          </span>
        </div>
      )}

      <div className="h-px bg-border my-4" />

      <div className="flex justify-between items-end">
        <div className="space-y-1">
          <span className="text-xs font-black uppercase tracking-widest text-muted-foreground">
            {t("grand_total")}
          </span>
          <div className="text-4xl font-black text-foreground tracking-tight">
            {t("currency_symbol")}
            {finalTotal.toLocaleString("bn-BD")}
          </div>
        </div>
      </div>
    </div>
  );
}
