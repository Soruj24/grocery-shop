"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Star, Sparkles, ArrowRight, Loader2 } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";
import { useLanguage } from "@/components/LanguageContext";
import ProductCard from "@/components/ProductCard";

export default function FeaturedProducts({ products }: { products: Product[] }) {
  const [activeTab, setActiveTab] = useState("trending");
  const { t } = useLanguage();

  const TABS = [
    { id: "trending", label: t('featured_products_tab_trending'), icon: TrendingUp, color: "from-blue-500 to-cyan-500" },
    { id: "bestsellers", label: t('featured_products_tab_bestsellers'), icon: Star, color: "from-amber-400 to-orange-600" },
    { id: "new", label: t('featured_products_tab_new'), icon: Sparkles, color: "from-purple-500 to-pink-600" }
  ];

  const { data: displayProducts, isLoading } = useQuery({
    queryKey: ['featured-products', activeTab],
    queryFn: async () => {
      let sort = 'newest';
      if (activeTab === 'trending') sort = 'rating';
      if (activeTab === 'bestsellers') sort = 'reviews';
      
      const res = await fetch(`/api/products/list?sort=${sort}&limit=8`);
      if (!res.ok) throw new Error('Failed to fetch');
      return res.json();
    },
    // Use initial products for 'new' tab to avoid fetch if possible, 
    // but since we want to switch tabs dynamically, simple fetch is cleaner.
    // We can use placeholderData to keep previous list while loading new one
  });

  const getViewAllLink = () => {
    switch (activeTab) {
      case 'trending':
        return '/products?sort=rating';
      case 'bestsellers':
        return '/products?sort=reviews'; // Assuming we have this sort option or similar
      case 'new':
      default:
        return '/products?sort=newest';
    }
  };

  return (
    <section className="relative py-20 lg:py-28 px-4 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-40 -left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-40 -right-20 w-96 h-96 bg-purple-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col items-center space-y-8">
          <div className="text-center space-y-4 max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 dark:text-white tracking-tight"
            >
              {t('featured_products_title_1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">{t('featured_products_title_2')}</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed"
            >
              {t('featured_products_desc')}
            </motion.p>
          </div>

          <div className="flex flex-wrap justify-center gap-2 p-2 bg-gray-100 dark:bg-white/5 rounded-[2rem] border border-gray-200 dark:border-white/10">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-2 px-6 py-3 rounded-[1.5rem] font-bold text-sm transition-all duration-300 ${
                  activeTab === tab.id 
                    ? "text-white shadow-lg" 
                    : "text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-200/50 dark:hover:bg-white/5"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-[1.5rem]`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon className={`w-4 h-4 relative z-10 ${activeTab === tab.id ? "animate-pulse" : ""}`} />
                <span className="relative z-10 uppercase tracking-wide">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {isLoading ? (
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full">
               {[...Array(8)].map((_, i) => (
                 <div key={i} className="bg-gray-100 dark:bg-gray-800 rounded-[2rem] aspect-[3/4] animate-pulse" />
               ))}
             </div>
          ) : (
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 w-full"
            >
              {displayProducts?.map((product: Product) => (
                <ProductCard key={`${activeTab}-${product._id}`} product={product} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex justify-center pt-8">
          <Link
            href={getViewAllLink()}
            className="group flex items-center gap-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 px-8 py-4 rounded-full font-black text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all shadow-sm hover:shadow-xl hover:-translate-y-1"
          >
            {t('see_all')}
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4" />
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
