"use client";

import Link from "next/link";
import { motion } from "framer-motion";
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
    "from-emerald-500/80 to-green-700/80",
    "from-orange-500/80 to-amber-600/80",
    "from-sky-500/80 to-blue-700/80",
    "from-purple-500/80 to-fuchsia-700/80",
    "from-rose-500/80 to-pink-700/80",
    "from-teal-500/80 to-cyan-700/80",
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
      <div className="grid auto-rows-[180px] grid-cols-2 gap-4 lg:grid-cols-4">
        {top.map((cat, i) => (
          <Reveal
            key={cat._id}
            delay={Math.min(i * 0.06, 0.36)}
            className={layouts[i] ?? ""}
          >
            <Link
              href={`/products?category=${cat._id}`}
              className="group relative flex h-full w-full flex-col justify-end overflow-hidden rounded-3xl ring-1 ring-border shadow-sm transition-all duration-300 hover:shadow-xl"
            >
              <Image
                src={cat.image || getCategoryFallbackImage(cat.name)}
                alt={cat.name}
                fill
                sizes="(max-width: 1024px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div
                className={`absolute inset-0 bg-gradient-to-t ${gradients[i] ?? gradients[0]} opacity-80 mix-blend-multiply transition-opacity duration-300 group-hover:opacity-90`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              <div className="relative z-10 flex items-end justify-between p-5">
                <div>
                  {i === 0 && (
                    <span className="mb-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-white ring-1 ring-white/30">
                      <Sparkles className="h-3 w-3" />
                      Editor's Pick
                    </span>
                  )}
                  <h3 className="text-lg font-black leading-tight text-white lg:text-xl">
                    {cat.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-1 text-xs font-bold text-white/80">
                    {t("shop_category") ?? "দেখুন"}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
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
