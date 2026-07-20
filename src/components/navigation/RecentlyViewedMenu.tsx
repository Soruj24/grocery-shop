"use client";

import Link from "next/link";
import Image from "next/image";
import { History, X, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRecentlyViewed } from "@/contexts/RecentlyViewedContext";
import { useSettings } from "@/contexts/SettingsContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProductFallbackImage } from "@/constants/fallback-images";

export default function RecentlyViewedMenu({ onClose }: { onClose?: () => void }) {
  const { recentlyViewed, clearRecentlyViewed } = useRecentlyViewed();
  const { currencySymbol } = useSettings();
  const { t } = useLanguage();

  if (recentlyViewed.length === 0) {
    return (
      <div className="w-[320px] p-8 text-center">
        <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <History className="w-6 h-6" />
        </div>
        <p className="font-bold text-foreground">{t("empty_recently_viewed")}</p>
      </div>
    );
  }

  return (
    <div className="w-[340px]">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-primary" />
          <h3 className="text-base font-black text-foreground">
            {t("recently_viewed_title")}
          </h3>
        </div>
        <button
          onClick={clearRecentlyViewed}
          className="text-xs font-bold text-muted-foreground transition-colors hover:text-danger"
        >
          {t("clear_recent")}
        </button>
      </div>

      <div className="max-h-[340px] space-y-1 overflow-y-auto ds-custom-scrollbar p-2">
        <AnimatePresence initial={false}>
          {recentlyViewed.map((product) => (
            <motion.div
              key={product._id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -12 }}
            >
              <Link
                href={`/products/${product._id}`}
                onClick={onClose}
                className="group flex items-center gap-3 rounded-xl p-2 transition-all hover:bg-muted"
              >
                <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-muted border border-border">
                  <Image
                    src={product.image || getProductFallbackImage(product.name)}
                    alt={product.name}
                    fill
                    sizes="56px"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-1 text-sm font-bold text-foreground">
                    {product.name}
                  </p>
                  <p className="text-sm font-black text-primary">
                    {currencySymbol}
                    {(product.discountPrice ?? product.price).toLocaleString("bn-BD")}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
