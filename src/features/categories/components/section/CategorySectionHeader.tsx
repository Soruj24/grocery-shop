"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, LayoutGrid, Filter } from "lucide-react";
import { useState } from "react";

import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function CategorySectionHeader() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative max-w-2xl"
      >
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-subtle text-primary-subtle-foreground text-[11px] font-black uppercase tracking-widest mb-6 border border-primary-border backdrop-blur-sm"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          <span>{t('browse_collections')}</span>
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-[0.9] tracking-tight mb-6 relative inline-block">
          {t('categories')}
          <span className="text-transparent bg-clip-text bg-gradient-to-tr from-primary to-primary-subtle-foreground">.</span>
          {/* Decorative Line */}
          <svg className="absolute -bottom-2 left-0 w-1/2 h-3 text-primary/30" viewBox="0 0 100 10" preserveAspectRatio="none">
             <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
          </svg>
        </h2>

        <p className="text-lg text-muted-foreground font-medium leading-relaxed border-l-4 border-primary/30 pl-6">
          {t('category_subtitle')}
        </p>
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link
          href="/categories"
          className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-foreground text-background font-bold overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
        >
          <div className="absolute inset-0 bg-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative z-10 text-sm uppercase tracking-wider">{t('see_all')}</span>
          <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
        </Link>
      </motion.div>
    </div>
  );
}
