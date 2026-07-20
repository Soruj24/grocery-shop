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
import { Button } from "@/components/ui";
import ProductImageSection from "@/features/home/components/sections/ProductImageSection";
import ProductInfo from "@/features/home/components/sections/ProductInfo";
import QuantityControls from "@/features/home/components/sections/QuantityControls";

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
      className="group bg-card rounded-xl shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col h-full border border-border relative overflow-hidden"
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

      <div className="px-6 pb-6 -mt-3 relative z-10 bg-card">
        {!cartItem ? (
          <Button
            variant="primary"
            size="md"
            disabled={product.stock === 0}
            onClick={() => {
              addToCart(product, 1);
              Toast.fire({ icon: "success", title: t("added_to_cart") });
            }}
            leftIcon={<Plus size={20} strokeWidth={3} />}
            className="ml-auto rounded-md"
            aria-label={t("add_to_cart")}
          />
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
