"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { TranslationKey } from "@/constants/translations";
import { getProductFallbackImage } from "@/constants/fallback-images";
import { Badge } from "@/components/ui";

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
    <div className="relative aspect-[4/5] overflow-hidden bg-subtle rounded-t-xl">
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
              : "bg-card text-muted-foreground hover:bg-rose-500 hover:text-white"
          }`}
        >
          <Heart className={`w-5 h-5 ${isWishlistActive ? "fill-current" : ""}`} />
        </button>

        <button
          onClick={(e) => { e.preventDefault(); onShare(e); }}
          className="w-10 h-10 rounded-full bg-card text-muted-foreground flex items-center justify-center backdrop-blur-md shadow-lg transition-all duration-300 hover:bg-blue-500 hover:text-white hover:scale-110 active:scale-95 delay-75"
        >
          <Share2 className="w-5 h-5" />
        </button>
      </div>

      {product.discountPrice && (
        <div className="absolute top-4 left-4 z-10">
          <Badge tone="danger" size="sm">
            {Math.round(((product.price - product.discountPrice) / product.price) * 100).toLocaleString("bn-BD")}% {t("off")}
          </Badge>
        </div>
      )}

      {product.stock <= 5 && product.stock > 0 && (
        <div className="absolute bottom-4 left-4 z-10">
          <Badge tone="warning" size="sm">{t("low_stock")}</Badge>
        </div>
      )}
      {product.stock === 0 && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-10">
          <span className="bg-card text-foreground text-xs font-black px-4 py-2 rounded-full shadow-lg transform -rotate-6">
            {t("out_of_stock_label")}
          </span>
        </div>
      )}
    </div>
  );
}
