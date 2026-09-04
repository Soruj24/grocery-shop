"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Flame } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { SectionShell } from "./SectionShell";
import ProductRow from "./ProductRow";
import CountdownBadge from "./CountdownBadge";

export default function FlashSaleSection() {
  const { t } = useLanguage();

  return (
    <SectionShell
      eyebrow={t("flash_sale")}
      eyebrowTone="danger"
      title={
        <span className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-[0_4px_16px_rgba(244,63,94,0.3)]">
            <Zap className="h-6 w-6" />
          </span>
          {t("flash_sale")}
        </span>
      }
      subtitle={t("flash_sale_desc")}
      viewAllHref="/products?tag=deals"
      viewAllLabel={t("see_all_deals")}
      className="bg-gradient-to-b from-rose-50/30 to-transparent dark:from-rose-500/[0.03]"
    >
      <div className="mb-10 flex flex-col items-start justify-between gap-6 rounded-2xl border border-danger/20 bg-card p-6 shadow-sm sm:flex-row sm:items-center">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-2 rounded-full bg-danger/[0.08] px-4 py-2 text-xs font-extrabold uppercase tracking-wider text-danger ring-1 ring-danger/[0.12]">
            <Flame className="h-4 w-4 animate-pulse" />
            {t("deals_end_in") ?? "ডিল শেষ হচ্ছে"}
          </span>
          <CountdownBadge />
        </div>
        <div className="flex w-full items-center gap-4 sm:w-auto">
          <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-zinc-100 sm:w-52 dark:bg-white/[0.06]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "72%" }}
              viewport={{ once: true }}
              transition={{
                duration: 1,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="h-full rounded-full bg-gradient-to-r from-rose-500 to-orange-500"
            />
          </div>
          <span className="whitespace-nowrap text-xs font-semibold text-muted-foreground">
            ৭২%{" "}
            {t("claimed") ?? "দাবিকৃত"}
          </span>
        </div>
      </div>

      <ProductRow
        tag="deals"
        sort="price_low"
        limit={4}
        columns={4}
      />
    </SectionShell>
  );
}
