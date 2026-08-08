"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { Category } from "@/types/category";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";

interface MobileFilterSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  mainCategories: Category[];
  selectedCategory: string;
  parentCategory: Category | null | undefined;
  onCategorySelect: (id: string) => void;
  minPrice: string;
  maxPrice: string;
  onMinPriceChange: (val: string) => void;
  onMaxPriceChange: (val: string) => void;
  onApply: () => void;
  onClear: () => void;
}

export default function MobileFilterSidebar({
  isOpen,
  onClose,
  categories,
  mainCategories,
  selectedCategory,
  parentCategory,
  onCategorySelect,
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
  onApply,
  onClear,
}: MobileFilterSidebarProps) {
  const { t } = useLanguage();
  const [expandedSection, setExpandedSection] =
    useState<string | null>("category");

  const toggleSection = (section: string) => {
    setExpandedSection(
      expandedSection === section ? null : section
    );
  };

  const activeFilterCount =
    (selectedCategory ? 1 : 0) +
    (minPrice && minPrice !== "0" ? 1 : 0) +
    (maxPrice && maxPrice !== "10000" ? 1 : 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] lg:hidden"
            onClick={onClose}
          />

          {/* Bottom Sheet */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 300,
            }}
            className="fixed bottom-0 left-0 right-0 z-[201] lg:hidden bg-white dark:bg-[#09090b] rounded-t-3xl max-h-[85vh] flex flex-col shadow-[0_-8px_30px_rgba(0,0,0,0.12)]"
            style={{
              paddingBottom:
                "env(safe-area-inset-bottom)",
            }}
          >
            {/* Handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-10 h-1 rounded-full bg-black/[0.1] dark:bg-white/[0.1]" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between px-5 py-3 border-b border-black/[0.04] dark:border-white/[0.04]">
              <div className="flex items-center gap-2.5">
                <Filter className="h-4 w-4 text-muted-foreground/60" />
                <h2 className="text-base font-bold text-foreground">
                  {t("filter")}
                </h2>
                {activeFilterCount > 0 && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground text-[9px] font-bold text-background">
                    {activeFilterCount}
                  </span>
                )}
              </div>
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.04] dark:bg-white/[0.06] text-muted-foreground hover:text-foreground hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-4 space-y-2">
              {/* Category Section */}
              <div className="rounded-2xl border border-black/[0.04] dark:border-white/[0.04] overflow-hidden">
                <button
                  onClick={() =>
                    toggleSection("category")
                  }
                  className="w-full flex items-center justify-between p-4 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm font-semibold text-foreground">
                    {t("categories")}
                  </span>
                  {expandedSection === "category" ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground/40" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground/40" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedSection === "category" && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-1">
                        <button
                          onClick={() =>
                            onCategorySelect("")
                          }
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                            !selectedCategory
                              ? "bg-foreground text-background"
                              : "text-muted-foreground/60 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                          }`}
                        >
                          {t("all_products")}
                        </button>
                        {mainCategories.map(
                          (cat) => (
                            <button
                              key={cat._id}
                              onClick={() =>
                                onCategorySelect(
                                  cat._id
                                )
                              }
                              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                                selectedCategory ===
                                cat._id
                                  ? "bg-foreground text-background"
                                  : "text-muted-foreground/60 hover:bg-black/[0.04] dark:hover:bg-white/[0.06]"
                              }`}
                            >
                              {cat.name}
                            </button>
                          )
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Price Section */}
              <div className="rounded-2xl border border-black/[0.04] dark:border-white/[0.04] overflow-hidden">
                <button
                  onClick={() =>
                    toggleSection("price")
                  }
                  className="w-full flex items-center justify-between p-4 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors"
                >
                  <span className="text-sm font-semibold text-foreground">
                    {t("price_range")}
                  </span>
                  {expandedSection === "price" ? (
                    <ChevronUp className="h-4 w-4 text-muted-foreground/40" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-muted-foreground/40" />
                  )}
                </button>
                <AnimatePresence>
                  {expandedSection === "price" && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: "auto" }}
                      exit={{ height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-3">
                        <div className="flex items-center justify-between text-sm font-bold text-foreground">
                          <span>
                            {t("currency_symbol")}
                            {(
                              Number(minPrice) || 0
                            ).toLocaleString("bn-BD")}
                          </span>
                          <span>
                            {t("currency_symbol")}
                            {(
                              Number(maxPrice) || 10000
                            ).toLocaleString("bn-BD")}
                          </span>
                        </div>
                        <div className="relative h-2 rounded-full bg-black/[0.06] dark:bg-white/[0.06]">
                          <div
                            className="absolute h-full rounded-full bg-foreground"
                            style={{
                              left: `${
                                ((Number(minPrice) ||
                                  0) /
                                  10000) *
                                100
                              }%`,
                              right: `${
                                100 -
                                ((Number(maxPrice) ||
                                  10000) /
                                  10000) *
                                  100
                              }%`,
                            }}
                          />
                          <input
                            type="range"
                            min={0}
                            max={10000}
                            step={100}
                            value={
                              Number(minPrice) || 0
                            }
                            onChange={(e) =>
                              onMinPriceChange(
                                e.target.value
                              )
                            }
                            className="pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent"
                          />
                          <input
                            type="range"
                            min={0}
                            max={10000}
                            step={100}
                            value={
                              Number(maxPrice) || 10000
                            }
                            onChange={(e) =>
                              onMaxPriceChange(
                                e.target.value
                              )
                            }
                            className="pointer-events-none absolute inset-0 h-full w-full appearance-none bg-transparent"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          <input
                            type="number"
                            value={minPrice}
                            onChange={(e) =>
                              onMinPriceChange(
                                e.target.value
                              )
                            }
                            placeholder="Min"
                            className="rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.03] px-3.5 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-foreground/20 transition-all"
                          />
                          <input
                            type="number"
                            value={maxPrice}
                            onChange={(e) =>
                              onMaxPriceChange(
                                e.target.value
                              )
                            }
                            placeholder="Max"
                            className="rounded-xl border border-black/[0.06] dark:border-white/[0.06] bg-black/[0.02] dark:bg-white/[0.03] px-3.5 py-3 text-sm font-medium text-foreground placeholder:text-muted-foreground/30 outline-none focus:border-foreground/20 transition-all"
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Footer Actions */}
            <div className="px-5 py-4 border-t border-black/[0.04] dark:border-white/[0.04] space-y-2.5 bg-white dark:bg-[#09090b]">
              <button
                onClick={() => {
                  onApply();
                  onClose();
                }}
                className="w-full bg-foreground text-background py-3.5 rounded-xl text-sm font-semibold hover:opacity-90 active:scale-[0.98] transition-all shadow-[0_2px_8px_rgba(0,0,0,0.12)]"
              >
                {t("apply_filter")}{" "}
                {activeFilterCount > 0 &&
                  `(${activeFilterCount})`}
              </button>
              <button
                onClick={() => {
                  onClear();
                  onClose();
                }}
                className="w-full text-sm font-semibold text-muted-foreground/50 hover:text-foreground py-2 transition-colors"
              >
                {t("clear_all")}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
