"use client";

import Link from "next/link";
import { Heart, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface WishlistHeaderProps {
  totalItems: number;
  onClear: () => void;
}

export default function WishlistHeader({ totalItems, onClear }: WishlistHeaderProps) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div className="space-y-4">
        <nav className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
          <Link
            href="/"
            className="hover:text-primary transition-colors"
          >
            {t('home_breadcrumb')}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground">{t('nav_wishlist')}</span>
        </nav>
        <div className="flex items-center gap-4">
          <div className="bg-danger-subtle p-3 rounded-2xl text-danger">
            <Heart className="w-8 h-8 fill-current" />
          </div>
          <h1 className="text-4xl font-black text-foreground">
            {t('your_wishlist')}
          </h1>
        </div>
        <p className="text-muted-foreground font-medium">
          {t('wishlist_saved_prefix')} {totalItems.toLocaleString('bn-BD')}{t('wishlist_saved_suffix')}
        </p>
      </div>

      {totalItems > 0 && (
        <button
          onClick={onClear}
          className="text-sm font-black text-danger hover:opacity-80 underline decoration-2 underline-offset-4"
        >
          {t('clear_all_wishlist')}
        </button>
      )}
    </div>
  );
}
