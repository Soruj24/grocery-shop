"use client";

import { Search, Loader2, Mic, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearch } from "@/features/search/hooks/useSearch";
import SearchDropdownContent from "./SearchDropdownContent";

export default function SearchBar() {
  const { t } = useLanguage();
  const search = useSearch();

  return (
    <div className="hidden lg:flex flex-1 max-w-2xl px-8" ref={search.searchRef}>
      <form onSubmit={search.handleSubmit} className="relative w-full group z-50">
        <div className="relative flex items-center bg-white dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 transition-all duration-300 shadow-sm hover:shadow-md focus-within:shadow-[0_0_0_4px_rgba(34,197,94,0.1)] focus-within:border-green-500 overflow-hidden h-[56px]">
          <div className="flex-1 relative flex items-center h-full">
            <Search className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors pointer-events-none" />
            <input
              ref={search.inputRef}
              type="text"
              value={search.searchTerm}
              onChange={(e) => search.setSearchTerm(e.target.value)}
              onKeyDown={search.handleKeyDown}
              onFocus={() => search.setIsOpen(true)}
              placeholder={t("search_placeholder")}
              className="w-full h-full bg-transparent border-none pl-12 pr-12 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 text-sm font-semibold"
            />
            {search.searchTerm && (
              <button
                type="button"
                onClick={() => {
                  search.setSearchTerm("");
                  search.setIsOpen(false);
                  search.inputRef.current?.focus();
                }}
                className="absolute right-12 p-1.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
              >
                <X className="w-3 h-3" />
              </button>
            )}
            <button
              type="button"
              onClick={search.startVoiceSearch}
              className={`absolute right-3 p-2 rounded-full transition-all ${
                search.isListening
                  ? "bg-red-50 text-red-500 animate-pulse ring-2 ring-red-100"
                  : "text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-white/5"
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
          <button
            type="submit"
            className="h-[46px] mr-1.5 px-6 bg-green-600 hover:bg-green-500 text-white rounded-full font-bold text-sm transition-all duration-300 shadow-lg shadow-green-600/20 hover:shadow-green-500/30 flex items-center gap-2 transform hover:scale-105 active:scale-95"
          >
            {search.isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span className="hidden xl:inline">{t("search_button")}</span>
              </>
            )}
          </button>
        </div>
        <SearchDropdownContent search={search} />
      </form>
    </div>
  );
}
