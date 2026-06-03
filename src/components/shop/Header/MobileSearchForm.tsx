"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";

interface MobileSearchFormProps {
  onClose: () => void;
}

export default function MobileSearchForm({ onClose }: MobileSearchFormProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q.length === 0) return;
    router.push(`/products?q=${encodeURIComponent(q)}`);
    onClose();
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2 p-3 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10">
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t("search_placeholder") || "Search products"}
        aria-label={t("search_placeholder") || "Search products"}
        className="flex-1 bg-transparent outline-none text-sm font-medium text-gray-700 dark:text-gray-200 placeholder:text-gray-400 dark:placeholder:text-gray-500 px-2"
      />
      <button type="submit" className="px-4 py-2 rounded-xl bg-gray-900 dark:bg-white text-white dark:text-black text-sm font-black" aria-label="Search">
        {t("search_button")}
      </button>
    </form>
  );
}
