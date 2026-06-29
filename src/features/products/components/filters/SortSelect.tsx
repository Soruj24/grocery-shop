"use client";

import { SlidersHorizontal, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface SortSelectProps {
  sort: string;
  onChange: (value: string) => void;
}

export default function SortSelect({ sort, onChange }: SortSelectProps) {
  const { t } = useLanguage();

  return (
    <div className="relative flex-1 lg:flex-none group">
      <select value={sort} onChange={(e) => onChange(e.target.value)}
        className="w-full lg:w-[220px] pl-10 pr-10 py-3 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-sm outline-none appearance-none font-bold text-gray-700 dark:text-gray-100 focus:ring-4 focus:ring-green-500/10 focus:border-green-500 dark:focus:border-green-400 transition-all cursor-pointer">
        <option value="newest" className="dark:bg-gray-900">🆕 {t("sort_newest")}</option>
        <option value="oldest" className="dark:bg-gray-900">📅 {t("sort_oldest")}</option>
        <option value="price_low" className="dark:bg-gray-900">📉 {t("sort_price_low")}</option>
        <option value="price_high" className="dark:bg-gray-900">📈 {t("sort_price_high")}</option>
      </select>
      <SlidersHorizontal className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none group-focus-within:text-green-600 dark:group-focus-within:text-green-400 transition-colors" />
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 pointer-events-none" />
    </div>
  );
}
