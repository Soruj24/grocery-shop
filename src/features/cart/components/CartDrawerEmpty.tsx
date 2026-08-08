"use client";

import { ShoppingBag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CartDrawerEmptyProps {
  onClose: () => void;
}

export default function CartDrawerEmpty({
  onClose,
}: CartDrawerEmptyProps) {
  const { t } = useLanguage();

  return (
    <div className="h-full flex flex-col items-center justify-center text-center space-y-5">
      <div className="w-16 h-16 bg-black/[0.04] dark:bg-white/[0.06] rounded-xl flex items-center justify-center text-muted-foreground/30">
        <ShoppingBag size={32} />
      </div>
      <div className="space-y-1.5">
        <h3 className="text-lg font-bold text-foreground">
          {t("cart_empty_title")}
        </h3>
        <p className="text-xs font-medium text-muted-foreground/60">
          {t("cart_empty_desc")}
        </p>
      </div>
      <button
        onClick={onClose}
        className="bg-foreground text-background px-8 py-3 rounded-lg font-semibold text-sm active:scale-[0.98] transition-all"
      >
        {t("cart_start_shopping")}
      </button>
    </div>
  );
}
