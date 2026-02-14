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
    <div className="md:hidden px-4 pb-3">
      <form action="/products" method="GET" className="relative group">
        <div className="relative flex items-center">
          <input
            type="text"
            name="q"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="সার্চ করুন..."
            className="w-full bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl py-3 pl-12 pr-10 text-base font-bold text-gray-900 dark:text-gray-100 placeholder:text-gray-500 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 dark:focus:border-green-400 transition-all outline-none"
          />
          <Search className="w-5 h-5 text-gray-400 dark:text-gray-500 absolute left-4" />
          {searchTerm && (
            <button
              type="button"
              onClick={() => setSearchTerm("")}
              className="absolute right-3 p-1 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
