"use client";

import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface PriceBreakdownProps {
  subtotal: number;
  shipping: number;
  serviceCharge: number;
  tax: number;
  discount?: number;
  total: number;
}

export default function PriceBreakdown({
  subtotal,
  shipping,
  serviceCharge,
  tax,
  discount = 0,
  total,
}: PriceBreakdownProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground/60">
          {t("subtotal")}
        </span>
        <span className="text-xs font-semibold text-foreground">
          {t("currency_symbol")}
          {subtotal.toLocaleString("bn-BD")}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground/60">
          {t("delivery_charge")}
        </span>
        <span className="text-xs font-semibold text-foreground">
          {shipping === 0
            ? t("free")
            : `${t("currency_symbol")}${shipping.toLocaleString("bn-BD")}`}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground/60">
          {t("service_charge")}
        </span>
        <span className="text-xs font-semibold text-foreground">
          {serviceCharge === 0
            ? t("free")
            : `${t("currency_symbol")}${serviceCharge.toLocaleString("bn-BD")}`}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground/60">
          {t("tax_included")}
        </span>
        <span className="text-xs font-semibold text-foreground">
          {t("currency_symbol")}
          {tax.toLocaleString("bn-BD")}
        </span>
      </div>

      {discount > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="flex items-center justify-between"
        >
          <span className="text-xs text-emerald-600">
            {t("discount")}
          </span>
          <span className="text-xs font-semibold text-emerald-600">
            -{t("currency_symbol")}
            {discount.toLocaleString("bn-BD")}
          </span>
        </motion.div>
      )}

      <div className="border-t border-black/[0.06] dark:border-white/[0.06] pt-3 flex items-center justify-between">
        <span className="text-sm font-bold text-foreground">
          {t("grand_total")}
        </span>
        <span className="text-lg font-bold text-foreground tracking-tight">
          {t("currency_symbol")}
          {total.toLocaleString("bn-BD")}
        </span>
      </div>
    </div>
  );
}
