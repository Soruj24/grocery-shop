"use client";

import { Search, X } from "lucide-react";
import { useState } from "react";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="hidden lg:flex flex-1 max-w-2xl px-8">
      <form action="/products" method="GET" className="relative w-full group">
        <div className="relative flex items-center">
          <input
            type="text"
            name="q"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="আপনার প্রয়োজনীয় পণ্যটি খুঁজুন..."
            className="w-full bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 rounded-3xl py-4 pl-14 pr-24 focus:bg-white dark:focus:bg-black focus:border-green-500 focus:ring-[10px] focus:ring-green-500/5 transition-all outline-none text-base font-bold text-gray-900 dark:text-white placeholder:text-gray-400"
          />
          <Search className="w-6 h-6 text-gray-400 absolute left-5 group-focus-within:text-green-600 transition-colors" />
          
          <div className="absolute right-3 flex items-center gap-2">
            {searchTerm && (
              <button 
                type="button"
                onClick={() => setSearchTerm("")}
                className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button className="bg-gray-900 dark:bg-white text-white dark:text-black px-6 py-2 rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all shadow-xl">
              সার্চ
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
