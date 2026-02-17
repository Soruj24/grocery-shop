"use client";

import { Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useCart } from "@/components/CartContext";
import { Toast } from "@/lib/toast";
import { useLanguage } from "@/components/LanguageContext";
import { getProductFallbackImage } from "@/lib/category-utils";

interface FrequentlyBoughtTogetherProps {
  currentProduct: Product;
  relatedProducts: Product[];
}

export default function FrequentlyBoughtTogether({ currentProduct, relatedProducts }: FrequentlyBoughtTogetherProps) {
  const { t, language } = useLanguage();
  const { addToCart } = useCart();
  const bundleProducts = [currentProduct, ...relatedProducts.slice(0, 2)];
  const totalPrice = bundleProducts.reduce((sum, p) => sum + (p.discountPrice || p.price), 0);
  const originalPrice = bundleProducts.reduce((sum, p) => sum + p.price, 0);

  const getProductName = (product: Product) => language === 'en' ? (product.nameEn || product.name) : product.name;

  const handleAddBundle = () => {
    bundleProducts.forEach(p => addToCart(p, 1));
    Toast.fire({
      icon: 'success',
      title: t('bundle_success'),
      background: '#020617',
      color: '#fff',
    });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[40px] border border-gray-100 dark:border-gray-800 p-8 md:p-12">
      <h2 className="text-2xl font-black text-gray-800 dark:text-white mb-8">{t('bundle_offer_title')}</h2>
      
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="flex flex-wrap items-center justify-center gap-4 flex-1">
          {bundleProducts.map((product, idx) => (
            <div key={product._id} className="flex items-center gap-4">
              <div className="relative w-32 aspect-square bg-gray-50 dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-4">
                <Image
                  src={product.image || getProductFallbackImage(product.nameEn || product.name)}
                  alt={getProductName(product)}
                  fill
                  sizes="128px"
                  className="object-contain p-2"
                />
              </div>
              {idx < bundleProducts.length - 1 && (
                <div className="bg-gray-100 dark:bg-gray-800 p-2 rounded-full">
                  <Plus className="w-5 h-5 text-gray-400" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="w-full lg:w-72 space-y-4 text-center lg:text-left">
          <div className="space-y-1">
            <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t('bundle_total_price')}</p>
            <div className="flex items-baseline justify-center lg:justify-start gap-3">
              <span className="text-3xl font-black text-green-600 dark:text-green-500">{t('currency_symbol')}{Math.round(totalPrice * 0.95).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}</span>
              <span className="text-lg text-gray-400 line-through font-bold">{t('currency_symbol')}{totalPrice.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}</span>
            </div>
            <p className="text-xs font-black text-orange-500 bg-orange-50 dark:bg-orange-900/20 px-3 py-1 rounded-full inline-block">{t('bundle_extra_discount')}</p>
          </div>

          <button
            onClick={handleAddBundle}
            className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-4 rounded-2xl font-black transition-all shadow-xl shadow-green-600/20 active:scale-95"
          >
            <ShoppingCart className="w-5 h-5" />
            {t('bundle_add_all')}
          </button>
        </div>
      </div>
    </div>
  );
}
