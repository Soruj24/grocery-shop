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
    <div className="hidden lg:flex flex-1 max-w-2xl px-8" ref={search.searchRef}>
      <form onSubmit={search.handleSubmit} className="relative w-full group z-50">
        <div className="relative flex items-center bg-card dark:bg-card rounded-full border border-border transition-all duration-300 shadow-sm hover:shadow-md focus-within:shadow-focus focus-within:border-primary overflow-hidden h-[56px]">
          <div className="flex-1 relative flex items-center h-full">
            <Search className="absolute left-4 w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors pointer-events-none" />
            <input
              ref={search.inputRef}
              type="text"
              value={search.searchTerm}
              onChange={(e) => search.setSearchTerm(e.target.value)}
              onKeyDown={search.handleKeyDown}
              onFocus={() => search.setIsOpen(true)}
              placeholder={t("search_placeholder")}
              className="w-full h-full bg-transparent border-none pl-12 pr-12 text-foreground placeholder-muted-foreground focus:ring-0 text-sm font-semibold"
            />
            {search.searchTerm && (
              <button
                type="button"
                onClick={() => {
                  search.setSearchTerm("");
                  search.setIsOpen(false);
                  search.inputRef.current?.focus();
                }}
                className="absolute right-12 p-1.5 rounded-full bg-muted text-muted-foreground hover:text-danger hover:bg-danger-subtle transition-all"
              >
                <X className="w-3 h-3" />
              </button>
            )}
            <button
              type="button"
              onClick={search.startVoiceSearch}
              className={`absolute right-3 p-2 rounded-full transition-all ${
                search.isListening
                  ? "bg-danger-subtle text-danger animate-pulse ring-2 ring-danger/20"
                  : "text-muted-foreground hover:text-primary hover:bg-primary-subtle dark:hover:bg-primary-subtle"
              }`}
            >
              {search.isListening ? (
                <div className="w-4 h-4 relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <Mic className="w-3 h-3 relative z-10" />
                </div>
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
          </div>
          <Button
            type="submit"
            variant="primary"
            loading={search.isLoading}
            leftIcon={!search.isLoading ? <Search className="w-4 h-4" /> : undefined}
            className="h-[46px] mr-1.5 px-6 rounded-full font-bold text-sm shadow-lg shadow-primary/20 hover:shadow-primary/30 flex items-center gap-2 transform hover:scale-105 active:scale-95"
          >
            <span className="hidden xl:inline">{t("search_button")}</span>
          </Button>
        </div>
        <SearchDropdownContent search={search} />
      </form>
    </div>
  );
}
