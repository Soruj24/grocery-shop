"use client";

import { useQuery } from "@tanstack/react-query";
import { Sparkles } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import ProductCard from "@/features/products/components/ProductCard";
import { SectionShell, Reveal } from "./SectionShell";

export default function RecommendedRail() {
  const { t } = useLanguage();
  const { recentlyViewed } = useRecentlyViewed();

  const viewedCategoryIds = Array.from(
    new Set(recentlyViewed.map((p) => p.category?._id).filter(Boolean))
  );

  const { data, isLoading } = useQuery({
    queryKey: ["home-recommendations", viewedCategoryIds],
    queryFn: async () => {
      const res = viewedCategoryIds.length
        ? await fetch("/api/products/recommendations", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ categoryIds: viewedCategoryIds }),
          })
        : await fetch("/api/products/recommendations?fallback=true");
      if (!res.ok) throw new Error("Failed");
      return (await res.json()) as any[];
    },
  });

  if (isLoading || !data || data.length === 0) return null;

  return (
    <SectionShell
      eyebrow={t("recommended_for_you")}
      eyebrowTone="accent"
      title={
        <span className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-accent to-primary text-white shadow-lg shadow-accent/30">
            <Sparkles className="h-6 w-6" />
          </span>
          {t("recommended_for_you")}
        </span>
      }
      subtitle={t("recommended_for_you_desc")}
      viewAllHref="/products"
      viewAllLabel={t("explore_all") ?? t("view_all")}
    >
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-5">
        {data.slice(0, 10).map((product: any, idx: number) => (
          <Reveal key={product._id} delay={Math.min(idx * 0.05, 0.4)}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}
