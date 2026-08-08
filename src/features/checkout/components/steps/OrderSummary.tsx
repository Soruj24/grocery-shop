"use client";

import { motion } from "framer-motion";
import {
  Tag,
  Truck,
  ShieldCheck,
  ChevronRight,
  Loader2,
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
  const finalTotal = total;
  const freeShippingThreshold = 1000;
  const remaining =
    freeShippingThreshold - subtotal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
    >
      <div className="border-b border-black/[0.04] dark:border-white/[0.04] p-4">
        <h3 className="text-sm font-bold text-foreground">
          Order Summary
        </h3>
        <p className="text-[10px] font-medium text-muted-foreground/50 mt-0.5">
          {items.length} items
        </p>
      </div>

      <div className="max-h-48 overflow-y-auto p-4 space-y-2">
        {items.map((item) => (
          <div
            key={item._id}
            className="flex items-center gap-2.5"
          >
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-black/[0.04] dark:bg-white/[0.06]">
              {item.image ? (
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Tag className="h-4 h-4 text-muted-foreground/30" />
                </div>
              )}
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[9px] font-bold text-background">
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
              ৳
              {(
                item.price * item.quantity
              ).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

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

      {remaining > 0 && !coupon && (
        <div className="mx-4 mb-3 rounded-lg bg-black/[0.02] dark:bg-white/[0.03] p-2.5">
          <div className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-muted-foreground/50" />
            <p className="text-[11px] font-medium text-muted-foreground/60">
              Add ৳
              {remaining.toLocaleString()} more
              for free shipping
            </p>
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-black/[0.06] dark:bg-white/[0.08]">
            <motion.div
              initial={{ width: 0 }}
              animate={{
                width: `${Math.min(
                  (subtotal /
                    freeShippingThreshold) *
                    100,
                  100
                )}%`,
              }}
              className="h-full rounded-full bg-foreground"
            />
          </div>
        </div>
      )}

      <div className="border-t border-black/[0.04] dark:border-white/[0.04] p-4 space-y-2">
        <div className="flex justify-between text-xs">
          <span className="font-medium text-muted-foreground/60">
            Subtotal
          </span>
          <span className="font-medium text-foreground">
            ৳{subtotal.toLocaleString()}
          </span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="font-medium text-muted-foreground/60">
            Shipping
          </span>
          <span className="font-medium text-foreground">
            {shippingCost === 0
              ? "Free"
              : `৳${shippingCost}`}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-xs">
            <span className="font-medium text-muted-foreground/60">
              Discount
            </span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">
              -৳{discount}
            </span>
          </div>
        )}
        <div className="border-t border-black/[0.04] dark:border-white/[0.04] pt-2 flex justify-between">
          <span className="text-sm font-bold text-foreground">
            Total
          </span>
          <span className="text-lg font-bold text-foreground">
            ৳{finalTotal.toLocaleString()}
          </span>
        </div>
      </div>

      <div className="p-4 hidden lg:block">
        {currentStep === 4 ? (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onPlaceOrder}
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground py-3 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity active:scale-[0.98]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                {t("placing_order")}
              </>
            ) : (
              <>
                <ShieldCheck className="h-4 w-4" />
                {t("place_order")}
              </>
            )}
          </motion.button>
        ) : (
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground py-3 text-sm font-semibold text-background hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity active:scale-[0.98]"
          >
            {currentStep === 1
              ? t("continue_to_shipping")
              : currentStep === 2
              ? t("continue_to_payment")
              : t("continue_to_review")}
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        )}
      </div>

      <div className="px-4 pb-4 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground/40">
        <ShieldCheck className="h-3 w-3" />
        Secure, SSL encrypted checkout
      </div>
    </motion.div>
  );
}
