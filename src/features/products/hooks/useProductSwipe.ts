"use client";

import { useMotionValue, useTransform, PanInfo } from "framer-motion";
import { Product } from "@/types/product";

interface UseProductSwipeOptions {
  product: Product;
  onAddToCart: () => void;
  onToggleWishlist: () => void;
}

export function useProductSwipe({ onAddToCart, onToggleWishlist }: UseProductSwipeOptions) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-100, 0, 100], [-5, 0, 5]);
  const overlayOpacity = useTransform(x, [-100, 0, 100], [0.5, 0, 0.5]);
  const overlayColor = useTransform(
    x,
    [-100, 0, 100],
    ["#22c55e", "rgba(0,0,0,0)", "#f43f5e"]
  );

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 50) {
      onToggleWishlist();
    } else if (info.offset.x < -50) {
      onAddToCart();
    }
  };

  return { x, rotate, overlayOpacity, overlayColor, handleDragEnd };
}
