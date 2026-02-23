"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { LayoutGrid, ShoppingBag, ChevronDown, Check } from "lucide-react";
import { useParams } from "next/navigation";
import { Product } from "@/types/product";
import { useLanguage } from "@/components/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryProductGridProps {
  products: Product[];
  totalPages: number;
  currentPage: number;
}

export default function CategoryProductGrid({
  products,
  totalPages,
  currentPage,
}: CategoryProductGridProps) {
  const { t, language } = useLanguage();
  const params = useParams();
  const id = params.id as string;
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("newest");

  const sortOptions = [
    { id: "newest", label: t('sort_newest') },
    { id: "price_low", label: t('sort_price_low') },
    { id: "price_high", label: t('sort_price_high') },
  ];

  const sortedProducts = [...products].sort((a, b) => {
    switch (sortBy) {
      case "price_low":
        return (a.discountPrice || a.price) - (b.discountPrice || b.price);
      case "price_high":
        return (b.discountPrice || b.price) - (a.discountPrice || a.price);
      case "newest":
      default:
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
    }
  });

  return (
    <main className="lg:w-3/4 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/20 dark:shadow-none sticky top-24 z-30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center">
            <LayoutGrid className="w-6 h-6 text-green-600 dark:text-green-500" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-0.5">
              {t('results_label')}
            </p>
            <p className="text-xl font-black text-gray-800 dark:text-gray-100">
              {sortedProducts.length.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}{t('items_count_suffix')}
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            onBlur={() => setTimeout(() => setIsSortOpen(false), 200)}
            className="flex items-center gap-3 bg-white dark:bg-gray-800 px-5 py-3 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-sm hover:border-green-500 dark:hover:border-green-500 transition-colors group w-full sm:w-auto min-w-[200px] justify-between"
          >
            <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
              {sortOptions.find(o => o.id === sortBy)?.label}
            </span>
            <ChevronDown className={`w-4 h-4 text-gray-400 group-hover:text-green-500 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {isSortOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-full sm:w-64 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden z-50 p-2"
              >
                {sortOptions.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => {
                      setSortBy(option.id);
                      setIsSortOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      sortBy === option.id
                        ? "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                    }`}
                  >
                    {option.label}
                    {sortBy === option.id && <Check className="w-4 h-4" />}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {sortedProducts.map((product: Product, index: number) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white dark:bg-gray-900 rounded-[40px] p-16 text-center border border-gray-100 dark:border-gray-800 shadow-sm"
        >
          <div className="w-24 h-24 bg-gray-50 dark:bg-gray-800 rounded-[32px] flex items-center justify-center mx-auto mb-6 relative">
            <ShoppingBag className="w-10 h-10 text-gray-300" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-rose-50 dark:bg-rose-900/20 rounded-full flex items-center justify-center border-4 border-white dark:border-gray-900">
               <span className="text-rose-500 font-black text-xl">!</span>
            </div>
          </div>
          <h3 className="text-2xl font-black text-gray-800 dark:text-gray-100 mb-3">
            {t('no_products_found')}
          </h3>
          <p className="text-gray-400 dark:text-gray-500 font-medium text-base max-w-sm mx-auto leading-relaxed">
            {t('category_empty_desc')}
          </p>
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pt-8 flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            basePath={`/category/${id}`}
            totalCount={products.length} 
            itemsPerPage={12}
          />
        </div>
      )}
    </main>
  );
}
