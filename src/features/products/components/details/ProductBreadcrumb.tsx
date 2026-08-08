"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Product } from "@/types/product";

interface ProductBreadcrumbProps {
  product: Product;
}

export default function ProductBreadcrumb({
  product,
}: ProductBreadcrumbProps) {
  const { t } = useLanguage();

  return (
    <nav
      className="flex items-center gap-1.5 text-sm text-muted-foreground/60"
      aria-label="Breadcrumb"
    >
      <Link
        href="/"
        className="hover:text-foreground transition-colors duration-200"
      >
        {t("home_breadcrumb")}
      </Link>
      <ChevronRight className="w-3.5 h-3.5" />
      <Link
        href="/products"
        className="hover:text-foreground transition-colors duration-200"
      >
        {t("products_breadcrumb")}
      </Link>
      <ChevronRight className="w-3.5 h-3.5" />
      <span className="text-foreground font-medium line-clamp-1">
        {product.name}
      </span>
    </nav>
  );
}
