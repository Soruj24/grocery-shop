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

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, updateQuantity, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [quantity, setQuantity] = useState(1);
  const active = isInWishlist(product._id);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 50;
    if (info.offset.x > swipeThreshold) {
      // Swipe Right - Add to Wishlist
      toggleWishlist(product);
      Toast.fire({
        icon: 'success',
        title: active ? 'উইশলিস্ট থেকে সরানো হয়েছে' : 'উইশলিস্টে যোগ করা হয়েছে',
        background: '#020617',
        color: '#fff',
      });
    } else if (info.offset.x < -swipeThreshold) {
      // Swipe Left - Add to Cart
      addToCart(product, quantity);
      Toast.fire({
        icon: 'success',
        title: 'কার্টে যোগ করা হয়েছে',
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
        text: `Check out ${product.name} at EMRAN SHOP!`,
        url: `${window.location.origin}/products/${product._id}`,
      });
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/products/${product._id}`);
      Toast.fire({
        icon: 'success',
        title: 'লিঙ্ক কপি করা হয়েছে',
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
      whileHover={{ y: -10 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="group bg-white dark:bg-[#0F172A]/40 rounded-[32px] shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] transition-all duration-500 flex flex-col h-full relative backdrop-blur-xl touch-pan-y"
    >
      {/* Swipe Indicators (Mobile Only) */}
      <div className="md:hidden absolute inset-0 pointer-events-none flex items-center justify-between px-4 z-10 opacity-0 group-active:opacity-100 transition-opacity">
        <div className="bg-green-500/20 p-2 rounded-full backdrop-blur-md">
          <ShoppingCart className="w-6 h-6 text-green-500" />
        </div>
        <div className="bg-rose-500/20 p-2 rounded-full backdrop-blur-md">
          <Heart className="w-6 h-6 text-rose-500" />
        </div>
      </div>
      {/* Discount Badge */}
      {product.discountPrice && (
        <div className="absolute top-4 left-4 z-30 bg-orange-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg shadow-orange-500/20">
          {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% ছাড়
        </div>
      )}

      {/* Product Image Area */}
      <div className="aspect-square bg-gray-50 dark:bg-gray-950/50 flex items-center justify-center relative overflow-hidden m-2 rounded-[24px]">
        {product.image ? (
          <Image 
            src={product.image} 
            alt={product.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            className="object-contain p-4 transform group-hover:scale-110 transition-transform duration-700"
            loading="lazy"
          />
        ) : (
          <ShoppingCart className="w-12 h-12 text-gray-200 dark:text-gray-800" />
        )}
        
        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            toggleWishlist(product);
            const isAdding = !active;
            Toast.fire({
              icon: 'success',
              title: isAdding ? 'উইশলিস্টে যোগ করা হয়েছে' : 'উইশলিস্ট থেকে সরানো হয়েছে',
              background: '#020617',
              color: '#fff',
            });
          }}
          className={`absolute top-3 right-3 z-20 p-2.5 rounded-full shadow-lg transition-all duration-300 active:scale-90 ${
            active 
              ? 'bg-rose-500 text-white shadow-rose-500/30' 
              : 'bg-white/90 dark:bg-gray-900/90 text-gray-400 hover:text-rose-500'
          }`}
        >
          <Heart className={`w-4 h-4 ${active ? 'fill-current' : ''}`} />
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          className="absolute top-14 right-3 z-20 p-2.5 bg-white/90 dark:bg-gray-900/90 text-gray-400 hover:text-blue-500 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100"
        >
          <Share2 className="w-4 h-4" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[10px] font-bold text-green-600 dark:text-green-400 uppercase tracking-wider bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-md">
            {product.category?.name || "গ্রোসারি"}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-bold text-gray-500">৪.৮</span>
          </div>
        </div>
        
        <Link href={`/products/${product._id}`} className="block mb-2">
          <h3 className="text-gray-900 dark:text-white text-base font-bold line-clamp-2 hover:text-green-600 transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Stock Status */}
        <div className="flex items-center gap-1.5 mb-4">
          <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
          <span className={`text-[10px] font-bold uppercase tracking-tight ${product.stock > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            {product.stock > 0 ? `${product.stock} পিস স্টকে আছে` : 'আউট অফ স্টক'}
          </span>
        </div>

        {/* Price and Quantity */}
        <div className="mt-auto space-y-4">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-gray-900 dark:text-white">৳{product.discountPrice || product.price}</span>
            {product.discountPrice && (
              <span className="text-sm text-gray-400 font-medium line-through">৳{product.price}</span>
            )}
            <span className="text-[10px] font-bold text-gray-400">/{product.unit || 'কেজি'}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quantity Selector */}
            <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-1 shrink-0">
              <button 
                onClick={decrement}
                className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-gray-700 text-gray-500 transition-all active:scale-90"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center text-sm font-bold text-gray-900 dark:text-white">
                {cartItem ? cartItem.quantity : quantity}
              </span>
              <button 
                onClick={increment}
                className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-white dark:hover:bg-gray-700 text-gray-500 transition-all active:scale-90"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button 
              onClick={() => {
                if (cartItem) {
                  Toast.fire({
                    icon: 'info',
                    title: 'কার্টে অলরেডি যোগ করা আছে',
                    background: '#020617',
                    color: '#fff',
                  });
                } else {
                  addToCart(product, quantity);
                  Toast.fire({
                    icon: 'success',
                    title: 'কার্টে যোগ করা হয়েছে',
                    background: '#020617',
                    color: '#fff',
                  });
                }
              }}
              disabled={product.stock <= 0}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-2xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="w-4 h-4" />
              {cartItem ? 'কার্টে আছে' : 'কিনুন'}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
