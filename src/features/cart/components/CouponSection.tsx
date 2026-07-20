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
    <div className="space-y-3">
      <label className="text-xs font-black text-muted-foreground uppercase tracking-widest px-1">
        {t("discount_code")}
      </label>
      {!appliedCoupon ? (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={promoCode}
              onChange={(e) => onPromoCodeChange(e.target.value)}
              placeholder={t("coupon_placeholder")}
              className="w-full bg-muted border-none rounded-lg py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary transition-all uppercase"
            />
          </div>
          <button
            onClick={onApply}
            disabled={!promoCode || loading}
            className="bg-foreground text-background px-6 rounded-lg font-black text-sm hover:opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? "..." : t("apply_coupon")}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between bg-primary-subtle text-primary-subtle-foreground px-4 py-3 rounded-lg border border-border">
          <div className="flex items-center gap-2">
            <Tag className="w-4 h-4 text-primary" />
            <span className="text-sm font-black text-primary uppercase">
              {appliedCoupon.code}
            </span>
          </div>
          <button
            onClick={onRemove}
            className="p-1 hover:bg-danger-subtle rounded-full transition-colors"
          >
            <X className="w-4 h-4 text-primary" />
          </button>
        </div>
      )}
    </div>
  );
}
