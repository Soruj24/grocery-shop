"use client";

import { useState } from "react";
import { Search, X, SlidersHorizontal, LayoutGrid, List, ArrowUpDown, GitCompareArrows } from "lucide-react";
import { Category } from "@/types/category";
import { useLanguage } from "@/contexts/LanguageContext";
import { Tabs, Dropdown, Tag, Button } from "@/components/ui";
import { useCompare } from "./CompareContext";

interface ProductToolbarProps {
  search: string;
  sort: string;
  view: "grid" | "list";
  categories: Category[];
  selectedCategoryData?: Category;
  selectedBrands?: string[];
  hasActiveFilters: boolean;
  onSearch: (val: string) => void;
  onSearchSubmit: () => void;
  onSort: (val: string) => void;
  onView: (val: "grid" | "list") => void;
  onRemoveCategory: () => void;
  onRemoveBrand?: (brand: string) => void;
  onRemoveSearch: () => void;
  onClearAll: () => void;
  onOpenFilters: () => void;
  totalCount: number;
}

export default function ProductToolbar({
  search,
  sort,
  view,
  categories,
  selectedCategoryData,
  selectedBrands = [],
  hasActiveFilters,
  onSearch,
  onSearchSubmit,
  onSort,
  onView,
  onRemoveCategory,
  onRemoveBrand,
  onRemoveSearch,
  onClearAll,
  onOpenFilters,
  totalCount,
}: ProductToolbarProps) {
  const { t } = useLanguage();
  const { count } = useCompare();
  const [localSearch, setLocalSearch] = useState(search);

  const sortOptions = [
    { value: "newest", label: t("sort_newest") },
    { value: "price_low", label: t("sort_price_low") },
    { value: "price_high", label: t("sort_price_high") },
    { value: "rating", label: t("sort_rating") },
    { value: "reviews", label: t("sort_reviews") },
  ];

  const sortTrigger = (
    <button className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-bold text-foreground shadow-sm transition-all hover:border-primary/40 hover:text-primary">
      <ArrowUpDown className="h-4 w-4 text-primary" />
      <span className="hidden sm:inline">
        {sortOptions.find((o) => o.value === sort)?.label ?? t("sort_newest")}
      </span>
    </button>
  );

  return (
    <div className="space-y-4">
      {/* Top row: search + controls */}
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary" />
          <input
            type="text"
            value={localSearch}
            placeholder={t("search_product_placeholder")}
            onChange={(e) => {
              setLocalSearch(e.target.value);
              onSearch(e.target.value);
            }}
            onKeyDown={(e) => e.key === "Enter" && onSearchSubmit()}
            className="w-full rounded-2xl border border-border bg-card py-3.5 pl-12 pr-12 text-foreground shadow-sm outline-none transition-all focus:border-primary focus:shadow-focus"
          />
          {localSearch && (
            <button
              onClick={() => {
                setLocalSearch("");
                onSearch("");
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-danger"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Dropdown
            align="end"
            trigger={sortTrigger}
            items={sortOptions.map((o) => ({
              label: o.label,
              onSelect: () => onSort(o.value),
            }))}
          />

          <div className="hidden sm:block">
            <Tabs
              value={view}
              onValueChange={(v) => onView(v as "grid" | "list")}
              variant="pill"
              items={[
                { value: "grid", label: <span className="sr-only">{t("grid")}</span>, icon: <LayoutGrid className="h-4 w-4" /> },
                { value: "list", label: <span className="sr-only">{t("list")}</span>, icon: <List className="h-4 w-4" /> },
              ]}
            />
          </div>

          {count > 0 && (
            <span className="relative inline-flex items-center justify-center rounded-2xl border border-border bg-card px-4 py-3 text-foreground shadow-sm">
              <GitCompareArrows className="h-4 w-4 text-primary" />
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-black text-primary-foreground">
                {count}
              </span>
            </span>
          )}

          <button
            onClick={onOpenFilters}
            className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3 text-sm font-bold text-foreground shadow-sm transition-all hover:border-primary/40 hover:text-primary lg:hidden"
          >
            <SlidersHorizontal className="h-5 w-5 text-primary" />
            {t("filter")}
          </button>
        </div>
      </div>

      {/* Active filter chips */}
      {(hasActiveFilters || localSearch) && (
        <div className="flex flex-wrap items-center gap-2">
          {selectedCategoryData && (
            <Tag tone="success" onRemove={onRemoveCategory}>
              {selectedCategoryData.name}
            </Tag>
          )}
          {localSearch && (
            <Tag tone="info" onRemove={onRemoveSearch}>
              &ldquo;{localSearch}&rdquo;
            </Tag>
          )}
          {selectedBrands.map((b) => (
            <Tag
              key={b}
              tone="warning"
              onRemove={() => onRemoveBrand?.(b)}
            >
              {b}
            </Tag>
          ))}
          {hasActiveFilters && (
            <button
              onClick={onClearAll}
              className="flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-danger transition-colors hover:bg-danger-subtle"
            >
              <X className="h-3.5 w-3.5" />
              {t("clear_all_filters")}
            </button>
          )}
          <span className="ml-auto text-sm font-bold text-muted-foreground">
            {t("showing_results")}: {totalCount.toLocaleString("bn-BD")} {t("results_count")}
          </span>
        </div>
      )}
    </div>
  );
}
