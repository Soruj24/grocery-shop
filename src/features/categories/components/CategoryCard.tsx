"use client";

import Link from "next/link";
import { ArrowRight, ChevronRight, LayoutGrid } from "lucide-react";
import { Category } from "@/types/category";
import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCategoryFallbackImage } from "@/constants/fallback-images";

interface CategoryCardProps {
  cat: Category;
  index: number;
}

export default function CategoryCard({ cat, index }: CategoryCardProps) {
  const { t } = useLanguage();

  return (
    <Link href={`/category/${cat._id}`} className="block h-full">
      <motion.div
        className="group h-full bg-card rounded-2xl border border-border p-6 hover:border-border-strong hover:shadow-md transition-all duration-300 relative flex flex-col overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/[0.04] rounded-full blur-[80px] pointer-events-none" />

        {/* Header: Image & Count */}
        <div className="flex items-start justify-between mb-6 relative z-10">
          <div className="w-20 h-20 sm:w-24 sm:h-24 relative rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow bg-card">
            <Image
              src={cat.image || getCategoryFallbackImage(cat.name)}
              alt={cat.name}
              fill
              className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              sizes="(max-width: 768px) 100vw, 200px"
            />
          </div>

          <span className="bg-white/80 dark:bg-white/10 backdrop-blur-md text-foreground text-[10px] font-bold px-3 py-1.5 rounded-full border border-border uppercase tracking-wider shadow-sm">
            {(cat.subCategories?.length || 0).toLocaleString("bn-BD")}{" "}
            {t("items")}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col relative z-10">
          <h2 className="text-xl sm:text-2xl font-black text-foreground mb-3 leading-tight group-hover:text-primary transition-colors line-clamp-2">
            {cat.name}
          </h2>
          
          {/* Subcategories */}
          <div className="mt-auto flex flex-wrap gap-2 pt-4 opacity-80 group-hover:opacity-100 transition-opacity">
            {cat.subCategories?.slice(0, 3).map((sub: Category) => (
              <span
                key={sub._id}
                className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-muted text-muted-foreground border border-border group-hover:border-primary/20 group-hover:text-primary transition-colors uppercase tracking-wide"
              >
                {sub.name}
              </span>
            ))}
            {(cat.subCategories?.length || 0) > 3 && (
              <span className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-muted text-muted-foreground border border-border">
                +{((cat.subCategories?.length || 0) - 3).toLocaleString("bn-BD")}
              </span>
            )}
          </div>
        </div>

        {/* Action Area */}
        <div className="absolute bottom-6 right-6 flex items-center gap-2 opacity-0 transform translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-20">
            <span className="text-xs font-black text-primary uppercase tracking-widest">{t('shop_now')}</span>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-sm">
                <ArrowRight className="w-4 h-4" />
            </div>
        </div>
      </motion.div>
    </Link>
  );
}
