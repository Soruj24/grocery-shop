"use client";

import { ShoppingCart, Eye, Heart, Star, Share2 } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import Link from "next/link";
import { Toast } from "@/lib/toast";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const active = isInWishlist(product._id);

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

  return (
    <div className="group bg-white dark:bg-[#0F172A]/40 rounded-[48px] shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.5)] transition-all duration-700 flex flex-col h-full relative group/card backdrop-blur-xl">
      {/* Discount Badge - Modern Glassmorphism */}
      <div className="absolute top-6 left-6 z-30 bg-orange-500/90 backdrop-blur-md text-white text-[10px] font-black px-4 py-2 rounded-2xl shadow-xl shadow-orange-500/20 transform -rotate-6 group-hover/card:rotate-0 transition-all duration-500 border border-white/20">
        ২০% ছাড়
      </div>

      <div className="aspect-[4/5] bg-gray-50 dark:bg-gray-950/50 flex items-center justify-center relative overflow-hidden m-3 rounded-[40px]">
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name} 
            className="object-cover w-full h-full transform group-hover/card:scale-110 transition-transform duration-1000" 
          />
        ) : (
          <ShoppingCart className="w-12 h-12 text-gray-200 dark:text-gray-800" />
        )}
        
        {/* Wishlist & Share Buttons */}
        <div className="absolute top-5 right-5 z-20 flex flex-col gap-2">
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
            className={`p-3.5 rounded-2xl shadow-xl transition-all duration-500 active:scale-90 ${
              active 
                ? 'bg-rose-500 text-white shadow-rose-500/30 scale-100' 
                : 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl text-gray-400 hover:text-rose-500 opacity-0 group-hover/card:opacity-100 translate-y-[-10px] group-hover/card:translate-y-0'
            }`}
          >
            <Heart className={`w-5 h-5 ${active ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleShare}
            className="p-3.5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl text-gray-400 hover:text-blue-500 rounded-2xl shadow-xl opacity-0 group-hover/card:opacity-100 translate-y-[-10px] group-hover/card:translate-y-0 transition-all duration-500 delay-75"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-x-4 bottom-4 z-20 opacity-0 group-hover/card:opacity-100 transition-all duration-500 translate-y-4 group-hover/card:translate-y-0 flex gap-3">
          <Link
            href={`/products/${product._id}`}
            className="flex-1 bg-white dark:bg-gray-900 text-gray-900 dark:text-white py-4 rounded-2xl font-black text-xs text-center hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 shadow-2xl backdrop-blur-xl border border-white/10"
          >
            বিস্তারিত দেখুন
          </Link>
          <button 
            onClick={() => {
              addToCart(product);
              Toast.fire({
                icon: 'success',
                title: 'কার্টে যোগ করা হয়েছে',
                background: '#020617',
                color: '#fff',
              });
            }}
            disabled={product.stock <= 0}
            className="w-14 bg-green-600 text-white flex items-center justify-center rounded-2xl hover:bg-green-500 shadow-2xl transition-all duration-300 disabled:bg-gray-500 disabled:opacity-50"
          >
            <ShoppingCart className="w-6 h-6" />
          </button>
        </div>
        
        {/* Subtle Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      <div className="p-8 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-4">
          <span className="text-[10px] font-black text-green-600 dark:text-green-400 uppercase tracking-[0.2em] bg-green-500/10 dark:bg-green-400/10 px-4 py-2 rounded-2xl">
            {product.category?.name || "গ্রোসারি"}
          </span>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
            <span className="text-[10px] font-black text-gray-400">৪.৮</span>
          </div>
        </div>
        
        <Link href={`/products/${product._id}`} className="block flex-1 group/title">
          <h3 className="text-gray-900 dark:text-white text-xl font-black mb-4 line-clamp-2 leading-tight group-hover/title:text-green-600 dark:group-hover/title:text-green-400 transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-end justify-between mt-auto pt-6 border-t border-gray-100 dark:border-gray-800/50">
          <div className="space-y-1">
            <span className="text-xs text-gray-400 dark:text-gray-500 font-bold line-through">৳ {Math.round(product.price * 1.2)}</span>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-gray-900 dark:text-white">৳{product.price}</span>
              <span className="text-[10px] font-bold text-gray-400">/কেজি</span>
            </div>
          </div>
          
          <div className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-[10px] font-black uppercase tracking-widest ${
            product.stock > 0 
              ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400' 
              : 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400'
          }`}>
            <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
            {product.stock > 0 ? 'স্টকে আছে' : 'আউট অফ স্টক'}
          </div>
        </div>
      </div>
    </div>
  );
}
