"use client";

import { useLanguage } from "@/contexts/LanguageContext";

interface ProductStatusBarProps {
  totalCount: number;
  search?: string;
}

export default function ProductStatusBar({ totalCount, search }: ProductStatusBarProps) {
  const { t } = useLanguage();
  return (
    <div className="flex items-center justify-between bg-card px-6 py-4 rounded-2xl border border-border shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground font-medium">
          {t('total_found')}
        </span>
        <span className="text-sm font-black text-primary bg-primary-subtle px-3 py-1 rounded-lg">
          {totalCount}{t('products_count_suffix')}
        </span>
      </div>
      {search && (
        <div className="hidden md:flex items-center gap-2">
          <span className="text-sm text-muted-foreground italic">
            {t('search_results_prefix')}{search}{t('search_results_suffix')}
          </span>
        </div>
      )}
    </div>
  );
}
