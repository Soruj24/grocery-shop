"use client";

import { useRecentlyViewed } from "@/components/RecentlyViewedContext";
import ProductCard from "@/components/ProductCard";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { Clock, Trash2 } from "lucide-react";

export default function RecentlyViewedSection() {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();
  const { t } = useLanguage();

  if (recentlyViewed.length === 0) return null;

  return (
    <section className="py-12 relative overflow-hidden">
       {/* Header */}
      <div className="flex items-center justify-between mb-8 container mx-auto px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Clock className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-800 dark:text-white leading-tight">
              {t('recently_viewed')}
            </h2>
          </div>
        </div>
        
        <div className="h-px flex-1 bg-gray-100 dark:bg-white/5 mx-8 hidden md:block" />

        <button 
          onClick={clearRecentlyViewed}
          className="flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors px-4 py-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-900/20"
        >
          <Trash2 className="w-4 h-4" />
          <span>{t('clear_all')}</span> 
        </button>
      </div>
      
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
        <AnimatePresence mode="popLayout">
            {recentlyViewed.map((product, index) => (
            <motion.div
                key={product._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
            >
                <ProductCard product={product} />
            </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
