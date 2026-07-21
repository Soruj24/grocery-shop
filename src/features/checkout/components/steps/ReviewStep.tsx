"use client";

import { motion } from "framer-motion";
import { MapPin, Truck, CreditCard, ShoppingBag, Tag, CheckCircle2 } from "lucide-react";
import { type CheckoutCartItem, type ShippingMethod, type DeliverySlot, type PaymentMethod, type AppliedCoupon, type GuestInfo } from "@/types/checkout";
import { PAYMENT_METHODS } from "@/types/checkout";
import TrustBadges from "../TrustBadges";
import { useLanguage } from "@/contexts/LanguageContext";

interface ReviewStepProps {
  guestInfo: GuestInfo;
  deliveryAddress: string;
  shipping: ShippingMethod;
  deliverySlot: DeliverySlot;
  paymentMethod: PaymentMethod;
  transactionId: string;
  coupon: AppliedCoupon | null;
  items: CheckoutCartItem[];
  subtotal: number;
}

export default function ReviewStep({
  guestInfo,
  deliveryAddress,
  shipping,
  deliverySlot,
  paymentMethod,
  transactionId,
  coupon,
  items,
  subtotal,
}: ReviewStepProps) {
  const { t } = useLanguage();
  const payment = PAYMENT_METHODS.find((m) => m.id === paymentMethod);
  const shippingCost = shipping.price;
  const discount = coupon?.discount || 0;
  const total = subtotal + shippingCost - discount;

  const sections = [
    {
      icon: MapPin,
      title: "Contact & Address",
      content: (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{guestInfo.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{guestInfo.phone}</p>
          {guestInfo.email && <p className="text-xs text-gray-500 dark:text-gray-400">{guestInfo.email}</p>}
          <p className="text-xs text-gray-600 dark:text-gray-300 mt-1">{deliveryAddress}</p>
        </div>
      ),
    },
    {
      icon: Truck,
      title: "Shipping & Delivery",
      content: (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{shipping.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">{deliverySlot.label} - {deliverySlot.time}</p>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">
            {shippingCost === 0 ? "Free shipping" : `৳${shippingCost}`}
          </p>
        </div>
      ),
    },
    {
      icon: CreditCard,
      title: "Payment",
      content: (
        <div>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{payment?.name}</p>
          {transactionId && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">TXN: {transactionId}</p>
          )}
        </div>
      ),
    },
    {
      icon: ShoppingBag,
      title: "Items",
      content: (
        <div className="space-y-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100 dark:bg-gray-800">
                <ShoppingBag className="h-4 w-4 text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
              </div>
              <p className="text-xs font-semibold text-gray-900 dark:text-white">৳{(item.price * item.quantity).toLocaleString()}</p>
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-4"
    >
      {sections.map((section, i) => (
        <motion.div
          key={section.title}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4"
        >
          <h4 className="flex items-center gap-2 text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">
            <section.icon className="h-3.5 w-3.5 text-emerald-500" />
            {section.title}
          </h4>
          {section.content}
        </motion.div>
      ))}

      {coupon && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-emerald-200 dark:border-emerald-800 bg-emerald-50 dark:bg-emerald-950/20 p-3 flex items-center gap-2"
        >
          <Tag className="h-4 w-4 text-emerald-500" />
          <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
            Coupon applied: -৳{discount}
          </p>
        </motion.div>
      )}

      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4">
        <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-3 uppercase tracking-wider">Order Total</h4>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Subtotal ({items.length} items)</span>
            <span className="font-medium text-gray-900 dark:text-white">৳{subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600 dark:text-gray-400">Shipping</span>
            <span className="font-medium text-gray-900 dark:text-white">
              {shippingCost === 0 ? "Free" : `৳${shippingCost}`}
            </span>
          </div>
          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">Discount</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">-৳{discount}</span>
            </div>
          )}
          <div className="border-t border-gray-100 dark:border-gray-800 pt-2 flex justify-between">
            <span className="text-sm font-bold text-gray-900 dark:text-white">Total</span>
            <span className="text-lg font-bold text-emerald-600 dark:text-emerald-400">৳{total.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <TrustBadges />

      <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 p-4 text-center">
        <CheckCircle2 className="mx-auto h-8 w-8 text-emerald-500 mb-2" />
        <p className="text-sm font-semibold text-gray-900 dark:text-white">Ready to place your order?</p>
        <p className="text-xs text-gray-500 dark:text-gray-400">Click the button below to confirm</p>
      </div>
    </motion.div>
  );
}
