"use client";

import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";

export default function FlashDealsHeader() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 text-center lg:text-left w-full lg:w-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-warning-subtle border border-warning/30 text-warning rounded-full text-xs font-black uppercase tracking-widest mx-auto lg:mx-0">
        <Zap size={14} className="fill-current animate-pulse" />
        <span>{t("flash_deals_badge")}</span>
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-7xl font-black text-foreground tracking-tight leading-none">
        {t("flash_deals_title_1")}{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-warning to-danger">{t("flash_deals_title_2")}</span>
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        className="text-lg text-muted-foreground font-medium max-w-lg mx-auto lg:mx-0">
        Hurry up! These offers are limited time only. Grab your favorites before they&apos;re gone.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="pt-4">
        <Link href="/products?filter=flash-deals"
          className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-bold hover:bg-warning hover:text-warning-foreground transition-colors shadow-sm">
          View All Deals <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  );
}
