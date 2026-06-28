"use client";

import { X, ShoppingBag } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

interface CartDrawerHeaderProps {
  itemCount: number;
  onClose: () => void;
}

export default function CartDrawerHeader({
  itemCount,
  onClose,
}: CartDrawerHeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="p-8 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/20">
          <ShoppingBag size={24} />
        </div>
        <div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white">
            {t("your_bag")}
          </h2>
          <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">
            {itemCount.toLocaleString("bn-BD")}
            {t("items_suffix")}
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
      >
        <X size={24} />
      </button>
    </div>
  );
}
