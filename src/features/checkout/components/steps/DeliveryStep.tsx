"use client";

import { motion } from "framer-motion";
import {
  Truck,
  Sun,
  Sunset,
  Moon,
  Clock,
  Check,
  Zap,
} from "lucide-react";
import {
  type ShippingMethod,
  type DeliverySlot,
  SHIPPING_METHODS,
  DELIVERY_SLOTS,
} from "@/types/checkout";
import { useLanguage } from "@/contexts/LanguageContext";

interface DeliveryStepProps {
  selectedShipping: ShippingMethod;
  onSelectShipping: (method: ShippingMethod) => void;
  selectedSlot: DeliverySlot;
  onSelectSlot: (slot: DeliverySlot) => void;
  cartTotal: number;
}

const slotIcons: Record<string, React.ElementType> = {
  sun: Sun,
  "sun-dim": Sunset,
  sunset: Sunset,
  moon: Moon,
};

const methodIcons: Record<string, React.ElementType> = {
  truck: Truck,
  zap: Zap,
  clock: Clock,
};

export default function DeliveryStep({
  selectedShipping,
  onSelectShipping,
  selectedSlot,
  onSelectSlot,
  cartTotal,
}: DeliveryStepProps) {
  const { t } = useLanguage();
  const freeThreshold = 1000;
  const remaining = freeThreshold - cartTotal;
  const isFree = cartTotal >= freeThreshold;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{
        duration: 0.3,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="space-y-4"
    >
      {/* Free Shipping Banner */}
      {isFree ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl bg-emerald-500/[0.06] dark:bg-emerald-500/[0.08] border border-emerald-500/[0.12] p-4 text-center"
        >
          <p className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            {t("free_shipping_unlocked")}
          </p>
        </motion.div>
      ) : (
        <div className="rounded-2xl bg-black/[0.02] dark:bg-white/[0.03] border border-black/[0.04] dark:border-white/[0.04] p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-muted-foreground/60">
              {t("free_delivery_remaining")}{" "}
              <span className="text-foreground font-semibold">
                {t("currency_symbol")}
                {remaining.toLocaleString("bn-BD")}
              </span>
            </span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/[0.06]">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min((cartTotal / freeThreshold) * 100, 100)}%`,
              }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-foreground"
            />
          </div>
        </div>
      )}

      {/* Shipping Methods */}
      <div className="rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="p-5 border-b border-black/[0.04] dark:border-white/[0.04]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.04] dark:bg-white/[0.06]">
              <Truck className="h-4.5 w-4.5 text-muted-foreground/60" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {t("shipping_method")}
              </h3>
              <p className="text-[10px] text-muted-foreground/50">
                Choose your delivery speed
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-2">
          {SHIPPING_METHODS.map((method) => {
            const Icon = methodIcons[method.icon] || Truck;
            const isSelected = selectedShipping.id === method.id;
            const finalPrice = isFree ? 0 : method.price;

            return (
              <motion.div
                key={method.id}
                whileTap={{ scale: 0.98 }}
                onClick={() =>
                  onSelectShipping({ ...method, price: finalPrice })
                }
                className={`relative cursor-pointer rounded-xl border p-4 transition-all ${
                  isSelected
                    ? "border-foreground bg-black/[0.02] dark:bg-white/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    : "border-black/[0.04] dark:border-white/[0.04] hover:border-black/[0.08] dark:hover:border-white/[0.1]"
                }`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all ${
                      isSelected
                        ? "bg-foreground text-background"
                        : "bg-black/[0.04] dark:bg-white/[0.06] text-muted-foreground/60"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">
                      {method.name}
                    </p>
                    <p className="text-[11px] text-muted-foreground/50 mt-0.5">
                      {method.estimatedDays}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    {finalPrice === 0 ? (
                      <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                        {t("free")}
                      </span>
                    ) : (
                      <span className="text-sm font-bold text-foreground">
                        {t("currency_symbol")}
                        {finalPrice}
                      </span>
                    )}
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-foreground"
                    >
                      <Check className="h-3 w-3 text-background" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Delivery Time Slots */}
      <div className="rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="p-5 border-b border-black/[0.04] dark:border-white/[0.04]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.04] dark:bg-white/[0.06]">
              <Clock className="h-4.5 w-4.5 text-muted-foreground/60" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">
                {t("delivery_time_label")}
              </h3>
              <p className="text-[10px] text-muted-foreground/50">
                Select a time window
              </p>
            </div>
          </div>
        </div>

        <div className="p-4 grid grid-cols-2 gap-2">
          {DELIVERY_SLOTS.map((slot) => {
            const Icon = slotIcons[slot.icon] || Clock;
            const isSelected = selectedSlot.id === slot.id;

            return (
              <motion.div
                key={slot.id}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  slot.available && onSelectSlot(slot)
                }
                className={`relative cursor-pointer rounded-xl border p-4 text-center transition-all ${
                  isSelected
                    ? "border-foreground bg-black/[0.02] dark:bg-white/[0.04] shadow-[0_2px_8px_rgba(0,0,0,0.04)]"
                    : slot.available
                    ? "border-black/[0.04] dark:border-white/[0.04] hover:border-black/[0.08] dark:hover:border-white/[0.1]"
                    : "border-black/[0.04] dark:border-white/[0.04] opacity-40 cursor-not-allowed"
                }`}
              >
                <Icon
                  className={`mx-auto h-5 w-5 mb-2 ${
                    isSelected
                      ? "text-foreground"
                      : "text-muted-foreground/40"
                  }`}
                />
                <p className="text-xs font-semibold text-foreground">
                  {slot.label}
                </p>
                <p className="text-[10px] text-muted-foreground/50 mt-0.5">
                  {slot.time}
                </p>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-foreground"
                  >
                    <Check className="h-3 w-3 text-background" />
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
