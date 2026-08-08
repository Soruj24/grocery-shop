"use client";

import {
  Trash2,
  Plus,
  Minus,
} from "lucide-react";
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
  updateQuantity: (
    id: string,
    quantity: number
  ) => void;
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
      className="bg-white dark:bg-[#09090b] p-4 sm:p-5 rounded-xl border border-black/[0.04] dark:border-white/[0.04] grid grid-cols-1 lg:grid-cols-12 items-center gap-4 sm:gap-5 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
    >
      <div className="flex items-center gap-4 lg:col-span-6">
        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-black/[0.02] dark:bg-white/[0.02] rounded-lg flex-shrink-0 overflow-hidden border border-black/[0.04] dark:border-white/[0.04]">
          <Image
            src={
              item.image ||
              getProductFallbackImage(item.name)
            }
            alt={item.name}
            width={96}
            height={96}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 text-left space-y-1">
          <h3 className="text-sm sm:text-base font-semibold text-foreground leading-tight line-clamp-2">
            {item.name}
          </h3>
          <div className="flex items-center gap-2">
            <span className="text-foreground font-bold text-sm sm:text-base">
              {t("currency_symbol")}
              {item.price.toLocaleString("bn-BD")}
            </span>
            <span className="text-[10px] font-medium text-muted-foreground/50">
              {t("unit_kg")}
            </span>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:col-span-2 items-center">
        <span className="font-bold text-sm text-foreground">
          {t("currency_symbol")}
          {item.price.toLocaleString("bn-BD")}
        </span>
      </div>

      <div className="flex items-center justify-center lg:justify-start gap-1.5 bg-black/[0.04] dark:bg-white/[0.06] px-2.5 py-1.5 rounded-lg lg:col-span-2 whitespace-nowrap z-20">
        <button
          onClick={() =>
            updateQuantity(
              item._id,
              item.quantity - 1
            )
          }
          disabled={item.quantity <= 1}
          className="w-8 h-8 flex items-center justify-center rounded-md text-foreground hover:bg-black/[0.06] dark:hover:bg-white/[0.1] disabled:opacity-40 disabled:cursor-not-allowed transition-colors shrink-0"
          aria-label="Decrease quantity"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="w-8 text-center font-bold text-sm tabular-nums">
          {item.quantity.toLocaleString("bn-BD")}
        </span>
        <button
          onClick={() =>
            updateQuantity(
              item._id,
              item.quantity + 1
            )
          }
          className="w-8 h-8 flex items-center justify-center rounded-md text-foreground hover:bg-black/[0.06] dark:hover:bg-white/[0.1] transition-colors shrink-0"
          aria-label="Increase quantity"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="flex items-center justify-between lg:justify-end gap-2 lg:col-span-2 lg:ml-0 relative z-10">
        <span className="font-bold text-base sm:text-lg text-foreground">
          {t("currency_symbol")}
          {(
            item.price * item.quantity
          ).toLocaleString("bn-BD")}
        </span>
        <button
          onClick={() =>
            removeFromCart(item._id)
          }
          className="p-2 text-muted-foreground/40 hover:text-rose-500 hover:bg-rose-500/[0.06] rounded-lg transition-all"
          aria-label="Remove item"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
