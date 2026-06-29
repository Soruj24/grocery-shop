"use client";

import { useLanguage } from "@/providers/LanguageContext";

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
      <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-2xl border border-green-100 dark:border-green-800/50">
        <span className="text-sm font-black text-green-600">Free delivery unlocked</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-green-600">
          {t("currency_symbol")}{freeDeliveryThreshold.toLocaleString("bn-BD")}+
        </span>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-green-500 rounded-full transition-all"
          style={{ width: `${progressPct}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-xs font-black text-gray-500">
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
