"use client";

import { useState } from "react";

export function useSearchHistory() {
  const [history, setHistory] = useState<string[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("search_history");
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });

  const addToHistory = (term: string) => {
    if (!term.trim()) return;
    setHistory((prev) => {
      const next = [term, ...prev.filter((h) => h !== term)].slice(0, 5);
      localStorage.setItem("search_history", JSON.stringify(next));
      return next;
    });
  };

  const removeFromHistory = (e: React.MouseEvent, term: string) => {
    e.preventDefault();
    e.stopPropagation();
    setHistory((prev) => {
      const next = prev.filter((h) => h !== term);
      localStorage.setItem("search_history", JSON.stringify(next));
      return next;
    });
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("search_history");
  };

  return { history, addToHistory, removeFromHistory, clearHistory };
}
