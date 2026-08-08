"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Category } from "@/types/category";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCategoryFallbackImage } from "@/constants/fallback-images";
import { SectionShell, Reveal } from "./SectionShell";

export default function CategoryTiles({
  categories,
}: {
  categories: Category[];
}) {
  const { t } = useLanguage();
  const cats = (categories ?? []).slice(0, 8);
  if (cats.length === 0) return null;

  const layout = [
    "lg:col-span-2 lg:row-span-2",
    "",
    "",
    "lg:col-span-2",
    "",
    "lg:col-span-2",
    "",
    "",
  ];

  return (
    <SectionShell
      eyebrow={t("shop_by_category")}
      title={t("categories_title") ?? t("all_categories")}
      subtitle={t("shop_all_products")}
      viewAllHref="/categories"
      viewAllLabel={t("explore_all") ?? t("view_all")}
    >
      <div className="grid auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[180px] sm:gap-5 md:grid-cols-3 lg:grid-cols-4 lg:gap-6">
        {cats.map((cat, i) => (
          <Reveal
            key={cat._id}
            delay={Math.min(i * 0.05, 0.35)}
            className={layout[i] ?? ""}
          >
            <Link
              href={`/products?category=${cat._id}`}
              className="group relative flex h-full w-full items-end overflow-hidden rounded-2xl border border-black/[0.04] shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-500 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] dark:border-white/[0.04]"
            >
              <Image
                src={cat.image || getCategoryFallbackImage(cat.name)}
                alt={cat.name}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="relative z-10 flex w-full items-end justify-between p-5">
                <h3 className="text-lg font-bold leading-tight text-white drop-shadow-sm lg:text-xl">
                  {cat.name}
                </h3>
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm transition-all duration-300 group-hover:bg-primary group-hover:ring-0">
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
