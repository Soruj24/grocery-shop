"use client";

import { useAIRecommendations } from "@/components/AIRecommendationContext";
import { useCart } from "@/components/CartContext";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";
import { Lightbulb } from "lucide-react";

export default function SmartCartSuggestions() {
  const { cart } = useCart();
  const { getSmartSuggestions } = useAIRecommendations();
  
  const suggestions = getSmartSuggestions(cart);

  if (suggestions.length === 0) return null;

  return (
    <div className="mt-16 pt-12 border-t border-gray-100 dark:border-white/5">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-2 bg-amber-500 text-white rounded-xl shadow-lg shadow-amber-500/20">
          <Lightbulb className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl font-black text-gray-800 dark:text-white">ব্যাগ-এ যোগ করতে পারেন</h2>
          <p className="text-sm text-gray-500 font-medium">এই পণ্যগুলো আপনার ব্যাগের সাথে মানানসই হতে পারে</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {suggestions.map((product, index) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
