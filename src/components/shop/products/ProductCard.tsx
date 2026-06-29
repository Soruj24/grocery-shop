"use client";

import { Plus } from "lucide-react";
import { useCart } from "@/providers/CartContext";
import { useWishlist } from "@/providers/WishlistContext";
import { Toast } from "@/lib/utils/toast";
import { Product } from "@/types/product";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/providers/LanguageContext";
import { handleShare } from "@/lib/utils/product-utils";
import { useProductSwipe } from "@/hooks/useProductSwipe";
import ProductImageSection from "@/components/shop/ProductImageSection";
import ProductInfo from "@/components/shop/ProductInfo";
import QuantityControls from "@/components/shop/QuantityControls";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, updateQuantity, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const active = isInWishlist(product._id);
  const cartItem = cart?.find((item) => item._id === product._id);

  const swipe = useProductSwipe({
    product,
    onAddToCart: () => {
      addToCart(product, 1);
      Toast.fire({ icon: "success", title: t("added_to_cart") });
    },
    onToggleWishlist: () => {
      toggleWishlist(product);
      Toast.fire({
        icon: "success",
        title: active ? t("removed_from_wishlist") : t("added_to_wishlist"),
      });
    },
  });

  return (
    <motion.div
      style={{ x: swipe.x, rotate: swipe.rotate, cursor: "grab" }}
      whileTap={{ cursor: "grabbing" }}
      whileDrag={reduceMotion ? undefined : { scale: 1.05, zIndex: 50 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={reduceMotion ? 0.3 : 0.6}
      dragSnapToOrigin={true}
      onDragEnd={swipe.handleDragEnd}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      className="group bg-white dark:bg-gray-900 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 transition-all duration-500 flex flex-col h-full border border-gray-100 dark:border-gray-800 relative overflow-hidden"
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
            title: active ? t("removed_from_wishlist") : t("added_to_wishlist"),
          });
        }}
        onShare={(e) => handleShare(product.name, product._id, t)}
        t={t}
      />

      <ProductInfo product={product} t={t} />

      <div className="px-6 pb-6 -mt-3 relative z-10 bg-white dark:bg-gray-900">
        {!cartItem ? (
          <button
            disabled={product.stock === 0}
            onClick={() => {
              addToCart(product, 1);
              Toast.fire({ icon: "success", title: t("added_to_cart") });
            }}
            className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 text-white w-12 h-12 flex items-center justify-center rounded-2xl shadow-lg shadow-green-600/20 active:scale-90 transition-all hover:rotate-3 group/btn relative overflow-hidden ml-auto"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
            <Plus size={24} strokeWidth={3} />
          </button>
        ) : (
          <QuantityControls
            quantity={cartItem.quantity}
            stock={product.stock}
            onIncrement={() => {
              if (cartItem.quantity < product.stock) {
                updateQuantity(product._id, cartItem.quantity + 1);
              } else {
                Toast.fire({ icon: "error", title: t("out_of_stock_label") });
              }
            }}
            onDecrement={() => {
              if (cartItem.quantity > 1) {
                updateQuantity(product._id, cartItem.quantity - 1);
              }
            }}
          />
        )}
      </div>
    </motion.div>
  );
}
