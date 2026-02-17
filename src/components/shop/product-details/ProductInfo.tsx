"use client";

import { Star, Zap, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import AddToCartButton from "@/app/(shop)/products/[id]/AddToCartButton";
import WishlistButton from "@/app/(shop)/products/[id]/WishlistButton";
import ShareButton from "@/app/(shop)/products/[id]/ShareButton";
import ProductHighlights from "./ProductHighlights";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { useLanguage } from "@/components/LanguageContext";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { t, language } = useLanguage();
  const [selectedWeight, setSelectedWeight] = useState(1);
  const router = useRouter();
  const { addToCart } = useCart();

  const weights = [
    { label: `${(500).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}${t('unit_g')}`, price: product.price / 2, value: 0.5 },
    { label: `${(1).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}${t('unit_kg')}`, price: product.price, value: 1 },
    { label: `${(2).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}${t('unit_kg')}`, price: product.price * 1.9, value: 2 },
    { label: `${(5).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}${t('unit_kg')}`, price: product.price * 4.5, value: 5 },
  ];

  const unitToKey: Record<string, string> = {
    pcs: 'unit_piece',
    kg: 'unit_kg',
    g: 'unit_g',
    l: 'unit_l',
    ml: 'unit_ml',
    pack: 'unit_pack',
    box: 'unit_box',
    bottle: 'unit_bottle',
    dozen: 'unit_dozen',
  };

  const isWeightUnit = !product.unit || ['kg', 'g', 'l', 'ml'].includes(product.unit);

  const handleBuyNow = () => {
    // Logic to handle weight variation could be added here
    if (isMaxReached) return;
    addToCart(product, 1);
    router.push("/checkout");
  };

  const discountPercent = product.discount || (product.discountPrice ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0);

  const productName = language === 'en' ? (product.nameEn || product.name) : product.name;
  const productDesc = language === 'en' ? (product.descriptionEn || product.description) : product.description;
  const categoryName = language === 'en' ? (product.category?.nameEn || product.category?.name) : product.category?.name;

  return (
    <div className="w-full lg:w-1/2 space-y-8">
      <div className="space-y-4">
        {/* Category & Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-1.5 rounded-2xl text-xs font-black uppercase tracking-widest">
              {categoryName || t('grocery')}
            </span>
            <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-2xl text-amber-600">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-black">{(product.rating || 4.9).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')} ({(product.reviews || 120).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')} {t('reviews_count')})</span>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 font-bold text-sm ${
            product.stock === 0 
              ? "text-red-500" 
              : product.stock <= 5 
                ? "text-amber-500" 
                : "text-emerald-600 dark:text-emerald-400"
          }`}>
            <CheckCircle2 className="w-4 h-4" />
            <span>
              {product.stock === 0 
                ? t('out_of_stock_label') 
                : product.stock <= 5 
                  ? `${t('low_stock')} - ${product.stock} ${t(unitToKey[product.unit || 'pcs'] || 'unit_piece')}`
                  : t('stock_available')}
            </span>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-gray-800 dark:text-white leading-tight">
          {productName}
        </h1>

        {/* Price Section */}
        <div className="flex items-center gap-6 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-[32px] border border-gray-100 dark:border-gray-800">
          <div className="space-y-1">
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">{t('current_price')}</p>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-green-600 dark:text-green-500">
                {t('currency_symbol')}{(product.discountPrice || product.price).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
              </span>
              {product.discountPrice && (
                <span className="text-xl text-gray-400 dark:text-gray-500 line-through font-bold">
                  {t('currency_symbol')}{product.price.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
                </span>
              )}
            </div>
          </div>
          <div className="h-12 w-px bg-gray-200 dark:bg-gray-800" />
          {discountPercent > 0 && (
            <div className="bg-orange-500 text-white px-4 py-2 rounded-2xl text-sm font-black shadow-lg shadow-orange-500/20">
                {discountPercent.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}% {t('off')}
            </div>
          )}
        </div>
      </div>

      {/* Weight Selection */}
      {isWeightUnit && (
        <div className="space-y-4">
          <p className="text-sm font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest">{t('select_quantity')}</p>
          <div className="flex flex-wrap gap-3">
            {weights.map((w) => (
              <button
                key={w.value}
                onClick={() => setSelectedWeight(w.value)}
                className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all border-2 ${
                  selectedWeight === w.value
                    ? "border-green-600 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                    : "border-gray-100 dark:border-gray-800 text-gray-500 hover:border-gray-200 dark:hover:border-gray-700"
                }`}
              >
                {w.label}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="space-y-6">
        <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed font-medium">
          {productDesc || t('no_description')}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <AddToCartButton product={product} />
          <button 
            onClick={handleBuyNow}
            disabled={product.stock === 0 || isMaxReached}
            className="w-full flex items-center justify-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-5 rounded-[24px] font-black text-lg hover:opacity-90 transition-all shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Zap className="w-6 h-6 fill-current" />
            {product.stock === 0 ? t('out_of_stock') : isMaxReached ? t('low_stock') : t('buy_now_btn')}
          </button>
        </div>
      </div>

      {/* Highlights Grid */}
      <ProductHighlights />

      {/* Additional Actions */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <WishlistButton product={product} />
          <span className="text-sm font-bold text-gray-500">{t('add_to_wishlist_text')}</span>
        </div>
        <div className="w-px h-8 bg-gray-100 dark:bg-gray-800" />
        <div className="flex items-center gap-2">
          <ShareButton productName={productName} />
          <span className="text-sm font-bold text-gray-500">{t('share_text_label')}</span>
        </div>
      </div>
    </div>
  );
}
