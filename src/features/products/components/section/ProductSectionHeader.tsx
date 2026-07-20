"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProductSectionHeader() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-subtle text-primary-subtle-foreground text-xs font-bold uppercase tracking-wider mb-4">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span>{t('fresh_arrivals')}</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-foreground leading-tight tracking-tight relative inline-block">
          {t('product_section_title')}
          <span className="text-transparent bg-clip-text bg-gradient-to-tr from-primary to-primary-subtle-foreground">.</span>
          <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
             <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
          </svg>
        </h2>
        <p className="text-lg text-muted-foreground font-medium mt-4 max-w-lg leading-relaxed">
          {t('product_section_subtitle')}
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link
          href="/products"
          className="group flex items-center gap-3 px-6 py-3 rounded-full bg-card text-foreground font-bold hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-sm hover:shadow-lg hover:border-primary border border-border"
        >
          <span className="text-sm font-bold">{t('see_all')}</span>
          <div className="bg-muted group-hover:bg-white/20 p-1.5 rounded-full transition-colors">
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </Link>
      </motion.div>
    </div>
  );
}
