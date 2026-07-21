"use client";

import { motion, AnimatePresence } from "framer-motion";
import { RotateCcw, Trash2, ShoppingBag, Heart, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import { getProductFallbackImage } from "@/constants/fallback-images";
import { Badge } from "@/components/ui";

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

  const handleMoveToCart = (item: SaveForLaterItem) => {
    addToCart({ ...item, _id: item._id } as any, 1);
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
            className="flex items-center gap-3 text-xl font-black text-foreground"
          >
            <motion.span
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="text-primary"
            >
              <RotateCcw className="w-6 h-6" />
            </motion.span>
            <span>{t("saved_for_later")}</span>
            <span className="bg-muted px-3 py-1 rounded-full text-sm font-bold text-muted-foreground">
              {items.length}
            </span>
          </motion.h2>
          <button
            onClick={() => items.forEach((i) => onRemove(i._id))}
            className="p-2 rounded-xl text-muted-foreground hover:text-danger hover:bg-danger/10 transition-all"
            title={t("clear_all")}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {items.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative bg-card rounded-2xl border border-border p-4 sm:p-6 hover:shadow-lg hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="relative w-full sm:w-20 aspect-square bg-muted rounded-xl overflow-hidden border border-border flex-shrink-0">
                  <Image
                    src={item.image || `https://picsum.photos/seed/${encodeURIComponent(item.name)}/200/200`}
                    alt={item.name}
                    fill
                    sizes="80px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <Badge tone="info" size="xs" className="absolute top-2 left-2 shadow-sm">
                    {t("saved")}
                  </Badge>
                </div>

                <div className="flex-1 min-w-0 space-y-2">
                  <h3 className="text-sm sm:text-base font-black text-foreground leading-tight line-clamp-2">
                    {item.name}
                  </h3>

                  {item.variant && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                      {item.variant}
                    </span>
                  )}

                  <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-primary">
                      {t("currency_symbol")}
                      {(item.discountPrice ?? item.price).toLocaleString("bn-BD")}
                    </span>
                    {item.discountPrice && (
                      <span className="text-sm font-bold text-muted-foreground line-through">
                        {t("currency_symbol")}{item.price.toLocaleString("bn-BD")}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-border/50 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleMoveToCart(item)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-black text-sm sm:text-base transition-all hover:bg-primary-hover active:scale-98"
                >
                  <ShoppingBag className="w-4 h-4" />
                  {t("move_to_cart")}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onMoveToWishlist?.(item._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border bg-muted text-foreground font-black text-sm sm:text-base transition-all hover:bg-primary/10 hover:text-primary hover:border-primary active:scale-98"
                >
                  <Heart className="w-4 h-4" />
                  {t("wishlist")}
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onRemove(item._id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-danger/30 bg-danger/5 text-danger font-bold text-sm sm:text-base transition-all hover:bg-danger/10 active:scale-98"
                >
                  <Trash2 className="w-4 h-4" />
                  {t("remove")}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}