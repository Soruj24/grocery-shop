"use client";

import { Tag, Copy, Check } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "react-hot-toast";

interface CouponOfferProps {
  coupons?: { code: string; discount: number; description?: string }[];
}

export default function CouponOffer({ coupons }: CouponOfferProps) {
  const { t } = useLanguage();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const defaultCoupons = [
    { code: "WELCOME10", discount: 10, description: "10% off on your first order" },
    { code: "FREESHIP", discount: 0, description: "Free delivery on this item" },
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
      <label className="text-xs font-black text-muted-foreground uppercase tracking-widest flex items-center gap-2">
        <Tag className="w-3 h-3" />
        Available Coupons
      </label>
      <div className="space-y-2">
        {displayCoupons.map((coupon, idx) => (
          <motion.div
            key={coupon.code}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center justify-between bg-card border border-dashed border-primary/30 rounded-xl p-3 hover:border-primary/60 transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="bg-primary-subtle p-2 rounded-lg">
                <Tag className="w-4 h-4 text-primary" />
              </div>
              <div>
                <span className="text-sm font-black text-foreground uppercase">{coupon.code}</span>
                <p className="text-[10px] font-bold text-muted-foreground">{coupon.description}</p>
              </div>
            </div>
            <button
              onClick={() => handleCopy(coupon.code)}
              className={`p-2 rounded-lg transition-all ${
                copiedCode === coupon.code
                  ? 'bg-success text-success-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'
              }`}
            >
              {copiedCode === coupon.code ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
