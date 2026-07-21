"use client";

import { motion } from "framer-motion";
import { Tag, Truck, ShieldCheck, ChevronRight, Loader2 } from "lucide-react";
import { type CheckoutCartItem, type AppliedCoupon } from "@/types/checkout";
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
  const remaining = freeShippingThreshold - subtotal;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 overflow-hidden"
    >
      <div className="border-b border-gray-100 dark:border-gray-800 p-4">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white">Order Summary</h3>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{items.length} items</p>
      </div>

      <div className="max-h-48 overflow-y-auto p-4 space-y-2">
        {items.map((item) => (
          <div key={item._id} className="flex items-center gap-2">
            <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800">
              {item.image ? (
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center">
                  <Tag className="h-4 w-4 text-gray-400" />
                </div>
              )}
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500 text-[9px] font-bold text-white">
                {item.quantity}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
              {item.variant && (
                <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate">{item.variant}</p>
              )}
            </div>
            <p className="text-xs font-semibold text-gray-900 dark:text-white shrink-0">
              ৳{(item.price * item.quantity).toLocaleString()}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-100 dark:border-gray-800 p-4">
        <CouponInput
          total={subtotal}
          onApply={(coupon) => onCouponApply({ ...coupon, code: coupon.code, discount: coupon.discount })}
          onRemove={onCouponRemove}
        />
      </div>

      {remaining > 0 && !coupon && (
        <div className="mx-4 mb-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/20 p-2.5">
          <div className="flex items-center gap-1.5">
            <Truck className="h-3.5 w-3.5 text-emerald-500" />
            <p className="text-[11px] font-medium text-emerald-700 dark:text-emerald-400">
              Add ৳{remaining.toLocaleString()} more for free shipping
            </p>
          </div>
          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-emerald-200 dark:bg-emerald-800">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
              className="h-full rounded-full bg-emerald-500"
            />
          </div>
        </div>
      )}

      <div className="border-t border-gray-100 dark:border-gray-800 p-4 space-y-2">
        <div className="flex justify-between text-xs">
          <span className="text-gray-500 dark:text-gray-400">Subtotal</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">৳{subtotal.toLocaleString()}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span className="text-gray-500 dark:text-gray-400">Shipping</span>
          <span className="font-medium text-gray-700 dark:text-gray-300">
            {shippingCost === 0 ? "Free" : `৳${shippingCost}`}
          </span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-xs">
            <span className="text-gray-500 dark:text-gray-400">Discount</span>
            <span className="font-medium text-emerald-600 dark:text-emerald-400">-৳{discount}</span>
          </div>
        )}
        <div className="border-t border-gray-100 dark:border-gray-800 pt-2 flex justify-between">
          <span className="text-sm font-bold text-gray-900 dark:text-white">Total</span>
          <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">৳{finalTotal.toLocaleString()}</span>
        </div>
      </div>

      <div className="p-4 hidden lg:block">
        {currentStep === 4 ? (
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onPlaceOrder}
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
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
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={onNext}
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {currentStep === 1 ? t("continue_to_shipping") :
             currentStep === 2 ? t("continue_to_payment") :
             t("continue_to_review")}
            <ChevronRight className="h-4 w-4" />
          </motion.button>
        )}
      </div>

      <div className="px-4 pb-4 flex items-center justify-center gap-1.5 text-[10px] text-gray-400 dark:text-gray-500">
        <ShieldCheck className="h-3 w-3" />
        Secure, SSL encrypted checkout
      </div>
    </motion.div>
  );
}
