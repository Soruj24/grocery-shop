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
    <div className="p-8 border-t border-border space-y-6 bg-card">
      <div className="space-y-3">
        <div className="flex justify-between text-muted-foreground font-bold">
          <span>{t("subtotal")}</span>
          <span>
            {t("currency_symbol")}
            {totalPrice.toLocaleString("bn-BD")}
          </span>
        </div>
        <div className="flex justify-between text-muted-foreground font-bold">
          <span>{t("delivery_charge")}</span>
          <span className="text-primary">{t("free")}</span>
        </div>
        <div className="flex justify-between text-2xl font-black text-foreground pt-3 border-t border-border">
          <span>{t("total_label")}</span>
          <span>
            {t("currency_symbol")}
            {totalPrice.toLocaleString("bn-BD")}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <Link
          href="/cart"
          onClick={onClose}
          className="flex items-center justify-center px-6 py-5 bg-card border border-border rounded-xl font-black text-foreground hover:bg-muted transition-all"
        >
          {t("view_cart")}
        </Link>
        <Link
          href="/checkout"
          onClick={onClose}
          className="flex items-center justify-center gap-3 px-6 py-5 bg-primary text-primary-foreground rounded-xl font-black shadow-primary hover:bg-primary-hover transition-all group"
        >
          {t("checkout")}
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
