"use client";

import { motion } from "framer-motion";
import { Truck, Sun, Sunset, Moon, Clock, Check } from "lucide-react";
import { type ShippingMethod, type DeliverySlot, SHIPPING_METHODS, DELIVERY_SLOTS } from "@/types/checkout";
import ShippingMethods from "../ShippingMethods";

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
      className="space-y-6"
    >
      {/* Shipping Method */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white mb-3">
          <Truck className="h-4 w-4 text-emerald-500" />
          Shipping Method
        </h3>
        <ShippingMethods
          selected={selectedShipping}
          onSelect={onSelectShipping}
          cartTotal={cartTotal}
        />
      </div>

      {/* Delivery Time Slot */}
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white mb-3">
          <Clock className="h-4 w-4 text-emerald-500" />
          Delivery Time
        </h3>
        <div className="grid grid-cols-2 gap-2">
          {DELIVERY_SLOTS.map((slot) => {
            const Icon = slotIcons[slot.icon] || Clock;
            const isSelected = selectedSlot.id === slot.id;
            return (
              <motion.div
                key={slot.id}
                whileTap={{ scale: 0.95 }}
                onClick={() => slot.available && onSelectSlot(slot)}
                className={`relative cursor-pointer rounded-xl border-2 p-3 text-center transition-all ${
                  isSelected
                    ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
                    : slot.available
                    ? "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    : "border-gray-100 dark:border-gray-800 opacity-40 cursor-not-allowed"
                }`}
              >
                <Icon
                  className={`mx-auto h-5 w-5 mb-1 ${
                    isSelected ? "text-emerald-500" : "text-gray-400 dark:text-gray-500"
                  }`}
                />
                <p className={`text-xs font-semibold ${isSelected ? "text-emerald-700 dark:text-emerald-400" : "text-gray-700 dark:text-gray-300"}`}>
                  {slot.label}
                </p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 mt-0.5">{slot.time}</p>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500"
                  >
                    <Check className="h-3 w-3 text-white" />
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
