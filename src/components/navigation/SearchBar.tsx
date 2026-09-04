"use client";

import { Search, Mic, X, Command } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearch } from "@/features/search/hooks/useSearch";
import SearchDropdownContent from "./SearchDropdownContent";

export default function SearchBar() {
  const { t } = useLanguage();
  const search = useSearch();

  return (
    <div
      className="hidden lg:flex flex-1 max-w-xl"
      ref={search.searchRef}
    >
      <form
        onSubmit={search.handleSubmit}
        className="relative w-full group z-50"
      >
        <div className="relative flex items-center bg-muted rounded-xl border border-border transition-all duration-300 hover:border-border-strong focus-within:border-foreground/20 focus-within:bg-card focus-within:shadow-focus overflow-hidden h-10">
          <div className="flex-1 relative flex items-center h-full">
            <Search className="absolute left-3 w-4 h-4 text-muted-foreground/50 transition-colors duration-300 pointer-events-none group-focus-within:text-muted-foreground" />
            <input
              ref={search.inputRef}
              type="text"
              value={search.searchTerm}
              onChange={(e) =>
                search.setSearchTerm(e.target.value)
              }
              onKeyDown={search.handleKeyDown}
              onFocus={() => search.setIsOpen(true)}
              placeholder={t("search_placeholder")}
              className="w-full h-full bg-transparent border-none pl-10 pr-20 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:ring-0"
            />
            {search.searchTerm && (
              <button
                type="button"
                onClick={() => {
                  search.setSearchTerm("");
                  search.setIsOpen(false);
                  search.inputRef.current?.focus();
                }}
                className="absolute right-12 p-1 rounded-md text-muted-foreground/50 hover:text-foreground transition-colors duration-200"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={search.startVoiceSearch}
              className={`absolute right-3 p-1.5 rounded-lg transition-all duration-200 ${
                search.isListening
                    ? "bg-danger-subtle text-danger animate-pulse"
                    : "text-muted-foreground/50 hover:text-foreground hover:bg-muted"
              }`}
            >
              {search.isListening ? (
                <div className="w-4 h-4 relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-danger opacity-30"></span>
                  <Mic className="w-3.5 h-3.5 relative z-10" />
                </div>
              ) : (
                <Mic className="w-4 h-4" />
              )}
            </button>
          </div>
          <button
            type="submit"
            disabled={search.isLoading}
            className="h-8 mr-1.5 px-4 rounded-lg bg-primary text-primary-foreground text-xs font-semibold flex items-center gap-1.5 transition-all duration-300 hover:bg-primary-hover active:scale-[0.98] disabled:opacity-50"
          >
            {!search.isLoading && (
              <Search className="w-3.5 h-3.5" />
            )}
            <span className="hidden xl:inline">
              {t("search_button")}
            </span>
          </button>
        </div>
        <SearchDropdownContent search={search} />
      </form>
    </div>
  );
}
