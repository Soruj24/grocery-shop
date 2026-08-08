"use client";

import {
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCouponValidation } from "@/features/home/hooks/useCouponValidation";
import DeliveryProgress from "./DeliveryProgress";
import PriceBreakdown from "./PriceBreakdown";
import CouponSection from "./CouponSection";

interface CartSummaryProps {
  totalPrice: number;
}

export default function CartSummary({
  totalPrice,
}: CartSummaryProps) {
  const { t } = useLanguage();
  const {
    promoCode,
    setPromoCode,
    appliedCoupon,
    loading,
    applyCoupon,
    removeCoupon,
  } = useCouponValidation(totalPrice);

  const freeDeliveryThreshold = 500;
  const deliveryFee =
    totalPrice > freeDeliveryThreshold ? 0 : 50;
  const vat = Math.round(totalPrice * 0.05);
  const discount = appliedCoupon
    ? appliedCoupon.discount
    : 0;

  return (
    <div className="lg:col-span-1">
      <div className="bg-white dark:bg-[#09090b] p-6 md:p-7 rounded-xl border border-black/[0.04] dark:border-white/[0.04] space-y-7 md:sticky md:top-24 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <h3 className="text-lg font-bold text-foreground tracking-tight">
          {t("order_summary")}
        </h3>

        <DeliveryProgress
          totalPrice={totalPrice}
          freeDeliveryThreshold={
            freeDeliveryThreshold
          }
        />

        <CouponSection
          promoCode={promoCode}
          onPromoCodeChange={setPromoCode}
          appliedCoupon={appliedCoupon}
          loading={loading}
          onApply={applyCoupon}
          onRemove={removeCoupon}
        />

        <PriceBreakdown
          totalPrice={totalPrice}
          deliveryFee={deliveryFee}
          vat={vat}
          discount={discount}
          freeDeliveryThreshold={
            freeDeliveryThreshold
          }
        />

        <div className="space-y-3 pt-2">
          <Link
            href={{
              pathname: "/checkout",
              query: appliedCoupon
                ? { coupon: appliedCoupon.code }
                : {},
            }}
            className="w-full bg-foreground text-background py-3.5 md:py-4 rounded-lg font-semibold text-sm transition-all flex items-center justify-center gap-2 active:scale-[0.98] hover:opacity-90"
          >
            {t("checkout_button")}
            <ArrowRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center justify-center gap-2 pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-muted-foreground/40" />
            <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/40">
              {t("secure_payment_guarantee")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
