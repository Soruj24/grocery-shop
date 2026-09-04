"use client";

import {
  ArrowRight,
  Truck,
  ShieldCheck,
  CreditCard,
  Clock,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useMemo } from "react";
import CouponSection from "./CouponSection";
import PriceBreakdown from "./PriceBreakdown";
import DeliveryProgress from "./DeliveryProgress";
import Link from "next/link";
import { useSession } from "next-auth/react";

interface CartSummaryProps {
  totalPrice: number;
}

export default function CartSummary({
  totalPrice,
}: CartSummaryProps) {
  const { t } = useLanguage();
  const { data: session } = useSession();

  const shippingFee = totalPrice >= 500 ? 0 : 60;
  const serviceCharge = 0;
  const estimatedTax = 0;
  const grandTotal =
    totalPrice + shippingFee + serviceCharge + estimatedTax;

  const estimatedDelivery = useMemo(() => {
    const date = new Date();
    date.setDate(date.getDate() + 2);
    return date.toLocaleDateString("bn-BD", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="lg:sticky lg:top-32 space-y-4"
    >
      {/* Main Summary Card */}
      <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
        {/* Header */}
        <div className="p-5 pb-4 border-b border-border">
          <h2 className="text-sm font-bold text-foreground tracking-tight">
            {t("order_summary_title")}
          </h2>
        </div>

        <div className="p-5 space-y-5">
          {/* Delivery Progress */}
          <DeliveryProgress
            currentAmount={totalPrice}
            freeShippingThreshold={500}
          />

          {/* Coupon Section */}
          <CouponSection />

          {/* Estimated Delivery */}
          <div className="flex items-center justify-between p-3 bg-subtle rounded-lg">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-muted rounded-md flex items-center justify-center">
                <Clock className="w-3.5 h-3.5 text-muted-foreground/60" />
              </div>
              <span className="text-xs font-medium text-muted-foreground/60">
                {t("estimated_delivery_date")}
              </span>
            </div>
            <span className="text-xs font-bold text-foreground">
              {estimatedDelivery}
            </span>
          </div>

          {/* Shipping Info */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground/50">
            <Truck className="w-3.5 h-3.5" />
            <span>
              {shippingFee === 0
                ? t("free_delivery_unlocked")
                : t("standard_delivery")}{" "}
              {shippingFee === 0
                ? ""
                : `${t("currency_symbol")}${shippingFee.toLocaleString("bn-BD")}`}
            </span>
          </div>

          {/* Price Breakdown */}
          <div className="border-t border-border pt-4">
            <PriceBreakdown
              subtotal={totalPrice}
              shipping={shippingFee}
              serviceCharge={serviceCharge}
              tax={estimatedTax}
              total={grandTotal}
            />
          </div>

          {/* Checkout Button */}
          <Link
            href={
              session?.user
                ? "/checkout"
                : "/auth/login?redirect=/checkout"
            }
            className="w-full group/btn bg-primary text-primary-foreground rounded-xl py-3.5 px-4 font-semibold text-sm flex items-center justify-center gap-2.5 active:scale-[0.98] transition-all shadow-primary hover:shadow-lg"
          >
            <Lock className="w-3.5 h-3.5" />
            {session?.user
              ? t("checkout_button")
              : t("login_to_checkout_button")}
            <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
          </Link>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-4 pt-1">
            <div className="flex items-center gap-1.5 text-muted-foreground/40">
              <ShieldCheck className="w-3 h-3" />
              <span className="text-[10px] font-medium">
                SSL
              </span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground/40">
              <CreditCard className="w-3 h-3" />
              <span className="text-[10px] font-medium">
                bKash / Nagad
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Guarantee Banner */}
      <div className="bg-subtle rounded-xl p-4 text-center border border-border">
        <div className="flex items-center justify-center gap-2 mb-1.5">
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
          <span className="text-xs font-semibold text-foreground">
            {t("guarantee_title")}
          </span>
        </div>
        <p className="text-[10px] text-muted-foreground/50 leading-relaxed">
          {t("guarantee_description")}
        </p>
      </div>
    </motion.div>
  );
}
