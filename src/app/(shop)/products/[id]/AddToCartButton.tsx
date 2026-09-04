"use client";

import { useState } from "react";
import {
  ShoppingCart,
  Minus,
  Plus,
} from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/product";
import { Toast } from "@/utils/toast";
import { useLanguage } from "@/contexts/LanguageContext";

export default function AddToCartButton({
  product,
}: {
  product: Product;
}) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cart } = useCart();
  const { t } = useLanguage();

  const cartItem = cart.find(
    (item) => item._id === product._id
  );
  const currentCartQuantity = cartItem
    ? cartItem.quantity
    : 0;

  const maxAddable = Math.max(
    0,
    product.stock - currentCartQuantity
  );
  const isOutOfStock = product.stock <= 0;
  const isMaxReached =
    currentCartQuantity >= product.stock;

  if (
    maxAddable === 0 &&
    quantity !== 0
  ) {
    setQuantity(0);
  } else if (
    quantity > maxAddable &&
    maxAddable > 0
  ) {
    setQuantity(maxAddable);
  } else if (
    maxAddable > 0 &&
    quantity === 0
  ) {
    setQuantity(1);
  }

  const handleAddToCart = () => {
    if (quantity <= 0) return;

    if (
      currentCartQuantity + quantity >
      product.stock
    ) {
      Toast.fire({
        icon: "error",
        title: t("out_of_stock_label"),
      });
      return;
    }

    addToCart(product, quantity);
    Toast.fire({
      icon: "success",
      title: t("added_to_cart"),
    });
  };

  const increment = () => {
    if (quantity < maxAddable) {
      setQuantity((q) => q + 1);
    } else {
      Toast.fire({
        icon: "warning",
        title: t("low_stock"),
      });
    }
  };

  const decrement = () => {
    if (quantity > 1) {
      setQuantity((q) => q - 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div
        className={`flex items-center bg-muted p-1 rounded-lg ${
          isOutOfStock || isMaxReached
            ? "opacity-40 pointer-events-none"
            : ""
        }`}
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={decrement}
          disabled={quantity <= 1}
          className="w-10 h-10 flex items-center justify-center rounded-md text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Minus className="w-4 h-4" />
        </motion.button>
        <span className="w-12 text-center font-bold text-foreground text-base tabular-nums">
          {quantity}
        </span>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={increment}
          disabled={quantity >= maxAddable}
          className="w-10 h-10 flex items-center justify-center rounded-md text-foreground hover:bg-muted transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>

      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleAddToCart}
        disabled={isOutOfStock || isMaxReached}
        className={`flex-1 w-full sm:w-auto px-8 py-3.5 rounded-lg text-sm font-semibold uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all ${
          isOutOfStock
            ? "bg-muted text-muted-foreground/50 cursor-not-allowed"
            : isMaxReached
            ? "bg-warning text-warning-foreground hover:opacity-90"
            : "bg-foreground text-background hover:opacity-90 active:scale-[0.98]"
        }`}
      >
        <ShoppingCart className="w-4 h-4" />
        {isOutOfStock
          ? t("out_of_stock_label")
          : isMaxReached
          ? t("stock_available")
          : t("add_to_cart")}
      </motion.button>
    </div>
  );
}
