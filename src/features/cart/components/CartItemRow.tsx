"use client";

import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { getProductFallbackImage } from "@/constants/fallback-images";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartItemRowProps {
  item: CartItem;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
}

export default function CartItemRow({
  item,
  removeFromCart,
  updateQuantity,
}: CartItemRowProps) {
  const { t } = useLanguage();
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className="group bg-card p-4 sm:p-6 rounded-xl shadow-sm border border-border grid grid-cols-1 lg:grid-cols-12 items-center gap-6 sm:gap-8 hover:shadow-lg transition-all"
    >
      <div className="flex items-center gap-4 lg:col-span-6">
        <div className="w-24 h-24 sm:w-28 sm:h-28 bg-muted rounded-lg flex-shrink-0 overflow-hidden border border-border">
          <Image
            src={item.image || getProductFallbackImage(item.name)}
            alt={item.name}
            width={112}
            height={112}
            className="w-full h-full object-cover"
            priority={false}
          />
        </div>
        <div className="flex-1 text-left space-y-2">
          <h3 className="text-lg sm:text-2xl font-black text-foreground leading-tight line-clamp-2">
            {item.name}
          </h3>
          <div className="flex items-center gap-3 sm:gap-4">
            <span className="text-primary font-black text-base sm:text-xl">
              {t('currency_symbol')}{item.price.toLocaleString('bn-BD')}
            </span>
            <span className="text-xs sm:text-sm font-bold text-muted-foreground">{t('unit_kg')}</span>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:col-span-2 items-center">
        <span className="font-black text-lg text-foreground">
          {t('currency_symbol')}{item.price.toLocaleString('bn-BD')}
        </span>
      </div>

      <div className="flex items-center justify-center lg:justify-start gap-2 sm:gap-3 bg-muted px-3 py-2 rounded-full border border-border lg:col-span-2 whitespace-nowrap z-20 min-w-[170px] shadow-sm">
        <button
          onClick={() => updateQuantity(item._id, item.quantity - 1)}
          disabled={item.quantity <= 1}
          className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-card rounded-md shadow-sm text-foreground hover:text-danger disabled:opacity-50 disabled:cursor-not-allowed transition-all active:scale-90 shrink-0 border border-border"
          aria-label="Decrease quantity"
        >
          <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
        <span className="w-10 text-center font-black text-foreground text-lg sm:text-xl">
          {item.quantity.toLocaleString('bn-BD')}
        </span>
        <button
          onClick={() => updateQuantity(item._id, item.quantity + 1)}
          className="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center bg-card rounded-md shadow-sm text-foreground hover:text-primary transition-all active:scale-90 shrink-0 border border-border"
          aria-label="Increase quantity"
        >
          <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>

      <div className="flex items-center justify-between lg:justify-end gap-2 lg:gap-4 lg:col-span-2 ml-2 lg:ml-0 relative z-10">
        <span className="font-black text-xl sm:text-2xl text-foreground">
          {t('currency_symbol')}{(item.price * item.quantity).toLocaleString('bn-BD')}
        </span>
        <button
          onClick={() => removeFromCart(item._id)}
          className="p-3 sm:p-4 text-muted-foreground hover:text-danger hover:bg-danger-subtle rounded-lg transition-all"
          aria-label="Remove item"
        >
          <Trash2 className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </motion.div>
  );
}
