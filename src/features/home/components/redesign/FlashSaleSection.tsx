"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, ArrowRight, Flame } from "lucide-react";
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
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/30">
            <Zap className="h-6 w-6" />
          </span>
          {t("flash_sale")}
        </span>
      }
      subtitle={t("flash_sale_desc")}
      viewAllHref="/products?tag=deals"
      viewAllLabel={t("see_all_deals")}
      className="bg-gradient-to-b from-rose-50/40 to-transparent dark:from-rose-500/5"
    >
      <div className="mb-8 flex flex-col items-start justify-between gap-5 rounded-3xl border border-rose-200/60 bg-card p-5 shadow-sm sm:flex-row sm:items-center dark:border-rose-500/20">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 rounded-full bg-danger-subtle px-3 py-1.5 text-xs font-black uppercase tracking-wider text-danger">
            <Flame className="h-4 w-4 animate-pulse" />
            {t("deals_end_in") ?? "ডিল শেষ হচ্ছে"}
          </span>
          <CountdownBadge />
        </div>
        <div className="flex w-full items-center gap-3 sm:w-auto">
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted sm:w-48">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "72%" }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-rose-500 to-orange-500"
            />
          </div>
          <span className="whitespace-nowrap text-xs font-bold text-muted-foreground">
            ৭২% {t("claimed") ?? "দাবিকৃত"}
          </span>
        </div>
      </div>

      <ProductRow tag="deals" sort="price_low" limit={4} columns={4} />
    </SectionShell>
  );
}
