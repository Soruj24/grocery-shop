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

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedWeight, setSelectedWeight] = useState("1kg");
  const router = useRouter();
  const { addToCart } = useCart();

  const weights = [
    { label: "500g", price: product.price / 2 },
    { label: "1kg", price: product.price },
    { label: "2kg", price: product.price * 1.9 },
    { label: "5kg", price: product.price * 4.5 },
  ];

  const handleBuyNow = () => {
    addToCart(product, 1);
    router.push("/checkout");
  };

  return (
    <div className="w-full lg:w-1/2 space-y-8">
      <div className="space-y-4">
        {/* Category & Badge */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-1.5 rounded-2xl text-xs font-black uppercase tracking-widest">
              {product.category?.name || "গ্রোসারি"}
            </span>
            <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-900/20 px-3 py-1.5 rounded-2xl text-amber-600">
              <Star className="w-4 h-4 fill-current" />
              <span className="text-sm font-black">৪.৯ (১২০ রিভিউ)</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-sm">
            <CheckCircle2 className="w-4 h-4" />
            <span>স্টকে আছে</span>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-gray-800 dark:text-white leading-tight">
          {product.name}
        </h1>

        {/* Price Section */}
        <div className="flex items-center gap-6 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-[32px] border border-gray-100 dark:border-gray-800">
          <div className="space-y-1">
            <p className="text-sm text-gray-500 font-bold uppercase tracking-wider">বর্তমান মূল্য</p>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-green-600 dark:text-green-500">
                ৳{product.discountPrice || product.price}
              </span>
              <span className="text-xl text-gray-400 dark:text-gray-500 line-through font-bold">
                ৳{product.price}
              </span>
            </div>
          </div>
          <div className="h-12 w-px bg-gray-200 dark:bg-gray-800" />
          <div className="bg-orange-500 text-white px-4 py-2 rounded-2xl text-sm font-black shadow-lg shadow-orange-500/20">
            ২০% ছাড়
          </div>
        </div>
      </div>

      {/* Weight Selection */}
      <div className="space-y-4">
        <p className="text-sm font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest">পরিমাণ নির্বাচন করুন</p>
        <div className="flex flex-wrap gap-3">
          {weights.map((w) => (
            <button
              key={w.label}
              onClick={() => setSelectedWeight(w.label)}
              className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all border-2 ${
                selectedWeight === w.label
                  ? "border-green-600 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                  : "border-gray-100 dark:border-gray-800 text-gray-500 hover:border-gray-200 dark:hover:border-gray-700"
              }`}
            >
              {w.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed font-medium">
          {product.description ||
            "এই পণ্যটি সম্পর্কে কোনো বিস্তারিত তথ্য দেওয়া হয়নি। তবে আমরা নিশ্চিত করছি যে এটি সেরা মানের পণ্য।"}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4">
          <AddToCartButton product={product} />
          <button 
            onClick={handleBuyNow}
            className="w-full flex items-center justify-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-5 rounded-[24px] font-black text-lg hover:opacity-90 transition-all shadow-xl active:scale-95"
          >
            <Zap className="w-6 h-6 fill-current" />
            এখনই কিনুন
          </button>
        </div>
      </div>

      {/* Highlights Grid */}
      <ProductHighlights />

      {/* Additional Actions */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <WishlistButton product={product} />
          <span className="text-sm font-bold text-gray-500">উইশলিস্টে রাখুন</span>
        </div>
        <div className="w-px h-8 bg-gray-100 dark:bg-gray-800" />
        <div className="flex items-center gap-2">
          <ShareButton productName={product.name} />
          <span className="text-sm font-bold text-gray-500">শেয়ার করুন</span>
        </div>
      </div>
    </div>
  );
}
