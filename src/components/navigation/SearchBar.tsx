"use client";

import { Search, Mic, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearch } from "@/features/search/hooks/useSearch";
import SearchDropdownContent from "./SearchDropdownContent";
import { Button } from "@/components/ui";

export default function SearchBar() {
  const { t } = useLanguage();
  const search = useSearch();

  return (
    <div className="hidden lg:flex flex-1 max-w-xl" ref={search.searchRef}>
      <form onSubmit={search.handleSubmit} className="relative w-full group z-50">
        <div className="relative flex items-center bg-muted/50 rounded-xl border border-border transition-all duration-200 hover:border-border-strong focus-within:border-foreground/20 focus-within:bg-card focus-within:shadow-sm overflow-hidden h-10">
          <div className="flex-1 relative flex items-center h-full">
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground transition-colors pointer-events-none" />
            <input
              ref={search.inputRef}
              type="text"
              value={search.searchTerm}
              onChange={(e) => search.setSearchTerm(e.target.value)}
              onKeyDown={search.handleKeyDown}
              onFocus={() => search.setIsOpen(true)}
              placeholder={t("search_placeholder")}
              className="w-full h-full bg-transparent border-none pl-10 pr-10 text-foreground placeholder:text-muted-foreground/60 focus:ring-0 text-sm"
            />
            {search.searchTerm && (
              <button
                type="button"
                onClick={() => {
                  search.setSearchTerm("");
                  search.setIsOpen(false);
                  search.inputRef.current?.focus();
                }}
                className="absolute right-10 p-1 rounded-md text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={search.startVoiceSearch}
              className={`absolute right-3 p-1.5 rounded-md transition-colors ${
                search.isListening
                  ? "bg-danger-subtle text-danger animate-pulse"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {search.isListening ? (
                <div className="w-4 h-4 relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-40"></span>
                  <Mic className="w-3.5 h-3.5 relative z-10" />
                </div>
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>
          </div>
          <Button
            type="submit"
            variant="primary"
            size="sm"
            loading={search.isLoading}
            leftIcon={!search.isLoading ? <Search className="w-4 h-4" /> : undefined}
            className="h-8 mr-1 px-4 rounded-lg text-xs font-medium"
          >
            <span className="hidden xl:inline">{t("search_button")}</span>
          </Button>
        </div>
        <SearchDropdownContent search={search} />
      </form>
    </div>
  );
}
