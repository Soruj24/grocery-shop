"use client";

import { Info } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { Product } from "@/types/product";

interface ProductDetailsTabsProps {
  product: Product;
}

export default function ProductDetailsTabs({ product }: ProductDetailsTabsProps) {
  const { t } = useLanguage();

  const productName = product.name;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[40px] border border-gray-100 dark:border-gray-800 p-8 md:p-12">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-green-600 dark:bg-green-700 p-2 rounded-xl text-white">
          <Info className="w-5 h-5" />
        </div>
        <h2 className="text-2xl font-black text-gray-800 dark:text-white">
          {t('product_details_title')}
        </h2>
      </div>
      <div className="prose prose-green dark:prose-invert max-w-none">
        <p className="text-gray-600 dark:text-gray-400 leading-loose text-lg font-medium italic">
          &ldquo;{t('product_details_desc_prefix')} {productName} {t('product_details_desc_suffix')}&rdquo;
        </p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-[32px] border border-gray-100 dark:border-gray-700">
            <h4 className="font-black text-gray-800 dark:text-white mb-4">
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
                  className="flex items-center gap-3 text-sm font-bold text-gray-600 dark:text-gray-400"
                >
                  <div className="w-1.5 h-1.5 bg-green-500 dark:bg-green-400 rounded-full" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-[32px] border border-gray-100 dark:border-gray-700">
            <h4 className="font-black text-gray-800 dark:text-white mb-4">
              {t('delivery_info_title')}
            </h4>
            <p className="text-sm font-bold text-gray-600 dark:text-gray-400 leading-relaxed">
              {t('delivery_info_desc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
