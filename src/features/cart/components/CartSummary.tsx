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
      <div className="bg-white dark:bg-gray-900 p-6 md:p-8 rounded-[32px] md:rounded-[40px] shadow-xl border border-gray-100 dark:border-gray-800 space-y-8 md:sticky md:top-24">
        <h3 className="text-2xl font-black text-gray-900 dark:text-white">
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
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 md:py-5 rounded-2xl font-black text-base md:text-lg transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 active:scale-95 group"
          >
            {t("checkout_button")}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="flex items-center justify-center gap-2 pt-2">
            <ShieldCheck className="w-4 h-4 text-gray-400" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              {t("secure_payment_guarantee")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
