"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { History, Sparkles, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/contexts/SettingsContext";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { getProductFallbackImage } from "@/constants/fallback-images";
import { SectionShell } from "./SectionShell";

export default function RecentlyViewedRail() {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();
  const { currencySymbol } = useSettings();
  const { t } = useLanguage();

  if (recentlyViewed.length === 0) return null;

  return (
    <SectionShell
      eyebrow={t("recently_viewed")}
      eyebrowTone="info"
      title={
        <span className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-info-subtle text-info">
            <History className="h-6 w-6" />
          </span>
          {t("recently_viewed")}
        </span>
      }
      viewAllHref="/products"
      viewAllLabel={t("explore_all") ?? t("view_all")}
    >
      <div className="flex items-center justify-end pb-4">
        <button
          onClick={clearRecentlyViewed}
          className="text-xs font-bold text-muted-foreground transition-colors hover:text-danger"
        >
          {t("clear_recent") ?? "পরিষ্কার"}
        </button>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-4 ds-custom-scrollbar">
        {recentlyViewed.map((p, i) => {
          const price = p.discountPrice ?? p.price;
          return (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: Math.min(i * 0.05, 0.3) }}
              className="group w-44 shrink-0"
            >
              <Link
                href={`/products/${p._id}`}
                className="block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image
                    src={p.image || getProductFallbackImage(p.name)}
                    alt={p.name}
                    fill
                    sizes="176px"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="space-y-1 p-3">
                  <p className="line-clamp-1 text-sm font-bold text-foreground">
                    {p.name}
                  </p>
                  <span className="text-sm font-black text-primary">
                    {currencySymbol}
                    {price.toLocaleString("bn-BD")}
                  </span>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </SectionShell>
  );
}
