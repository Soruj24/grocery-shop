"use client";

import { motion } from "framer-motion";
import { Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

export default function FlashDealsHeader() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6 text-center lg:text-left w-full lg:w-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 rounded-full text-xs font-black uppercase tracking-widest mx-auto lg:mx-0">
        <Zap size={14} className="fill-current animate-pulse" />
        <span>{t("flash_deals_badge")}</span>
      </motion.div>
      <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
        className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tight leading-none">
        {t("flash_deals_title_1")}{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-600">{t("flash_deals_title_2")}</span>
      </motion.h2>
      <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
        className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-lg mx-auto lg:mx-0">
        Hurry up! These offers are limited time only. Grab your favorites before they&apos;re gone.
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="pt-4">
        <Link href="/products?filter=flash-deals"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold hover:bg-orange-600 dark:hover:bg-orange-400 hover:text-white transition-colors shadow-lg shadow-orange-500/20">
          View All Deals <ArrowRight size={18} />
        </Link>
      </motion.div>
    </div>
  );
}
