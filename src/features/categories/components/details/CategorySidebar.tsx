"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import {
  ListFilter,
  ChevronRight,
  ChevronDown,
  Search,
  X,
  Star,
  SlidersHorizontal,
} from "lucide-react";
import { Category as ICategory } from "@/types/category";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion, AnimatePresence } from "framer-motion";

interface CategorySidebarProps {
  allCategories: ICategory[];
  currentId: string;
  brands: string[];
  colors: string[];
  minPrice: number;
  maxPrice: number;
}

export default function CategorySidebar({
  allCategories,
  currentId,
  brands,
  colors,
  minPrice,
  maxPrice,
}: CategorySidebarProps) {
  const { t } = useLanguage();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedCats, setExpandedCats] = useState<
    Set<string>
  >(new Set());

  // Filter state from URL
  const search = searchParams.get("search") || "";
  const sort = searchParams.get("sort") || "newest";
  const priceMin = searchParams.get("priceMin") || "";
  const priceMax = searchParams.get("priceMax") || "";
  const rating = searchParams.get("rating") || "";
  const brand = searchParams.get("brand") || "";
  const color = searchParams.get("color") || "";
  const inStock = searchParams.get("inStock") || "";

  // Local state for price inputs
  const [localPriceMin, setLocalPriceMin] =
    useState(priceMin);
  const [localPriceMax, setLocalPriceMax] =
    useState(priceMax);

  useEffect(() => {
    setLocalPriceMin(priceMin);
    setLocalPriceMax(priceMax);
  }, [priceMin, priceMax]);

  // Expand active category by default
  useEffect(() => {
    const active = allCategories.find(
      (c) =>
        c._id.toString() === currentId ||
        allCategories.find(
          (sc) =>
            sc._id.toString() === currentId &&
            sc.parentId?.toString() ===
              c._id.toString()
        )
    );
    if (active && active.parentId) {
      setExpandedCats(
        new Set([active.parentId.toString()])
      );
    } else if (active) {
      setExpandedCats(
        new Set([active._id.toString()])
      );
    }
  }, [currentId, allCategories]);

  const createQueryString = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(
        searchParams.toString()
      );
      Object.entries(updates).forEach(
        ([key, value]) => {
          if (value) {
            params.set(key, value);
          } else {
            params.delete(key);
          }
        }
      );
      // Reset to page 1 when filters change
      params.delete("page");
      return params.toString();
    },
    [searchParams]
  );

  const updateFilter = (
    key: string,
    value: string
  ) => {
    router.push(
      `${pathname}?${createQueryString({
        [key]: value,
      })}`
    );
  };

  const clearAllFilters = () => {
    router.push(pathname);
  };

  const hasActiveFilters =
    search ||
    priceMin ||
    priceMax ||
    rating ||
    brand ||
    color ||
    inStock;

  const toggleCatExpand = (id: string) => {
    setExpandedCats((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // Build category tree
  const rootCategories = allCategories.filter(
    (c) => !c.parentId
  );
  const getSubCategories = (parentId: string) =>
    allCategories.filter(
      (c) =>
        c.parentId &&
        c.parentId.toString() === parentId
    );

  const sidebarContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-muted-foreground/50" />
          {t("categories")}
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="text-[10px] font-semibold text-muted-foreground/50 hover:text-foreground transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground/40" />
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) =>
            updateFilter("search", e.target.value)
          }
          className="w-full bg-muted border border-border rounded-lg py-2.5 pl-9 pr-8 text-xs font-medium text-foreground placeholder:text-muted-foreground/40 focus:ring-1 focus:ring-foreground/20 focus:border-foreground/20 outline-none transition-all"
        />
        {search && (
          <button
            onClick={() => updateFilter("search", "")}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground/40 hover:text-foreground"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Sort */}
      <div className="space-y-2.5">
        <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Sort by
        </label>
        <div className="space-y-1">
          {[
            { id: "newest", label: "Newest" },
            {
              id: "price_low",
              label: "Price: Low to High",
            },
            {
              id: "price_high",
              label: "Price: High to Low",
            },
            { id: "rating", label: "Top Rated" },
          ].map((opt) => (
            <button
              key={opt.id}
              onClick={() =>
                updateFilter("sort", opt.id)
              }
              className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                sort === opt.id
                  ? "bg-foreground text-background"
                  : "text-muted-foreground/60 hover:bg-muted hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-3">
        <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Price Range
        </label>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-medium text-muted-foreground/40">
              ৳
            </span>
            <input
              type="number"
              placeholder="Min"
              value={localPriceMin}
              onChange={(e) =>
                setLocalPriceMin(e.target.value)
              }
              onBlur={() =>
                updateFilter(
                  "priceMin",
                  localPriceMin
                )
              }
              className="w-full bg-muted border border-border rounded-lg py-2 pl-7 pr-2 text-xs font-medium text-foreground placeholder:text-muted-foreground/40 focus:ring-1 focus:ring-foreground/20 outline-none transition-all"
            />
          </div>
          <span className="text-muted-foreground/30 text-xs">
            –
          </span>
          <div className="relative flex-1">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[10px] font-medium text-muted-foreground/40">
              ৳
            </span>
            <input
              type="number"
              placeholder="Max"
              value={localPriceMax}
              onChange={(e) =>
                setLocalPriceMax(e.target.value)
              }
              onBlur={() =>
                updateFilter(
                  "priceMax",
                  localPriceMax
                )
              }
              className="w-full bg-muted border border-border rounded-lg py-2 pl-7 pr-2 text-xs font-medium text-foreground placeholder:text-muted-foreground/40 focus:ring-1 focus:ring-foreground/20 outline-none transition-all"
            />
          </div>
        </div>
        {/* Price range visual bar */}
        <div className="space-y-1.5">
          <div className="h-1 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-foreground/30 rounded-full transition-all"
              style={{
                width: `${
                  maxPrice > 0
                    ? ((parseFloat(priceMax) || maxPrice) /
                        maxPrice) *
                      100
                    : 0
                }%`,
              }}
            />
          </div>
          <div className="flex justify-between text-[9px] font-medium text-muted-foreground/40">
            <span>
              ৳{minPrice.toLocaleString("bn-BD")}
            </span>
            <span>
              ৳{maxPrice.toLocaleString("bn-BD")}
            </span>
          </div>
        </div>
      </div>

      {/* Rating Filter */}
      <div className="space-y-2.5">
        <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Rating
        </label>
        <div className="space-y-1">
          {[4, 3, 2, 1].map((r) => (
            <button
              key={r}
              onClick={() =>
                updateFilter(
                  "rating",
                  rating === String(r) ? "" : String(r)
                )
              }
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                rating === String(r)
                  ? "bg-foreground text-background"
                  : "text-muted-foreground/60 hover:bg-muted hover:text-foreground"
              }`}
            >
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      className={`w-3 h-3 ${
                        i < r
                          ? "fill-amber-400 text-amber-400"
                          : "fill-black/[0.08] text-black/[0.08] dark:fill-white/[0.1] dark:text-white/[0.1]"
                      }`}
                    />
                  )
                )}
              </div>
              <span>& Up</span>
            </button>
          ))}
        </div>
      </div>

      {/* Brand Filter */}
      {brands.length > 0 && (
        <div className="space-y-2.5">
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Brand
          </label>
          <div className="space-y-1 max-h-40 overflow-y-auto scrollbar-hide">
            {brands.map((b) => (
              <button
                key={b}
                onClick={() =>
                  updateFilter(
                    "brand",
                    brand === b ? "" : b
                  )
                }
                className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between ${
                  brand === b
                    ? "bg-foreground text-background"
                    : "text-muted-foreground/60 hover:bg-muted hover:text-foreground"
                }`}
              >
                <span className="truncate">{b}</span>
                {brand === b && (
                  <X className="w-3 h-3 shrink-0 ml-2" />
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Color Filter */}
      {colors.length > 0 && (
        <div className="space-y-2.5">
          <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Color
          </label>
          <div className="flex flex-wrap gap-1.5">
            {colors.map((c) => (
              <button
                key={c}
                onClick={() =>
                  updateFilter(
                    "color",
                    color === c ? "" : c
                  )
                }
                className={`px-3 py-1.5 rounded-lg text-[11px] font-medium transition-all border ${
                  color === c
                    ? "bg-foreground text-background border-foreground"
                    : "text-muted-foreground/60 border-border hover:border-border-strong"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Availability */}
      <div className="space-y-2.5">
        <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Availability
        </label>
        <button
          onClick={() =>
            updateFilter(
              "inStock",
              inStock === "true" ? "" : "true"
            )
          }
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all border ${
            inStock === "true"
              ? "bg-foreground text-background border-foreground"
              : "text-muted-foreground/60 border-border hover:bg-muted"
          }`}
        >
          <div
            className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
              inStock === "true"
                ? "bg-background border-background"
                : "border-border"
            }`}
          >
            {inStock === "true" && (
              <svg
                className="w-3 h-3 text-foreground"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}
          </div>
          In Stock Only
        </button>
      </div>

      {/* Category Tree */}
      <div className="space-y-2.5 pt-2 border-t border-border">
        <label className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
          Categories
        </label>
        <div className="space-y-0.5 max-h-[300px] overflow-y-auto scrollbar-hide">
          {rootCategories.map((cat) => {
            const subs = getSubCategories(
              cat._id.toString()
            );
            const isActive =
              cat._id.toString() === currentId ||
              subs.some(
                (s) =>
                  s._id.toString() === currentId
              );
            const isExpanded = expandedCats.has(
              cat._id.toString()
            );

            return (
              <div key={cat._id}>
                <div className="flex items-center">
                  <Link
                    href={`/category/${cat._id}`}
                    className={`flex-1 flex items-center justify-between px-3 py-2 rounded-lg transition-all text-xs font-medium ${
                      isActive
                        ? "bg-foreground text-background"
                        : "text-muted-foreground/60 hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <span className="truncate">
                      {cat.name}
                    </span>
                    {isActive && (
                      <ChevronRight className="w-3 h-3 shrink-0" />
                    )}
                  </Link>
                  {subs.length > 0 && (
                    <button
                      onClick={() =>
                        toggleCatExpand(
                          cat._id.toString()
                        )
                      }
                      className="p-1.5 text-muted-foreground/40 hover:text-foreground"
                    >
                      <ChevronDown
                        className={`w-3 h-3 transition-transform ${
                          isExpanded
                            ? "rotate-180"
                            : ""
                        }`}
                      />
                    </button>
                  )}
                </div>
                <AnimatePresence>
                  {isExpanded &&
                    subs.length > 0 && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        className="ml-3 pl-3 border-l border-border space-y-0.5 overflow-hidden"
                      >
                        {subs.map((sub) => (
                          <Link
                            key={sub._id}
                            href={`/category/${sub._id}`}
                            className={`block px-3 py-1.5 text-[11px] font-medium rounded-md transition-all ${
                              sub._id.toString() ===
                              currentId
                                ? "text-foreground bg-muted"
                                : "text-muted-foreground/50 hover:text-foreground hover:bg-muted/50"
                            }`}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile filter toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-20 right-4 z-40 bg-foreground text-background p-3.5 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.2)] active:scale-95 transition-transform"
      >
        <ListFilter className="w-5 h-5" />
      </button>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] lg:hidden"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
              }}
              className="fixed left-0 top-0 h-full w-[320px] max-w-[85vw] bg-card z-[201] overflow-y-auto p-5 lg:hidden"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-bold text-foreground">
                  Filters
                </h3>
                <button
                  onClick={() =>
                    setMobileOpen(false)
                  }
                  className="p-1.5 rounded-lg bg-muted text-muted-foreground/50 hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24 bg-card rounded-xl border border-border p-5 shadow-xs max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide">
          {sidebarContent}
        </div>
      </aside>
    </>
  );
}
