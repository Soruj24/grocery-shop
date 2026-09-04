"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileSearchFormProps {
  onClose: () => void;
}

export default function MobileSearchForm({
  onClose,
}: MobileSearchFormProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(
    null
  );

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    if (q.length === 0) return;
    router.push(
      `/products?q=${encodeURIComponent(q)}`
    );
    onClose();
  };

  return (
    <form
      onSubmit={onSubmit}
      className="flex items-center gap-2 p-3 rounded-xl bg-muted border border-border"
    >
      <Search className="w-4 h-4 text-muted-foreground/50 ml-1" />
      <input
        ref={inputRef}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={
          t("search_placeholder") || "Search products"
        }
        aria-label={
          t("search_placeholder") || "Search products"
        }
        className="flex-1 bg-transparent outline-none text-sm font-medium text-foreground placeholder:text-muted-foreground/50"
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-foreground text-background text-xs font-semibold transition-all duration-300 hover:bg-primary active:scale-[0.98]"
        aria-label="Search"
      >
        {t("search_button")}
      </button>
    </form>
  );
}
