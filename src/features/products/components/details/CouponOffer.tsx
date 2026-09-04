"use client";

import { Tag, Copy, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "react-hot-toast";

interface CouponOfferProps {
  coupons?: {
    code: string;
    discount: number;
    description?: string;
  }[];
}

export default function CouponOffer({
  coupons,
}: CouponOfferProps) {
  const { t } = useLanguage();
  const [copiedCode, setCopiedCode] = useState<
    string | null
  >(null);

  const defaultCoupons = [
    {
      code: "WELCOME10",
      discount: 10,
      description: "10% off on your first order",
    },
    {
      code: "FREESHIP",
      discount: 0,
      description: "Free delivery on this item",
    },
  ];

  const displayCoupons = coupons || defaultCoupons;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    toast.success("Coupon code copied!");
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-3">
      <label className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-wider flex items-center gap-2">
        <Tag className="w-3 h-3" />
        Available Coupons
      </label>
      <div className="space-y-2">
        {displayCoupons.map((coupon, idx) => (
          <motion.div
            key={coupon.code}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: idx * 0.04,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="flex items-center justify-between bg-card border border-dashed border-primary/[0.2] rounded-xl p-3 hover:border-primary/[0.4] transition-all duration-300"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/[0.06]">
                <Tag className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="text-sm font-bold text-foreground uppercase">
                  {coupon.code}
                </span>
                <p className="text-[10px] font-medium text-muted-foreground/60">
                  {coupon.description}
                </p>
              </div>
            </div>
            <button
              onClick={() =>
                handleCopy(coupon.code)
              }
              aria-label={copiedCode === coupon.code ? `Copied ${coupon.code}` : `Copy coupon ${coupon.code}`}
              className={`p-2 rounded-lg transition-all duration-200 active:scale-95 ${
                copiedCode === coupon.code
                  ? "bg-success text-success-foreground"
                  : "bg-muted text-muted-foreground hover:text-primary hover:bg-primary/[0.06]"
              }`}
            >
              {copiedCode === coupon.code ? (
                <Check className="w-4 h-4" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
