"use client";

import ProductCard from "../ProductCard";
import { Product } from "@/types/product";
import { useLanguage } from "@/contexts/LanguageContext";

interface RelatedProductsProps {
  products: Product[];
}

export default function RelatedProducts({ products }: RelatedProductsProps) {
  const { t } = useLanguage();

  if (products.length === 0) return null;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-black text-foreground">{t('related_products_title')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}
