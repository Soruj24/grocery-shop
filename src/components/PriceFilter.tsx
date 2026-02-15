"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";

interface PriceFilterProps {
  initialMin: string;
  initialMax: string;
}

export default function PriceFilter({ initialMin, initialMax }: PriceFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  
  const [min, setMin] = useState(initialMin);
  const [max, setMax] = useState(initialMax);

  const updateURL = useCallback((newMin: string, newMax: string) => {
    const params = new URLSearchParams(searchParams);
    if (newMin && newMin !== "0") params.set("minPrice", newMin);
    else params.delete("minPrice");
    
    if (newMax && newMax !== "10000") params.set("maxPrice", newMax);
    else params.delete("maxPrice");
    
    params.set("page", "1");
    router.push(`/products?${params.toString()}`, { scroll: false });
  }, [router, searchParams]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (min !== initialMin || max !== initialMax) {
        updateURL(min, max);
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [min, max, initialMin, initialMax, updateURL]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-sm font-bold text-gray-700 dark:text-gray-300">
        <span>{t('currency_symbol')} {min}</span>
        <span>{t('currency_symbol')} {max}</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase ml-1">{t('min_price')}</label>
          <input
            type="number"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-gray-100"
            value={min}
            onChange={(e) => setMin(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase ml-1">{t('max_price')}</label>
          <input
            type="number"
            className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border-none rounded-xl text-sm font-bold outline-none focus:ring-2 focus:ring-green-500 text-gray-900 dark:text-gray-100"
            value={max}
            onChange={(e) => setMax(e.target.value)}
          />
        </div>
      </div>
      <input
        type="range"
        min="0"
        max="10000"
        step="100"
        className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-green-600"
        value={max}
        onChange={(e) => setMax(e.target.value)}
      />
    </div>
  );
}
