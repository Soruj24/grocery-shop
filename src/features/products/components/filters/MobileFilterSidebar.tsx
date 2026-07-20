"use client";

import { Filter, X } from "lucide-react";
import { Category } from "@/types/category";
import { useLanguage } from "@/contexts/LanguageContext";
import CategoryTree from "./CategoryTree";
import PriceRangeFilter from "./PriceRangeFilter";

interface MobileFilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  mainCategories: Category[];
  selectedCategory: string;
  parentCategory: Category | null | undefined;
  onCategorySelect: (id: string) => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
  onApply: () => void;
  onClear: () => void;
}

export default function MobileFilterSidebar({ isOpen, onClose, categories, mainCategories, selectedCategory, parentCategory, onCategorySelect, minPrice, maxPrice, onMinPriceChange, onMaxPriceChange, onApply, onClear }: MobileFilterSidebarProps) {
  const { t } = useLanguage();
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 dark:bg-black/80 z-50 lg:hidden backdrop-blur-sm animate-in fade-in duration-300">
      <div className="absolute right-0 top-0 h-full w-[320px] bg-card p-8 shadow-2xl animate-in slide-in-from-right duration-500 rounded-l-2xl border-l border-border">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-2xl font-black text-foreground flex items-center gap-2">
            <Filter className="w-6 h-6 text-primary" /> {t("filter")}
          </h2>
          <button onClick={onClose} className="p-2 bg-muted hover:bg-red-50 dark:hover:bg-red-900/30 text-muted-foreground hover:text-red-500 dark:hover:text-red-400 rounded-xl transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-10 overflow-y-auto max-h-[calc(100vh-180px)] pr-2 no-scrollbar">
          <div>
            <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-4">{t("categories")}</h3>
            <CategoryTree categories={categories} mainCategories={mainCategories} selectedCategory={selectedCategory} parentCategory={parentCategory} onSelect={onCategorySelect} />
          </div>
          <PriceRangeFilter minPrice={minPrice} maxPrice={maxPrice} onMinChange={onMinPriceChange} onMaxChange={onMaxPriceChange} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-8 bg-card border-t border-border space-y-4">
          <button onClick={onApply} className="w-full bg-primary text-white py-4 rounded-2xl font-black shadow-xl shadow-primary hover:bg-primary-hover transition-all active:scale-95">
            {t("apply_filter")}
          </button>
          <button onClick={onClear} className="w-full text-red-500 dark:text-red-400 font-bold py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all">
            {t("clear_all")}
          </button>
        </div>
      </div>
    </div>
  );
}
