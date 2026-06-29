"use client";

import { motion } from "framer-motion";
import { History, X } from "lucide-react";
import { useLanguage } from "@/providers/LanguageContext";

interface SearchHistorySectionProps {
  history: string[];
  onItemClick: (term: string) => void;
  onItemRemove: (e: React.MouseEvent, term: string) => void;
  onClearAll: () => void;
}

export default function SearchHistorySection({
  history,
  onItemClick,
  onItemRemove,
  onClearAll,
}: SearchHistorySectionProps) {
  const { t } = useLanguage();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between px-2 mb-4">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          {t("recent_searches")}
        </p>
        <button
          onClick={onClearAll}
          className="text-[10px] font-bold text-red-500 hover:text-red-600 transition-colors"
        >
          Clear All
        </button>
      </div>
      <div className="space-y-1">
        {history.map((item, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="flex items-center justify-between group px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-2xl cursor-pointer transition-all border border-transparent hover:border-gray-100 dark:hover:border-white/5"
          >
            <div
              className="flex items-center gap-4 flex-1"
              onClick={() => onItemClick(item)}
            >
              <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-400 group-hover:text-green-500 transition-colors">
                <History size={14} />
              </div>
              <span className="text-sm font-bold text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                {item}
              </span>
            </div>
            <button
              onClick={(e) => onItemRemove(e, item)}
              className="p-2 text-gray-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-full transition-all opacity-0 group-hover:opacity-100"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
