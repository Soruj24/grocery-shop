"use client";

import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-2 mb-4">
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
            className="flex items-center gap-2 px-4 py-2.5 bg-muted hover:bg-primary-subtle border border-border hover:border-primary/30 rounded-xl text-xs font-bold text-muted-foreground hover:text-primary transition-all group"
          >
            <TrendingUp
              size={12}
              className="text-muted-foreground group-hover:text-primary transition-colors"
            />
            {item}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
