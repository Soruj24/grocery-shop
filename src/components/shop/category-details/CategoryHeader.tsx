"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Category as ICategory } from "@/types/category";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageContext";
import { getCategoryFallbackImage } from "@/lib/category-utils";

interface CategoryHeaderProps {
  category: ICategory;
  totalCount: number;
}

export default function CategoryHeader({ category, totalCount }: CategoryHeaderProps) {
  const { t, language } = useLanguage();
  return (
    <section className="relative h-[300px] md:h-[400px] rounded-[40px] md:rounded-[60px] overflow-hidden flex items-center group">
      <div className="absolute inset-0">
        <Image
          src={category.image || getCategoryFallbackImage(category.nameEn || category.name)}
          alt={language === 'en' ? (category.nameEn || category.name) : category.name}
          fill
          sizes="100vw"
          className="object-cover brightness-50 group-hover:scale-105 transition-transform duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
      </div>
      
      <div className="relative z-20 px-8 md:px-20 space-y-6 md:space-y-8 w-full">
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 backdrop-blur-xl border border-white/10 rounded-full text-white text-xs font-bold hover:bg-white/20 transition-all hover:-translate-x-1"
        >
          <ArrowLeft className="w-4 h-4" /> {t('all_categories_back')}
        </Link>
        
        <div className="space-y-4">
          <h1 className="text-4xl md:text-7xl font-black text-white tracking-tight leading-tight">
            {language === 'en' ? (category.nameEn || category.name) : category.name}
            <span className="text-green-500">.</span>
          </h1>
          <p className="text-gray-300 max-w-xl font-medium text-base md:text-lg leading-relaxed border-l-4 border-green-500 pl-6">
            {language === 'en' ? (category.nameEn || category.name) : category.name}{t('category_header_desc_suffix')}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4 pt-2">
          <div className="px-6 py-3 bg-green-600 backdrop-blur-md rounded-2xl text-white font-bold text-sm shadow-xl shadow-green-600/20 flex items-center gap-2">
            <ShoppingBag className="w-4 h-4" />
            {totalCount.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')} {t('items')}
          </div>
          
          {/* Decorative pill */}
          <div className="px-4 py-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl text-gray-300 text-xs font-bold uppercase tracking-wider">
            {t('fresh_organic')}
          </div>
        </div>
      </div>
    </section>
  );
}
