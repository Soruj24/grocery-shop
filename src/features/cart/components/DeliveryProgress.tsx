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
  const deliveryFee = totalPrice > freeDeliveryThreshold ? 0 : 50;
  const progressPct = Math.min(
    100,
    Math.round((totalPrice / freeDeliveryThreshold) * 100),
  );

  if (deliveryFee === 0) {
    return (
      <div className="flex items-center justify-between bg-primary-subtle text-primary-subtle-foreground px-4 py-3 rounded-lg border border-border">
        <span className="text-sm font-black text-primary">Free delivery unlocked</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-primary">
          {t("currency_symbol")}{freeDeliveryThreshold.toLocaleString("bn-BD")}+
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-xs font-black text-muted-foreground">
        <span>
          Free delivery at {t("currency_symbol")}
          {freeDeliveryThreshold.toLocaleString("bn-BD")}
        </span>
        <span>
          {t("currency_symbol")}
          {Math.max(freeDeliveryThreshold - totalPrice, 0).toLocaleString(
            "bn-BD",
          )}{" "}
          left
        </span>
      </div>
    </div>
  );
}
