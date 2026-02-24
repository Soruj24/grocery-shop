"use client";

import { Star, Zap, CheckCircle2, AlertCircle } from "lucide-react";
import AddToCartButton from "@/app/(shop)/products/[id]/AddToCartButton";
import WishlistButton from "@/app/(shop)/products/[id]/WishlistButton";
import ShareButton from "@/app/(shop)/products/[id]/ShareButton";
import ProductHighlights from "./ProductHighlights";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/CartContext";
import { useLanguage } from "@/components/LanguageContext";
import { motion } from "framer-motion";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const { addToCart } = useCart();

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

  const handleBuyNow = () => {
    if (product.stock === 0) return;
    addToCart(product, 1);
    router.push("/checkout");
  };

  const discountPercent = product.discount || (product.discountPrice ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0);

  const productName = product.name;
  const productDesc = product.description;
  const categoryName = product.category?.name;

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
              <span className="text-sm font-black">{(product.rating || 4.9).toLocaleString('bn-BD')} ({(product.reviews || 120).toLocaleString('bn-BD')} {t('reviews_count')})</span>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 font-bold text-sm ${
            product.stock === 0 
              ? "text-red-500" 
              : product.stock <= 5 
                ? "text-amber-500" 
                : "text-emerald-600 dark:text-emerald-400"
          }`}>
            {product.stock === 0 ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
            <span>
              {product.stock === 0 
                ? t('out_of_stock_label') 
                : product.stock <= 5 
                  // @ts-ignore
                  ? `${t('low_stock')} - ${product.stock} ${t(unitToKey[product.unit || 'pcs'] || 'unit_piece')}`
                  : t('stock_available')}
            </span>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white leading-tight tracking-tight">
          {productName}
        </h1>

        {/* Short Description */}
        {productDesc && (
          <p className="text-gray-600 dark:text-gray-400 text-base leading-relaxed line-clamp-3">
            {productDesc}
          </p>
        )}

        {/* Price Section */}
        <div className="flex items-center gap-6 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-[32px] border border-gray-100 dark:border-gray-800">
          <div className="space-y-1">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t('current_price')}</p>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-gray-900 dark:text-white">
                {t('currency_symbol')}{(product.discountPrice || product.price).toLocaleString('bn-BD')}
              </span>
              {product.discountPrice && (
                <span className="text-xl text-gray-400 dark:text-gray-500 line-through font-bold decoration-2 decoration-red-400/50">
                  {t('currency_symbol')}{product.price.toLocaleString('bn-BD')}
                </span>
              )}
            </div>
          </div>
          
          {discountPercent > 0 && (
            <div className="ml-auto bg-red-500 text-white px-4 py-2 rounded-2xl font-black text-xl shadow-lg shadow-red-500/20 rotate-3">
              -{discountPercent.toLocaleString('bn-BD')}%
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-4 pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row gap-4">
          <AddToCartButton product={product} />
          <motion.button 
            whileTap={{ scale: 0.98 }}
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className={`flex-1 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-[20px] font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-xl shadow-green-600/20 ${product.stock === 0 ? 'opacity-50 cursor-not-allowed shadow-none' : 'hover:-translate-y-1'}`}
          >
            <Zap className="w-5 h-5 fill-current" />
            {t('buy_now')}
          </motion.button>
        </div>
        
        <div className="flex items-center justify-between gap-4 pt-4">
          <WishlistButton product={product} />
          <ShareButton product={product} />
        </div>
      </div>

      <ProductHighlights />
    </div>
  );
}