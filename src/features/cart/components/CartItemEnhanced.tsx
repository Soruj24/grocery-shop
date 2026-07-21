"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { Trash2, Heart, Bookmark, BookmarkCheck, Minus, Plus, RotateCcw, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import Image from "next/image";
import { getProductFallbackImage } from "@/constants/fallback-images";
import { Toast } from "@/utils/toast";
import { Badge } from "@/components/ui";

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
  const { updateQuantity: updateCartQuantity } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [localQuantity, setLocalQuantity] = useState(item.quantity);
  const debounceRef = useRef<NodeJS.Timeout>();
  const activeRef = useRef(item._id);

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
      Toast.fire({ icon: "success", title: "Added to wishlist" });
    } catch {
      Toast.fire({ icon: "error", title: t("wishlist_error") });
    }
  };

  const handleSaveForLater = () => {
    onSaveForLater(item._id);
    Toast.fire({ icon: "success", title: "Saved for later" });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group bg-card rounded-2xl shadow-sm border border-border p-4 sm:p-6 transition-all duration-300 hover:shadow-lg hover:border-primary/30"
    >
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
        <div className="relative w-full sm:w-24 aspect-square bg-muted rounded-xl overflow-hidden border border-border flex-shrink-0">
          <Image
            src={item.image || getProductFallbackImage(item.name)}
            alt={item.name}
            fill
            sizes="96px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {discountPercent > 0 && (
            <Badge tone="warning" size="xs" className="absolute top-2 left-2 shadow-sm">
              -{discountPercent}% {t("off")}
            </Badge>
          )}
          {item.variant && (
            <Badge tone="info" size="xs" className="absolute top-2 right-2 shadow-sm">
              {item.variant}
            </Badge>
          )}
        </div>

        <div className="flex-1 min-w-0 space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className="text-base sm:text-lg font-black text-foreground leading-tight line-clamp-2">
                {item.name}
              </h3>
              {item.variant && (
                <span className="mt-1 inline-flex items-center gap-1 text-xs font-bold text-muted-foreground">
                  <Sparkles className="w-3 h-3" />
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
                  className="flex items-center gap-1.5"
                >
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleSaveForLater}
                    disabled={isSaving}
                    className="p-2 rounded-xl bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary transition-all disabled:opacity-50"
                    title="Save for later"
                  >
                    <Bookmark className="w-5 h-5" />
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={handleMoveToWishlist}
                    disabled={isWishlisting}
                    className={`p-2 rounded-xl transition-all ${
                      isInWishlistState
                        ? "bg-rose-100 dark:bg-rose-900/30 text-rose-500"
                        : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                    }`}
                    title={isInWishlistState ? "In Wishlist" : "Add to Wishlist"}
                  >
                    {isInWishlistState ? (
                      <BookmarkCheck className="w-5 h-5 fill-current" />
                    ) : (
                      <Heart className="w-5 h-5" />
                    )}
                  </motion.button>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => onRemove(item._id)}
                    className="p-2 rounded-xl bg-muted text-muted-foreground hover:bg-danger/10 hover:text-danger transition-all"
                    title="Remove"
                  >
                    <Trash2 className="w-5 h-5" />
                  </motion.button>
                </motion.div>
            )}
          </AnimatePresence>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-2 border-t border-border/50">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-primary">
                  {t("currency_symbol")}{finalPrice.toLocaleString("bn-BD")}
                </span>
                {discountPercent > 0 && (
                  <span className="text-sm font-bold text-muted-foreground line-through">
                    {t("currency_symbol")}{item.price.toLocaleString("bn-BD")}
                  </span>
                )}
              </div>

              <div className="hidden sm:flex items-center gap-1 rounded-xl border border-border bg-card p-1">
                <button
                  onClick={handleDecrement}
                  disabled={localQuantity <= 1}
                  className="p-2 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label={t("decrease_quantity")}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-black tabular-nums">
                  {localQuantity}
                </span>
                <button
                  onClick={handleIncrement}
                  disabled={localQuantity >= maxQuantity}
                  className="p-2 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                  aria-label={t("increase_quantity")}
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  {t("subtotal")}
                </p>
                <p className="text-lg font-black text-foreground">
                  {t("currency_symbol")}
                  {(finalPrice * localQuantity).toLocaleString("bn-BD")}
                </p>
              </div>

              <div className="sm:hidden flex items-center gap-2">
                <button
                  onClick={handleDecrement}
                  disabled={localQuantity <= 1}
                  className="p-2 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary disabled:opacity-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-black">
                  {localQuantity}
                </span>
                <button
                  onClick={handleIncrement}
                  disabled={localQuantity >= maxQuantity}
                  className="p-2 rounded-lg text-foreground hover:bg-primary/10 hover:text-primary disabled:opacity-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <span className="text-lg font-black text-primary">
                  {t("currency_symbol")}
                  {(finalPrice * localQuantity).toLocaleString("bn-BD")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary/50 to-primary transition-opacity duration-300 ${
          showActions ? "opacity-100" : "opacity-0"
        }`}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      />
    </motion.div>
  );
}