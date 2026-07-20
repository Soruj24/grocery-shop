"use client";

import { Filter, ChevronDown, X } from "lucide-react";
import Link from "next/link";
import PriceFilter from "./filters/PriceFilter";
import { Category } from "@/types/category";
import { useLanguage } from "@/contexts/LanguageContext";

interface ProductSidebarFiltersProps {
  categories: Category[];
  categoryId: string;
  minPrice: string;
  maxPrice: string;
  mainCategories: Category[];
  parentCategory: Category | null | undefined;
}

export default function ProductSidebarFilters({
  categories,
  categoryId,
  minPrice,
  maxPrice,
  mainCategories,
  parentCategory,
}: ProductSidebarFiltersProps) {
  const { t } = useLanguage();

  return (
    <aside className="hidden lg:block w-1/4 space-y-8">
      <div className="bg-card p-8 rounded-2xl border border-border shadow-sm sticky top-24">
        <h3 className="text-xl font-black text-foreground mb-6 flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          {t('filter')}
        </h3>

        <div className="space-y-8">
          {/* Categories */}
          <div>
            <h4 className="text-sm font-black text-muted-foreground uppercase tracking-wider mb-4">
              {t('categories')}
            </h4>
            <div className="space-y-2">
              <Link
                href="/products"
                className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  !categoryId
                    ? "bg-primary text-white shadow-lg shadow-primary"
                    : "text-muted-foreground hover:bg-primary-subtle"
                }`}
              >
                <span>{t('all_products')}</span>
                {!categoryId && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
              </Link>

              {mainCategories.map((cat: Category) => (
                <div key={cat._id} className="space-y-1">
                  <Link
                    href={`/products?category=${cat._id}`}
                    className={`flex items-center justify-between w-full px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                      categoryId === cat._id || parentCategory?._id === cat._id
                        ? "bg-primary-subtle text-primary"
                        : "text-muted-foreground hover:bg-primary-subtle"
                    }`}
                  >
                    <span>{cat.name}</span>
                    {(categoryId === cat._id || parentCategory?._id === cat._id) && (
                      <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                          categoryId === cat._id || parentCategory?._id === cat._id
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    )}
                  </Link>

                  {/* Subcategories */}
                  {(categoryId === cat._id || parentCategory?._id === cat._id) && (
                    <div className="ml-4 pl-4 border-l-2 border-primary/30 space-y-1 py-1">
                      {categories
                        .filter((sub: Category) => sub.parentId === cat._id)
                        .map((sub: Category) => (
                          <Link
                            key={sub._id}
                            href={`/products?category=${sub._id}`}
                            className={`block w-full px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                              categoryId === sub._id
                                ? "text-primary bg-primary-subtle"
                                : "text-muted-foreground hover:text-primary"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div>
            <h4 className="text-sm font-black text-muted-foreground uppercase tracking-wider mb-4">
              {t('price_range')}
            </h4>
            <PriceFilter initialMin={minPrice} initialMax={maxPrice} />
          </div>

          {/* Reset Button */}
          {(categoryId || minPrice !== "0" || maxPrice !== "10000") && (
            <Link
              href="/products"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <X className="w-4 h-4" />
              {t('clear_all_filters')}
            </Link>
          )}
        </div>
      </div>
    </aside>
  );
}
