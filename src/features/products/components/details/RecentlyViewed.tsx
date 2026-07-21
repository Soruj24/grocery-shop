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
        <div className="bg-muted p-2 rounded-xl">
          <Clock className="w-5 h-5 text-muted-foreground" />
        </div>
        <h2 className="text-2xl font-black text-foreground">Recently Viewed</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentlyViewed.slice(0, 4).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
