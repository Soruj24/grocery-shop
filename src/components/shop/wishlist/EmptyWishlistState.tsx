import Link from "next/link";
import { Heart, ShoppingBag, ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

export default function EmptyWishlistState() {
  const { t } = useLanguage();

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[48px] border-2 border-dashed border-gray-100 dark:border-gray-800 p-20 text-center space-y-8">
      <div className="relative inline-block">
        <div className="bg-gray-50 dark:bg-gray-800 p-10 rounded-[40px]">
          <Heart className="w-20 h-20 text-gray-200 dark:text-gray-700" />
        </div>
        <div className="absolute -bottom-2 -right-2 bg-white dark:bg-gray-900 p-3 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800">
          <ShoppingBag className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
      </div>

      <div className="space-y-3">
        <h2 className="text-3xl font-black text-gray-800 dark:text-gray-100">
          {t('empty_wishlist_title')}
        </h2>
        <p className="text-gray-400 dark:text-gray-500 font-bold max-w-md mx-auto">
          {t('empty_wishlist_desc')}
        </p>
      </div>

      <Link
        href="/products"
        className="inline-flex items-center gap-3 bg-green-600 dark:bg-green-500 text-white px-10 py-5 rounded-[24px] font-black text-lg hover:bg-green-700 dark:hover:bg-green-600 transition-all shadow-xl shadow-green-900/20 active:scale-95"
      >
        {t('browse_products')}
        <ChevronRight className="w-6 h-6" />
      </Link>
    </div>
  );
}
