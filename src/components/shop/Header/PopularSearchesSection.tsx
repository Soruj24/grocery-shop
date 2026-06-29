"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/providers/LanguageContext";

interface PopularSearchesSectionProps {
  popularSearches: string[];
  onItemClick: (term: string) => void;
}

export default function PopularSearchesSection({
  popularSearches,
  onItemClick,
}: PopularSearchesSectionProps) {
  const { t } = useLanguage();

  return (
    <div className="mb-4">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-2 mb-4">
        {t("popular_searches_title")}
      </p>
      <div className="flex flex-wrap gap-2.5 px-2">
        {popularSearches.map((item, idx) => (
          <motion.button
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            type="button"
            onClick={() => onItemClick(item)}
            className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-white/5 hover:bg-green-50 dark:hover:bg-green-500/10 border border-gray-100 dark:border-white/5 hover:border-green-200 dark:hover:border-green-500/30 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 transition-all group"
          >
            <TrendingUp
              size={12}
              className="text-gray-400 group-hover:text-green-500 transition-colors"
            />
            {item}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
