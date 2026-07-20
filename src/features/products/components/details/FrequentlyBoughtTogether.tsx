"use client";

import { Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { toast } from "react-hot-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProductFallbackImage } from "@/constants/fallback-images";

interface FrequentlyBoughtTogetherProps {
  currentProduct: Product;
  relatedProducts: Product[];
}

export default function FrequentlyBoughtTogether({ currentProduct, relatedProducts }: FrequentlyBoughtTogetherProps) {
  const { t } = useLanguage();
  const { addToCart } = useCart();
  
  if (!relatedProducts || relatedProducts.length === 0) return null;

  const bundleProducts = [currentProduct, ...relatedProducts.slice(0, 2)];
  const totalPrice = bundleProducts.reduce((sum, p) => sum + (p.discountPrice || p.price), 0);
  const originalPrice = bundleProducts.reduce((sum, p) => sum + p.price, 0);

  const getProductName = (product: Product) => product.name;

  const handleAddBundle = () => {
    bundleProducts.forEach(p => addToCart(p, 1));
    toast.success(t('bundle_success'));
  };

  return (
    <div className="bg-card rounded-2xl border border-border p-8 md:p-12 shadow-lg">
      <h2 className="text-2xl font-black text-foreground mb-8">{t('bundle_offer_title')}</h2>
      
      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="flex flex-wrap items-center justify-center gap-4 flex-1">
          {bundleProducts.map((product, idx) => (
            <div key={product._id} className="flex items-center gap-4">
              <div className="relative w-32 aspect-square bg-subtle rounded-xl border border-border p-4">
                <Image
                  src={product.image || getProductFallbackImage(product.name)}
                  alt={getProductName(product)}
                  fill
                  sizes="128px"
                  className="object-contain p-2"
                />
              </div>
              {idx < bundleProducts.length - 1 && (
                <div className="bg-muted p-2 rounded-full">
                  <Plus className="w-5 h-5 text-muted-foreground" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="w-full lg:w-72 space-y-4 text-center lg:text-left">
          <div className="space-y-1">
            <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{t('bundle_total_price')}</p>
            <div className="flex items-baseline justify-center lg:justify-start gap-3">
              <span className="text-3xl font-black text-primary">{t('currency_symbol')}{Math.round(totalPrice * 0.95).toLocaleString('bn-BD')}</span>
              <span className="text-lg text-muted-foreground line-through font-bold">{t('currency_symbol')}{totalPrice.toLocaleString('bn-BD')}</span>
            </div>
            <p className="text-xs font-black text-warning bg-warning-subtle px-3 py-1 rounded-full inline-block">{t('bundle_extra_discount')}</p>
          </div>

          <button
            onClick={handleAddBundle}
            className="w-full flex items-center justify-center gap-3 bg-primary hover:bg-primary-hover text-primary-foreground py-4 rounded-2xl font-black transition-all shadow-lg shadow-primary active:scale-95"
          >
            <ShoppingCart className="w-5 h-5" />
            {t('bundle_add_all')}
          </button>
        </div>
      </div>
    </div>
  );
}
