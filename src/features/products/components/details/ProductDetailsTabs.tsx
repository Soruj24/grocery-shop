"use client";

import { Info } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Product } from "@/types/product";

interface ProductDetailsTabsProps {
  product: Product;
}

export default function ProductDetailsTabs({ product }: ProductDetailsTabsProps) {
  const { t } = useLanguage();

  const productName = product.name;

  return (
    <div className="bg-card rounded-2xl border border-border p-8 md:p-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-primary p-2 rounded-xl text-primary-foreground">
          <Info className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-black text-foreground">
          {t('product_details_title')}
        </h2>
      </div>
      <div className="prose prose-green dark:prose-invert max-w-none">
        <p className="text-muted-foreground leading-loose text-lg font-medium italic">
          &ldquo;{t('product_details_desc_prefix')} {productName} {t('product_details_desc_suffix')}&rdquo;
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-subtle p-6 rounded-2xl border border-border">
            <h4 className="font-black text-foreground mb-4">
              {t('features_title')}
            </h4>
            <ul className="space-y-3">
              {[
                t('feature_1'),
                t('feature_2'),
                t('feature_3'),
                t('feature_4'),
              ].map((f, i) => (
                <li
                  key={i}
                  className="flex items-center gap-3 text-sm font-bold text-muted-foreground"
                >
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-subtle p-6 rounded-2xl border border-border">
            <h4 className="font-black text-foreground mb-4">
              {t('delivery_info_title')}
            </h4>
            <p className="text-sm font-bold text-muted-foreground leading-relaxed">
              {t('delivery_info_desc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
