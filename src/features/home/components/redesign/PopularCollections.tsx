"use client";

import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import { Category } from "@/types/category";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCategoryFallbackImage } from "@/constants/fallback-images";
import { SectionShell, Reveal } from "./SectionShell";

export default function PopularCollections({
  categories,
}: {
  categories: Category[];
}) {
  const { t } = useLanguage();
  const top = (categories ?? []).slice(0, 6);

  const layouts = [
    "lg:col-span-2 lg:row-span-2",
    "",
    "",
    "",
    "lg:col-span-2",
    "",
  ];

  const gradients = [
    "from-emerald-500/85 to-green-700/85",
    "from-orange-500/85 to-amber-600/85",
    "from-sky-500/85 to-blue-700/85",
    "from-purple-500/85 to-fuchsia-700/85",
    "from-rose-500/85 to-pink-700/85",
    "from-teal-500/85 to-cyan-700/85",
  ];

  if (top.length === 0) return null;

  return (
    <SectionShell
      eyebrow={t("popular_collections")}
      eyebrowTone="accent"
      title={t("popular_collections")}
      subtitle={t("popular_collections_desc")}
      viewAllHref="/categories"
      viewAllLabel={t("explore_all") ?? t("view_all")}
    >
      <div className="grid auto-rows-[190px] grid-cols-2 gap-5 sm:auto-rows-[210px] lg:grid-cols-4 lg:gap-6">
        {top.map((cat, i) => (
          <Reveal
            key={cat._id}
            delay={Math.min(i * 0.06, 0.36)}
            className={layouts[i] ?? ""}
          >
            <Link
              href={`/products?category=${cat._id}`}
              className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-2xl border border-border shadow-xs transition-all duration-500 hover:shadow-xl"
            >
              <Image
                src={
                  cat.image ||
                  getCategoryFallbackImage(cat.name)
                }
                alt={cat.name}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${gradients[i] ?? gradients[0]} opacity-80 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-90`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
              <div className="relative z-10 flex items-end justify-between p-6">
                <div>
                  {i === 0 && (
                    <span className="mb-2.5 inline-flex items-center gap-1.5 rounded-full bg-white/[0.15] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white ring-1 ring-white/[0.2]">
                      <Sparkles className="h-3 w-3" />
                      Editor's Pick
                    </span>
                  )}
                  <h3 className="text-xl font-bold leading-tight text-white lg:text-2xl">
                    {cat.name}
                  </h3>
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-white/80">
                    {t("shop_category") ?? "দেখুন"}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </p>
                </div>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
