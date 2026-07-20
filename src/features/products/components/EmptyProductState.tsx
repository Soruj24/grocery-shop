"use client";

import { PackageX } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import Link from "next/link";

export default function EmptyProductState() {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <div className="bg-muted p-8 rounded-full mb-6 animate-pulse">
        <PackageX className="w-16 h-16 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-black text-foreground mb-2">
        {t('no_products_found')}
      </h3>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        {t('try_changing_filters')}
      </p>
      <Link
        href="/products"
        className="bg-primary hover:bg-primary-hover text-white px-8 py-3 rounded-full font-bold transition-all transform hover:scale-105 shadow-lg shadow-primary"
      >
        {t('see_all_products')}
      </Link>
    </div>
  );
}
