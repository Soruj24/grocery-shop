"use client";

import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import { LayoutGrid, ShoppingBag } from "lucide-react";
import { useParams } from "next/navigation";
import { Product } from "@/types/product";
import { useLanguage } from "@/components/LanguageContext";

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

  return (
    <main className="lg:w-3/4 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-xl shadow-gray-200/20 dark:shadow-none sticky top-24 z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-2xl flex items-center justify-center">
            <LayoutGrid className="w-6 h-6 text-green-600 dark:text-green-500" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400 dark:text-gray-500 mb-0.5">
              {t('results_label')}
            </p>
            <p className="text-xl font-black text-gray-800 dark:text-gray-100">
              {products.length.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}{t('items_count_suffix')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800/50 p-1.5 rounded-2xl border border-gray-100 dark:border-gray-800">
          <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest pl-3 hidden sm:block">
            {t('sorting_label')}
          </span>
          <select className="bg-white dark:bg-gray-800 border-none rounded-xl px-4 py-2.5 text-sm font-bold text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-green-500/20 cursor-pointer transition-all shadow-sm">
            <option>{t('sort_newest')}</option>
            <option>{t('sort_price_low')}</option>
            <option>{t('sort_price_high')}</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product: Product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-900 rounded-[40px] p-16 text-center border border-gray-100 dark:border-gray-800 shadow-sm">
          <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-[24px] flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-xl font-black text-gray-800 dark:text-gray-100 mb-2">
            {t('no_products_found')}
          </h3>
          <p className="text-gray-400 dark:text-gray-500 font-medium text-sm max-w-xs mx-auto">
            {t('category_empty_desc')}
          </p>
        </div>
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
