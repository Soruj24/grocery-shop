"use client";

import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import ProductCard from "../ProductCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { Clock } from "lucide-react";

export default function RecentlyViewed() {
  const { recentlyViewed } = useRecentlyViewed();
  const { t } = useLanguage();

  if (recentlyViewed.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-black/[0.04] dark:bg-white/[0.06]">
          <Clock className="w-4 h-4 text-muted-foreground/60" />
        </div>
        <h2 className="text-xl font-bold text-foreground tracking-tight">
          Recently Viewed
        </h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {recentlyViewed.slice(0, 4).map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}
