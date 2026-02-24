"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { Product } from "@/types/product";

interface ProductBreadcrumbProps {
  product: Product;
}

export default function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  const { t } = useLanguage();

  const productName = product.name;

  return (
    <nav className="flex items-center gap-2 text-sm font-bold text-gray-400 dark:text-gray-500">
      <Link
        href="/"
        className="hover:text-green-600 dark:hover:text-green-500 transition-colors"
      >
        {t('home_breadcrumb')}
      </Link>
      <ChevronRight className="w-4 h-4" />
      <Link
        href="/products"
        className="hover:text-green-600 dark:hover:text-green-500 transition-colors"
      >
        {t('products_breadcrumb')}
      </Link>
      <ChevronRight className="w-4 h-4" />
      <span className="text-gray-800 dark:text-gray-200 line-clamp-1">
        {productName}
      </span>
    </nav>
  );
}
