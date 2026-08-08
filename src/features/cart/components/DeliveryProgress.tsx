"use client";

import { useLanguage } from "@/contexts/LanguageContext";

interface DeliveryProgressProps {
  totalPrice: number;
  freeDeliveryThreshold: number;
}

export default function DeliveryProgress({
  totalPrice,
  freeDeliveryThreshold,
}: DeliveryProgressProps) {
  const { t } = useLanguage();
  const deliveryFee =
    totalPrice > freeDeliveryThreshold ? 0 : 50;
  const progressPct = Math.min(
    100,
    Math.round(
      (totalPrice / freeDeliveryThreshold) * 100
    )
  );

  if (deliveryFee === 0) {
    return (
      <div className="flex items-center justify-between bg-emerald-500/[0.04] px-3.5 py-2.5 rounded-lg border border-emerald-500/[0.1]">
        <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
          Free delivery unlocked
        </span>
        <span className="text-[9px] font-semibold uppercase tracking-wider text-emerald-600/60 dark:text-emerald-400/60">
          {t("currency_symbol")}
          {freeDeliveryThreshold.toLocaleString(
            "bn-BD"
          )}
          +
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="h-1.5 w-full bg-black/[0.04] dark:bg-white/[0.06] rounded-full overflow-hidden">
        <div
          className="h-full bg-foreground rounded-full transition-all"
          style={{
            width: `${progressPct}%`,
          }}
        />
      </div>
      <div className="flex items-center justify-between text-[10px] font-medium text-muted-foreground/50">
        <span>
          Free delivery at {t("currency_symbol")}
          {freeDeliveryThreshold.toLocaleString(
            "bn-BD"
          )}
        </span>
        <span>
          {t("currency_symbol")}
          {Math.max(
            freeDeliveryThreshold - totalPrice,
            0
          ).toLocaleString("bn-BD")}{" "}
          left
        </span>
      </div>
    </div>
  );
}
