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
    <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/5 p-6 rounded-[32px] space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-10 h-10 rounded-xl bg-yellow-50 dark:bg-yellow-500/10 flex items-center justify-center text-yellow-600">
          <Ticket className="w-5 h-5" />
        </div>
        <h3 className="font-black text-gray-900 dark:text-white">
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
              className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl px-4 py-3 font-bold outline-none focus:border-green-500 transition-all dark:text-white"
            />
          </div>
          <button
            onClick={handleApply}
            disabled={loading || !promoCode}
            className="bg-green-600 text-white px-6 py-3 rounded-2xl font-black hover:bg-green-700 transition-all disabled:opacity-50 flex items-center gap-2"
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
          className="bg-green-50 dark:bg-green-500/10 border border-green-100 dark:border-green-500/20 p-4 rounded-2xl flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <CheckCircle2 className="text-green-600 w-5 h-5" />
            <div>
              <p className="font-black text-green-900 dark:text-green-400">
                {appliedCoupon.code} {t("promo_applied")}
              </p>
              <p className="text-xs font-bold text-green-700 dark:text-green-500">
                {t("you_are_saving")} {t("currency_symbol")}
                {appliedCoupon.discount.toLocaleString("bn-BD")}
              </p>
            </div>
          </div>
          <button
            onClick={handleRemove}
            className="text-gray-400 hover:text-red-500 transition-colors p-2"
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
            className="text-xs font-bold text-red-500 flex items-center gap-2"
          >
            <XCircle className="w-4 h-4" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
