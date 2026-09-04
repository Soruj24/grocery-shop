"use client";

import { ShoppingBag, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";

interface CartDrawerEmptyProps {
  onClose: () => void;
}

export default function CartDrawerEmpty({
  onClose,
}: CartDrawerEmptyProps) {
  const { t } = useLanguage();

  return (
    <div className="h-full flex flex-col items-center justify-center text-center space-y-5 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center text-muted-foreground/30"
      >
        <ShoppingBag size={28} />
      </motion.div>
      <div className="space-y-1.5">
        <h3 className="text-base font-bold text-foreground tracking-tight">
          {t("cart_empty_title")}
        </h3>
        <p className="text-xs font-medium text-muted-foreground/50 leading-relaxed">
          {t("cart_empty_desc")}
        </p>
      </div>
      <button
        onClick={onClose}
        className="bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 active:scale-[0.98] transition-all shadow-md"
      >
        {t("cart_start_shopping")}
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
