"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/providers/LanguageContext";

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
    <div className="p-8 border-t border-gray-100 dark:border-white/5 space-y-6 bg-gray-50/50 dark:bg-white/[0.02]">
      <div className="space-y-3">
        <div className="flex justify-between text-gray-500 font-bold">
          <span>{t("subtotal")}</span>
          <span>
            {t("currency_symbol")}
            {totalPrice.toLocaleString("bn-BD")}
          </span>
        </div>
        <div className="flex justify-between text-gray-500 font-bold">
          <span>{t("delivery_charge")}</span>
          <span className="text-green-600">{t("free")}</span>
        </div>
        <div className="flex justify-between text-2xl font-black text-gray-900 dark:text-white pt-3 border-t border-gray-100 dark:border-white/10">
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
          className="flex items-center justify-center px-6 py-5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl font-black text-gray-900 dark:text-white hover:bg-gray-50 transition-all"
        >
          {t("view_cart")}
        </Link>
        <Link
          href="/checkout"
          onClick={onClose}
          className="flex items-center justify-center gap-3 px-6 py-5 bg-green-600 text-white rounded-3xl font-black shadow-xl shadow-green-600/20 hover:bg-green-700 transition-all group"
        >
          {t("checkout")}
          <ArrowRight className="group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
