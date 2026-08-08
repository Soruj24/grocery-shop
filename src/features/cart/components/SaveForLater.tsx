"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  Trash2,
  ShoppingBag,
  Heart,
  X,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";

interface SaveForLaterItem {
  _id: string;
  name: string;
  price: number;
  image?: string;
  discountPrice?: number;
  discount?: number;
  variant?: string;
}

interface SaveForLaterProps {
  items: SaveForLaterItem[];
  onMoveToCart: (id: string) => void;
  onRemove: (id: string) => void;
  onMoveToWishlist?: (id: string) => void;
}

export default function SaveForLater({
  items,
  onMoveToCart,
  onRemove,
  onMoveToWishlist,
}: SaveForLaterProps) {
  const { t } = useLanguage();
  const { addToCart } = useCart();

  if (items.length === 0) return null;

  const handleMoveToCart = (
    item: SaveForLaterItem
  ) => {
    addToCart(
      { ...item, _id: item._id } as any,
      1
    );
    onMoveToCart(item._id);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        className="mt-8"
      >
        <div className="flex items-center justify-between mb-6">
          <motion.h2
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-lg font-bold text-foreground"
          >
            <RotateCcw className="w-4 h-4 text-muted-foreground/50" />
            <span>{t("saved_for_later")}</span>
            <span className="text-[10px] font-semibold text-muted-foreground/50 bg-black/[0.04] dark:bg-white/[0.06] px-2 py-0.5 rounded">
              {items.length}
            </span>
          </motion.h2>
          <button
            onClick={() =>
              items.forEach((i) => onRemove(i._id))
            }
            className="p-1.5 rounded-lg text-muted-foreground/50 hover:text-rose-500 hover:bg-rose-500/[0.06] transition-all"
            title={t("clear_all")}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {items.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: index * 0.04,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="bg-white dark:bg-[#09090b] rounded-xl border border-black/[0.04] dark:border-white/[0.04] p-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-start gap-4">
                <div className="relative w-16 aspect-square bg-black/[0.02] dark:bg-white/[0.02] rounded-lg overflow-hidden border border-black/[0.04] dark:border-white/[0.04] shrink-0">
                  <Image
                    src={
                      item.image ||
                      `https://picsum.photos/seed/${encodeURIComponent(item.name)}/200/200`
                    }
                    alt={item.name}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 space-y-1.5">
                  <h3 className="text-xs font-semibold text-foreground leading-tight line-clamp-2">
                    {item.name}
                  </h3>
                  {item.variant && (
                    <span className="text-[9px] font-medium text-muted-foreground/50">
                      {item.variant}
                    </span>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-foreground">
                      {t("currency_symbol")}
                      {(
                        item.discountPrice ??
                        item.price
                      ).toLocaleString("bn-BD")}
                    </span>
                    {item.discountPrice && (
                      <span className="text-[9px] font-medium text-muted-foreground/40 line-through">
                        {t("currency_symbol")}
                        {item.price.toLocaleString(
                          "bn-BD"
                        )}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-3 pt-3 border-t border-black/[0.04] dark:border-white/[0.04] flex items-center gap-2">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    handleMoveToCart(item)
                  }
                  className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-foreground text-background font-semibold text-[11px] transition-all active:scale-[0.98]"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  {t("move_to_cart")}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    onMoveToWishlist?.(item._id)
                  }
                  className="p-2 rounded-lg border border-black/[0.04] dark:border-white/[0.04] text-muted-foreground/50 hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all"
                >
                  <Heart className="w-3.5 h-3.5" />
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() =>
                    onRemove(item._id)
                  }
                  className="p-2 rounded-lg text-muted-foreground/50 hover:text-rose-500 hover:bg-rose-500/[0.06] transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
