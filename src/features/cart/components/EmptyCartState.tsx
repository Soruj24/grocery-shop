"use client";

import {
  ShoppingBag,
  ArrowRight,
  ShoppingCart,
  Package,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function EmptyCartState() {
  const { t } = useLanguage();

  return (
    <div className="max-w-lg mx-auto px-4 py-16 md:py-24 text-center">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className="space-y-8"
      >
        {/* Icon */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 bg-muted rounded-2xl rotate-6" />
          <div className="absolute inset-0 bg-muted rounded-2xl -rotate-3" />
          <div className="relative w-24 h-24 bg-card border border-border rounded-2xl flex items-center justify-center shadow-sm">
            <ShoppingBag className="w-10 h-10 text-muted-foreground/30" />
          </div>
          <motion.div
            animate={{ y: [0, -6, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-2 -right-2 w-8 h-8 bg-muted rounded-lg flex items-center justify-center border border-border"
          >
            <ShoppingCart className="w-3.5 h-3.5 text-muted-foreground/40" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -4, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute -bottom-2 -left-2 w-8 h-8 bg-muted rounded-lg flex items-center justify-center border border-border"
          >
            <Package className="w-3.5 h-3.5 text-muted-foreground/40" />
          </motion.div>
          <motion.div
            animate={{ y: [0, -5, 0], x: [0, 3, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-1/2 -right-4 w-6 h-6 bg-muted rounded-md flex items-center justify-center border border-border"
          >
            <Sparkles className="w-3 h-3 text-muted-foreground/40" />
          </motion.div>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">
            {t("empty_cart_title")}
          </h2>
          <p className="text-sm text-muted-foreground/50 leading-relaxed max-w-xs mx-auto">
            {t("empty_cart_message")}
          </p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <Link
            href="/products"
            className="group bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold text-sm flex items-center gap-2 active:scale-[0.98] transition-all shadow-md hover:shadow-md"
          >
            {t("browse_products")}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <Link
            href="/products"
            className="text-xs font-medium text-muted-foreground/50 hover:text-foreground transition-colors flex items-center gap-1.5"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {t("continue_shopping")}
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
