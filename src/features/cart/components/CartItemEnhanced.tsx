"use client";

import {
  Trash2,
  Heart,
  Bookmark,
  BookmarkCheck,
  Minus,
  Plus,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWishlist } from "@/contexts/WishlistContext";
import Image from "next/image";
import { getProductFallbackImage } from "@/constants/fallback-images";
import { Toast } from "@/utils/toast";
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
  onUpdateQuantity: (
    id: string,
    quantity: number
  ) => void;
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
  const { addToWishlist, isInWishlist } =
    useWishlist();
  const [showActions, setShowActions] =
    useState(false);
  const [localQuantity, setLocalQuantity] = useState(
    item.quantity
  );
  const debounceRef = useRef<NodeJS.Timeout>();

  const finalPrice =
    item.discountPrice ?? item.price;
  const discountPercent = item.discount
    ? item.discount
    : item.discountPrice
    ? Math.round(
        ((item.price - item.discountPrice) /
          item.price) *
          100
      )
    : 0;
  const isInWishlistState = isInWishlist(item._id);
  const maxQuantity = item.stock ?? 99;

  useEffect(() => {
    setLocalQuantity(item.quantity);
  }, [item.quantity]);

  const handleQuantityChange = useCallback(
    (newQty: number) => {
      const clamped = Math.max(
        1,
        Math.min(newQty, maxQuantity)
      );
      setLocalQuantity(clamped);

      if (debounceRef.current)
        clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        onUpdateQuantity(item._id, clamped);
      }, 300);
    },
    [item._id, maxQuantity, onUpdateQuantity]
  );

  const handleIncrement = () => {
    if (localQuantity < maxQuantity)
      handleQuantityChange(localQuantity + 1);
  };

  const handleDecrement = () => {
    if (localQuantity > 1)
      handleQuantityChange(localQuantity - 1);
  };

  const handleMoveToWishlist = async () => {
    try {
      addToWishlist({
        ...item,
        _id: item._id,
      } as any);
      onMoveToWishlist(item._id);
      Toast.fire({
        icon: "success",
        title: "Added to wishlist",
      });
    } catch {
      Toast.fire({
        icon: "error",
        title: t("wishlist_error"),
      });
    }
  };

  const handleSaveForLater = () => {
    onSaveForLater(item._id);
    Toast.fire({
      icon: "success",
      title: "Saved for later",
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-[#09090b] rounded-xl border border-black/[0.04] dark:border-white/[0.04] p-4 sm:p-5 transition-all duration-300 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)]"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
        <div className="relative w-full sm:w-20 aspect-square bg-black/[0.02] dark:bg-white/[0.02] rounded-lg overflow-hidden border border-black/[0.04] dark:border-white/[0.04] shrink-0">
          <Image
            src={
              item.image ||
              getProductFallbackImage(item.name)
            }
            alt={item.name}
            fill
            sizes="80px"
            className="object-cover"
          />
          {discountPercent > 0 && (
            <span className="absolute top-1.5 left-1.5 bg-foreground text-background text-[9px] font-bold px-1.5 py-0.5 rounded">
              -{discountPercent}%
            </span>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-semibold text-foreground leading-tight line-clamp-2">
                {item.name}
              </h3>
              {item.variant && (
                <span className="mt-1 inline-flex items-center gap-1 text-[10px] font-medium text-muted-foreground/60">
                  {item.variant}
                </span>
              )}
            </div>

            <AnimatePresence>
              {showActions && (
                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  className="flex items-center gap-1"
                >
                  <button
                    onClick={handleSaveForLater}
                    disabled={isSaving}
                    className="p-1.5 rounded-lg text-muted-foreground/50 hover:text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all disabled:opacity-40"
                    title="Save for later"
                  >
                    <Bookmark className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleMoveToWishlist}
                    disabled={isWishlisting}
                    className={`p-1.5 rounded-lg transition-all ${
                      isInWishlistState
                        ? "text-rose-500"
                        : "text-muted-foreground/50 hover:text-rose-500 hover:bg-rose-500/[0.06]"
                    }`}
                    title={
                      isInWishlistState
                        ? "In Wishlist"
                        : "Add to Wishlist"
                    }
                  >
                    {isInWishlistState ? (
                      <BookmarkCheck className="w-4 h-4 fill-current" />
                    ) : (
                      <Heart className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() =>
                      onRemove(item._id)
                    }
                    className="p-1.5 rounded-lg text-muted-foreground/50 hover:text-rose-500 hover:bg-rose-500/[0.06] transition-all"
                    title="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-black/[0.04] dark:border-white/[0.04]">
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

              <div className="hidden sm:flex items-center bg-black/[0.04] dark:bg-white/[0.06] p-0.5 rounded-lg">
                <button
                  onClick={handleDecrement}
                  disabled={localQuantity <= 1}
                  className="w-8 h-8 flex items-center justify-center rounded-md text-foreground hover:bg-black/[0.06] dark:hover:bg-white/[0.1] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label={t("decrease_quantity")}
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold tabular-nums">
                  {localQuantity}
                </span>
                <button
                  onClick={handleIncrement}
                  disabled={
                    localQuantity >= maxQuantity
                  }
                  className="w-8 h-8 flex items-center justify-center rounded-md text-foreground hover:bg-black/[0.06] dark:hover:bg-white/[0.1] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  aria-label={t("increase_quantity")}
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-[9px] font-semibold text-muted-foreground/50 uppercase tracking-wider">
                  {t("subtotal")}
                </p>
                <p className="text-base font-bold text-foreground">
                  {t("currency_symbol")}
                  {(
                    finalPrice * localQuantity
                  ).toLocaleString("bn-BD")}
                </p>
              </div>

              <div className="sm:hidden flex items-center gap-2">
                <button
                  onClick={handleDecrement}
                  disabled={localQuantity <= 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-black/[0.04] dark:bg-white/[0.06] text-foreground disabled:opacity-40"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold">
                  {localQuantity}
                </span>
                <button
                  onClick={handleIncrement}
                  disabled={
                    localQuantity >= maxQuantity
                  }
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-black/[0.04] dark:bg-white/[0.06] text-foreground disabled:opacity-40"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
                <span className="text-base font-bold text-foreground ml-2">
                  {t("currency_symbol")}
                  {(
                    finalPrice * localQuantity
                  ).toLocaleString("bn-BD")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`h-0.5 bg-foreground transition-opacity duration-300 ${
          showActions
            ? "opacity-100"
            : "opacity-0"
        } mt-4 rounded-full`}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      />
    </motion.div>
  );
}
