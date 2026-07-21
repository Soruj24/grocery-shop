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

const stepButtons: Record<number, { label: string; key: string }> = {
  1: { label: "Continue to Shipping", key: "continue_to_shipping" },
  2: { label: "Continue to Payment", key: "continue_to_payment" },
  3: { label: "Continue to Review", key: "continue_to_review" },
  4: { label: "Place Order", key: "place_order" },
};

export default function MobileCheckoutBar({ total, shippingCost, discount, isSubmitting, onPlaceOrder, currentStep, onNext, nextLabel }: MobileCheckoutBarProps) {
  const finalTotal = total + shippingCost - discount;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl px-4 py-3 safe-area-bottom lg:hidden"
    >
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-[10px] text-gray-500 dark:text-gray-400">Total</p>
          <p className="text-lg font-bold text-gray-900 dark:text-white">৳{finalTotal.toLocaleString()}</p>
        </div>
        <button
          onClick={currentStep === 4 ? onPlaceOrder : onNext}
          disabled={isSubmitting}
          className="flex h-12 items-center gap-2 rounded-xl bg-emerald-500 px-6 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : null}
          {currentStep === 4 ? "Place Order" : nextLabel}
        </button>
      </div>
    </motion.div>
  );
}
