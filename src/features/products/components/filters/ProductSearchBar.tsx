"use client";

import { Search, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
          className="w-full pl-12 pr-28 py-4 bg-card border border-border rounded-2xl shadow-sm outline-none focus:ring-4 focus:ring-primary/10 focus:border-primary transition-all text-foreground font-medium placeholder:text-muted-foreground"
          value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={(e) => e.key === "Enter" && applyFilters()} />
        <Search className="absolute left-4 text-muted-foreground group-focus-within:text-primary transition-colors w-5 h-5" />
        <div className="absolute right-2 flex items-center gap-1">
          {search && <button onClick={() => setSearch("")} className="p-2 text-muted-foreground hover:text-foreground transition-colors"><X className="w-4 h-4" /></button>}
          <button onClick={applyFilters} className="bg-primary text-white px-6 py-2 rounded-xl font-bold hover:bg-primary-hover transition-all shadow-lg shadow-primary active:scale-95">
            {t("search_button")}
          </button>
        </div>
      </div>
    </div>
  );
}
