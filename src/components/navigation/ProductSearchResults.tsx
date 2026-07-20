"use client";

import { Loader2, Search, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Product } from "@/types/product";
import SearchProductItem from "./SearchProductItem";

interface ProductSearchResultsProps {
  results: Product[] | undefined;
  isLoading: boolean;
  searchTerm: string;
  selectedIndex: number;
  onProductClick: (id: string) => void;
  onSeeAllClick: () => void;
}

export default function ProductSearchResults({
  results,
  isLoading,
  searchTerm,
  selectedIndex,
  onProductClick,
  onSeeAllClick,
}: ProductSearchResultsProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-3">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground px-2">
        {t("products_title_search")}
      </p>
      {isLoading ? (
        <div className="py-12 text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto" />
          <p className="text-muted-foreground text-xs font-black uppercase tracking-widest animate-pulse">
            {t("loading")}
          </p>
        </div>
      ) : results && results.length > 0 ? (
        <div className="space-y-2">
          {results.map((product: Product, idx: number) => (
            <SearchProductItem
              key={product._id}
              product={product}
              index={idx}
              selectedIndex={selectedIndex}
              onProductClick={onProductClick}
            />
          ))}
          <Link
            href={`/products?q=${encodeURIComponent(searchTerm)}`}
            onClick={onSeeAllClick}
            className="flex items-center justify-center gap-2 p-4 mt-4 bg-muted hover:bg-primary hover:text-primary-foreground rounded-2xl text-sm font-black transition-all"
          >
            {t("see_all")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      ) : (
        <div className="py-12 text-center space-y-6">
          <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto border border-dashed border-border animate-pulse">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <p className="text-foreground font-black text-lg">
              {t("no_products_found")}
            </p>
            <p className="text-muted-foreground text-sm font-medium">
              {t("search_placeholder")}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
