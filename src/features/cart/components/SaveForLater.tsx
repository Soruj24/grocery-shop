"use client";

import {
  Bookmark,
  ShoppingCart,
  Trash2,
  Heart,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { getProductFallbackImage } from "@/constants/fallback-images";

interface SavedItem {
  _id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
}

interface SaveForLaterProps {
  items: SavedItem[];
  onMoveToCart: (id: string) => void;
  onRemove: (id: string) => void;
  onMoveToWishlist: (id: string) => void;
}

export default function SaveForLater({
  items,
  onMoveToCart,
  onRemove,
  onMoveToWishlist,
}: SaveForLaterProps) {
  const { t } = useLanguage();

  if (items.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card rounded-xl border border-border overflow-hidden shadow-xs"
    >
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
            <Bookmark className="w-4 h-4 text-muted-foreground/60" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-foreground">
              {t("saved_for_later_title")}
            </h3>
            <p className="text-[10px] text-muted-foreground/50">
              {items.length} {t("items_saved_count_suffix")}
            </p>
          </div>
        </div>
      </div>

      <div className="divide-y divide-border">
        <AnimatePresence mode="popLayout">
          {items.map((item) => (
            <motion.div
              key={item._id}
              layout
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 flex items-center gap-4"
            >
              <div className="relative w-14 h-14 bg-subtle rounded-lg overflow-hidden border border-border shrink-0">
                <Image
                  src={
                    item.image ||
                    getProductFallbackImage(item.name)
                  }
                  alt={item.name}
                  fill
                  sizes="56px"
                  className="object-cover"
                />
              </div>

              <div className="flex-1 min-w-0">
                <h4 className="text-xs font-semibold text-foreground line-clamp-1">
                  {item.name}
                </h4>
                <p className="text-xs font-bold text-foreground mt-0.5">
                  {t("currency_symbol")}
                  {item.price.toLocaleString("bn-BD")}
                </p>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => onMoveToCart(item._id)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-foreground text-background rounded-lg text-[10px] font-semibold hover:opacity-90 active:scale-[0.98] transition-all"
                >
                  <ShoppingCart className="w-3 h-3" />
                  {t("move_to_cart_button")}
                </button>
                <button
                  onClick={() => onMoveToWishlist(item._id)}
                  className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-danger hover:bg-danger-subtle transition-all"
                  title={t("wishlist_button")}
                >
                  <Heart className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onRemove(item._id)}
                  className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-danger hover:bg-danger-subtle transition-all"
                  title={t("remove")}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
