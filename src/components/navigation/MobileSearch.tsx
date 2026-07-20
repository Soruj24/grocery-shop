"use client";

import { Search, X } from "lucide-react";

import { useLanguage } from "@/contexts/LanguageContext";

interface MobileSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function MobileSearch({
  searchTerm,
  setSearchTerm,
}: MobileSearchProps) {
  const { t } = useLanguage();
  return (
    <div className="lg:hidden px-4 pb-3 pt-1">
      <form action="/products" method="GET" className="relative group">
        <div className="relative flex items-center bg-muted rounded-2xl border border-border shadow-sm focus-within:bg-card focus-within:border-primary/50 transition-all duration-300">
          <div className="absolute left-4">
            <Search className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <input
            type="text"
            name="q"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t('search_placeholder_short')}
            className="w-full bg-transparent py-3.5 pl-12 pr-10 text-sm font-bold text-foreground placeholder:text-muted-foreground outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 p-2 text-muted-foreground hover:text-rose-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
