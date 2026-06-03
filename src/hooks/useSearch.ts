"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";
import { useDebounce } from "@/hooks/useDebounce";
import { useSearchHistory } from "@/hooks/useSearchHistory";
import type { Product } from "@/types/product";

export function useSearch() {
  const { t } = useLanguage();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isListening, setIsListening] = useState(false);
  const debouncedTerm = useDebounce(searchTerm, 300);
  const { history, addToHistory, removeFromHistory, clearHistory } =
    useSearchHistory();

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const POPULAR_SEARCHES = [
    t("popular_search_1"),
    t("popular_search_2"),
    t("popular_search_3"),
    t("popular_search_4"),
    t("popular_search_5"),
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const startVoiceSearch = useCallback(() => {
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
    recognition.lang = "bn-BD";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      setSearchTerm(event.results[0][0].transcript);
      setIsListening(false);
      setIsOpen(true);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  }, [t]);

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
      router.push(`/products?q=${encodeURIComponent(searchTerm)}`);
      setIsOpen(false);
    }
  };

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
