"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, PackageX } from "lucide-react";
import { Product } from "@/types/product";
import { Category } from "@/types/category";
import { useLanguage } from "@/contexts/LanguageContext";
import { Drawer, Button, Skeleton } from "@/components/ui";
import { ProductCardSkeleton } from "@/components/ui/Skeleton";
import ProductCardRedesign from "./ProductCardRedesign";
import ProductListRow from "./ProductListRow";
import FilterSidebar from "./FilterSidebar";
import ProductToolbar from "./ProductToolbar";
import QuickViewModal from "./QuickViewModal";
import CompareBar from "./CompareBar";
import { CompareProvider } from "./CompareContext";

interface ProductListingProps {
  initialProducts: Product[];
  categories: Category[];
  brands: string[];
  totalPages: number;
  totalCount: number;
  pageSize?: number;
}

function buildListUrl(sp: URLSearchParams, page: number, limit: number) {
  const p = new URLSearchParams();
  const map: Record<string, string> = {
    q: "q",
    category: "category",
    sort: "sort",
    minPrice: "minPrice",
    maxPrice: "maxPrice",
    rating: "rating",
    inStock: "inStock",
    discount: "discount",
    brand: "brand",
  };
  Object.entries(map).forEach(([from, to]) => {
    const v = sp.get(from);
    if (v) p.set(to, v);
  });
  p.set("page", String(page));
  p.set("limit", String(limit));
  return `/api/products/list?${p.toString()}`;
}

export default function ProductListing({
  initialProducts,
  categories,
  brands,
  totalPages,
  totalCount,
  pageSize = 12,
}: ProductListingProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  const [view, setView] = useState<"grid" | "list">("grid");
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [quickView, setQuickView] = useState<Product | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  // Sync products when initial changes (navigation)
  useEffect(() => {
    setProducts(initialProducts);
    setPage(1);
  }, [initialProducts]);

  const hasMore = page < totalPages;

  const loadMore = useCallback(async () => {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const next = page + 1;
      const res = await fetch(buildListUrl(searchParams, next, pageSize));
      const data = await res.json();
      if (Array.isArray(data.products)) {
        setProducts((prev) => {
          const seen = new Set(prev.map((p) => p._id));
          const merged = [...prev, ...data.products.filter((p: Product) => !seen.has(p._id))];
          return merged;
        });
        setPage(next);
      }
    } catch {
      /* ignore */
    } finally {
      setLoadingMore(false);
    }
  }, [loadingMore, hasMore, page, searchParams, pageSize]);

  // Infinite scroll observer
  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || !hasMore) return;
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) loadMore();
      },
      { rootMargin: "400px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [hasMore, loadMore]);

  const pushParams = (overrides: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams);
    Object.entries(overrides).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    params.set("page", "1");
    router.push(`/products?${params.toString()}`, { scroll: false });
  };

  const search = searchParams.get("q") || "";
  const categoryId = searchParams.get("category") || "";
  const minPrice = searchParams.get("minPrice") || "0";
  const maxPrice = searchParams.get("maxPrice") || "10000";
  const sort = searchParams.get("sort") || "newest";
  const rating = searchParams.get("rating") || "";
  const inStock = searchParams.get("inStock") === "true";
  const discount = searchParams.get("discount") === "true";
  const brandParam = searchParams.get("brand") || "";
  const selectedBrands = brandParam
    .split(",")
    .map((b) => b.trim())
    .filter(Boolean);

  const mainCategories = categories.filter((c) => !c.parentId);
  const selectedCategoryData = categories.find((c) => c._id === categoryId);

  const hasActiveFilters = !!(
    search ||
    categoryId ||
    minPrice !== "0" ||
    maxPrice !== "10000" ||
    rating ||
    inStock ||
    discount ||
    selectedBrands.length > 0 ||
    sort !== "newest"
  );

  const sidebar = (
    <FilterSidebar
      categories={categories}
      mainCategories={mainCategories}
      selectedCategory={categoryId}
      brands={brands}
      selectedBrands={selectedBrands}
      minPrice={minPrice}
      maxPrice={maxPrice}
      rating={rating}
      inStock={inStock}
      discount={discount}
      onChange={(patch) =>
        pushParams({
          category: patch.category,
          minPrice: patch.minPrice,
          maxPrice: patch.maxPrice,
          rating: patch.rating,
          inStock: patch.inStock ? "true" : undefined,
          discount: patch.discount ? "true" : undefined,
        })
      }
      onBrandChange={(next) =>
        pushParams({ brand: next.length ? next.join(",") : undefined })
      }
      onClear={() => router.push("/products")}
    />
  );

  return (
    <CompareProvider>
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Desktop sidebar */}
        <aside className="hidden w-72 shrink-0 lg:block">
          <div className="sticky top-28 rounded-3xl border border-border bg-card p-6 shadow-sm">
            {sidebar}
          </div>
        </aside>

        <main className="min-w-0 flex-1 space-y-6">
          <ProductToolbar
            search={search}
            sort={sort}
            view={view}
            categories={categories}
            selectedCategoryData={selectedCategoryData}
            selectedBrands={selectedBrands}
            hasActiveFilters={hasActiveFilters}
            onSearch={(val) => pushParams({ q: val || undefined })}
            onSearchSubmit={() => pushParams({ q: search || undefined })}
            onSort={(val) => pushParams({ sort: val !== "newest" ? val : undefined })}
            onView={setView}
            onRemoveCategory={() => pushParams({ category: undefined })}
            onRemoveBrand={(b) =>
              pushParams({
                brand: selectedBrands
                  .filter((x) => x !== b)
                  .join(",") || undefined,
              })
            }
            onRemoveSearch={() => pushParams({ q: undefined })}
            onClearAll={() => router.push("/products")}
            onOpenFilters={() => setMobileFiltersOpen(true)}
            totalCount={totalCount}
          />

          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border bg-subtle py-24 text-center">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                <PackageX className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-black text-foreground">
                {t("no_products_found")}
              </h3>
              <p className="mt-2 text-sm font-medium text-muted-foreground">
                {t("try_changing_filters")}
              </p>
              <Button
                variant="outline"
                size="md"
                className="mt-6"
                onClick={() => router.push("/products")}
              >
                {t("see_all_products")}
              </Button>
            </div>
          ) : (
            <>
              {view === "grid" ? (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
                  {products.map((p) => (
                    <ProductCardRedesign
                      key={p._id}
                      product={p}
                      onQuickView={setQuickView}
                    />
                  ))}
                  {loadingMore &&
                    Array.from({ length: 4 }).map((_, i) => (
                      <ProductCardSkeleton key={`sk-${i}`} />
                    ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {products.map((p) => (
                    <ProductListRow
                      key={p._id}
                      product={p}
                      onQuickView={setQuickView}
                    />
                  ))}
                  {loadingMore &&
                    Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={`sk-${i}`}
                        className="h-40 rounded-2xl border border-border bg-card"
                      >
                        <Skeleton className="h-full w-full rounded-2xl" />
                      </div>
                    ))}
                </div>
              )}

              {/* Infinite scroll sentinel */}
              {hasMore && (
                <div
                  ref={sentinelRef}
                  className="flex items-center justify-center py-10 text-muted-foreground"
                >
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <span className="ml-2 text-sm font-bold">{t("load_more")}</span>
                </div>
              )}

              {/* Pagination (jump to page) */}
              {totalPages > 1 && (
                <PaginationBar
                  totalPages={totalPages}
                  currentPage={page}
                  onJump={(p) => {
                    const params = new URLSearchParams(searchParams);
                    params.set("page", String(p));
                    router.push(`/products?${params.toString()}`, { scroll: false });
                  }}
                />
              )}
            </>
          )}
        </main>
      </div>

      {/* Mobile filters drawer */}
      <Drawer open={mobileFiltersOpen} onClose={() => setMobileFiltersOpen(false)} side="right" title={t("filter")}>
        {sidebar}
      </Drawer>

      <QuickViewModal
        product={quickView}
        open={!!quickView}
        onClose={() => setQuickView(null)}
      />

      <CompareBar />
    </CompareProvider>
  );
}

function PaginationBar({
  totalPages,
  currentPage,
  onJump,
}: {
  totalPages: number;
  currentPage: number;
  onJump: (p: number) => void;
}) {
  const pages: (number | "...")[] = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else if (currentPage <= 4) {
    for (let i = 1; i <= 5; i++) pages.push(i);
    pages.push("...");
    pages.push(totalPages);
  } else if (currentPage >= totalPages - 3) {
    pages.push(1);
    pages.push("...");
    for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
  } else {
    pages.push(1);
    pages.push("...");
    for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
    pages.push("...");
    pages.push(totalPages);
  }

  return (
    <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={`d-${i}`} className="px-2 font-black text-muted-foreground">
            ...
          </span>
        ) : (
          <button
            key={p}
            onClick={() => onJump(p)}
            className={`h-11 min-w-[44px] rounded-xl px-3 text-sm font-black transition-all ${
              currentPage === p
                ? "bg-primary text-primary-foreground shadow-primary"
                : "border border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-primary"
            }`}
          >
            {p}
          </button>
        )
      )}
    </div>
  );
}
