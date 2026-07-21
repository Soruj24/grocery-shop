"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "@/types/product";

interface CompareContextValue {
  items: Product[];
  toggleCompare: (product: Product) => void;
  removeCompare: (id: string) => void;
  clearCompare: () => void;
  isComparing: (id: string) => boolean;
  count: number;
}

const CompareContext = createContext<CompareContextValue | undefined>(undefined);

const MAX_COMPARE = 4;
const STORAGE_KEY = "emran_compare";

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const persist = (next: Product[]) => {
    setItems(next);
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  };

  const toggleCompare = useCallback((product: Product) => {
    setItems((prev) => {
      let next: Product[];
      if (prev.find((p) => p._id === product._id)) {
        next = prev.filter((p) => p._id !== product._id);
      } else {
        if (prev.length >= MAX_COMPARE) return prev;
        next = [...prev, product];
      }
      try {
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const removeCompare = useCallback((id: string) => {
    persist(items.filter((p) => p._id !== id));
  }, [items]);

  const clearCompare = useCallback(() => persist([]), []);

  const isComparing = useCallback(
    (id: string) => !!items.find((p) => p._id === id),
    [items]
  );

  return (
    <CompareContext.Provider
      value={{
        items,
        toggleCompare,
        removeCompare,
        clearCompare,
        isComparing,
        count: items.length,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
