"use client";

import { ShoppingBag } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface CartDrawerEmptyProps {
  onClose: () => void;
}

export default function CartDrawerEmpty({ onClose }: CartDrawerEmptyProps) {
  const { t } = useLanguage();

  return (
    <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
      <div className="w-24 h-24 bg-gray-50 dark:bg-white/5 rounded-[40px] flex items-center justify-center text-gray-200 dark:text-white/10">
        <ShoppingBag size={48} />
      </div>
      <div className="space-y-2">
        <h3 className="text-xl font-black text-gray-900 dark:text-white">
          {t("cart_empty_title")}
        </h3>
        <p className="text-gray-400 font-medium">{t("cart_empty_desc")}</p>
      </div>
      <button
        onClick={onClose}
        className="bg-green-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-green-600/20 active:scale-95 transition-all"
      >
        {t("cart_start_shopping")}
      </button>
    </div>
  );
}
