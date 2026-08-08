"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";

interface MobileCheckoutBarProps {
  total: number;
  shippingCost: number;
  discount: number;
  isSubmitting: boolean;
  onPlaceOrder: () => void;
  currentStep: number;
  onNext: () => void;
  nextLabel: string;
}

export default function MobileCheckoutBar({
  total,
  shippingCost,
  discount,
  isSubmitting,
  onPlaceOrder,
  currentStep,
  onNext,
  nextLabel,
}: MobileCheckoutBarProps) {
  const finalTotal =
    total + shippingCost - discount;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-black/[0.06] dark:border-white/[0.06] bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-xl px-4 py-3 safe-area-bottom lg:hidden"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[9px] font-semibold text-muted-foreground/50 uppercase tracking-wider">
            Total
          </p>
          <p className="text-lg font-bold text-foreground">
            ৳{finalTotal.toLocaleString()}
          </p>
        </div>
        <button
          onClick={
            currentStep === 4
              ? onPlaceOrder
              : onNext
          }
          disabled={isSubmitting}
          className="flex h-12 items-center gap-2 rounded-lg bg-foreground px-6 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity active:scale-[0.98]"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : null}
          {currentStep === 4
            ? "Place Order"
            : nextLabel}
        </button>
      </div>
    </motion.div>
  );
}
