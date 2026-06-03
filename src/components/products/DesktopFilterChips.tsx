"use client";

import { X } from "lucide-react";
import { Category } from "@/types/category";
import { useLanguage } from "@/components/LanguageContext";

interface DesktopFilterChipsProps {
  selectedCategory: string;
  search: string;
  selectedCategoryData?: Category;
  onRemoveCategory: () => void;
  onRemoveSearch: () => void;
  applyFilters: () => void;
  hasActiveFilters: boolean;
  onClearAll: () => void;
}

export default function DesktopFilterChips({ selectedCategory, search, selectedCategoryData, onRemoveCategory, onRemoveSearch, applyFilters, hasActiveFilters, onClearAll }: DesktopFilterChipsProps) {
  const { t } = useLanguage();

  return (
    <>
      <div className="hidden lg:flex flex-wrap items-center gap-2 flex-1 px-4">
        {selectedCategory && selectedCategoryData && (
          <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-green-100 dark:border-green-900/30">
            {selectedCategoryData.name}
            <button onClick={() => { onRemoveCategory(); applyFilters(); }}><X className="w-3 h-3 hover:text-red-500 dark:hover:text-red-400" /></button>
          </div>
        )}
        {search && (
          <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-100 dark:border-blue-900/30">
            &ldquo;{search}&rdquo;
            <button onClick={() => { onRemoveSearch(); applyFilters(); }}><X className="w-3 h-3 hover:text-red-500 dark:hover:text-red-400" /></button>
          </div>
        )}
      </div>
      {hasActiveFilters && (
          <button onClick={onClearAll}
          className="hidden lg:flex items-center gap-2 text-red-500 dark:text-red-400 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-xl transition-all">
          <X className="w-4 h-4" /> {t("clear_all_filters")}
        </button>
      )}
    </>
  );
}
