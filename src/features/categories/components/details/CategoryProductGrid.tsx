"use client";

import { useState } from "react";
import ProductCard from "@/features/products/components/ProductCard";
import Pagination from "@/components/ui/Pagination";
import { LayoutGrid, ShoppingBag, ChevronDown, Check } from "lucide-react";
import { useParams } from "next/navigation";
import { Product } from "@/types/product";
import { useLanguage } from "@/contexts/LanguageContext";
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
  const { t } = useLanguage();
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-card backdrop-blur-xl p-6 rounded-2xl border border-border shadow-xl sticky top-24 z-30">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary-subtle rounded-2xl flex items-center justify-center">
            <LayoutGrid className="w-6 h-6 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-0.5">
              {t('results_label')}
            </p>
            <p className="text-xl font-black text-foreground">
              {sortedProducts.length.toLocaleString('bn-BD')}{t('items_count_suffix')}
            </p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setIsSortOpen(!isSortOpen)}
            onBlur={() => setTimeout(() => setIsSortOpen(false), 200)}
            className="flex items-center gap-3 bg-card px-5 py-3 rounded-2xl border border-border shadow-sm hover:border-primary transition-colors group w-full sm:w-auto min-w-[200px] justify-between"
          >
            <span className="text-sm font-bold text-foreground">
              {sortOptions.find(o => o.id === sortBy)?.label}
            </span>
            <ChevronDown className={`w-4 h-4 text-muted-foreground group-hover:text-primary transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} />
          </button>

          <AnimatePresence>
            {isSortOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-full mt-2 w-full sm:w-64 bg-card rounded-2xl shadow-xl border border-border overflow-hidden z-50 p-2"
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
                        ? "bg-primary-subtle text-primary"
                        : "text-muted-foreground hover:bg-muted"
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
          className="bg-card rounded-2xl p-16 text-center border border-border shadow-sm"
        >
          <div className="w-24 h-24 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-6 relative">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-rose-50 dark:bg-rose-900/20 rounded-full flex items-center justify-center border-4 border-background">
               <span className="text-rose-500 font-black text-xl">!</span>
            </div>
          </div>
          <h3 className="text-2xl font-black text-foreground mb-3">
            {t('no_products_found')}
          </h3>
          <p className="text-muted-foreground font-medium text-base max-w-sm mx-auto leading-relaxed">
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
