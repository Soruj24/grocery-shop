"use client";

import { ShoppingCart, Heart, Star, Share2, Plus, Minus } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import Link from "next/link";
import Image from "next/image";
import { Toast } from "@/lib/toast";
import { Product } from "@/types/product";
import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { getProductFallbackImage } from "@/lib/category-utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, updateQuantity, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { t, language } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const active = isInWishlist(product._id);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      // Swipe Right - Add to Wishlist
      toggleWishlist(product);
      Toast.fire({
        icon: 'success',
        title: active ? t('wishlist_remove_success') : t('wishlist_add_success'),
        background: '#020617',
        color: '#fff',
      });
    } else if (info.offset.x < -swipeThreshold) {
      // Swipe Left - Add to Cart
      addToCart(product, quantity);
      Toast.fire({
        icon: 'success',
        title: t('added_to_cart'),
        background: '#020617',
        color: '#fff',
      });
    }
  };

  // Check if product is already in cart
  const cartItem = cart?.find((item) => item._id === product._id);

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: t('share_text'),
        url: `${window.location.origin}/products/${product._id}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/products/${product._id}`);
      Toast.fire({
        icon: 'success',
        title: t('link_copied'),
        background: '#020617',
        color: '#fff',
      });
    }
  };

  const increment = () => {
    if (cartItem) {
      updateQuantity(product._id, cartItem.quantity + 1);
    } else {
      setQuantity(prev => prev + 1);
    }
  };

  const decrement = () => {
    if (cartItem) {
      if (cartItem.quantity > 1) {
        updateQuantity(product._id, cartItem.quantity - 1);
      }
    } else {
      if (quantity > 1) {
        setQuantity(prev => prev - 1);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group bg-white dark:bg-gray-900 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full border border-gray-100 dark:border-gray-800 relative overflow-hidden"
    >
      {/* Product Image & Badges */}
      <Link href={`/products/${product._id}`} className="relative aspect-square overflow-hidden bg-gray-50 dark:bg-gray-800">
        <Image
          src={product.image || getProductFallbackImage(product.nameEn || product.name)}
          alt={language === 'en' ? (product.nameEn || product.name) : product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Discount Badge */}
        {product.discountPrice && (
          <div className="absolute top-4 left-4 bg-rose-500/90 backdrop-blur-md text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg z-10">
            {Math.round(((product.price - product.discountPrice) / product.price) * 100).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}% {t('off')}
          </div>
        )}

        {/* Stock Status Badge */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-4 left-4 bg-amber-500/90 backdrop-blur-md text-white text-[9px] font-black px-3 py-1 rounded-full z-10">
            {t('low_stock')}
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="bg-white text-black text-xs font-black px-4 py-2 rounded-full shadow-xl">{t('out_of_stock_label')}</span>
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
          }}
          className={`absolute top-4 right-4 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 z-10 ${
            active 
              ? "bg-rose-500 text-white shadow-rose-500/40" 
              : "bg-white/80 dark:bg-black/40 text-gray-400 hover:text-rose-500"
          }`}
        >
          <Heart className={`w-4 h-4 ${active ? "fill-current" : ""}`} />
        </button>
      </Link>

      {/* Product Info */}
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-2">
          <Link href={`/products/${product._id}`}>
            <h3 className="text-sm font-bold text-gray-800 dark:text-gray-100 line-clamp-2 hover:text-green-600 transition-colors">
              {language === 'en' ? (product.nameEn || product.name) : product.name}
            </h3>
          </Link>
          <p className="text-[10px] text-gray-400 mt-1 font-medium">
            {product.unit === 'kg' ? t('unit_kg') :
             product.unit === 'g' ? t('unit_g') :
             product.unit === 'mg' ? t('unit_mg') :
             product.unit === 'l' ? t('unit_l') :
             product.unit === 'ml' ? t('unit_ml') :
             product.unit === 'pcs' ? t('unit_piece') :
             product.unit === 'pack' ? t('unit_pack') :
             product.unit === 'box' ? t('unit_box') :
             product.unit === 'bottle' ? t('unit_bottle') :
             product.unit === 'dozen' ? t('unit_dozen') :
             (product.unit || t('default_unit'))}
          </p>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between gap-2">
            <div className="flex flex-col">
              {product.discountPrice ? (
                <>
                  <span className="text-lg font-black text-green-600">{t('currency_symbol')}{product.discountPrice.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}</span>
                  <span className="text-xs text-gray-400 line-through">{t('currency_symbol')}{product.price.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}</span>
                </>
              ) : (
                <span className="text-lg font-black text-gray-800 dark:text-gray-100">{t('currency_symbol')}{product.price.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}</span>
              )}
            </div>

            {/* Compact Quantity Control or Add Button */}
            {!cartItem ? (
              <button
                disabled={product.stock === 0}
                onClick={() => addToCart(product, 1)}
                className="bg-green-600 hover:bg-green-700 disabled:bg-gray-300 text-white min-w-[48px] min-h-[48px] flex items-center justify-center rounded-2xl shadow-lg shadow-green-600/20 active:scale-90 transition-all"
              >
                <Plus className="w-6 h-6" />
              </button>
            ) : (
              <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-1 border border-gray-200 dark:border-gray-700">
                <button
                  onClick={decrement}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all text-gray-600 dark:text-gray-300"
                >
                  <Minus className="w-5 h-5" />
                </button>
                <span className="w-8 text-center text-sm font-black dark:text-white">
                  {cartItem.quantity.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
                </span>
                <button
                  onClick={increment}
                  className="min-w-[44px] min-h-[44px] flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 rounded-xl transition-all text-gray-600 dark:text-gray-300"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
