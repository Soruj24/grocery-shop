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
      const res = await fetch(
        "/api/products/list?tag=deals&sort=price_low&limit=8"
      );
      if (!res.ok) throw new Error("Failed");
      const json = await res.json();
      return (json.products ?? []) as Product[];
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
      <div className="flex gap-5 overflow-x-auto pb-4 ds-custom-scrollbar">
        {(isLoading
          ? (Array.from({ length: 6 }) as undefined[])
          : (data ?? [])
        ).map(
          (
            product: Product | undefined,
            i: number
          ) => {
            if (!product) {
              return (
                <div
                  key={i}
                  className="aspect-[3/4] w-56 shrink-0 rounded-2xl border border-border bg-muted"
                />
              );
            }
            const finalPrice =
              product.discountPrice ?? product.price;
            const off = product.discount
              ? product.discount
              : Math.round(
                  ((product.price - finalPrice) /
                    product.price) *
                    100
                );
            return (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: Math.min(i * 0.05, 0.3),
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="group w-56 shrink-0"
              >
                <Link
                  href={`/products/${product._id}`}
                  className="relative block overflow-hidden rounded-2xl border border-border bg-white shadow-xs transition-all duration-500 hover:-translate-y-1 hover:shadow-xl bg-card"
                >
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                      src={
                        product.image ||
                        getProductFallbackImage(
                          product.name
                        )
                      }
                      alt={product.name}
                      fill
                      sizes="224px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {off > 0 && (
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-danger px-3 py-1.5 text-[11px] font-bold text-white shadow-[0_2px_8px_rgba(239,68,68,0.3)]">
                        <Tag className="h-3 w-3" />-
                        {off}%
                      </span>
                    )}
                  </div>
                  <div className="space-y-2 p-4">
                    <p className="line-clamp-1 text-sm font-semibold text-foreground">
                      {product.name}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-primary">
                        {currencySymbol}
                        {finalPrice.toLocaleString(
                          "bn-BD"
                        )}
                      </span>
                      {off > 0 && (
                        <span className="text-xs font-semibold text-muted-foreground line-through">
                          {currencySymbol}
                          {product.price.toLocaleString(
                            "bn-BD"
                          )}
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

      <div className="mt-8 flex items-center justify-between rounded-2xl border border-border bg-muted/80 px-6 py-5">
        <span className="text-sm font-semibold text-muted-foreground">
          {t("deals_end_in") ?? "ডিল শেষ হচ্ছে"}
        </span>
        <CountdownBadge compact />
        <Link
          href="/products?tag=deals"
          className="group inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors duration-300 hover:text-primary-hover"
        >
          {t("see_all_deals")}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </SectionShell>
  );
}
