"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Star, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/product";
import { useLanguage } from "@/contexts/LanguageContext";
import ProductCard from "@/features/products/components/ProductCard";
import { Skeleton } from "@/components/ui";
import { SectionShell } from "./SectionShell";

export default function TrendingTabs() {
  const { t } = useLanguage();
  const [active, setActive] = useState<"trending" | "bestsellers" | "new">(
    "trending"
  );

  const TABS = [
    {
      id: "trending",
      label: t("trending_now") ?? t("featured_products_tab_trending"),
      icon: TrendingUp,
      color: "from-sky-500 to-cyan-500",
      sort: "rating",
      href: "/products?sort=rating",
    },
    {
      id: "bestsellers",
      label: t("best_sellers") ?? t("featured_products_tab_bestsellers"),
      icon: Star,
      color: "from-amber-400 to-orange-600",
      sort: "reviews",
      href: "/products?sort=reviews",
    },
    {
      id: "new",
      label: t("featured_products_tab_new"),
      icon: Sparkles,
      color: "from-purple-500 to-pink-600",
      sort: "newest",
      href: "/products?sort=newest",
    },
  ] as const;

  const current = TABS.find((x) => x.id === active)!;

  const { data, isLoading } = useQuery({
    queryKey: ["trending-tabs", active],
    queryFn: async () => {
      const res = await fetch(
        `/api/products/list?sort=${current.sort}&limit=8`
      );
      if (!res.ok) throw new Error("Failed");
      return (await res.json()) as Product[];
    },
  });

  return (
    <SectionShell
      eyebrow={t("featured_products")}
      title={
        <>
          {t("featured_products_title_1")}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-hover">
            {t("featured_products_title_2")}
          </span>
        </>
      }
      subtitle={t("featured_products_desc")}
      viewAllHref={current.href}
      viewAllLabel={t("see_all")}
    >
      <div className="mb-10 flex flex-wrap justify-center gap-2 rounded-full border border-border bg-muted p-2">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`relative flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold transition-all duration-300 ${
                isActive
                  ? "text-primary-foreground shadow-lg"
                  : "text-muted-foreground hover:bg-background hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.span
                  layoutId="trendingTab"
                  className={`absolute inset-0 rounded-full bg-gradient-to-r ${tab.color}`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <Icon
                className={`relative z-10 h-4 w-4 ${
                  isActive ? "animate-pulse" : ""
                }`}
              />
              <span className="relative z-10 uppercase tracking-wide">
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {isLoading ? (
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="aspect-[3/4] rounded-xl border border-border bg-card"
              >
                <Skeleton className="h-full w-full rounded-xl" />
              </div>
            ))}
          </div>
        ) : (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 gap-6 lg:grid-cols-4 lg:gap-8"
          >
            {data?.map((product, idx) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: Math.min(idx * 0.05, 0.35) }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  );
}
