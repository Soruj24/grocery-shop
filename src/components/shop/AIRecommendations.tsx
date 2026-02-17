"use client";

import { useRecentlyViewed } from "@/components/RecentlyViewedContext";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

export default function AIRecommendations() {
  const { recentlyViewed } = useRecentlyViewed();
  const { t } = useLanguage();

  const viewedCategoryIds = Array.from(
    new Set(recentlyViewed.map((p) => p.category?._id).filter(Boolean))
  );

  const { data: recommendations, isLoading } = useQuery({
    queryKey: ["recommendations", viewedCategoryIds],
    queryFn: async () => {
      if (viewedCategoryIds.length === 0) {
        // Fallback to top rated or featured if no history
        const res = await fetch("/api/products/recommendations?fallback=true");
        return res.json();
      }
      const res = await fetch("/api/products/recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryIds: viewedCategoryIds }),
      });
      return res.json();
    },
    enabled: true,
  });

  if (isLoading || !recommendations || recommendations.length === 0) return null;

  return (
    <section className="py-8 relative overflow-hidden">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-800 dark:text-white leading-tight">
              {t('special_recommendations')}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400 font-bold">
              {t('recommendations_desc')}
            </p>
          </div>
        </div>
        <div className="h-px flex-1 bg-gray-100 dark:bg-white/5 mx-8 hidden md:block" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {recommendations.map((product: any, index: number) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
