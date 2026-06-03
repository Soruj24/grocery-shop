"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import type { CategoryOption } from "@/types/search";

interface CategorySuggestionsProps {
  suggestions: CategoryOption[];
  onCategoryClick: () => void;
}

export default function CategorySuggestions({
  suggestions,
  onCategoryClick,
}: CategorySuggestionsProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-2">
        {t("suggested_categories")}
      </p>
      <div className="grid grid-cols-2 gap-3 px-2">
        {suggestions.map((cat, idx) => (
          <motion.div
            key={cat.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
          >
            <Link
              href={`/products?category=${cat.id}`}
              onClick={onCategoryClick}
              className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-white/5 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-2xl transition-all border border-gray-100 dark:border-white/5 hover:border-green-200 dark:hover:border-green-500/30 group hover:shadow-lg hover:shadow-green-500/10"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform duration-300 filter grayscale group-hover:grayscale-0">
                {cat.icon}
              </span>
              <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                {cat.name}
              </span>
              <ArrowRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
