"use client";

import { Search, X } from "lucide-react";
import { useLanguage } from "@/providers/LanguageContext";

interface ProductSearchBarProps {
  search: string;
  setSearch: (val: string) => void;
  applyFilters: () => void;
}

export default function ProductSearchBar({ search, setSearch, applyFilters }: ProductSearchBarProps) {
  const { t } = useLanguage();

  return (
    <div className="relative group">
      <div className="relative flex items-center">
        <input type="text" placeholder={t("search_product_placeholder")}
          className="w-full pl-12 pr-28 py-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[24px] shadow-sm outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 dark:focus:border-green-400 transition-all text-gray-700 dark:text-gray-100 font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600"
          value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={(e) => e.key === "Enter" && applyFilters()} />
        <Search className="absolute left-4 text-gray-400 group-focus-within:text-green-600 dark:group-focus-within:text-green-400 transition-colors w-5 h-5" />
        <div className="absolute right-2 flex items-center gap-1">
          {search && <button onClick={() => setSearch("")} className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"><X className="w-4 h-4" /></button>}
          <button onClick={applyFilters} className="bg-green-600 dark:bg-green-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-700 dark:hover:bg-green-600 transition-all shadow-lg shadow-green-900/10 active:scale-95">
            {t("search_button")}
          </button>
        </div>
      </div>
    </div>
  );
}
