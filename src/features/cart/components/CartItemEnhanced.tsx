"use client";

import {
  Trash2,
  Heart,
  Bookmark,
  BookmarkCheck,
  Minus,
  Plus,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWishlist } from "@/contexts/WishlistContext";
import Image from "next/image";
import { getProductFallbackImage } from "@/constants/fallback-images";
import { toast } from "@/utils/swal";
import { useCallback, useRef, useEffect, useState } from "react";

interface CartItemEnhancedProps {
  item: {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
    stock?: number;
    variant?: string;
    discountPrice?: number;
    discount?: number;
  };
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  onSaveForLater: (id: string) => void;
  onMoveToWishlist: (id: string) => void;
  isSaving?: boolean;
  isWishlisting?: boolean;
}

export default function CartItemEnhanced({
  item,
  onRemove,
  onUpdateQuantity,
  onSaveForLater,
  onMoveToWishlist,
  isSaving = false,
  isWishlisting = false,
}: CartItemEnhancedProps) {
  const { t } = useLanguage();
  const { addToWishlist, isInWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(item.quantity);
  const debounceRef = useRef<NodeJS.Timeout>();

  const finalPrice = item.discountPrice ?? item.price;
  const discountPercent = item.discount
    ? item.discount
    : item.discountPrice
      ? Math.round(((item.price - item.discountPrice) / item.price) * 100)
      : 0;
  const isInWishlistState = isInWishlist(item._id);
  const maxQuantity = item.stock ?? 99;

  useEffect(() => {
    setLocalQuantity(item.quantity);
  }, [item.quantity]);

  const handleQuantityChange = useCallback(
    (newQty: number) => {
      const clamped = Math.max(1, Math.min(newQty, maxQuantity));
      setLocalQuantity(clamped);
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onUpdateQuantity(item._id, clamped);
      }, 300);
    },
    [item._id, maxQuantity, onUpdateQuantity]
  );

  const handleIncrement = () => {
    if (localQuantity < maxQuantity) handleQuantityChange(localQuantity + 1);
  };

  const handleDecrement = () => {
    if (localQuantity > 1) handleQuantityChange(localQuantity - 1);
  };

  const handleMoveToWishlist = async () => {
    try {
      addToWishlist({ ...item, _id: item._id } as any);
      onMoveToWishlist(item._id);
      toast.success(t("wishlist_add_success"));
    } catch {
      toast.error(t("wishlist_error"));
    }
  };

  const handleSaveForLater = () => {
    onSaveForLater(item._id);
    toast.success(t("save_for_later"));
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="bg-card rounded-xl border border-border overflow-hidden transition-all duration-300 shadow-xs hover:shadow-sm group"
    >
      <div className="p-4 sm:p-5">
        <div className="flex gap-4 sm:gap-5">
          {/* Product Image */}
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 bg-muted rounded-xl overflow-hidden border border-border shrink-0">
            <Image
              src={item.image || getProductFallbackImage(item.name)}
              alt={item.name}
              fill
              sizes="96px"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            {discountPercent > 0 && (
              <span className="absolute top-1.5 left-1.5 bg-foreground text-background text-[8px] font-bold px-1.5 py-0.5 rounded-md">
                -{discountPercent}%
              </span>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-foreground leading-snug line-clamp-2">
                  {item.name}
                </h3>
                {item.variant && (
                  <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground bg-muted px-2 py-0.5 rounded-md">
                    <Sparkles className="w-2.5 h-2.5" />
                    {item.variant}
                  </span>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={handleSaveForLater}
                  disabled={isSaving}
                  className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-foreground hover:bg-muted transition-all disabled:opacity-40"
                  title={t("save_for_later")}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleMoveToWishlist}
                  disabled={isWishlisting}
                  className={`p-1.5 rounded-lg transition-all ${
                    isInWishlistState
                      ? "text-danger"
                      : "text-muted-foreground/40 hover:text-danger hover:bg-danger-subtle"
                  }`}
                  title={isInWishlistState ? t("in_wishlist") : t("add_to_wishlist")}
                >
                  {isInWishlistState ? (
                    <BookmarkCheck className="w-3.5 h-3.5 fill-current" />
                  ) : (
                    <Heart className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  onClick={() => onRemove(item._id)}
                  className="p-1.5 rounded-lg text-muted-foreground/40 hover:text-danger hover:bg-danger-subtle transition-all"
                  title={t("remove")}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Price + Quantity Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pt-1">
              <div className="flex items-center gap-3">
                <span className="text-base font-bold text-foreground">
                  {t("currency_symbol")}
                  {finalPrice.toLocaleString("bn-BD")}
                </span>
                {discountPercent > 0 && (
                  <span className="text-[10px] font-medium text-muted-foreground/40 line-through">
                    {t("currency_symbol")}
                    {item.price.toLocaleString("bn-BD")}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4">
                {/* Quantity Controls */}
                <div className="flex items-center bg-muted rounded-lg p-0.5">
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleDecrement}
                    disabled={localQuantity <= 1}
                    className="w-8 h-8 flex items-center justify-center rounded-md text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label={t("decrease_quantity")}
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </motion.button>
                  <span className="w-10 text-center text-sm font-bold tabular-nums select-none">
                    {localQuantity}
                  </span>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleIncrement}
                    disabled={localQuantity >= maxQuantity}
                    className="w-8 h-8 flex items-center justify-center rounded-md text-foreground hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    aria-label={t("increase_quantity")}
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </motion.button>
                </div>

                {/* Line Total */}
                <div className="text-right">
                  <p className="text-[9px] font-semibold text-muted-foreground/40 uppercase tracking-wider">
                    {t("subtotal")}
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {t("currency_symbol")}
                    {(finalPrice * localQuantity).toLocaleString("bn-BD")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Action Bar */}
      <div className="sm:hidden border-t border-border px-4 py-3 flex items-center gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSaveForLater}
          className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground hover:text-foreground px-3 py-2 rounded-lg hover:bg-muted transition-all min-h-[36px]"
        >
          <Bookmark className="w-3.5 h-3.5" />
          {t("save_for_later")}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleMoveToWishlist}
          className="flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground hover:text-danger px-3 py-2 rounded-lg hover:bg-danger-subtle transition-all min-h-[36px]"
        >
          <Heart className="w-3.5 h-3.5" />
          {t("wishlist_button")}
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => onRemove(item._id)}
          className="flex items-center gap-1.5 text-[11px] font-medium text-danger/70 hover:text-danger px-3 py-2 rounded-lg hover:bg-danger-subtle transition-all ml-auto min-h-[36px]"
        >
          <Trash2 className="w-3.5 h-3.5" />
          {t("remove")}
        </motion.button>
      </div>
    </motion.div>
  );
}
