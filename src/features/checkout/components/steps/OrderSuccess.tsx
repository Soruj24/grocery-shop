"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Package, ArrowRight, Phone, Copy } from "lucide-react";
import confetti from "canvas-confetti";
import { useLanguage } from "@/contexts/LanguageContext";

interface OrderSuccessProps {
  orderId: string;
  guestName?: string;
  total?: number;
}

export default function OrderSuccess({ orderId, guestName, total }: OrderSuccessProps) {
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
        colors: ["#10b981", "#06b6d4", "#8b5cf6", "#f59e0b"],
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ["#10b981", "#06b6d4", "#8b5cf6", "#f59e0b"],
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  const handleCopyOrderId = () => {
    navigator.clipboard.writeText(orderId);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30 mb-4"
      >
        <CheckCircle2 className="h-10 w-10 text-emerald-500" />
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-xl font-bold text-gray-900 dark:text-white mb-1"
      >
        {t("order_placed_successfully")}
      </motion.h2>

      {guestName && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-sm text-gray-500 dark:text-gray-400 mb-1"
        >
          {t("order_thank_you")}, {guestName}!
        </motion.p>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-xs text-gray-500 dark:text-gray-400 mb-6"
      >
        {t("order_confirmation_sent")}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="rounded-xl bg-gray-50 dark:bg-gray-800 p-4 mb-6"
      >
        <p className="text-[10px] text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-1">Order ID</p>
        <div className="flex items-center justify-center gap-2">
          <p className="text-sm font-mono font-bold text-gray-900 dark:text-white">{orderId}</p>
          <button
            onClick={handleCopyOrderId}
            className="rounded-lg p-1 text-gray-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 transition-colors"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
        </div>
        {total && (
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Total: ৳{total.toLocaleString()}</p>
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
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors"
        >
          <Package className="h-4 w-4" />
          {t("order_track_your")}
          <ArrowRight className="h-4 w-4" />
        </a>
        <a
          href="/"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        >
          Continue Shopping
        </a>
      </motion.div>
    </motion.div>
  );
}
