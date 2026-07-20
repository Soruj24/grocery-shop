"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tag, ArrowRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/contexts/SettingsContext";
import { Product } from "@/types/product";
import { getProductFallbackImage } from "@/constants/fallback-images";
import { SectionShell } from "./SectionShell";
import CountdownBadge from "./CountdownBadge";

export default function TodaysDeals() {
  const { t } = useLanguage();
  const { currencySymbol } = useSettings();

  const { data, isLoading } = useQuery({
    queryKey: ["todays-deals"],
    queryFn: async () => {
      const res = await fetch("/api/products/list?tag=deals&sort=price_low&limit=8");
      if (!res.ok) throw new Error("Failed");
      return (await res.json()) as Product[];
    },
  });

  return (
    <SectionShell
      eyebrow={t("todays_deals")}
      eyebrowTone="warning"
      title={t("todays_deals")}
      subtitle={t("todays_deals_desc")}
      viewAllHref="/products?tag=deals"
      viewAllLabel={t("see_all_deals")}
    >
      <div className="flex gap-4 overflow-x-auto pb-4 ds-custom-scrollbar">
        {(isLoading
          ? (Array.from({ length: 6 }) as undefined[])
          : (data ?? [])
        ).map((product: Product | undefined, i: number) => {
            if (!product) {
              return (
                <div
                  key={i}
                  className="aspect-[3/4] w-56 shrink-0 rounded-2xl border border-border bg-card"
                />
              );
            }
            const finalPrice = product.discountPrice ?? product.price;
            const off = product.discount
              ? product.discount
              : Math.round(
                  ((product.price - finalPrice) / product.price) * 100
                );
            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.05, 0.3) }}
                className="group w-56 shrink-0"
              >
                <Link
                  href={`/products/${product._id}`}
                  className="relative block overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-lg"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                      src={product.image || getProductFallbackImage(product.name)}
                      alt={product.name}
                      fill
                      sizes="224px"
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    {off > 0 && (
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-danger px-2.5 py-1 text-[11px] font-black text-white shadow-sm">
                        <Tag className="h-3 w-3" />-{off}%
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 p-4">
                    <p className="line-clamp-1 text-sm font-bold text-foreground">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-primary">
                        {currencySymbol}
                        {finalPrice.toLocaleString("bn-BD")}
                      </span>
                      {off > 0 && (
                        <span className="text-xs font-bold text-muted-foreground line-through">
                          {currencySymbol}
                          {product.price.toLocaleString("bn-BD")}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          }
        )}
      </div>

      <div className="mt-6 flex items-center justify-between rounded-2xl border border-border bg-subtle px-5 py-4">
        <span className="text-sm font-bold text-muted-foreground">
          {t("deals_end_in") ?? "ডিল শেষ হচ্ছে"}
        </span>
        <CountdownBadge compact />
        <Link
          href="/products?tag=deals"
          className="group inline-flex items-center gap-1.5 text-sm font-black text-primary"
        >
          {t("see_all_deals")}
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </SectionShell>
  );
}
