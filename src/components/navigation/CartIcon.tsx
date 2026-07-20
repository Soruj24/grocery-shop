"use client";

import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";

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
      className="relative h-12 w-12 flex items-center justify-center bg-muted hover:bg-primary-subtle text-muted-foreground hover:text-primary rounded-2xl transition-all group border border-transparent hover:border-primary-subtle shadow-sm hover:shadow-md"
    >
      <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
      {totalItems > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-[10px] font-black min-w-[20px] h-[20px] px-1 rounded-full flex items-center justify-center border-2 border-background shadow-lg"
        >
          {totalItems}
        </motion.span>
      )}
    </button>
  );
}
