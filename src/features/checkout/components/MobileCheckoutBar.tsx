"use client";

import { motion } from "framer-motion";
import { Loader2, Lock, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
  const { t } = useLanguage();
  const finalTotal = total + shippingCost - discount;

  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{
        type: "spring",
        damping: 28,
        stiffness: 300,
      }}
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/80 backdrop-blur-2xl lg:hidden"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div className="flex items-center justify-between gap-4 px-4 py-3">
        <div className="min-w-0">
          <p className="text-[9px] font-semibold text-muted-foreground/50 uppercase tracking-wider">
            {t("total")}
          </p>
          <motion.p
            key={finalTotal}
            initial={{ y: -4, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-xl font-bold text-foreground tracking-tight tabular-nums"
          >
            {t("currency_symbol")}
            {finalTotal.toLocaleString("bn-BD")}
          </motion.p>
        </div>
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={
            currentStep === 4
              ? onPlaceOrder
              : onNext
          }
          disabled={isSubmitting}
          className="flex h-12 items-center gap-2 rounded-xl bg-foreground px-6 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-[0.98] shadow-xl min-h-[48px]"
        >
          {isSubmitting ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : currentStep === 4 ? (
            <Lock className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          {currentStep === 4
            ? t("place_order")
            : nextLabel}
        </motion.button>
      </div>
    </motion.div>
  );
}
