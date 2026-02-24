"use client";

import {  Heart, Star, Share2, Plus, Minus, TrendingUp } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import Link from "next/link";
import Image from "next/image";
import { Toast } from "@/lib/toast";
import { Product } from "@/types/product";
import { motion, PanInfo, useMotionValue, useTransform } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { getProductFallbackImage } from "@/lib/category-utils";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, updateQuantity, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { t } = useLanguage();
  const active = isInWishlist(product._id);

  // Drag Animation Logic
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-100, 0, 100], [-5, 0, 5]);
  const overlayOpacity = useTransform(x, [-100, 0, 100], [0.5, 0, 0.5]);
  const overlayColor = useTransform(x, [-100, 0, 100], ["#22c55e", "transparent", "#f43f5e"]); // Green (Cart) -> Transparent -> Red (Wishlist)

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      // Swipe Right - Add to Wishlist
      toggleWishlist(product);
      Toast.fire({
        icon: 'success',
        title: active ? t('removed_from_wishlist') : t('added_to_wishlist')
      });
    } else if (info.offset.x < -swipeThreshold) {
      // Swipe Left - Add to Cart
      addToCart(product, 1);
      Toast.fire({
        icon: 'success',
        title: t('added_to_cart')
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
        title: t('share_success')
      });
    }
  };

  const increment = () => {
    if (cartItem) {
      if (cartItem.quantity < product.stock) {
        updateQuantity(product._id, cartItem.quantity + 1);
      } else {
        Toast.fire({
          icon: 'error',
          title: t('out_of_stock_label')
        });
      }
    }
  };

  const decrement = () => {
    if (cartItem) {
      if (cartItem.quantity > 1) {
        updateQuantity(product._id, cartItem.quantity - 1);
      }
    }
  };

  return (
    <motion.div 
      style={{ x, rotate, cursor: 'grab' }}
      whileTap={{ cursor: 'grabbing' }}
      whileDrag={{ scale: 1.05, zIndex: 50 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.6}
      dragSnapToOrigin={true}
      onDragEnd={handleDragEnd}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      className="group bg-white dark:bg-gray-900 rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 transition-all duration-500 flex flex-col h-full border border-gray-100 dark:border-gray-800 relative overflow-hidden"
    >
      {/* Swipe Feedback Overlay */}
      <motion.div 
        style={{ 
          backgroundColor: overlayColor, 
          opacity: overlayOpacity 
        }} 
        className="absolute inset-0 z-30 pointer-events-none mix-blend-multiply dark:mix-blend-overlay"
      />
      
      {/* Product Image & Badges */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 dark:bg-gray-800 rounded-t-[2rem]">
        <Link href={`/products/${product._id}`} className="block w-full h-full">
          <Image
            src={product.image || getProductFallbackImage(product.name)}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        </Link>
        
        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />
        
        {/* Quick Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300 ease-out z-20">
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleWishlist(product);
              Toast.fire({
                icon: 'success',
                title: active ? t('removed_from_wishlist') : t('added_to_wishlist')
              });
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ${
              active 
                ? "bg-rose-500 text-white shadow-rose-500/40" 
                : "bg-white/90 dark:bg-black/60 text-gray-500 dark:text-gray-300 hover:bg-rose-500 hover:text-white"
            }`}
          >
            <Heart className={`w-5 h-5 ${active ? "fill-current" : ""}`} />
          </button>
          
          <button
            onClick={(e) => {
              e.preventDefault();
              handleShare(e);
            }}
            className="w-10 h-10 rounded-full bg-white/90 dark:bg-black/60 text-gray-500 dark:text-gray-300 flex items-center justify-center backdrop-blur-md shadow-lg transition-all duration-300 hover:bg-blue-500 hover:text-white hover:scale-110 active:scale-95 delay-75"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Discount Badge */}
        {product.discountPrice && (
          <div className="absolute top-4 left-4 z-10">
            <div className="relative">
              <div className="absolute inset-0 bg-rose-500 blur-sm opacity-50 rounded-full" />
              <div className="relative bg-rose-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                <TrendingUp size={10} className="text-white/80" />
                {Math.round(((product.price - product.discountPrice) / product.price) * 100).toLocaleString('bn-BD')}% {t('off')}
              </div>
            </div>
          </div>
        )}

        {/* Stock Status Badge */}
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-4 left-4 bg-amber-500/90 backdrop-blur-md text-white text-[9px] font-black px-3 py-1 rounded-full z-10 shadow-lg shadow-amber-500/20">
            {t('low_stock')}
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-10">
            <span className="bg-white text-black text-xs font-black px-4 py-2 rounded-full shadow-xl transform -rotate-6">{t('out_of_stock_label')}</span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-6 flex flex-col flex-1 relative bg-white dark:bg-gray-900 z-10">
        <div className="mb-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-md inline-block">
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
               (product.unit || t('default_unit') || '')}
            </p>
            
            {/* Rating Placeholder - International Style */}
            <div className="flex items-center gap-1">
              <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
              <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">4.8</span>
            </div>
          </div>
          
          <Link href={`/products/${product._id}`} className="group/title block">
            <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 line-clamp-2 leading-tight group-hover/title:text-green-600 transition-colors h-10">
              {product.name}
            </h3>
          </Link>
        </div>

        {/* Price & Add to Cart */}
        <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex items-end justify-between gap-3">
          <div className="flex flex-col">
            {product.discountPrice ? (
              <>
                <div className="flex items-baseline gap-2">
                   <span className="text-xl font-black text-green-600">{t('currency_symbol')}{product.discountPrice.toLocaleString('bn-BD')}</span>
                   <span className="text-xs text-gray-400 line-through decoration-rose-500/50">{t('currency_symbol')}{product.price.toLocaleString('bn-BD')}</span>
                </div>
              </>
            ) : (
              <span className="text-xl font-black text-gray-800 dark:text-gray-100">{t('currency_symbol')}{product.price.toLocaleString('bn-BD')}</span>
            )}
          </div>

          {/* Compact Quantity Control or Add Button */}
          {!cartItem ? (
            <button
              disabled={product.stock === 0}
              onClick={() => {
                addToCart(product, 1);
                Toast.fire({
                  icon: 'success',
                  title: t('added_to_cart')
                });
              }}
              className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50 text-white w-12 h-12 flex items-center justify-center rounded-2xl shadow-lg shadow-green-600/20 active:scale-90 transition-all hover:rotate-3 group/btn relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300" />
              <Plus size={24} strokeWidth={3} />
            </button>
          ) : (
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-1 border border-gray-200 dark:border-gray-700 shadow-inner">
              <button
                onClick={decrement}
                className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-700 hover:bg-rose-100 dark:hover:bg-rose-900/30 hover:text-rose-600 rounded-xl transition-all text-gray-600 dark:text-gray-300 shadow-sm"
              >
                <Minus size={18} strokeWidth={3} />
              </button>
              <span className="w-8 text-center text-sm font-black dark:text-white select-none tabular-nums">
                {cartItem.quantity.toLocaleString('bn-BD')}
              </span>
              <button
                onClick={increment}
                disabled={cartItem.quantity >= product.stock}
                className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 rounded-xl transition-all text-gray-600 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600 shadow-sm"
              >
                <Plus size={18} strokeWidth={3} />
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}