"use client";

import { useCart } from "@/providers/CartContext";
import { Toast } from "@/lib/utils/toast";
import { useLanguage } from "@/providers/LanguageContext";
import { getProductFallbackImage } from "@/lib/utils/category-utils";
import type { OrderItem } from "@/types/order";

export function useReorder() {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const reorder = (items: OrderItem[]) => {
    items.forEach((item: OrderItem) => {
      addToCart(
        {
          _id: item.product,
          name: item.name,
          price: item.price,
          image: item.image || getProductFallbackImage(item.name),
        },
        item.quantity,
      );
    });
    Toast.fire({
      icon: "success",
      title: t("items_added_to_cart"),
      background: "#020617",
      color: "#fff",
    });
  };

  return { reorder };
}
