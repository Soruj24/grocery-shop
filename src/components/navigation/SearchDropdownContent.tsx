"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { SearchContext } from "@/types/search";
import SearchHistorySection from "./SearchHistorySection";
import PopularSearchesSection from "./PopularSearchesSection";
import CategorySuggestions from "./CategorySuggestions";
import ProductSearchResults from "./ProductSearchResults";

interface SearchDropdownContentProps {
  search: SearchContext;
}

export default function SearchDropdownContent({
  search,
}: SearchDropdownContentProps) {
  return (
    <AnimatePresence>
      {search.isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.98 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute top-full left-0 right-0 mt-4 bg-card border border-border rounded-2xl shadow-2xl shadow-black/10 z-50 overflow-hidden backdrop-blur-xl"
        >
          <div className="p-6 max-h-[600px] overflow-y-auto custom-scrollbar">
            {!search.searchTerm && search.history.length > 0 && (
              <SearchHistorySection
                history={search.history}
                onItemClick={(term) => {
                  search.setSearchTerm(term);
                  search.inputRef.current?.focus();
                }}
                onItemRemove={search.removeFromHistory}
                onClearAll={search.clearHistory}
              />
            )}

            {!search.searchTerm && (
              <PopularSearchesSection
                popularSearches={search.popularSearches}
                onItemClick={(term) => {
                  search.setSearchTerm(term);
                  search.inputRef.current?.focus();
                }}
              />
            )}

            {search.searchTerm.length >= 2 && (
              <div className="space-y-8">
                {search.categorySuggestions.length > 0 && (
                  <CategorySuggestions
                    suggestions={search.categorySuggestions}
                    onCategoryClick={() => search.setIsOpen(false)}
                  />
                )}

                <ProductSearchResults
                  results={search.results}
                  isLoading={search.isLoading}
                  searchTerm={search.searchTerm}
                  selectedIndex={search.selectedIndex}
                  onProductClick={() => {
                    search.addToHistory(search.searchTerm);
                    search.setIsOpen(false);
                  }}
                  onSeeAllClick={() => {
                    search.addToHistory(search.searchTerm);
                    search.setIsOpen(false);
                  }}
                />
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
