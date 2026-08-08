"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  X,
  Mic,
  Clock,
  TrendingUp,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearch } from "@/features/search/hooks/useSearch";
import { getProductFallbackImage } from "@/constants/fallback-images";

interface MobileSearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSearchOverlay({
  isOpen,
  onClose,
}: MobileSearchOverlayProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const search = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const [localQuery, setLocalQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      setLocalQuery("");
      search.setSearchTerm("");
      search.setIsOpen(false);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = localQuery.trim();
    if (!q) return;
    search.addToHistory(q);
    router.push(`/products?q=${encodeURIComponent(q)}`);
    onClose();
  };

  const handleProductTap = (productId: string) => {
    search.addToHistory(localQuery);
    router.push(`/products/${productId}`);
    onClose();
  };

  const handleHistoryTap = (term: string) => {
    setLocalQuery(term);
    search.setSearchTerm(term);
    search.setIsOpen(true);
  };

  const handlePopularTap = (term: string) => {
    setLocalQuery(term);
    search.setSearchTerm(term);
    search.setIsOpen(true);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="fixed inset-0 z-[300] lg:hidden"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background"
            onClick={onClose}
          />

          {/* Content */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{
              duration: 0.2,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="relative flex flex-col h-full bg-background"
          >
            {/* Search Bar */}
            <div
              className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-black/[0.04] dark:border-white/[0.04]"
              style={{
                paddingTop: "env(safe-area-inset-top)",
              }}
            >
              <form
                onSubmit={handleSubmit}
                className="flex items-center gap-3 px-4 py-3"
              >
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/40" />
                  <input
                    ref={inputRef}
                    type="text"
                    value={localQuery}
                    onChange={(e) => {
                      setLocalQuery(e.target.value);
                      search.setSearchTerm(e.target.value);
                      search.setIsOpen(e.target.value.length >= 2);
                    }}
                    placeholder={
                      t("search_placeholder") ||
                      "Search products..."
                    }
                    className="w-full h-11 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] pl-10 pr-10 text-sm font-medium text-foreground placeholder:text-muted-foreground/40 outline-none border border-transparent focus:border-foreground/10 transition-all"
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck={false}
                  />
                  {localQuery && (
                    <button
                      type="button"
                      onClick={() => {
                        setLocalQuery("");
                        search.setSearchTerm("");
                        search.setIsOpen(false);
                        inputRef.current?.focus();
                      }}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-md text-muted-foreground/40 hover:text-foreground transition-colors"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-sm font-semibold text-muted-foreground/60 hover:text-foreground transition-colors shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
                >
                  {t("close")}
                </button>
              </form>
            </div>

            {/* Results */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* Loading */}
              {search.isLoading && (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="h-5 w-5 animate-spin text-muted-foreground/40" />
                </div>
              )}

              {/* Search Results */}
              {!search.isLoading &&
                search.searchTerm.length >= 2 &&
                search.results &&
                search.results.length > 0 && (
                  <div className="p-4">
                    <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest mb-3 px-1">
                      {t("products_text")}
                    </p>
                    <div className="space-y-1">
                      {search.results
                        .slice(0, 8)
                        .map((product) => (
                          <button
                            key={product._id}
                            onClick={() =>
                              handleProductTap(
                                product._id
                              )
                            }
                            className="w-full flex items-center gap-3.5 p-3 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.06] active:bg-black/[0.06] dark:active:bg-white/[0.08] transition-all text-left"
                          >
                            <div className="relative h-12 w-12 shrink-0 rounded-lg overflow-hidden bg-black/[0.04] dark:bg-white/[0.06]">
                              {product.image ? (
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <div className="flex h-full w-full items-center justify-center">
                                  <Search className="h-4 w-4 text-muted-foreground/20" />
                                </div>
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground line-clamp-1">
                                {product.name}
                              </p>
                              <p className="text-xs font-bold text-foreground mt-0.5">
                                {t("currency_symbol")}
                                {(
                                  product.discountPrice ||
                                  product.price
                                ).toLocaleString("bn-BD")}
                              </p>
                            </div>
                            <ArrowRight className="h-4 w-4 text-muted-foreground/20 shrink-0" />
                          </button>
                        ))}
                    </div>
                    <button
                      onClick={() => {
                        search.addToHistory(
                          localQuery
                        );
                        router.push(
                          `/products?q=${encodeURIComponent(localQuery)}`
                        );
                        onClose();
                      }}
                      className="w-full mt-3 py-3.5 text-center text-sm font-semibold text-muted-foreground/60 hover:text-foreground rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all min-h-[44px]"
                    >
                      {t("see_all")} →
                    </button>
                  </div>
                )}

              {/* No Results */}
              {!search.isLoading &&
                search.searchTerm.length >= 2 &&
                search.results &&
                search.results.length === 0 && (
                  <div className="py-16 text-center">
                    <Search className="mx-auto h-8 w-8 text-muted-foreground/15 mb-3" />
                    <p className="text-sm font-medium text-foreground">
                      No results found
                    </p>
                    <p className="text-xs text-muted-foreground/50 mt-1">
                      Try different keywords
                    </p>
                  </div>
                )}

              {/* History + Popular (when no query) */}
              {search.searchTerm.length < 2 && (
                <div className="p-4 space-y-6">
                  {/* Search History */}
                  {search.history.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-3 px-1">
                        <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest">
                          {t("recent_searches")}
                        </p>
                        <button
                          onClick={search.clearHistory}
                          className="text-[11px] font-medium text-muted-foreground/40 hover:text-foreground transition-colors"
                        >
                          {t("clear_all")}
                        </button>
                      </div>
                      <div className="space-y-0.5">
                        {search.history
                          .slice(0, 5)
                          .map((term, i) => (
                            <button
                              key={i}
                              onClick={() =>
                                handleHistoryTap(term)
                              }
                              className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-black/[0.04] dark:hover:bg-white/[0.06] active:bg-black/[0.06] dark:active:bg-white/[0.08] transition-all text-left"
                            >
                              <Clock className="h-4 w-4 text-muted-foreground/30 shrink-0" />
                              <span className="text-sm text-foreground/80 flex-1">
                                {term}
                              </span>
                              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/20 shrink-0" />
                            </button>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Popular Searches */}
                  <div>
                    <p className="text-[10px] font-bold text-muted-foreground/40 uppercase tracking-widest mb-3 px-1">
                      {t("popular_searches_title")}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {search.popularSearches.map(
                        (term, i) => (
                          <button
                            key={i}
                            onClick={() =>
                              handlePopularTap(term)
                            }
                            className="flex items-center gap-1.5 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] px-3.5 py-2.5 text-sm font-medium text-foreground/70 hover:bg-black/[0.06] dark:hover:bg-white/[0.08] active:bg-black/[0.08] dark:active:bg-white/[0.1] transition-all"
                          >
                            <TrendingUp className="h-3 w-3 text-muted-foreground/30" />
                            {term}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
