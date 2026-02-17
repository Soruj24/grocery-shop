"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, LayoutGrid, Filter } from "lucide-react";
import { useState } from "react";

import { useLanguage } from "@/components/LanguageContext";

export default function CategorySectionHeader() {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div className="relative">
        <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
          {t('categories')}
          <span className="text-green-500">.</span>
        </h2>
        <div className="h-2 w-32 bg-gradient-to-r from-green-500 to-green-300 rounded-full mt-4 opacity-30" />
        <p className="text-lg text-gray-500 dark:text-gray-400 font-medium mt-4 max-w-lg leading-relaxed">
          {t('category_subtitle')}
        </p>
      </div>
      
      <Link
        href="/products"
        className="group flex items-center gap-3 px-8 py-4 rounded-2xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-bold hover:bg-green-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-green-600/20 border border-gray-100 dark:border-gray-700 hover:border-green-500 dark:hover:border-green-500"
      >
        <span className="text-sm uppercase tracking-wider">{t('see_all')}</span>
        <div className="bg-gray-100 dark:bg-gray-700 group-hover:bg-white/20 p-1.5 rounded-full transition-colors">
          <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </Link>
    </div>
  );
}
