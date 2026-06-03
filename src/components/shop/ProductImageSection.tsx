"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Share2, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { TranslationKey } from "@/lib/translations";
import { getProductFallbackImage } from "@/lib/category-utils";

interface ProductImageSectionProps {
  product: Product;
  isWishlistActive: boolean;
  overlayColor: any;
  overlayOpacity: any;
  onToggleWishlist: () => void;
  onShare: (e: React.MouseEvent) => void;
  t: (key: TranslationKey) => string;
}

export default function ProductImageSection({
  product,
  isWishlistActive,
  overlayColor,
  overlayOpacity,
  onToggleWishlist,
  onShare,
  t,
}: ProductImageSectionProps) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 dark:bg-gray-800 rounded-t-[2rem]">
      <motion.div
        style={{ backgroundColor: overlayColor, opacity: overlayOpacity }}
        className="absolute inset-0 z-30 pointer-events-none mix-blend-multiply dark:mix-blend-overlay"
      />

      <Link href={`/products/${product._id}`} className="block w-full h-full">
        <Image
          src={product.image || getProductFallbackImage(product.name)}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
        />
      </Link>

      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 pointer-events-none" />

      <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300 ease-out z-20">
        <button
          onClick={(e) => { e.preventDefault(); onToggleWishlist(); }}
          className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-lg transition-all duration-300 hover:scale-110 active:scale-95 ${
            isWishlistActive
              ? "bg-rose-500 text-white shadow-rose-500/40"
              : "bg-white/90 dark:bg-black/60 text-gray-500 dark:text-gray-300 hover:bg-rose-500 hover:text-white"
          }`}
        >
          <Heart className={`w-5 h-5 ${isWishlistActive ? "fill-current" : ""}`} />
        </button>

        <button
          onClick={(e) => { e.preventDefault(); onShare(e); }}
          className="w-10 h-10 rounded-full bg-white/90 dark:bg-black/60 text-gray-500 dark:text-gray-300 flex items-center justify-center backdrop-blur-md shadow-lg transition-all duration-300 hover:bg-blue-500 hover:text-white hover:scale-110 active:scale-95 delay-75"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {product.discountPrice && (
        <div className="absolute top-4 left-4 z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-rose-500 blur-sm opacity-50 rounded-full" />
            <div className="relative bg-rose-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
              <TrendingUp size={10} className="text-white/80" />
              {Math.round(((product.price - product.discountPrice) / product.price) * 100).toLocaleString("bn-BD")}% {t("off")}
            </div>
          </div>
        </div>
      )}

      {product.stock <= 5 && product.stock > 0 && (
        <div className="absolute bottom-4 left-4 bg-amber-500/90 backdrop-blur-md text-white text-[9px] font-black px-3 py-1 rounded-full z-10 shadow-lg shadow-amber-500/20">
          {t("low_stock")}
        </div>
      )}
      {product.stock === 0 && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-10">
          <span className="bg-white text-black text-xs font-black px-4 py-2 rounded-full shadow-xl transform -rotate-6">
            {t("out_of_stock_label")}
          </span>
        </div>
      )}
    </div>
  );
}
