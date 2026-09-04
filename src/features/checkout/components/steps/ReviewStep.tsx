"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Truck,
  CreditCard,
  ShoppingBag,
  Tag,
  CheckCircle2,
  Clock,
  Edit3,
} from "lucide-react";
import {
  type CheckoutCartItem,
  type ShippingMethod,
  type DeliverySlot,
  type PaymentMethod,
  type AppliedCoupon,
  type GuestInfo,
} from "@/types/checkout";
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
  const payment = PAYMENT_METHODS.find(
    (m) => m.id === paymentMethod
  );
  const shippingCost = shipping.price;
  const discount = coupon?.discount || 0;
  const total = subtotal + shippingCost - discount;

  const sections = [
    {
      icon: MapPin,
      label: "Contact & Address",
      content: (
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">
            {guestInfo.name}
          </p>
          <p className="text-[11px] text-muted-foreground/50">
            {guestInfo.phone}
          </p>
          {guestInfo.email && (
            <p className="text-[11px] text-muted-foreground/50">
              {guestInfo.email}
            </p>
          )}
          <p className="text-[11px] text-muted-foreground/60 mt-1.5 leading-relaxed">
            {deliveryAddress}
          </p>
        </div>
      ),
    },
    {
      icon: Truck,
      label: "Shipping & Delivery",
      content: (
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">
            {shipping.name}
          </p>
          <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground/50">
            <Clock className="w-3 h-3" />
            {deliverySlot.label} · {deliverySlot.time}
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
            {shippingCost === 0
              ? t("free_label")
              : `${t("currency_symbol")}${shippingCost}`}
          </p>
        </div>
      ),
    },
    {
      icon: CreditCard,
      label: "Payment",
      content: (
        <div className="space-y-1">
          <p className="text-sm font-semibold text-foreground">
            {payment?.name}
          </p>
          {transactionId && (
            <p className="text-[11px] text-muted-foreground/50 font-mono">
              TXN: {transactionId}
            </p>
          )}
        </div>
      ),
    },
    {
      icon: ShoppingBag,
      label: `Items (${items.length})`,
      content: (
        <div className="space-y-2.5">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3"
            >
              <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ShoppingBag className="h-4 w-4 text-muted-foreground/30" />
                )}
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-foreground text-[8px] font-bold text-background">
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
      ),
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{
        duration: 0.3,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="space-y-4"
    >
      {/* Info Sections */}
      {sections.map((section, i) => (
        <motion.div
          key={section.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: i * 0.08,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs"
        >
          <div className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h4 className="flex items-center gap-2 text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider">
                <section.icon className="h-3.5 w-3.5" />
                {section.label}
              </h4>
              <button className="text-[10px] font-medium text-muted-foreground/40 hover:text-foreground transition-colors flex items-center gap-1">
                <Edit3 className="w-3 h-3" />
                Edit
              </button>
            </div>
            {section.content}
          </div>
        </motion.div>
      ))}

      {/* Coupon */}
      {coupon && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl border border-emerald-500/[0.12] bg-emerald-500/[0.04] dark:bg-emerald-500/[0.06] p-4 flex items-center gap-3"
        >
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
            <Tag className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">
              {coupon.code} applied
            </p>
            <p className="text-[10px] text-emerald-600/70 dark:text-emerald-400/70">
              {t("you_are_saving")} {t("currency_symbol")}
              {discount.toLocaleString("bn-BD")}
            </p>
          </div>
        </motion.div>
      )}

      {/* Order Total */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.32 }}
        className="rounded-2xl border border-border bg-card overflow-hidden shadow-xs"
      >
        <div className="p-5">
          <h4 className="text-[10px] font-semibold text-muted-foreground/50 mb-3 uppercase tracking-wider">
            {t("total_label")}
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground/60">
                {t("subtotal")} ({items.length} {t("items")})
              </span>
              <span className="font-medium text-foreground">
                {t("currency_symbol")}
                {subtotal.toLocaleString("bn-BD")}
              </span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground/60">
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
                <span className="text-muted-foreground/60">
                  {t("discount")}
                </span>
                <span className="font-medium text-emerald-600 dark:text-emerald-400">
                  -{t("currency_symbol")}
                  {discount.toLocaleString("bn-BD")}
                </span>
              </div>
            )}
            <div className="border-t border-border pt-2.5 flex justify-between">
              <span className="text-sm font-bold text-foreground">
                {t("grand_total")}
              </span>
              <span className="text-lg font-bold text-foreground">
                {t("currency_symbol")}
                {total.toLocaleString("bn-BD")}
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Trust */}
      <TrustBadges />

      {/* Ready CTA */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="rounded-2xl bg-subtle border border-border p-6 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.5,
          }}
        >
          <CheckCircle2 className="mx-auto h-10 w-10 text-muted-foreground/20 mb-3" />
        </motion.div>
        <p className="text-sm font-semibold text-foreground">
          {t("confirm_order_question")}
        </p>
        <p className="text-[11px] text-muted-foreground/50 mt-1">
          {t("confirm_order_desc")}{" "}
          {t("currency_symbol")}
          {total.toLocaleString("bn-BD")}
        </p>
      </motion.div>
    </motion.div>
  );
}
