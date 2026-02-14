"use client";

import { useRecentlyViewed } from "@/components/RecentlyViewedContext";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

export default function RecentlyViewedSection() {
  const { recentlyViewed } = useRecentlyViewed();

  if (recentlyViewed.length === 0) return null;

  return (
    <section className="py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-black text-gray-800 dark:text-white">আপনার সম্প্রতি দেখা পণ্য</h2>
        <div className="h-px flex-1 bg-gray-100 dark:bg-white/5 mx-8 hidden md:block" />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {recentlyViewed.map((product, index) => (
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
