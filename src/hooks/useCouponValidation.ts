"use client";

import { useState } from "react";
import { toast } from "@/lib/utils/swal";
import { useLanguage } from "@/providers/LanguageContext";

export interface AppliedCoupon {
  code: string;
  discount: number;
}

export function useCouponValidation(totalPrice: number) {
  const { t } = useLanguage();
  const [promoCode, setPromoCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(
    null,
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const applyCoupon = async () => {
    if (!promoCode) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/coupons/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: promoCode, total: totalPrice }),
      });
      const data = await res.json();
      if (res.ok) {
        setAppliedCoupon({ code: data.code, discount: data.discount });
        return { code: data.code, discount: data.discount };
      } else {
        setError(data.message || t("promo_error"));
        toast.error(data.message || t("promo_error"));
        return null;
      }
    } catch {
      setError(t("server_error"));
      toast.error(t("server_error"));
      return null;
    } finally {
      setLoading(false);
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setPromoCode("");
    setError("");
  };

  return {
    promoCode,
    setPromoCode,
    appliedCoupon,
    setAppliedCoupon,
    loading,
    error,
    applyCoupon,
    removeCoupon,
  };
}
