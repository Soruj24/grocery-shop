"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Filter } from "lucide-react";
import { Category } from "@/types/category";
import { useLanguage } from "@/contexts/LanguageContext";
import ProductSearchBar from "./ProductSearchBar";
import SortSelect from "./SortSelect";
import DesktopFilterChips from "./DesktopFilterChips";
import MobileFilterSidebar from "./MobileFilterSidebar";

interface ProductFiltersProps {
  categories: Category[];
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "0");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "10000");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");

  const mainCategories = categories.filter(cat => !cat.parentId);
  const selectedCategoryData = categories.find(cat => cat._id === selectedCategory);
  const parentCategory = selectedCategoryData?.parentId
    ? categories.find(cat => cat._id === selectedCategoryData.parentId)
    : null;

  const pushParams = (overrides: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(overrides).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    params.set("page", "1");
    router.push(`/products?${params.toString()}`);
  };

  const applyFilters = () => {
    pushParams({
      q: search || undefined,
      category: selectedCategory || undefined,
      minPrice: minPrice && minPrice !== "0" ? minPrice : undefined,
      maxPrice: maxPrice && maxPrice !== "10000" ? maxPrice : undefined,
      sort: sort !== "newest" ? sort : undefined,
    });
    setIsMobileFiltersOpen(false);
  };

  const clearFilters = () => {
    setSearch(""); setMinPrice("0"); setMaxPrice("10000"); setSort("newest"); setSelectedCategory("");
    router.push("/products");
  };

  const hasActiveFilters = !!(search || selectedCategory || minPrice !== "0" || maxPrice !== "10000" || sort !== "newest");

  return (
    <div className="space-y-6">
      <ProductSearchBar search={search} setSearch={setSearch} applyFilters={applyFilters} />
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <SortSelect sort={sort} onChange={(value) => pushParams({ sort: value !== "newest" ? value : undefined })} />
          <button onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-4 py-3 rounded-2xl shadow-sm font-bold text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95 transition-all">
            <Filter className="w-5 h-5 text-green-600 dark:text-green-400" /> {t("filter")}
          </button>
        </div>
        <DesktopFilterChips selectedCategory={selectedCategory} search={search} selectedCategoryData={selectedCategoryData}
          onRemoveCategory={() => setSelectedCategory("")} onRemoveSearch={() => setSearch("")}
          applyFilters={applyFilters} hasActiveFilters={hasActiveFilters} onClearAll={clearFilters} />
      </div>
      <MobileFilterSidebar isOpen={isMobileFiltersOpen} onClose={() => setIsMobileFiltersOpen(false)}
        categories={categories} mainCategories={mainCategories}
        selectedCategory={selectedCategory} parentCategory={parentCategory} onCategorySelect={setSelectedCategory}
        minPrice={minPrice} maxPrice={maxPrice} onMinPriceChange={setMinPrice} onMaxPriceChange={setMaxPrice}
        onApply={applyFilters} onClear={clearFilters} />
    </div>
  );
}
