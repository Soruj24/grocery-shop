"use client";

import { Tag, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { AppliedCoupon } from "@/features/home/hooks/useCouponValidation";

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
    <div className="space-y-2.5">
      <label className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider">
        {t("discount_code")}
      </label>
      {!appliedCoupon ? (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
            <input
              type="text"
              value={promoCode}
              onChange={(e) =>
                onPromoCodeChange(e.target.value)
              }
              placeholder={t("coupon_placeholder")}
              className="w-full bg-black/[0.03] dark:bg-white/[0.04] border border-black/[0.04] dark:border-white/[0.04] rounded-lg py-2.5 pl-10 pr-4 text-xs font-medium focus:ring-1 focus:ring-foreground/20 focus:border-foreground/20 transition-all uppercase"
            />
          </div>
          <button
            onClick={onApply}
            disabled={!promoCode || loading}
            className="bg-foreground text-background px-5 rounded-lg font-semibold text-xs hover:opacity-90 transition-all disabled:opacity-40"
          >
            {loading ? "..." : t("apply_coupon")}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-emerald-500/[0.04] px-3.5 py-2.5 rounded-lg border border-emerald-500/[0.1]">
          <div className="flex items-center gap-2">
            <Tag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase">
              {appliedCoupon.code}
            </span>
          </div>
          <button
            onClick={onRemove}
            className="p-1 rounded-md hover:bg-emerald-500/[0.06] transition-colors"
          >
            <X className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          </button>
        </div>
      )}
    </div>
  );
}
