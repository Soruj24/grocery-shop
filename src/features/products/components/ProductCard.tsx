"use client";

import { Plus, Minus } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { Toast } from "@/utils/toast";
import { Product } from "@/types/product";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { handleShare } from "@/utils/product-utils";
import { useProductSwipe } from "@/features/products/hooks/useProductSwipe";
import ProductImageSection from "@/features/home/components/sections/ProductImageSection";
import ProductInfo from "@/features/home/components/sections/ProductInfo";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({
  product,
}: ProductCardProps) {
  const { addToCart, updateQuantity, cart } =
    useCart();
  const { toggleWishlist, isInWishlist } =
    useWishlist();
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const active = isInWishlist(product._id);
  const cartItem = cart?.find(
    (item) => item._id === product._id
  );

  const swipe = useProductSwipe({
    product,
    onAddToCart: () => {
      addToCart(product, 1);
      Toast.fire({
        icon: "success",
        title: t("added_to_cart"),
      });
    },
    onToggleWishlist: () => {
      toggleWishlist(product);
      Toast.fire({
        icon: "success",
        title: active
          ? t("removed_from_wishlist")
          : t("added_to_wishlist"),
      });
    },
  });

  return (
    <motion.div
      style={{
        x: swipe.x,
        rotate: swipe.rotate,
        cursor: "grab",
      }}
      whileTap={{ cursor: "grabbing" }}
      whileDrag={
        reduceMotion
          ? undefined
          : { scale: 1.05, zIndex: 50 }
      }
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={reduceMotion ? 0.3 : 0.6}
      dragSnapToOrigin={true}
      onDragEnd={swipe.handleDragEnd}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={
        reduceMotion ? undefined : { y: -6 }
      }
      className="group bg-card rounded-2xl shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col h-full border border-border relative overflow-hidden"
    >
      <ProductImageSection
        product={product}
        isWishlistActive={active}
        overlayColor={swipe.overlayColor}
        overlayOpacity={swipe.overlayOpacity}
        onToggleWishlist={() => {
          toggleWishlist(product);
          Toast.fire({
            icon: "success",
            title: active
              ? t("removed_from_wishlist")
              : t("added_to_wishlist"),
          });
        }}
        onShare={(_e: React.MouseEvent) =>
          handleShare(
            product.name,
            product._id,
            t
          )
        }
        t={t}
      />

      <ProductInfo product={product} t={t} />

      <div className="px-4 sm:px-5 pb-4 sm:pb-5 -mt-2 relative z-10 bg-card">
        {!cartItem ? (
          <motion.button
            whileTap={{ scale: 0.97 }}
            disabled={product.stock === 0}
            onClick={() => {
              addToCart(product, 1);
              Toast.fire({
                icon: "success",
                title: t("added_to_cart"),
              });
            }}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-primary text-primary-foreground py-3 sm:py-2.5 text-sm font-semibold transition-all duration-300 hover:bg-primary-hover active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-primary min-h-[44px] shadow-primary"
            aria-label={t("add_to_cart")}
          >
            <Plus size={16} strokeWidth={2.5} />
            {t("add_to_cart")}
          </motion.button>
        ) : (
          <div className="flex items-center bg-muted rounded-xl p-1 gap-0.5">
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (cartItem.quantity > 1) {
                  updateQuantity(
                    product._id,
                    cartItem.quantity - 1
                  );
                }
              }}
              disabled={cartItem.quantity <= 1}
              className="w-10 h-10 flex items-center justify-center bg-card hover:bg-danger-subtle hover:text-danger rounded-lg transition-all duration-200 text-foreground shadow-xs disabled:opacity-30 disabled:cursor-not-allowed active:scale-95"
              aria-label={t("decrease_quantity")}
            >
              <Minus size={14} strokeWidth={2.5} />
            </motion.button>
            <motion.span
              key={cartItem.quantity}
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="w-10 text-center text-sm font-bold text-foreground select-none tabular-nums"
            >
              {cartItem.quantity}
            </motion.span>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                if (
                  cartItem.quantity < product.stock
                ) {
                  updateQuantity(
                    product._id,
                    cartItem.quantity + 1
                  );
                } else {
                  Toast.fire({
                    icon: "error",
                    title: t("out_of_stock_label"),
                  });
                }
              }}
              disabled={
                cartItem.quantity >= product.stock
              }
              className="w-10 h-10 flex items-center justify-center bg-primary hover:bg-primary-hover text-primary-background rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-primary shadow-xs active:scale-95"
              aria-label={t("increase_quantity")}
            >
              <Plus size={14} strokeWidth={2.5} />
            </motion.button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
