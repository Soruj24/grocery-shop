"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Product } from "@/types/product";

interface ProductBreadcrumbProps {
  product: Product;
}

export default function ProductBreadcrumb({ product }: ProductBreadcrumbProps) {
  const { t } = useLanguage();

  const productName = product.name;

  return (
    <nav className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
      <Link
        href="/"
        className="hover:text-primary transition-colors"
      >
        {t('home_breadcrumb')}
      </Link>
      <ChevronRight className="w-4 h-4" />
      <Link
        href="/products"
        className="hover:text-primary transition-colors"
      >
        {t('products_breadcrumb')}
      </Link>
      <ChevronRight className="w-4 h-4" />
      <span className="text-foreground line-clamp-1">
        {productName}
      </span>
    </nav>
  );
}
