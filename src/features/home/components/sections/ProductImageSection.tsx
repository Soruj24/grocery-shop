"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Share2,
  Eye,
} from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/types/product";
import { TranslationKey } from "@/constants/translations";
import { getProductFallbackImage } from "@/constants/fallback-images";

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
  const discount = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) /
          product.price) *
          100
      )
    : 0;

  return (
    <div className="relative aspect-[4/5] overflow-hidden bg-subtle rounded-t-2xl">
      {/* Swipe overlay */}
      <motion.div
        style={{
          backgroundColor: overlayColor,
          opacity: overlayOpacity,
        }}
        className="absolute inset-0 z-30 pointer-events-none mix-blend-multiply dark:mix-blend-overlay"
      />

      {/* Product image */}
      <Link
        href={`/products/${product._id}`}
        className="block w-full h-full"
      >
        <Image
          src={
            product.image ||
            getProductFallbackImage(product.name)
          }
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
        />
      </Link>

      {/* Hover dim */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-muted/30 transition-colors duration-500 pointer-events-none" />

      {/* Discount badge - top left */}
      {discount > 0 && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center rounded-lg bg-danger px-2.5 py-1 text-[11px] font-bold text-danger-foreground">
            -{discount}%
          </span>
        </div>
      )}

      {/* New / Deal badges */}
      {product.isNewArrival && discount === 0 && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center rounded-lg bg-success px-2.5 py-1 text-[11px] font-bold text-success-foreground">
            {t("new_arrival_badge") ?? "নিউ"}
          </span>
        </div>
      )}

      {/* Action buttons - slide in from right on hover */}
      <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-14 group-hover:translate-x-0 transition-transform duration-300 ease-out z-20">
        <button
          onClick={(e) => {
            e.preventDefault();
            onToggleWishlist();
          }}
          aria-label={isWishlistActive ? "Remove from wishlist" : "Add to wishlist"}
          aria-pressed={isWishlistActive}
          className={`w-9 h-9 rounded-xl flex items-center justify-center backdrop-blur-md shadow-md transition-all duration-300 hover:scale-110 active:scale-95 ${
            isWishlistActive
              ? "bg-danger text-danger-foreground"
              : "bg-card/90 text-muted-foreground hover:bg-danger hover:text-danger-foreground"
          }`}
        >
          <Heart
            className={`w-4 h-4 ${
              isWishlistActive ? "fill-current" : ""
            }`}
          />
        </button>

        <button
          onClick={(e) => {
            e.preventDefault();
            onShare(e);
          }}
          aria-label="Share product"
          className="w-9 h-9 rounded-xl bg-card/90 text-muted-foreground flex items-center justify-center backdrop-blur-md shadow-md transition-all duration-300 hover:bg-info hover:text-info-foreground hover:scale-110 active:scale-95 delay-75"
        >
          <Share2 className="w-4 h-4" />
        </button>

        <Link
          href={`/products/${product._id}`}
          className="w-9 h-9 rounded-xl bg-card/90 text-muted-foreground flex items-center justify-center backdrop-blur-md shadow-md transition-all duration-300 hover:bg-foreground hover:text-background hover:scale-110 active:scale-95 delay-100"
        >
          <Eye className="w-4 h-4" />
        </Link>
      </div>

      {/* Low stock warning */}
      {product.stock <= 5 && product.stock > 0 && (
        <div className="absolute bottom-3 left-3 z-10">
          <span className="inline-flex items-center rounded-lg bg-warning px-2.5 py-1 text-[10px] font-bold text-warning-foreground">
            {t("low_stock")}
          </span>
        </div>
      )}

      {/* Out of stock overlay */}
      {product.stock === 0 && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] flex items-center justify-center z-10 rounded-t-2xl">
          <span className="bg-card text-foreground text-xs font-bold px-5 py-2.5 rounded-xl shadow-lg transform -rotate-3">
            {t("out_of_stock_label")}
          </span>
        </div>
      )}
    </div>
  );
}
