"use client";

import {
  Search,
  X,
  Loader2,
  ArrowRight,
  Mic,
  History,
  TrendingUp,
  Filter,
  ChevronDown,
  Star,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";
import { getProductFallbackImage } from "@/lib/category-utils";
import { Product } from "@/types/product";

export default function SearchBar() {
  const { t, language } = useLanguage();

  const POPULAR_SEARCHES = [
    t("popular_search_1"),
    t("popular_search_2"),
    t("popular_search_3"),
    t("popular_search_4"),
    t("popular_search_5"),
  ];
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [history, setHistory] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const savedHistory = localStorage.getItem("search_history");
      return savedHistory ? JSON.parse(savedHistory) : [];
    }
    return [];
  });
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [debouncedTerm, setDebouncedTerm] = useState("");

  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Voice Search implementation
  const startVoiceSearch = () => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("speechRecognition" in window)
    ) {
      alert(t("voice_search_not_supported"));
      return;
    }

    const win = window as any;
    const SpeechRecognition =
      win.webkitSpeechRecognition || win.SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language === "bn" ? "bn-BD" : "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setSearchTerm(transcript);
      setIsListening(false);
      setIsOpen(true);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Categories for filter
  const categories = [
    { id: "all", name: t("categories_title"), icon: "📦" },
    { id: "fruits", name: t("cat_fruits"), icon: "🍎" },
    { id: "vegetables", name: t("cat_vegetables"), icon: "🥦" },
    { id: "meat", name: t("cat_meat"), icon: "🥩" },
    { id: "fish", name: t("cat_fish"), icon: "🐟" },
    { id: "dairy", name: t("cat_dairy"), icon: "🥛" },
  ];

  const addToHistory = (term: string) => {
    if (!term.trim()) return;
    const newHistory = [term, ...history.filter((h) => h !== term)].slice(0, 5);
    setHistory(newHistory);
    localStorage.setItem("search_history", JSON.stringify(newHistory));
  };

  const removeFromHistory = (e: React.MouseEvent, term: string) => {
    e.preventDefault();
    e.stopPropagation();
    const newHistory = history.filter((h) => h !== term);
    setHistory(newHistory);
    localStorage.setItem("search_history", JSON.stringify(newHistory));
  };

  const { data: results, isLoading } = useQuery({
    queryKey: ["search", debouncedTerm, selectedCategory],
    queryFn: async () => {
      if (debouncedTerm.length < 2 && selectedCategory === "all") return [];
      const res = await fetch(
        `/api/products/search?q=${encodeURIComponent(debouncedTerm)}&category=${selectedCategory}`,
      );
      return res.json();
    },
    enabled: debouncedTerm.length >= 2 || selectedCategory !== "all",
  });

  // Smart suggestions for categories
  const categorySuggestions =
    debouncedTerm.length >= 2
      ? categories.filter(
          (cat) => cat.name.includes(debouncedTerm) && cat.id !== "all",
        )
      : [];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setIsCategoryOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      setSelectedIndex((prev) =>
        results && prev < results.length - 1 ? prev + 1 : prev,
      );
    } else if (e.key === "ArrowUp") {
      setSelectedIndex((prev) => (prev > -1 ? prev - 1 : prev));
    } else if (e.key === "Enter") {
      if (selectedIndex > -1 && results?.[selectedIndex]) {
        router.push(`/products/${results[selectedIndex]._id}`);
        setIsOpen(false);
      } else {
        handleSubmit(e);
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      addToHistory(searchTerm);
      router.push(
        `/products?q=${encodeURIComponent(searchTerm)}${selectedCategory !== "all" ? `&category=${selectedCategory}` : ""}`,
      );
      setIsOpen(false);
    }
  };

  return (
    <div className="hidden lg:flex flex-1 max-w-2xl px-8" ref={searchRef}>
      <form onSubmit={handleSubmit} className="relative w-full group z-50">
        <div className="relative flex items-center bg-white dark:bg-white/5 rounded-full border border-gray-200 dark:border-white/10 transition-all duration-300 shadow-sm hover:shadow-md focus-within:shadow-[0_0_0_4px_rgba(34,197,94,0.1)] focus-within:border-green-500 overflow-hidden h-[56px]">
          {/* Category Filter Dropdown */}
          <div className="relative shrink-0 hidden xl:block h-full">
            <button
              type="button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center gap-2 pl-6 pr-4 h-full text-xs font-bold text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors border-r border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-transparent"
            >
              <div
                className={`p-1.5 rounded-md ${selectedCategory !== "all" ? "bg-green-100 text-green-600" : "bg-gray-100 dark:bg-white/10 text-gray-500"}`}
              >
                <Filter className="w-3.5 h-3.5" />
              </div>
              <span className="max-w-[80px] truncate">
                {categories.find((c) => c.id === selectedCategory)?.name}
              </span>
              <ChevronDown
                className={`w-3 h-3 transition-transform duration-300 ${
                  isCategoryOpen ? "rotate-180 text-green-600" : "text-gray-400"
                }`}
              />
            </button>

            {/* Category Dropdown Menu */}
            <AnimatePresence>
              {isCategoryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-[calc(100%+8px)] left-0 w-64 bg-white dark:bg-gray-900 rounded-2xl shadow-xl shadow-black/10 border border-gray-100 dark:border-white/10 py-2 z-50 overflow-hidden backdrop-blur-xl"
                >
                  <div className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-gray-400">
                    {t("categories_title")}
                  </div>
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => {
                        setSelectedCategory(category.id);
                        setIsCategoryOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-bold transition-all hover:bg-green-50 dark:hover:bg-white/5 ${
                        selectedCategory === category.id
                          ? "text-green-600 bg-green-50/50 dark:bg-green-500/10"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      <span className="text-lg">{category.icon}</span>
                      {category.name}
                      {selectedCategory === category.id && (
                        <motion.div
                          layoutId="activeDot"
                          className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500"
                        />
                      )}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Search Input */}
          <div className="flex-1 relative flex items-center h-full">
            <Search className="absolute left-4 w-5 h-5 text-gray-400 group-focus-within:text-green-500 transition-colors pointer-events-none" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsOpen(true)}
              placeholder={t("search_placeholder")}
              className="w-full h-full bg-transparent border-none pl-12 pr-12 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-0 text-sm font-semibold"
            />

            {/* Clear Button */}
            {searchTerm && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm("");
                  setIsOpen(false);
                  inputRef.current?.focus();
                }}
                className="absolute right-12 p-1.5 rounded-full bg-gray-100 dark:bg-white/10 text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
              >
                <X className="w-3 h-3" />
              </button>
            )}

            {/* Voice Search Button */}
            <button
              type="button"
              onClick={startVoiceSearch}
              className={`absolute right-3 p-2 rounded-full transition-all ${
                isListening
                  ? "bg-red-50 text-red-500 animate-pulse ring-2 ring-red-100"
                  : "text-gray-400 hover:text-green-600 hover:bg-green-50 dark:hover:bg-white/5"
              }`}
            >
              {isListening ? (
                <div className="w-4 h-4 relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <Mic className="w-3 h-3 relative z-10" />
                </div>
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="h-[46px] mr-1.5 px-6 bg-green-600 hover:bg-green-500 text-white rounded-full font-bold text-sm transition-all duration-300 shadow-lg shadow-green-600/20 hover:shadow-green-500/30 flex items-center gap-2 transform hover:scale-105 active:scale-95"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span className="hidden xl:inline">{t("search_button")}</span>
              </>
            )}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 rounded-[32px] shadow-2xl shadow-black/10 z-50 overflow-hidden backdrop-blur-xl"
            >
              <div className="p-6 max-h-[600px] overflow-y-auto custom-scrollbar">
                {/* Search History */}
                {!searchTerm && history.length > 0 && (
                  <div className="mb-8">
                    <div className="flex items-center justify-between px-2 mb-4">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
                        {t("recent_searches")}
                      </p>
                      <button
                        onClick={() => {
                          setHistory([]);
                          localStorage.removeItem("search_history");
                        }}
                        className="text-[10px] font-bold text-red-500 hover:text-red-600 transition-colors"
                      >
                        Clear All
                      </button>
                    </div>
                    <div className="space-y-1">
                      {history.map((item, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="flex items-center justify-between group px-4 py-3 hover:bg-gray-50 dark:hover:bg-white/5 rounded-2xl cursor-pointer transition-all border border-transparent hover:border-gray-100 dark:hover:border-white/5"
                        >
                          <div
                            className="flex items-center gap-4 flex-1"
                            onClick={() => {
                              setSearchTerm(item);
                              inputRef.current?.focus();
                            }}
                          >
                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-400 group-hover:text-green-500 transition-colors">
                              <History size={14} />
                            </div>
                            <span className="text-sm font-bold text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                              {item}
                            </span>
                          </div>
                          <button
                            onClick={(e) => removeFromHistory(e, item)}
                            className="p-2 text-gray-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-full transition-all opacity-0 group-hover:opacity-100"
                          >
                            <X size={14} />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                {!searchTerm && (
                  <div className="mb-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-2 mb-4">
                      {t("popular_searches_title")}
                    </p>
                    <div className="flex flex-wrap gap-2.5 px-2">
                      {POPULAR_SEARCHES.map((item, idx) => (
                        <motion.button
                          key={idx}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                          type="button"
                          onClick={() => {
                            setSearchTerm(item);
                            inputRef.current?.focus();
                          }}
                          className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-white/5 hover:bg-green-50 dark:hover:bg-green-500/10 border border-gray-100 dark:border-white/5 hover:border-green-200 dark:hover:border-green-500/30 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 transition-all group"
                        >
                          <TrendingUp
                            size={12}
                            className="text-gray-400 group-hover:text-green-500 transition-colors"
                          />
                          {item}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search Results */}
                {searchTerm.length >= 2 && (
                  <div className="space-y-8">
                    {/* Category Suggestions */}
                    {categorySuggestions.length > 0 && (
                      <div className="space-y-3">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-2">
                          {t("suggested_categories")}
                        </p>
                        <div className="grid grid-cols-2 gap-3 px-2">
                          {categorySuggestions.map((cat, idx) => (
                            <motion.div
                              key={cat.id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <Link
                                href={`/products?category=${cat.id}`}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-white/5 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-2xl transition-all border border-gray-100 dark:border-white/5 hover:border-green-200 dark:hover:border-green-500/30 group hover:shadow-lg hover:shadow-green-500/10"
                              >
                                <span className="text-2xl group-hover:scale-110 transition-transform duration-300 filter grayscale group-hover:grayscale-0">
                                  {cat.icon}
                                </span>
                                <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-green-700 dark:group-hover:text-green-400 transition-colors">
                                  {cat.name}
                                </span>
                                <ArrowRight className="w-4 h-4 ml-auto text-gray-300 group-hover:text-green-500 group-hover:translate-x-1 transition-all" />
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Product Results */}
                    <div className="space-y-3">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-2">
                        {t("products_title_search")}
                      </p>
                      {isLoading ? (
                        <div className="py-12 text-center space-y-4">
                          <Loader2 className="w-8 h-8 animate-spin text-green-500 mx-auto" />
                          <p className="text-gray-400 text-xs font-black uppercase tracking-widest animate-pulse">
                            {t("loading")}
                          </p>
                        </div>
                      ) : results && results.length > 0 ? (
                        <div className="space-y-2">
                          {results.map((product: Product, idx: number) => (
                            <motion.div
                              key={product._id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: idx * 0.05 }}
                            >
                              <Link
                                href={`/products/${product._id}`}
                                onClick={() => {
                                  addToHistory(searchTerm);
                                  setIsOpen(false);
                                }}
                                className={`flex items-center gap-4 p-3 rounded-2xl transition-all group border relative overflow-hidden ${
                                  selectedIndex === idx
                                    ? "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30"
                                    : "hover:bg-gray-50 dark:hover:bg-white/5 border-transparent hover:border-gray-100 dark:hover:border-white/5"
                                }`}
                              >
                                <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5 flex-shrink-0 relative group-hover:shadow-md transition-shadow">
                                  <Image
                                    src={
                                      product.image ||
                                      getProductFallbackImage(product.name)
                                    }
                                    alt={product.name}
                                    fill
                                    sizes="64px"
                                    className={`object-cover transition-transform duration-500 ${product.stock <= 0 ? "grayscale" : "group-hover:scale-110"}`}
                                  />
                                  {product.stock <= 0 && (
                                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                      <span className="text-[10px] font-black text-white uppercase tracking-wider text-center px-1 leading-tight">
                                        {t("out_of_stock")}
                                      </span>
                                    </div>
                                  )}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <h4
                                    className={`text-sm font-bold truncate transition-colors mb-1 ${
                                      selectedIndex === idx
                                        ? "text-green-600"
                                        : "text-gray-900 dark:text-white group-hover:text-green-600"
                                    }`}
                                  >
                                    {language === "en"
                                      ? product.nameEn || product.name
                                      : product.name}
                                  </h4>
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-xs font-black text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-md">
                                      {t("currency_symbol")}
                                      {(
                                        product.discountPrice || product.price
                                      ).toLocaleString(
                                        language === "bn" ? "bn-BD" : "en-US",
                                      )}
                                    </span>
                                    {product.discountPrice && (
                                      <span className="text-[10px] text-gray-400 line-through decoration-red-400 decoration-2">
                                        {t("currency_symbol")}
                                        {product.price.toLocaleString(
                                          language === "bn" ? "bn-BD" : "en-US",
                                        )}
                                      </span>
                                    )}
                                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                                      /{" "}
                                      {product.unit === "kg"
                                        ? t("unit_kg")
                                        : product.unit === "g"
                                          ? t("unit_g")
                                          : product.unit || t("default_unit")}
                                    </span>
                                  </div>
                                  {/* Rating & Stock Status */}
                                  <div className="flex items-center gap-3 mt-1.5">
                                    {(product.rating || 0) > 0 && (
                                      <div className="flex items-center gap-1">
                                        <Star className="w-3 h-3 text-orange-400 fill-current" />
                                        <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">
                                          {product.rating}
                                        </span>
                                      </div>
                                    )}
                                    {product.stock > 0 &&
                                      product.stock <= 5 && (
                                        <span className="text-[10px] font-bold text-orange-500 animate-pulse">
                                          {t("low_stock")}
                                        </span>
                                      )}
                                  </div>
                                </div>
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                                    selectedIndex === idx
                                      ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
                                      : "bg-gray-100 dark:bg-white/5 text-gray-400 group-hover:bg-green-500 group-hover:text-white"
                                  }`}
                                >
                                  <ArrowRight
                                    className={`w-4 h-4 transition-transform ${
                                      selectedIndex === idx
                                        ? "translate-x-0"
                                        : "group-hover:translate-x-0.5"
                                    }`}
                                  />
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                          <Link
                            href={`/products?q=${encodeURIComponent(searchTerm)}${selectedCategory !== "all" ? `&category=${selectedCategory}` : ""}`}
                            onClick={() => {
                              addToHistory(searchTerm);
                              setIsOpen(false);
                            }}
                            className="flex items-center justify-center gap-2 p-4 mt-4 bg-gray-50 dark:bg-white/5 hover:bg-green-500 hover:text-white rounded-2xl text-sm font-black transition-all"
                          >
                            {t("see_all")}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </div>
                      ) : (
                        !isLoading && (
                          <div className="py-12 text-center space-y-6">
                            <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto border border-dashed border-gray-200 dark:border-white/10 animate-pulse">
                              <Search className="w-8 h-8 text-gray-300" />
                            </div>
                            <div className="space-y-2">
                              <p className="text-gray-900 dark:text-white font-black text-lg">
                                {t("no_products_found")}
                              </p>
                              <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                                {t("search_placeholder")}
                              </p>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
