"use client";

import { motion } from "framer-motion";
import {
  Tag,
  Truck,
  ShieldCheck,
  ChevronRight,
  Loader2,
  Lock,
  Check,
} from "lucide-react";
import {
  type CheckoutCartItem,
  type AppliedCoupon,
} from "@/types/checkout";
import CouponInput from "../CouponInput";
import { useLanguage } from "@/contexts/LanguageContext";

interface OrderSummaryProps {
  items: CheckoutCartItem[];
  subtotal: number;
  shippingCost: number;
  discount: number;
  coupon: AppliedCoupon | null;
  onCouponApply: (coupon: AppliedCoupon) => void;
  onCouponRemove: () => void;
  total: number;
  currentStep: number;
  isSubmitting: boolean;
  onNext: () => void;
  onPlaceOrder: () => void;
}

const stepLabels: Record<number, "continue_to_shipping" | "continue_to_payment" | "continue_to_review"> = {
  1: "continue_to_shipping",
  2: "continue_to_payment",
  3: "continue_to_review",
};

export default function OrderSummary({
  items,
  subtotal,
  shippingCost,
  discount,
  coupon,
  onCouponApply,
  onCouponRemove,
  total,
  currentStep,
  isSubmitting,
  onNext,
  onPlaceOrder,
}: OrderSummaryProps) {
  const { t } = useLanguage();
  const freeThreshold = 1000;
  const remaining = freeThreshold - subtotal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
    >
      {/* Header */}
      <div className="p-5 pb-4 border-b border-black/[0.04] dark:border-white/[0.04]">
        <h3 className="text-sm font-bold text-foreground">
          {t("order_summary")}
        </h3>
        <p className="text-[10px] font-medium text-muted-foreground/50 mt-0.5">
          {items.length} {t("items")}
        </p>
      </div>

      {/* Items */}
      <div className="max-h-48 overflow-y-auto p-4 space-y-2.5">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-3"
          >
            <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-xl bg-black/[0.04] dark:bg-white/[0.06]">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Tag className="h-4 w-4 text-muted-foreground/30" />
                </div>
              )}
              <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5 items-center justify-center rounded-full bg-foreground text-[8px] font-bold text-background">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                {item.name}
              </p>
              {item.variant && (
                <p className="text-[10px] text-muted-foreground/50 truncate">
                  {item.variant}
                </p>
              )}
            </div>
            <p className="text-xs font-semibold text-foreground shrink-0">
              {t("currency_symbol")}
              {(item.price * item.quantity).toLocaleString("bn-BD")}
            </p>
          </div>
        ))}
      </div>

      {/* Coupon */}
      <div className="border-t border-black/[0.04] dark:border-white/[0.04] p-4">
        <CouponInput
          total={subtotal}
          onApply={(coupon) =>
            onCouponApply({
              ...coupon,
              code: coupon.code,
              discount: coupon.discount,
            })
          }
          onRemove={onCouponRemove}
        />
      </div>

      {/* Free Shipping Progress */}
      {remaining > 0 && !coupon && (
        <div className="mx-4 mb-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.03] p-3">
          <div className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-muted-foreground/50" />
            <p className="text-[11px] font-medium text-muted-foreground/60">
              {t("free_delivery_remaining")}{" "}
              <span className="text-foreground font-semibold">
                {t("currency_symbol")}
                {remaining.toLocaleString("bn-BD")}
              </span>
            </p>
          </div>
          <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/[0.06]">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min((subtotal / freeThreshold) * 100, 100)}%`,
              }}
              className="h-full rounded-full bg-foreground"
            />
          </div>
        </div>
      )}

      {/* Totals */}
      <div className="border-t border-black/[0.04] dark:border-white/[0.04] p-4 space-y-2">
        <div className="flex justify-between text-xs">
          <span className="font-medium text-muted-foreground/60">
            {t("subtotal")}
          </span>
          <span className="font-medium text-foreground">
            {t("currency_symbol")}
            {subtotal.toLocaleString("bn-BD")}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="font-medium text-muted-foreground/60">
            {t("delivery_charge")}
          </span>
          <span className="font-medium text-foreground">
            {shippingCost === 0
              ? t("free_label")
              : `${t("currency_symbol")}${shippingCost}`}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-xs">
            <span className="font-medium text-muted-foreground/60">
              {t("discount")}
            </span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              -{t("currency_symbol")}
              {discount.toLocaleString("bn-BD")}
            </span>
          </div>
        )}
        <div className="border-t border-black/[0.06] dark:border-white/[0.06] pt-2.5 flex justify-between">
          <span className="text-sm font-bold text-foreground">
            {t("grand_total")}
          </span>
          <span className="text-lg font-bold text-foreground">
            {t("currency_symbol")}
            {total.toLocaleString("bn-BD")}
          </span>
        </div>
      </div>

      {/* CTA */}
      <div className="p-4 hidden lg:block">
        {currentStep === 4 ? (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onPlaceOrder}
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-foreground py-3.5 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.18)]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("placing_order")}
              </>
            ) : (
              <>
                <Lock className="h-4 w-4" />
                {t("place_order")}
              </>
            )}
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-foreground py-3.5 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_2px_8px_rgba(0,0,0,0.12)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.18)]"
          >
            {t(stepLabels[currentStep] || "continue_to_review")}
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        )}
      </div>

      {/* Trust */}
      <div className="px-4 pb-4 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground/40">
        <ShieldCheck className="h-3 w-3" />
        {t("ssl_encrypted")}, {t("secure_payment_guarantee")}
      </div>
    </motion.div>
  );
}
