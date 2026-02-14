"use client";

import { Search, X } from "lucide-react";

interface MobileSearchProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function MobileSearch({
  searchTerm,
  setSearchTerm,
}: MobileSearchProps) {
  return (
    <div className="lg:hidden px-4 pb-3 pt-1">
      <form action="/products" method="GET" className="relative group">
        <div className="relative flex items-center bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100/50 dark:border-white/5 shadow-sm focus-within:bg-white dark:focus-within:bg-black focus-within:border-green-500/50 transition-all duration-300">
          <div className="absolute left-4">
            <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 group-focus-within:text-green-500 transition-colors" />
          </div>
          <input
            type="text"
            name="q"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="সার্চ করুন..."
            className="w-full bg-transparent py-3.5 pl-12 pr-10 text-sm font-bold text-gray-900 dark:text-gray-100 placeholder:text-gray-500 outline-none"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 p-2 text-gray-400 hover:text-rose-500 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
