"use client";

import { Truck } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

interface DeliveryProgressProps {
  currentAmount: number;
  freeShippingThreshold: number;
}

export default function DeliveryProgress({
  currentAmount,
  freeShippingThreshold,
}: DeliveryProgressProps) {
  const { t } = useLanguage();
  const progress = Math.min(
    (currentAmount / freeShippingThreshold) * 100,
    100
  );
  const remaining = freeShippingThreshold - currentAmount;
  const isFreeShipping = remaining <= 0;

  return (
    <div className="space-y-2.5">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 bg-black/[0.04] dark:bg-white/[0.06] rounded-md flex items-center justify-center">
          <Truck className="w-3.5 h-3.5 text-muted-foreground/60" />
        </div>
        <span className="text-xs font-medium text-muted-foreground/60">
          {isFreeShipping
            ? t("free_shipping_achieved")
            : t("free_delivery_remaining")}{" "}
          {!isFreeShipping && (
            <span className="text-foreground font-semibold">
              {t("currency_symbol")}
              {remaining.toLocaleString("bn-BD")}
            </span>
          )}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="relative h-1.5 bg-black/[0.06] dark:bg-white/[0.06] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: 0.8,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            background: isFreeShipping
              ? "linear-gradient(90deg, #22c55e, #16a34a)"
              : "linear-gradient(90deg, #09090b, #27272a)",
          }}
        />
      </div>

      {/* Threshold Label */}
      <div className="flex items-center justify-between text-[10px]">
        <span className="text-muted-foreground/40">
          {t("currency_symbol")}
          {currentAmount.toLocaleString("bn-BD")}
        </span>
        <span className="text-muted-foreground/40">
          {t("currency_symbol")}
          {freeShippingThreshold.toLocaleString("bn-BD")}
        </span>
      </div>
    </div>
  );
}
