"use client";

import { Tag, X, Percent } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useCallback } from "react";

interface CouponSectionProps {
  appliedCoupon?: string | null;
  onApply?: (code: string) => void;
  onRemove?: () => void;
}

export default function CouponSection({
  appliedCoupon: externalCoupon,
  onApply: externalOnApply,
  onRemove: externalOnRemove,
}: CouponSectionProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [internalCoupon, setInternalCoupon] =
    useState<string | null>(null);

  const appliedCoupon =
    externalCoupon ?? internalCoupon;

  const handleApply = useCallback(async () => {
    if (!code.trim()) {
      setError(t("please_enter_coupon_code"));
      return;
    }

    setIsApplying(true);
    setError("");

    await new Promise((r) => setTimeout(r, 500));

    const validCoupons = ["SAVE10", "SAVE20", "FREESHIP"];
    if (
      validCoupons.includes(code.trim().toUpperCase())
    ) {
      if (externalOnApply) {
        externalOnApply(code.trim().toUpperCase());
      } else {
        setInternalCoupon(
          code.trim().toUpperCase()
        );
      }
      setCode("");
      setIsOpen(false);
    } else {
      setError(t("coupon_invalid"));
    }
    setIsApplying(false);
  }, [
    code,
    externalOnApply,
    t,
  ]);

  const handleRemove = useCallback(() => {
    if (externalOnRemove) {
      externalOnRemove();
    } else {
      setInternalCoupon(null);
    }
  }, [externalOnRemove]);

  return (
    <div className="space-y-2">
      {appliedCoupon ? (
        <div className="flex items-center justify-between p-3 bg-emerald-500/[0.06] dark:bg-emerald-500/[0.08] rounded-lg border border-emerald-500/[0.12]">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-500/10 rounded-md flex items-center justify-center">
              <Percent className="w-3 h-3 text-emerald-600" />
            </div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400">
              {appliedCoupon}
            </span>
          </div>
          <button
            onClick={handleRemove}
            className="p-1 rounded-md hover:bg-emerald-500/10 transition-colors"
          >
            <X className="w-3.5 h-3.5 text-emerald-600" />
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed border-border hover:border-border-strong transition-colors text-xs font-medium text-muted-foreground/60"
          >
            <Tag className="w-3.5 h-3.5" />
            {t("have_coupon_code")}
          </button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-2 pt-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => {
                        setCode(
                          e.target.value.toUpperCase()
                        );
                        setError("");
                      }}
                      onKeyDown={(e) =>
                        e.key === "Enter" &&
                        handleApply()
                      }
                      placeholder={t(
                        "coupon_code_placeholder_input"
                      )}
                      className="flex-1 h-10 px-3 bg-muted border border-border rounded-lg text-xs font-medium text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-foreground/20 transition-colors"
                    />
                    <button
                      onClick={handleApply}
                      disabled={isApplying}
                      className="h-10 px-4 bg-foreground text-background rounded-lg text-xs font-semibold hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center gap-1.5"
                    >
                      {isApplying ? (
                        <div className="w-3.5 h-3.5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                      ) : (
                        t("apply_button")
                      )}
                    </button>
                  </div>
                  {error && (
                    <p className="text-[10px] font-medium text-danger">
                      {error}
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
