"use client";

import { useState, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { useDebounce } from "@/hooks/useDebounce";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useVoiceSearch } from "./useVoiceSearch";
import { useSearchHistory } from "./useSearchHistory";
import type { Product } from "@/types/product";

export function useSearch() {
  const { t } = useLanguage();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debouncedTerm = useDebounce(searchTerm, 300);
  const { history, addToHistory, removeFromHistory, clearHistory } =
    useSearchHistory();

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useClickOutside(searchRef, () => setIsOpen(false));
  const { isListening, isSupported: isVoiceSupported, startVoiceSearch } = useVoiceSearch({
    onResult: (transcript) => {
      setSearchTerm(transcript);
      setIsOpen(true);
    },
    onOpen: () => setIsOpen(true),
  });

  const POPULAR_SEARCHES = [
    t("popular_search_1"), t("popular_search_2"), t("popular_search_3"),
    t("popular_search_4"),     t("popular_search_5"),
  ];

  const categories = [
    { id: "all", name: t("categories_title"), icon: "📦" },
    { id: "fruits", name: t("cat_fruits"), icon: "🍎" },
    { id: "vegetables", name: t("cat_vegetables"), icon: "🥦" },
    { id: "meat", name: t("cat_meat"), icon: "🥩" },
    { id: "fish", name: t("cat_fish"), icon: "🐟" },
    { id: "dairy", name: t("cat_dairy"), icon: "🥛" },
  ];

  const { data: results, isLoading } = useQuery({
    queryKey: ["search", debouncedTerm],
    queryFn: async () => {
      if (debouncedTerm.length < 2) return [];
      const res = await fetch(
        `/api/products/search?q=${encodeURIComponent(debouncedTerm)}&category=all`,
      );
      return res.json() as Promise<Product[]>;
    },
    enabled: debouncedTerm.length >= 2,
  });

  const categorySuggestions =
    debouncedTerm.length >= 2
      ? categories.filter(
          (cat) => cat.name.includes(debouncedTerm) && cat.id !== "all",
        )
      : [];

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchTerm.trim()) {
        addToHistory(searchTerm);
        router.push(`/products?q=${encodeURIComponent(searchTerm)}`);
        setIsOpen(false);
      }
    },
    [searchTerm, addToHistory, router],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown")
        setSelectedIndex((prev) =>
          results && prev < results.length - 1 ? prev + 1 : prev);
      else if (e.key === "ArrowUp")
        setSelectedIndex((prev) => (prev > -1 ? prev - 1 : prev));
      else if (e.key === "Enter") {
        if (selectedIndex > -1 && results?.[selectedIndex]) {
          router.push(`/products/${results[selectedIndex]._id}`);
          setIsOpen(false);
        } else handleSubmit(e as unknown as React.FormEvent);
      } else if (e.key === "Escape") setIsOpen(false);
    },
    [results, selectedIndex, router, handleSubmit],
  );

  return {
    searchTerm,
    setSearchTerm,
    isOpen,
    setIsOpen,
    selectedIndex,
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    isListening,
    isVoiceSupported,
    results,
    isLoading,
    categorySuggestions,
    popularSearches: POPULAR_SEARCHES,
    inputRef,
    searchRef,
    handleSubmit,
    handleKeyDown,
    startVoiceSearch,
  };
}
