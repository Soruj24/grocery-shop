"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Package,
  ArrowRight,
  Copy,
  Check,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import { useLanguage } from "@/contexts/LanguageContext";

interface OrderSuccessProps {
  orderId: string;
  guestName?: string;
  total?: number;
}

export default function OrderSuccess({
  orderId,
  guestName,
  total,
}: OrderSuccessProps) {
  const { t } = useLanguage();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const duration = 3000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: [
          "#18181b",
          "#27272a",
          "#3f3f46",
          "#71717a",
          "#a1a1aa",
        ],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: [
          "#18181b",
          "#27272a",
          "#3f3f46",
          "#71717a",
          "#a1a1aa",
        ],
      });
      if (Date.now() < end)
        requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.5,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className="rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] p-8 sm:p-10 text-center shadow-[0_2px_16px_rgba(0,0,0,0.06)]"
    >
      {/* Checkmark */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-foreground mb-6"
      >
        <CheckCircle2 className="h-10 w-10 text-background" />
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-2xl font-bold text-foreground mb-2"
      >
        {t("order_placed_successfully")}
      </motion.h2>

      {guestName && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-muted-foreground/60 mb-1"
        >
          {t("order_thank_you")}, {guestName}!
        </motion.p>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xs text-muted-foreground/50 mb-8"
      >
        {t("order_confirmation_sent")}
      </motion.p>

      {/* Order ID Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="rounded-2xl bg-black/[0.03] dark:bg-white/[0.04] p-6 mb-8 border border-black/[0.04] dark:border-white/[0.04]"
      >
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-muted-foreground/40" />
          <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wider font-semibold">
            Order ID
          </p>
        </div>
        <div className="flex items-center justify-center gap-3">
          <p className="text-lg font-mono font-bold text-foreground tracking-wider">
            {orderId}
          </p>
          <button
            onClick={handleCopyOrderId}
            className="rounded-lg p-2 text-muted-foreground/40 hover:text-foreground hover:bg-black/[0.06] dark:hover:bg-white/[0.1] transition-all"
          >
            {copied ? (
              <Check className="h-4 w-4 text-emerald-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
        {total && (
          <p className="text-xs text-muted-foreground/50 mt-2">
            {t("total_label")}: {t("currency_symbol")}
            {total.toLocaleString("bn-BD")}
          </p>
        )}
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="space-y-3"
      >
        <a
          href="/account/orders"
          className="flex w-full items-center justify-center gap-2.5 rounded-xl bg-foreground py-3.5 text-sm font-semibold text-background hover:opacity-90 transition-all active:scale-[0.98] shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
        >
          <Package className="h-4 w-4" />
          {t("order_track_your")}
          <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href="/"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-black/[0.06] dark:border-white/[0.06] py-3.5 text-sm font-medium text-foreground hover:bg-black/[0.02] dark:hover:bg-white/[0.04] transition-all"
        >
          {t("continue_shopping")}
        </a>
      </motion.div>
    </motion.div>
  );
}
