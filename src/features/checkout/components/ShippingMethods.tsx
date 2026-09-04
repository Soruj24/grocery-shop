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
        <div className="rounded-xl bg-success-subtle border border-success/20 p-3">
          <p className="text-xs font-medium text-success-subtle-foreground">
            Add ৳{remaining.toLocaleString()} more for free shipping
          </p>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-success/20">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((cartTotal / freeShippingThreshold) * 100, 100)}%` }}
              className="h-full rounded-full bg-success"
            />
          </div>
        </div>
      )}

      {isFreeShippingUnlocked && (
        <div className="rounded-xl bg-success-subtle border border-success/20 p-3 text-center">
          <p className="text-xs font-semibold text-success-subtle-foreground">Free shipping unlocked</p>
        </div>
      )}

      <div className="space-y-2" role="radiogroup" aria-label="Shipping methods">
        {SHIPPING_METHODS.map((method) => {
          const Icon = iconMap[method.icon] || Truck;
          const isSelected = selected.id === method.id;
          const finalPrice = isFreeShippingUnlocked ? 0 : method.price;

          return (
            <motion.div
              key={method.id}
              whileTap={{ scale: 0.98 }}
              role="radio"
              aria-checked={isSelected}
              tabIndex={0}
              onClick={() => onSelect({ ...method, price: finalPrice })}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect({ ...method, price: finalPrice });
                }
              }}
              className={`relative cursor-pointer rounded-xl border-2 p-3 transition-all ${
                isSelected
                  ? "border-primary bg-primary-subtle"
                  : "border-border hover:border-border-strong"
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground">{method.name}</p>
                  <p className="text-xs text-muted-foreground">{method.estimatedDays}</p>
                </div>
                <div className="text-right shrink-0">
                  {finalPrice === 0 ? (
                    <span className="text-sm font-bold text-success">Free</span>
                  ) : (
                    <span className="text-sm font-bold text-foreground">৳{finalPrice}</span>
                  )}
                  {method.price > 0 && !isFreeShippingUnlocked && (
                    <p className="text-[10px] text-muted-foreground">original ৳{method.price}</p>
                  )}
                </div>
                {isSelected && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary">
                    <Check className="h-3 w-3 text-primary-foreground" />
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
