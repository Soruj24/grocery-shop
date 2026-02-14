"use client";

import { useAIRecommendations } from "@/components/AIRecommendationContext";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AIRecommendationsSection() {
  const { recommendations, isLoading } = useAIRecommendations();

  if (isLoading || recommendations.length === 0) return null;

  return (
    <section className="py-12 relative">
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-500/5 to-transparent pointer-events-none -z-10" />
      
      <div className="flex items-center gap-4 mb-8">
        <div className="p-2 bg-green-500 text-white rounded-xl shadow-lg shadow-green-500/20">
          <Sparkles className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white">আপনার জন্য বিশেষ কিছু</h2>
          <p className="text-sm text-gray-500 font-medium">আপনার পছন্দের উপর ভিত্তি করে আমাদের সাজেশন</p>
        </div>
        <div className="h-px flex-1 bg-gray-100 dark:bg-white/5 mx-8 hidden md:block" />
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        {recommendations.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
