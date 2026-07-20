"use client";

import { Ticket, Loader2, CheckCircle2, XCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCouponValidation } from "@/features/home/hooks/useCouponValidation";

interface CouponInputProps {
  total: number;
  onApply: (coupon: { code: string; discount: number }) => void;
  onRemove: () => void;
}

export default function CouponInput({
  total,
  onApply,
  onRemove,
}: CouponInputProps) {
  const { t } = useLanguage();
  const {
    promoCode,
    setPromoCode,
    appliedCoupon,
    loading,
    error,
    applyCoupon,
    removeCoupon,
  } = useCouponValidation(total);

  const handleApply = async () => {
    const result = await applyCoupon();
    if (result) {
      onApply(result);
      setPromoCode("");
    }
  };

  const handleRemove = () => {
    removeCoupon();
    onRemove();
  };

  return (
    <div className="bg-card border border-border p-6 rounded-xl space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-md bg-warning-subtle flex items-center justify-center text-warning">
          <Ticket className="w-5 h-5" />
        </div>
        <h3 className="font-black text-foreground">
          {t("discount_code")} / {t("coupon_code")}
        </h3>
      </div>

      {!appliedCoupon ? (
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
              placeholder={t("coupon_placeholder")}
              className="w-full bg-muted border border-border rounded-lg px-4 py-3 font-bold outline-none focus:border-primary transition-all text-foreground"
            />
          </div>
          <button
            onClick={handleApply}
            disabled={loading || !promoCode}
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-black hover:bg-primary-hover transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              t("apply_coupon")
            )}
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-primary-subtle text-primary-subtle-foreground border border-border p-4 rounded-lg flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-primary w-5 h-5" />
            <div>
              <p className="font-black text-primary">
                {appliedCoupon.code} {t("promo_applied")}
              </p>
              <p className="text-xs font-bold text-primary">
                {t("you_are_saving")} {t("currency_symbol")}
                {appliedCoupon.discount.toLocaleString("bn-BD")}
              </p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="text-muted-foreground hover:text-danger transition-colors p-2"
          >
            <XCircle className="w-5 h-5" />
          </button>
        </motion.div>
      )}

      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs font-bold text-danger flex items-center gap-2"
          >
            <XCircle className="w-4 h-4" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
