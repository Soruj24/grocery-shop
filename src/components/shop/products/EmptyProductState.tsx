"use client";

import { PackageX } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import Link from "next/link";

export default function EmptyProductState() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-full mb-6 animate-pulse">
        <PackageX className="w-16 h-16 text-gray-400 dark:text-gray-500" />
      </div>
      <h3 className="text-xl font-black text-gray-800 dark:text-gray-100 mb-2">
        {t('no_products_found')}
      </h3>
      <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
        {t('try_changing_filters')}
      </p>
      <Link
        href="/products"
        className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-green-600/30"
      >
        {t('see_all_products')}
      </Link>
    </div>
  );
}
