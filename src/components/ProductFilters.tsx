"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, Filter, SlidersHorizontal, X, ChevronDown } from "lucide-react";

interface Category {
  _id: string;
  name: string;
  parentId?: string;
}

interface ProductFiltersProps {
  categories: Category[];
}

export default function ProductFilters({ categories }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [search, setSearch] = useState(searchParams.get("q") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "0");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "10000");
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || "");

  const mainCategories = categories.filter(cat => !cat.parentId);
  const selectedCategoryData = categories.find(cat => cat._id === selectedCategory);
  const parentCategory = selectedCategoryData?.parentId 
    ? categories.find(cat => cat._id === selectedCategoryData.parentId)
    : null;

  const applyFilters = () => {
    const params = new URLSearchParams(searchParams);
    
    if (search) params.set("q", search);
    else params.delete("q");
    
    if (selectedCategory) params.set("category", selectedCategory);
    else params.delete("category");
    
    if (minPrice && minPrice !== "0") params.set("minPrice", minPrice);
    else params.delete("minPrice");
    
    if (maxPrice && maxPrice !== "10000") params.set("maxPrice", maxPrice);
    else params.delete("maxPrice");
    
    if (sort !== "newest") params.set("sort", sort);
    else params.delete("sort");
    
    params.set("page", "1"); // Reset to page 1 on filter change
    
    router.push(`/products?${params.toString()}`);
    setIsMobileFiltersOpen(false);
  };

  const clearFilters = () => {
    setSearch("");
    setMinPrice("0");
    setMaxPrice("10000");
    setSort("newest");
    setSelectedCategory("");
    router.push("/products");
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="relative group">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="পছন্দের পণ্য খুঁজুন..."
            className="w-full pl-12 pr-28 py-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-[24px] shadow-sm outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500 dark:focus:border-green-400 transition-all text-gray-700 dark:text-gray-100 font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && applyFilters()}
          />
          <Search className="absolute left-4 text-gray-400 group-focus-within:text-green-600 dark:group-focus-within:text-green-400 transition-colors w-5 h-5" />
          
          <div className="absolute right-2 flex items-center gap-1">
            {search && (
              <button 
                onClick={() => setSearch("")}
                className="p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={applyFilters}
              className="bg-green-600 dark:bg-green-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-green-700 dark:hover:bg-green-600 transition-all shadow-lg shadow-green-900/10 active:scale-95"
            >
              খুঁজুন
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        {/* Sorting and Filter Toggle */}
        <div className="flex items-center gap-3 w-full lg:w-auto">
          <div className="relative flex-1 lg:flex-none group">
            <select
              className="w-full lg:w-[220px] pl-10 pr-10 py-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm outline-none appearance-none font-bold text-gray-700 dark:text-gray-100 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 dark:focus:border-green-400 transition-all cursor-pointer"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                const params = new URLSearchParams(searchParams);
                params.set("sort", e.target.value);
                router.push(`/products?${params.toString()}`);
              }}
            >
              <option value="newest" className="dark:bg-gray-900">🆕 নতুন পণ্য</option>
              <option value="oldest" className="dark:bg-gray-900">📅 পুরাতন পণ্য</option>
              <option value="price_low" className="dark:bg-gray-900">📉 দাম (কম থেকে বেশি)</option>
              <option value="price_high" className="dark:bg-gray-900">📈 দাম (বেশি থেকে কম)</option>
            </select>
            <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none group-focus-within:text-green-600 dark:group-focus-within:text-green-400 transition-colors" />
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
          </div>
          
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-4 py-3 rounded-2xl shadow-sm font-bold text-gray-700 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 active:scale-95 transition-all"
          >
            <Filter className="w-5 h-5 text-green-600 dark:text-green-400" />
            ফিল্টার
          </button>
        </div>

        {/* Selected Filters Chips (Desktop) */}
        <div className="hidden lg:flex flex-wrap items-center gap-2 flex-1 px-4">
          {selectedCategory && (
            <div className="flex items-center gap-2 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-green-100 dark:border-green-900/30">
              {selectedCategoryData?.name}
              <button onClick={() => { setSelectedCategory(""); applyFilters(); }}>
                <X className="w-3 h-3 hover:text-red-500 dark:hover:text-red-400" />
              </button>
            </div>
          )}
          {search && (
            <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 px-3 py-1.5 rounded-lg text-xs font-bold border border-blue-100 dark:border-blue-900/30">
              "{search}"
              <button onClick={() => { setSearch(""); applyFilters(); }}>
                <X className="w-3 h-3 hover:text-red-500 dark:hover:text-red-400" />
              </button>
            </div>
          )}
        </div>

        {/* Clear Filters Button (Desktop) */}
        {(search || selectedCategory || minPrice !== "0" || maxPrice !== "10000" || sort !== "newest") && (
          <button
            onClick={clearFilters}
            className="hidden lg:flex items-center gap-2 text-red-500 dark:text-red-400 font-bold hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-xl transition-all"
          >
            <X className="w-4 h-4" />
            সব ফিল্টার মুছুন
          </button>
        )}
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 bg-black/60 dark:bg-black/80 z-50 lg:hidden backdrop-blur-sm animate-in fade-in duration-300">
          <div className="absolute right-0 top-0 h-full w-[320px] bg-white dark:bg-gray-900 p-8 shadow-2xl animate-in slide-in-from-right duration-500 rounded-l-[40px] border-l border-gray-100 dark:border-gray-800">
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-2xl font-black text-gray-800 dark:text-gray-100 flex items-center gap-2">
                <Filter className="w-6 h-6 text-green-600 dark:text-green-400" />
                ফিল্টার
              </h2>
              <button 
                onClick={() => setIsMobileFiltersOpen(false)}
                className="p-2 bg-gray-50 dark:bg-gray-800 hover:bg-red-50 dark:hover:bg-red-900/30 text-gray-400 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 rounded-xl transition-all"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-10 overflow-y-auto max-h-[calc(100vh-180px)] pr-2 no-scrollbar">
              {/* Categories */}
              <div>
                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4">ক্যাটাগরি</h3>
                <div className="space-y-2">
                  <button
                    onClick={() => setSelectedCategory("")}
                    className={`w-full text-left px-5 py-3 rounded-2xl font-bold text-sm transition-all ${
                      selectedCategory === "" ? "bg-green-600 dark:bg-green-500 text-white shadow-lg shadow-green-900/20" : "text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                    }`}
                  >
                    সব ক্যাটাগরি
                  </button>
                  {mainCategories.map((cat) => (
                    <div key={cat._id} className="space-y-1">
                      <button
                        onClick={() => setSelectedCategory(cat._id)}
                        className={`w-full flex items-center justify-between px-5 py-3 rounded-2xl font-bold text-sm transition-all ${
                          selectedCategory === cat._id || parentCategory?._id === cat._id 
                            ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400" 
                            : "text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-900/20"
                        }`}
                      >
                        {cat.name}
                        {(selectedCategory === cat._id || parentCategory?._id === cat._id) && <ChevronDown className="w-4 h-4 rotate-180" />}
                      </button>
                      
                      {(selectedCategory === cat._id || parentCategory?._id === cat._id) && (
                        <div className="ml-6 space-y-1 border-l-2 border-green-100 dark:border-green-900/30 pl-4 py-1">
                          {categories
                            .filter(sub => sub.parentId === cat._id)
                            .map(sub => (
                              <button
                                key={sub._id}
                                onClick={() => setSelectedCategory(sub._id)}
                                className={`w-full text-left px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                  selectedCategory === sub._id ? "text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20" : "text-gray-500 dark:text-gray-500"
                                }`}
                              >
                                {sub.name}
                              </button>
                            ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h3 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-4">মূল্য পরিসীমা</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase ml-1">সর্বনিম্ন</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-sm font-black text-gray-700 dark:text-gray-100 outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase ml-1">সর্বোচ্চ</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-none rounded-2xl text-sm font-black text-gray-700 dark:text-gray-100 outline-none focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 p-8 bg-white dark:bg-gray-900 border-t border-gray-50 dark:border-gray-800 space-y-4">
              <button
                onClick={applyFilters}
                className="w-full bg-green-600 dark:bg-green-500 text-white py-4 rounded-[24px] font-black shadow-xl shadow-green-900/20 hover:bg-green-700 dark:hover:bg-green-600 transition-all active:scale-95"
              >
                ফিল্টার প্রয়োগ করুন
              </button>
              <button
                onClick={clearFilters}
                className="w-full text-red-500 dark:text-red-400 font-bold py-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-all"
              >
                সব মুছুন
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
