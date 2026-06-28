"use client";

import { Tag, X } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import type { AppliedCoupon } from "@/hooks/useCouponValidation";

interface CouponSectionProps {
  promoCode: string;
  onPromoCodeChange: (code: string) => void;
  appliedCoupon: AppliedCoupon | null;
  loading: boolean;
  onApply: () => void;
  onRemove: () => void;
}

export default function CouponSection({
  promoCode,
  onPromoCodeChange,
  appliedCoupon,
  loading,
  onApply,
  onRemove,
}: CouponSectionProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-3">
      <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">
        {t("discount_code")}
      </label>
      {!appliedCoupon ? (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={promoCode}
              onChange={(e) => onPromoCodeChange(e.target.value)}
              placeholder={t("coupon_placeholder")}
              className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-green-500 transition-all uppercase"
            />
          </div>
          <button
            onClick={onApply}
            disabled={!promoCode || loading}
            className="bg-gray-900 dark:bg-gray-100 text-white dark:text-black px-6 rounded-2xl font-black text-sm hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? "..." : t("apply_coupon")}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/20 px-4 py-3 rounded-2xl border border-green-100 dark:border-green-800/50">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-green-600" />
            <span className="text-sm font-black text-green-600 uppercase">
              {appliedCoupon.code}
            </span>
          </div>
          <button
            onClick={onRemove}
            className="p-1 hover:bg-green-100 dark:hover:bg-green-800 rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-green-600" />
          </button>
        </div>
      )}
    </div>
  );
}
