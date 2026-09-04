"use client";

import {
  useState,
  useCallback,
  useEffect,
} from "react";
import ProductCard from "@/features/products/components/ProductCard";
import Pagination from "@/components/ui/Pagination";
import {
  LayoutGrid,
  ShoppingBag,
  ChevronDown,
  Check,
  X,
  Search,
  ArrowUpDown,
} from "lucide-react";
import { useParams, useSearchParams, useRouter, usePathname } from "next/navigation";
import { Product } from "@/types/product";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface CategoryProductGridProps {
  products: Product[];
  totalPages: number;
  currentPage: number;
}

export default function CategoryProductGrid({
  products,
  totalPages,
  currentPage,
}: CategoryProductGridProps) {
  const { t } = useLanguage();
  const params = useParams();
  const id = params.id as string;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isSortOpen, setIsSortOpen] =
    useState(false);
  const sortBy = searchParams.get("sort") || "newest";
  const search = searchParams.get("search") || "";
  const brand = searchParams.get("brand") || "";
  const color = searchParams.get("color") || "";
  const rating = searchParams.get("rating") || "";
  const inStock = searchParams.get("inStock") || "";
  const priceMin = searchParams.get("priceMin") || "";
  const priceMax = searchParams.get("priceMax") || "";

  const sortOptions = [
    { id: "newest", label: t("sort_newest") },
    {
      id: "price_low",
      label: t("sort_price_low"),
    },
    {
      id: "price_high",
      label: t("sort_price_high"),
    },
    { id: "rating", label: "Top Rated" },
  ];

  const sortedProducts = [...products].sort(
    (a, b) => {
      switch (sortBy) {
        case "price_low":
          return (
            (a.discountPrice || a.price) -
            (b.discountPrice || b.price)
          );
        case "price_high":
          return (
            (b.discountPrice || b.price) -
            (a.discountPrice || a.price)
          );
        case "rating":
          return (
            (b.rating || 0) - (a.rating || 0)
          );
        case "newest":
        default:
          return (
            new Date(
              b.createdAt || 0
            ).getTime() -
            new Date(
              a.createdAt || 0
            ).getTime()
          );
      }
    }
  );

  const updateFilter = (
    key: string,
    value: string
  ) => {
    const params = new URLSearchParams(
      searchParams.toString()
    );
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const activeFilters = [
    search && { key: "search", label: `"${search}"` },
    brand && { key: "brand", label: brand },
    color && { key: "color", label: color },
    rating && {
      key: "rating",
      label: `${rating}★ & Up`,
    },
    inStock && {
      key: "inStock",
      label: "In Stock",
    },
    priceMin && {
      key: "priceMin",
      label: `≥ ৳${priceMin}`,
    },
    priceMax && {
      key: "priceMax",
      label: `≤ ৳${priceMax}`,
    },
  ].filter(Boolean) as {
    key: string;
    label: string;
  }[];

  return (
    <main className="flex-1 min-w-0 space-y-5">
      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-card p-4 rounded-xl border border-border shadow-xs sticky top-24 z-30">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-muted rounded-lg flex items-center justify-center">
            <LayoutGrid className="w-4 h-4 text-muted-foreground/60" />
          </div>
          <div>
            <p className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/50">
              {t("results_label")}
            </p>
            <p className="text-base font-bold text-foreground">
              {sortedProducts.length.toLocaleString(
                "bn-BD"
              )}
              {t("items_count_suffix")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Mobile search */}
          <div className="relative sm:hidden flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) =>
                updateFilter(
                  "search",
                  e.target.value
                )
              }
              className="w-full bg-muted border border-border rounded-lg py-2 pl-8 pr-3 text-xs font-medium text-foreground placeholder:text-muted-foreground/40 focus:ring-1 focus:ring-foreground/20 outline-none"
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() =>
                setIsSortOpen(!isSortOpen)
              }
              onBlur={() =>
                setTimeout(
                  () => setIsSortOpen(false),
                  200
                )
              }
              className="flex items-center gap-2 bg-muted px-3.5 py-2 rounded-lg border border-border hover:border-border-strong transition-colors text-xs font-medium text-foreground"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground/50" />
              {
                sortOptions.find(
                  (o) => o.id === sortBy
                )?.label
              }
              <ChevronDown
                className={`w-3.5 h-3.5 text-muted-foreground/40 transition-transform duration-200 ${
                  isSortOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 8,
                    scale: 0.96,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    y: 8,
                    scale: 0.96,
                  }}
                  className="absolute right-0 top-full mt-1.5 w-52 bg-card rounded-xl shadow-xl border border-border overflow-hidden z-50 p-1.5"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.id}
                      onClick={() => {
                        updateFilter(
                          "sort",
                          option.id
                        );
                        setIsSortOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                        sortBy === option.id
                          ? "bg-foreground text-background"
                          : "text-muted-foreground/60 hover:bg-muted"
                      }`}
                    >
                      {option.label}
                      {sortBy === option.id && (
                        <Check className="w-3.5 h-3.5" />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Active filter chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {activeFilters.map((f) => (
            <button
              key={f.key}
              onClick={() =>
                updateFilter(f.key, "")
              }
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-muted rounded-md text-[11px] font-medium text-muted-foreground/70 hover:text-foreground transition-colors"
            >
              {f.label}
              <X className="w-3 h-3" />
            </button>
          ))}
        </div>
      )}

      {/* Product Grid */}
      {sortedProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {sortedProducts.map(
            (product: Product, index: number) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.03,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
              >
                <ProductCard
                  product={product}
                />
              </motion.div>
            )
          )}
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-card rounded-xl p-12 text-center border border-border shadow-xs"
        >
          <div className="w-14 h-14 bg-muted rounded-xl flex items-center justify-center mx-auto mb-4 text-muted-foreground/30">
            <ShoppingBag className="w-6 h-6" />
          </div>
          <h3 className="text-lg font-bold text-foreground mb-1.5">
            {t("no_products_found")}
          </h3>
          <p className="text-sm font-medium text-muted-foreground/60 max-w-sm mx-auto">
            {t("category_empty_desc")}
          </p>
        </motion.div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pt-4 flex justify-center">
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            basePath={`/category/${id}`}
            totalCount={products.length}
            itemsPerPage={12}
          />
        </div>
      )}
    </main>
  );
}
