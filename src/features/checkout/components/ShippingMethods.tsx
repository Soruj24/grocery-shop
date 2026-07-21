"use client";

import { motion } from "framer-motion";
import { Truck, Zap, Clock, Check } from "lucide-react";
import { type ShippingMethod, SHIPPING_METHODS } from "@/types/checkout";

interface ShippingMethodsProps {
  selected: ShippingMethod;
  onSelect: (method: ShippingMethod) => void;
  cartTotal: number;
}

const iconMap: Record<string, React.ElementType> = {
  truck: Truck,
  zap: Zap,
  clock: Clock,
};

export default function ShippingMethods({ selected, onSelect, cartTotal }: ShippingMethodsProps) {
  const freeShippingThreshold = 1000;
  const remaining = freeShippingThreshold - cartTotal;
  const isFreeShippingUnlocked = cartTotal >= freeShippingThreshold;

  return (
    <div className="space-y-3">
      {!isFreeShippingUnlocked && remaining > 0 && (
        <div className="rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-950/20 dark:to-teal-950/20 border border-emerald-200 dark:border-emerald-800 p-3">
          <p className="text-xs font-medium text-emerald-700 dark:text-emerald-400">
            Add ৳{remaining.toLocaleString()} more for free shipping
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-emerald-200 dark:bg-emerald-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((cartTotal / freeShippingThreshold) * 100, 100)}%` }}
              className="h-full rounded-full bg-emerald-500"
            />
          </div>
        </div>
      )}

      {isFreeShippingUnlocked && (
        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-3 text-center">
          <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">Free shipping unlocked</p>
        </div>
      )}

      <div className="space-y-2">
        {SHIPPING_METHODS.map((method) => {
          const Icon = iconMap[method.icon] || Truck;
          const isSelected = selected.id === method.id;
          const finalPrice = isFreeShippingUnlocked ? 0 : method.price;

          return (
            <motion.div
              key={method.id}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelect({ ...method, price: finalPrice })}
              className={`relative cursor-pointer rounded-xl border-2 p-3 transition-all ${
                isSelected
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    isSelected ? "bg-emerald-500 text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-500"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{method.name}</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{method.estimatedDays}</p>
                </div>
                <div className="text-right shrink-0">
                  {finalPrice === 0 ? (
                    <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Free</span>
                  ) : (
                    <span className="text-sm font-bold text-gray-900 dark:text-white">৳{finalPrice}</span>
                  )}
                  {method.price > 0 && !isFreeShippingUnlocked && (
                    <p className="text-[10px] text-gray-400">original ৳{method.price}</p>
                  )}
                </div>
                {isSelected && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500">
                    <Check className="h-3 w-3 text-white" />
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
