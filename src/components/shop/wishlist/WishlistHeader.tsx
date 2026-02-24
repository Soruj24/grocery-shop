import Link from "next/link";
import { Heart, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

interface WishlistHeaderProps {
  totalItems: number;
  onClear: () => void;
}

export default function WishlistHeader({ totalItems, onClear }: WishlistHeaderProps) {
  const { t } = useLanguage();
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
      <div className="space-y-4">
        <nav className="flex items-center gap-2 text-sm font-bold text-gray-400 dark:text-gray-500">
          <Link
            href="/"
            className="hover:text-green-600 dark:hover:text-green-400 transition-colors"
          >
            {t('home_breadcrumb')}
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-800 dark:text-gray-100">{t('nav_wishlist')}</span>
        </nav>
        <div className="flex items-center gap-4">
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-2xl text-red-500 dark:text-red-400">
            <Heart className="w-8 h-8 fill-current" />
          </div>
          <h1 className="text-4xl font-black text-gray-800 dark:text-gray-100">
            {t('your_wishlist')}
          </h1>
        </div>
        <p className="text-gray-500 dark:text-gray-400 font-medium">
          {t('wishlist_saved_prefix')} {totalItems.toLocaleString('bn-BD')}{t('wishlist_saved_suffix')}
        </p>
      </div>

      {totalItems > 0 && (
        <button
          onClick={onClear}
          className="text-sm font-black text-red-500 dark:text-red-400 hover:text-red-600 dark:hover:text-red-300 underline decoration-2 underline-offset-4"
        >
          {t('clear_all_wishlist')}
        </button>
      )}
    </div>
  );
}
