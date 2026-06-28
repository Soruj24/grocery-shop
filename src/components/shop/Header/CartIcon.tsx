"use client";

import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/components/CartContext";
import { useLanguage } from "@/components/LanguageContext";

interface CartIconProps {
  onClick: () => void;
}

export default function CartIcon({ onClick }: CartIconProps) {
  const { totalItems } = useCart();
  const { t } = useLanguage();

  return (
    <button
      onClick={onClick}
      title={t("cart") || "Shopping Cart"}
      className="relative h-12 w-12 flex items-center justify-center bg-gray-50 dark:bg-white/5 hover:bg-green-50 dark:hover:bg-green-500/10 text-gray-700 dark:text-gray-400 hover:text-green-600 rounded-2xl transition-all group border border-transparent hover:border-green-100 dark:hover:border-green-500/20 shadow-sm hover:shadow-md"
    >
      <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
      {totalItems > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1.5 -right-1.5 bg-green-600 text-white text-[10px] font-black min-w-[20px] h-[20px] px-1 rounded-full flex items-center justify-center border-2 border-white dark:border-black shadow-lg"
        >
          {totalItems}
        </motion.span>
      )}
    </button>
  );
}
