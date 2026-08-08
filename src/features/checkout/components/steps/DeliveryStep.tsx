"use client";

import { motion } from "framer-motion";
import {
  Truck,
  Sun,
  Sunset,
  Moon,
  Clock,
  Check,
} from "lucide-react";
import {
  type ShippingMethod,
  type DeliverySlot,
  SHIPPING_METHODS,
  DELIVERY_SLOTS,
} from "@/types/checkout";
import ShippingMethods from "../ShippingMethods";

interface DeliveryStepProps {
  selectedShipping: ShippingMethod;
  onSelectShipping: (
    method: ShippingMethod
  ) => void;
  selectedSlot: DeliverySlot;
  onSelectSlot: (slot: DeliverySlot) => void;
  cartTotal: number;
}

const slotIcons: Record<
  string,
  React.ElementType
> = {
  sun: Sun,
  "sun-dim": Sunset,
  sunset: Sunset,
  moon: Moon,
};

export default function DeliveryStep({
  selectedShipping,
  onSelectShipping,
  selectedSlot,
  onSelectSlot,
  cartTotal,
}: DeliveryStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-5"
    >
      <div className="rounded-xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
          <Truck className="h-4 w-4 text-muted-foreground/60" />
          Shipping Method
        </h3>
        <ShippingMethods
          selected={selectedShipping}
          onSelect={onSelectShipping}
          cartTotal={cartTotal}
        />
      </div>

      <div className="rounded-xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground mb-3">
          <Clock className="h-4 w-4 text-muted-foreground/60" />
          Delivery Time
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {DELIVERY_SLOTS.map((slot) => {
            const Icon =
              slotIcons[slot.icon] || Clock;
            const isSelected =
              selectedSlot.id === slot.id;
            return (
              <motion.div
                key={slot.id}
                whileTap={{ scale: 0.97 }}
                onClick={() =>
                  slot.available &&
                  onSelectSlot(slot)
                }
                className={`relative cursor-pointer rounded-lg border p-3 text-center transition-all ${
                  isSelected
                    ? "border-foreground bg-black/[0.02] dark:bg-white/[0.04]"
                    : slot.available
                    ? "border-black/[0.04] dark:border-white/[0.04] hover:border-black/[0.08] dark:hover:border-white/[0.1]"
                    : "border-black/[0.04] dark:border-white/[0.04] opacity-40 cursor-not-allowed"
                }`}
              >
                <Icon
                  className={`mx-auto h-4 w-4 mb-1 ${
                    isSelected
                      ? "text-foreground"
                      : "text-muted-foreground/40"
                  }`}
                />
                <p
                  className={`text-xs font-semibold ${
                    isSelected
                      ? "text-foreground"
                      : "text-foreground"
                  }`}
                >
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
