"use client";

import { useEffect } from "react";
import { useRecentlyViewed } from "@/components/RecentlyViewedContext";
import { Product } from "@/types/product";

export default function RecentlyViewedTracker({ product }: { product: Product }) {
  const { addToRecentlyViewed } = useRecentlyViewed();

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product);
    }
  }, [product, addToRecentlyViewed]);

  return null;
}
