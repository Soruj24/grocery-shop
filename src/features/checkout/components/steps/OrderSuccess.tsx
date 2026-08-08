"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Package,
  ArrowRight,
  Copy,
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
        ],
      });
      if (Date.now() < end)
        requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] p-8 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2,
        }}
        className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-foreground mb-4"
      >
        <CheckCircle2 className="h-8 w-8 text-background" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl font-bold text-foreground mb-1"
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
        className="text-xs text-muted-foreground/50 mb-6"
      >
        {t("order_confirmation_sent")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="rounded-xl bg-black/[0.03] dark:bg-white/[0.04] p-4 mb-6"
      >
        <p className="text-[10px] text-muted-foreground/50 uppercase tracking-wider mb-1">
          Order ID
        </p>
        <div className="flex items-center justify-center gap-2">
          <p className="text-sm font-mono font-bold text-foreground">
            {orderId}
          </p>
          <button
            onClick={handleCopyOrderId}
            className="rounded-lg p-1 text-muted-foreground/40 hover:text-foreground hover:bg-black/[0.06] dark:hover:bg-white/[0.1] transition-colors"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>
        {total && (
          <p className="text-xs text-muted-foreground/50 mt-1">
            Total: ৳{total.toLocaleString()}
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="space-y-3"
      >
        <a
          href="/account/orders"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-foreground py-3 text-sm font-semibold text-background hover:opacity-90 transition-opacity active:scale-[0.98]"
        >
          <Package className="h-4 w-4" />
          {t("order_track_your")}
          <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href="/"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-black/[0.04] dark:border-white/[0.04] py-3 text-sm font-medium text-foreground hover:bg-black/[0.02] dark:hover:bg-white/[0.04] transition-colors"
        >
          Continue Shopping
        </a>
      </motion.div>
    </motion.div>
  );
}
