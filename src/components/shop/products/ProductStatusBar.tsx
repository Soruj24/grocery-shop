"use client";

import { useLanguage } from "@/components/LanguageContext";

interface ProductStatusBarProps {
  totalCount: number;
  search?: string;
}

export default function ProductStatusBar({ totalCount, search }: ProductStatusBarProps) {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-900 px-6 py-4 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          {t('total_found')}
        </span>
        <span className="text-sm font-black text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-3 py-1 rounded-lg">
          {totalCount}{t('products_count_suffix')}
        </span>
      </div>
      {search && (
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm text-gray-400 dark:text-gray-500 italic">
            {t('search_results_prefix')}{search}{t('search_results_suffix')}
          </span>
        </div>
      )}
    </div>
  );
}
