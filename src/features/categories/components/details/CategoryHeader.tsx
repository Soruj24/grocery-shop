"use client";

import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Category as ICategory } from "@/types/category";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCategoryFallbackImage } from "@/constants/fallback-images";

interface CategoryHeaderProps {
  category: ICategory;
  totalCount: number;
}

export default function CategoryHeader({
  category,
  totalCount,
}: CategoryHeaderProps) {
  const { t } = useLanguage();
  return (
    <section className="relative h-[260px] md:h-[340px] rounded-xl overflow-hidden flex items-end">
      <div className="absolute inset-0">
        <Image
          src={
            category.image ||
            getCategoryFallbackImage(category.name)
          }
          alt={category.name}
          fill
          sizes="100vw"
          className="object-cover brightness-[0.35] group-hover:scale-105 transition-transform duration-1000"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      <div className="relative z-20 px-6 md:px-10 pb-8 md:pb-10 w-full space-y-4">
        <Link
          href="/categories"
          className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />{" "}
          {t("all_categories_back")}
        </Link>

        <div className="space-y-2">
          <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
            {category.name}
          </h1>
          <p className="text-white/50 max-w-lg font-medium text-sm leading-relaxed">
            {category.name}
            {t("category_header_desc_suffix")}
          </p>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <div className="px-3.5 py-1.5 bg-white/10 backdrop-blur-md rounded-lg text-white/80 text-[11px] font-semibold flex items-center gap-1.5">
            <ShoppingBag className="w-3.5 h-3.5" />
            {totalCount.toLocaleString("bn-BD")}{" "}
            {t("items")}
          </div>
          <div className="px-3.5 py-1.5 bg-white/5 backdrop-blur-md border border-white/10 rounded-lg text-white/50 text-[11px] font-semibold uppercase tracking-wider">
            {t("fresh_organic")}
          </div>
        </div>
      </div>
    </section>
  );
}
