"use client";

import { Plus } from "lucide-react";
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
import QuantityControls from "@/features/home/components/sections/QuantityControls";

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
        reduceMotion
          ? undefined
          : { y: -6 }
      }
      className="group bg-white dark:bg-[#09090b] rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full border border-black/[0.04] dark:border-white/[0.04] relative overflow-hidden"
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

      <div className="px-5 pb-5 -mt-2 relative z-10 bg-white dark:bg-[#09090b]">
        {!cartItem ? (
          <button
            disabled={product.stock === 0}
            onClick={() => {
              addToCart(product, 1);
              Toast.fire({
                icon: "success",
                title: t("added_to_cart"),
              });
            }}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-foreground text-background py-2.5 text-sm font-semibold transition-all duration-300 hover:bg-primary active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-foreground"
            aria-label={t("add_to_cart")}
          >
            <Plus size={16} strokeWidth={2.5} />
            {t("add_to_cart")}
          </button>
        ) : (
          <QuantityControls
            quantity={cartItem.quantity}
            stock={product.stock}
            onIncrement={() => {
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
            onDecrement={() => {
              if (cartItem.quantity > 1) {
                updateQuantity(
                  product._id,
                  cartItem.quantity - 1
                );
              }
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
