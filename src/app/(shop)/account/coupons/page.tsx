"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Ticket, Copy, CheckCircle2, Clock, Tag } from "lucide-react";

const mockCoupons = [
  { id: "1", code: "WELCOME20", discount: "20% off", type: "percentage", minOrder: 500, expires: "2026-08-15", used: false },
  { id: "2", code: "SAVE100", discount: "৳100 off", type: "fixed", minOrder: 1000, expires: "2026-07-30", used: false },
  { id: "3", code: "FREESHIP", discount: "Free Shipping", type: "shipping", minOrder: 300, expires: "2026-09-01", used: true },
];

export default function CouponsPage() {
  const [coupons] = useState(mockCoupons);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Coupons</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your available discount codes</p>
      </div>

      {coupons.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-12 text-center">
          <Ticket className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-sm font-semibold text-gray-900 dark:text-white">No coupons available</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Check back later for special offers</p>
        </div>
      ) : (
        <div className="space-y-3">
          {coupons.map((coupon, i) => (
            <motion.div
              key={coupon.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-2xl border-2 border-dashed p-5 transition-all ${
                coupon.used
                  ? "border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 opacity-60"
                  : "border-emerald-300 dark:border-emerald-700 bg-emerald-50/50 dark:bg-emerald-950/10"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${coupon.used ? "bg-gray-200 dark:bg-gray-700" : "bg-emerald-100 dark:bg-emerald-900/30"}`}>
                    <Tag className={`h-5 w-5 ${coupon.used ? "text-gray-400" : "text-emerald-500"}`} />
                  </div>
                  <div>
                    <p className="text-lg font-bold font-mono text-gray-900 dark:text-white">{coupon.code}</p>
                    <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">{coupon.discount}</p>
                  </div>
                </div>
                {coupon.used ? (
                  <span className="text-[10px] font-bold bg-gray-200 dark:bg-gray-700 text-gray-500 px-2 py-0.5 rounded-full">USED</span>
                ) : (
                  <button
                    onClick={() => handleCopy(coupon.code, coupon.id)}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-emerald-600 transition-colors"
                  >
                    {copiedId === coupon.id ? <><CheckCircle2 className="h-3 w-3" /> Copied</> : <><Copy className="h-3 w-3" /> Copy</>}
                  </button>
                )}
              </div>
              <div className="flex items-center gap-4 mt-3 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                <span className="text-[10px] text-gray-500 dark:text-gray-400">Min. order: ৳{coupon.minOrder}</span>
                <span className="flex items-center gap-1 text-[10px] text-gray-500 dark:text-gray-400">
                  <Clock className="h-3 w-3" /> Expires: {new Date(coupon.expires).toLocaleDateString()}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
