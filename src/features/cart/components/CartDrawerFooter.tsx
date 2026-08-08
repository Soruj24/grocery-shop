"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

interface CartDrawerFooterProps {
  totalPrice: number;
  onClose: () => void;
}

export default function CartDrawerFooter({
  totalPrice,
  onClose,
}: CartDrawerFooterProps) {
  const { t } = useLanguage();

  return (
    <div className="p-5 border-t border-black/[0.04] dark:border-white/[0.04] space-y-4">
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-medium text-muted-foreground/60">
          <span>{t("subtotal")}</span>
          <span className="text-foreground">
            {t("currency_symbol")}
            {totalPrice.toLocaleString("bn-BD")}
          </span>
        </div>
        <div className="flex justify-between text-xs font-medium text-muted-foreground/60">
          <span>{t("delivery_charge")}</span>
          <span className="text-emerald-600 dark:text-emerald-400">
            {t("free")}
          </span>
        </div>
        <div className="flex justify-between text-lg font-bold text-foreground pt-2 border-t border-black/[0.04] dark:border-white/[0.04]">
          <span>{t("total_label")}</span>
          <span>
            {t("currency_symbol")}
            {totalPrice.toLocaleString("bn-BD")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Link
          href="/cart"
          onClick={onClose}
          className="flex items-center justify-center px-4 py-3 bg-black/[0.04] dark:bg-white/[0.06] border border-black/[0.04] dark:border-white/[0.04] rounded-lg font-semibold text-xs text-foreground hover:bg-black/[0.08] dark:hover:bg-white/[0.1] transition-all"
        >
          {t("view_cart")}
        </Link>
        <Link
          href="/checkout"
          onClick={onClose}
          className="flex items-center justify-center gap-2 px-4 py-3 bg-foreground text-background rounded-lg font-semibold text-xs transition-all group"
        >
          {t("checkout")}
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
