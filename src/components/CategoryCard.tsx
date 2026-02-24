"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, LayoutGrid } from "lucide-react";
import { Category } from "@/types/category";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { getCategoryFallbackImage } from "@/lib/category-utils";

interface CategoryCardProps {
  cat: Category;
  index: number;
}

export default function CategoryCard({ cat, index }: CategoryCardProps) {
  const { t } = useLanguage();

  return (
    <Link href={`/category/${cat._id}`} className="block h-full">
      <motion.div
        whileHover={{ y: -8 }}
        className="group h-full bg-white dark:bg-[#0B1120] backdrop-blur-xl rounded-[32px] border border-gray-100 dark:border-gray-800 p-6 hover:border-green-500/30 hover:shadow-2xl hover:shadow-green-900/10 transition-all duration-300 relative flex flex-col overflow-hidden"
      >
        {/* Decorative Gradients - Animated on Hover */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full blur-[80px] -z-10 transition-all duration-700 group-hover:bg-green-500/10 group-hover:scale-110" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/5 rounded-full blur-[60px] -z-10 transition-all duration-700 group-hover:bg-blue-500/10 group-hover:scale-110" />

        {/* Header: Image & Count */}
        <div className="flex items-start justify-between mb-6 relative z-10">
          <div className="w-20 h-20 sm:w-24 sm:h-24 relative rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow bg-white dark:bg-white/5">
            <Image
              src={cat.image || getCategoryFallbackImage(cat.name)}
              alt={cat.name}
              fill
              className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 200px"
            />
          </div>

          <span className="bg-white/80 dark:bg-white/10 backdrop-blur-md text-gray-600 dark:text-gray-300 text-[10px] font-bold px-3 py-1.5 rounded-full border border-gray-100 dark:border-white/10 uppercase tracking-wider shadow-sm">
            {(cat.subCategories?.length || 0).toLocaleString("bn-BD")}{" "}
            {t("items")}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col relative z-10">
          <h2 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white mb-3 leading-tight group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors line-clamp-2">
            {cat.name}
          </h2>
          
          {/* Subcategories */}
          <div className="mt-auto flex flex-wrap gap-2 pt-4 opacity-80 group-hover:opacity-100 transition-opacity">
            {cat.subCategories?.slice(0, 3).map((sub: Category) => (
              <span
                key={sub._id}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 border border-gray-100 dark:border-white/5 group-hover:border-green-500/20 group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors uppercase tracking-wide"
              >
                {sub.name}
              </span>
            ))}
            {(cat.subCategories?.length || 0) > 3 && (
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-gray-50 dark:bg-white/5 text-gray-400 dark:text-gray-500 border border-gray-100 dark:border-white/5">
                +{((cat.subCategories?.length || 0) - 3).toLocaleString("bn-BD")}
              </span>
            )}
          </div>
        </div>

        {/* Action Area */}
        <div className="absolute bottom-6 right-6 flex items-center gap-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
            <span className="text-xs font-black text-green-600 dark:text-green-400 uppercase tracking-widest">{t('shop_now')}</span>
            <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white shadow-lg shadow-green-500/30">
                <ArrowRight className="w-4 h-4" />
            </div>
        </div>
      </motion.div>
    </Link>
  );
}
