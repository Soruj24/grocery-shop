"use client";
import { LayoutGrid } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageContext";
import { getCategoryFallbackImage } from "@/lib/category-utils";

export default function CategoryHero() {
  const { t } = useLanguage();

  return (
    <section className="relative h-[400px] rounded-[60px] overflow-hidden flex items-center justify-center text-center">
      <div className="absolute inset-0">
        <Image
          src={getCategoryFallbackImage("vegetable")}
          alt="Grocery Categories"
          fill
          priority
          sizes="100vw"
          className="object-cover scale-110 blur-sm brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
      </div>

      <div className="relative z-20 space-y-8 px-6">
        <div className="w-24 h-24 bg-white/10 backdrop-blur-2xl rounded-[32px] border border-white/20 flex items-center justify-center mx-auto animate-float shadow-2xl">
          <LayoutGrid className="w-10 h-10 text-white" />
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            {t('all_categories_hero_prefix')} <span className="text-green-400">{t('all_categories_hero_highlight')}</span>
          </h1>
          <p className="text-white/80 max-w-xl mx-auto font-bold text-lg md:text-xl leading-relaxed">
            {t('category_hero_desc')}
          </p>
        </div>
      </div>
    </section>
  );
}
