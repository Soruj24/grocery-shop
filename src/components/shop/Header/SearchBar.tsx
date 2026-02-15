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
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";

export default function SearchBar() {
  const { t, language } = useLanguage();
  
  const POPULAR_SEARCHES = [
    t('popular_search_1'),
    t('popular_search_2'),
    t('popular_search_3'),
    t('popular_search_4'),
    t('popular_search_5'),
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
    if (!('webkitSpeechRecognition' in window) && !('speechRecognition' in window)) {
      alert(t('voice_search_not_supported'));
      return;
    }

    const win = window as any;
    const SpeechRecognition = win.webkitSpeechRecognition || win.SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language === 'bn' ? "bn-BD" : "en-US";
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
    { id: "all", name: t('categories_title'), icon: "📦" },
    { id: "fruits", name: t('cat_fruits'), icon: "🍎" },
    { id: "vegetables", name: t('cat_vegetables'), icon: "🥦" },
    { id: "meat", name: t('cat_meat'), icon: "🥩" },
    { id: "fish", name: t('cat_fish'), icon: "🐟" },
    { id: "dairy", name: t('cat_dairy'), icon: "🥛" },
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
  const categorySuggestions = debouncedTerm.length >= 2 
    ? categories.filter(cat => 
        cat.name.includes(debouncedTerm) && cat.id !== "all"
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
      <form onSubmit={handleSubmit} className="relative w-full group">
        <div className="relative flex items-center bg-gray-50 dark:bg-white/5 rounded-[24px] border border-transparent group-focus-within:border-green-500/50 group-focus-within:bg-white dark:group-focus-within:bg-black transition-all duration-300 shadow-sm group-focus-within:shadow-[0_0_20px_rgba(34,197,94,0.15)] overflow-hidden">
          {/* Category Filter Dropdown */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="flex items-center gap-2 pl-6 pr-4 py-4 text-sm font-black text-gray-700 dark:text-gray-300 hover:text-green-600 transition-colors border-r border-gray-200/50 dark:border-white/5"
            >
              <Filter
                size={16}
                className={isCategoryOpen ? "text-green-600" : ""}
              />
              <span className="max-w-[80px] truncate">
                {categories.find((c) => c.id === selectedCategory)?.name}
              </span>
              <ChevronDown
                size={14}
                className={`transition-transform duration-300 ${isCategoryOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {isCategoryOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-48 bg-white dark:bg-[#0F172A] border border-gray-100 dark:border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
                >
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => {
                        setSelectedCategory(cat.id);
                        setIsCategoryOpen(false);
                      }}
                      className={`w-full text-left px-6 py-3 text-sm font-bold hover:bg-green-50 dark:hover:bg-green-500/10 transition-colors ${
                        selectedCategory === cat.id
                          ? "text-green-600 bg-green-50 dark:bg-green-500/5"
                          : "text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {cat.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative flex-1 flex items-center">
            <Search className="w-5 h-5 text-gray-400 absolute left-4 group-focus-within:text-green-600 transition-colors" />
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setIsOpen(true);
                setSelectedIndex(-1);
              }}
              onFocus={() => setIsOpen(true)}
              onKeyDown={handleKeyDown}
              placeholder={t('search_placeholder')}
              className="w-full bg-transparent py-4 pl-12 pr-10 outline-none text-base font-bold text-gray-900 dark:text-white placeholder:text-gray-400"
            />
          </div>

          <div className="flex items-center gap-1 pr-3 shrink-0">
            <button
              type="button"
              onClick={startVoiceSearch}
              className={`p-2 rounded-xl transition-all ${isListening ? "bg-rose-500 text-white animate-pulse" : "text-gray-400 hover:bg-gray-100 dark:hover:bg-white/10 hover:text-green-500"}`}
            >
              <Mic size={20} />
            </button>

            {isLoading ? (
              <Loader2 className="w-5 h-5 text-green-500 animate-spin mr-2" />
            ) : (
              searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-xl text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )
            )}
            <button
              type="submit"
              className="bg-gray-900 dark:bg-white text-white dark:text-black px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all shadow-lg active:scale-95 ml-2"
            >
              {t('search_action')}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-full left-0 right-0 mt-3 bg-white dark:bg-[#0F172A] border border-gray-100 dark:border-white/10 rounded-[32px] shadow-2xl z-50 overflow-hidden backdrop-blur-3xl"
            >
              <div className="p-4 max-h-[500px] overflow-y-auto custom-scrollbar">
                {/* Search History */}
                {!searchTerm && history.length > 0 && (
                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-4 mb-3">
                      {t('recent_searches')}
                    </p>
                    <div className="space-y-1">
                      {history.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center justify-between group px-4 py-2 hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl cursor-pointer"
                        >
                          <div
                            className="flex items-center gap-3 flex-1"
                            onClick={() => {
                              setSearchTerm(item);
                              inputRef.current?.focus();
                            }}
                          >
                            <History size={16} className="text-gray-300" />
                            <span className="text-sm font-bold text-gray-600 dark:text-gray-400">
                              {item}
                            </span>
                          </div>
                          <button
                            onClick={(e) => removeFromHistory(e, item)}
                            className="p-1 opacity-0 group-hover:opacity-100 hover:text-rose-500 transition-all"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Searches */}
                {!searchTerm && (
                  <div className="mb-4">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-4 mb-3">
                      {t('popular_searches_title')}
                    </p>
                    <div className="flex flex-wrap gap-2 px-4">
                      {POPULAR_SEARCHES.map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setSearchTerm(item);
                            inputRef.current?.focus();
                          }}
                          className="flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-white/5 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-full text-xs font-bold text-gray-600 dark:text-gray-400 transition-all"
                        >
                          <TrendingUp size={12} className="text-green-500" />
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Search Results */}
                {searchTerm.length >= 2 && (
                  <div className="space-y-6">
                    {/* Category Suggestions */}
                    {categorySuggestions.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-4">
                          {t('suggested_categories')}
                        </p>
                        <div className="grid grid-cols-2 gap-2 px-4">
                          {categorySuggestions.map((cat) => (
                            <Link
                              key={cat.id}
                              href={`/products?category=${cat.id}`}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-white/5 hover:bg-green-50 dark:hover:bg-green-500/10 rounded-2xl transition-all border border-transparent hover:border-green-100 dark:hover:border-green-500/20 group"
                            >
                              <span className="text-xl group-hover:scale-110 transition-transform">
                                {cat.icon}
                              </span>
                              <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                                {cat.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Product Results */}
                    <div className="space-y-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 px-4">
                        {t('products_title_search')}
                      </p>
                      {results && results.length > 0 ? (
                        <>
                          {results.map((product: any, idx: number) => (
                            <Link
                              key={product._id}
                              href={`/products/${product._id}`}
                              onClick={() => {
                                addToHistory(searchTerm);
                                setIsOpen(false);
                              }}
                              className={`flex items-center gap-4 p-3 rounded-2xl transition-all group ${
                                selectedIndex === idx
                                  ? "bg-green-50 dark:bg-green-500/10"
                                  : "hover:bg-gray-50 dark:hover:bg-white/5"
                              }`}
                            >
                              <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5 flex-shrink-0">
                                {product.image && (
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    width={56}
                                    height={56}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                  />
                                )}
                              </div>
                              <div className="flex-1">
                                <h4
                                  className={`text-sm font-bold transition-colors ${
                                    selectedIndex === idx
                                      ? "text-green-600"
                                      : "text-gray-900 dark:text-white group-hover:text-green-600"
                                  }`}
                                >
                                  {product.name}
                                </h4>
                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                  {t('currency_symbol')}{product.price} / {product.unit}
                                </p>
                              </div>
                              <ArrowRight
                                className={`w-4 h-4 text-gray-300 transition-all ${
                                  selectedIndex === idx
                                    ? "opacity-100 translate-x-1 text-green-500"
                                    : "opacity-0 group-hover:opacity-100 group-hover:translate-x-1"
                                }`}
                              />
                            </Link>
                          ))}
                          <Link
                            href={`/products?q=${encodeURIComponent(searchTerm)}${selectedCategory !== "all" ? `&category=${selectedCategory}` : ""}`}
                            onClick={() => {
                              addToHistory(searchTerm);
                              setIsOpen(false);
                            }}
                            className="flex items-center justify-center gap-2 p-4 mt-4 bg-gray-50 dark:bg-white/5 hover:bg-green-500 hover:text-white rounded-2xl text-sm font-black transition-all"
                          >
                            {t('see_all')}
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        </>
                      ) : (
                        !isLoading && (
                          <div className="p-8 text-center space-y-4">
                            <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto">
                              <Search className="w-8 h-8 text-gray-300" />
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 font-bold">
                              {t('no_products_found')}
                            </p>
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