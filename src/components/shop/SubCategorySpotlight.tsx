"use client";

import SubCategoryCard from "./SubCategorySpotlight/SubCategoryCard";
import { Category } from "@/types/category";
import { useLanguage } from "@/components/LanguageContext";

interface SubCategorySpotlightProps {
  categories: Category[];
}

export default function SubCategorySpotlight({
  categories,
}: SubCategorySpotlightProps) {
  const { t } = useLanguage();
  const subCategories = categories
    .flatMap((c: Category) => c.subCategories || [])
    .slice(0, 8);

  return (
    <section className="relative overflow-hidden py-8 px-6">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-green-500/5 to-transparent blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-20">
        <div className="text-center space-y-6">
          <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/70">{t('subcategory_spotlight_badge')}</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
            {t('subcategory_spotlight_title_1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">{t('subcategory_spotlight_title_2')}</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {subCategories.map((sub: Category, idx: number) => (
            <SubCategoryCard 
              key={sub._id}
              id={sub._id}
              name={sub.name}
              image={sub.image}
              count={sub.products?.length || 24}
              index={idx}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
