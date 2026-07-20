"use client";

import { ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCouponValidation } from "@/features/home/hooks/useCouponValidation";
import DeliveryProgress from "./DeliveryProgress";
import PriceBreakdown from "./PriceBreakdown";
import CouponSection from "./CouponSection";

interface CartSummaryProps {
  totalPrice: number;
}

export default function CartSummary({ totalPrice }: CartSummaryProps) {
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
  const deliveryFee = totalPrice > freeDeliveryThreshold ? 0 : 50;
  const vat = Math.round(totalPrice * 0.05);
  const discount = appliedCoupon ? appliedCoupon.discount : 0;

  return (
    <div className="lg:col-span-1">
      <div className="bg-card p-6 md:p-8 rounded-xl shadow-lg border border-border space-y-8 md:sticky md:top-24">
        <h3 className="text-2xl font-black text-foreground">
          {t("order_summary")}
        </h3>

        <DeliveryProgress
          totalPrice={totalPrice}
          freeDeliveryThreshold={freeDeliveryThreshold}
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
          freeDeliveryThreshold={freeDeliveryThreshold}
        />

        <div className="space-y-4 pt-4">
          <Link
            href={{
              pathname: "/checkout",
              query: appliedCoupon ? { coupon: appliedCoupon.code } : {},
            }}
            className="w-full bg-primary hover:bg-primary-hover text-primary-foreground py-4 md:py-5 rounded-lg font-black text-base md:text-lg transition-all flex items-center justify-center gap-3 shadow-primary active:scale-95 group"
          >
            {t("checkout_button")}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="flex items-center justify-center gap-2 pt-2">
            <ShieldCheck className="w-4 h-4 text-muted-foreground" />
            <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
              {t("secure_payment_guarantee")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
