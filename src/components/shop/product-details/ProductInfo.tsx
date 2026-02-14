import { Star } from "lucide-react";
import AddToCartButton from "@/app/(shop)/products/[id]/AddToCartButton";
import WishlistButton from "@/app/(shop)/products/[id]/WishlistButton";
import ShareButton from "@/app/(shop)/products/[id]/ShareButton";
import ProductHighlights from "./ProductHighlights";
import { Product } from "@/types/product";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  return (
    <div className="w-full lg:w-1/2 space-y-8">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 px-4 py-1.5 rounded-2xl text-xs font-black uppercase tracking-widest">
            {product.category?.name || "গ্রোসারি"}
          </span>
          <div className="flex items-center gap-1 text-amber-500">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-black">৪.৯ (১২০ রিভিউ)</span>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-black text-gray-800 dark:text-white leading-tight">
          {product.name}
        </h1>

        <div className="flex items-baseline gap-4">
          <span className="text-4xl font-black text-green-600 dark:text-green-500">
            ৳ {product.price}
          </span>
          <span className="text-xl text-gray-400 dark:text-gray-500 line-through font-bold">
            ৳ {Math.round(product.price * 1.2)}
          </span>
          <span className="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 px-3 py-1 rounded-xl text-xs font-black">
            ২০% ছাড়
          </span>
        </div>
      </div>

      <p className="text-gray-500 dark:text-gray-400 text-lg leading-relaxed font-medium">
        {product.description ||
          "এই পণ্যটি সম্পর্কে কোনো বিস্তারিত তথ্য দেওয়া হয়নি। তবে আমরা নিশ্চিত করছি যে এটি সেরা মানের পণ্য।"}
      </p>

      {/* Add to Cart Component */}
      <AddToCartButton product={product} />

      {/* Highlights Grid */}
      <ProductHighlights />

      {/* Additional Actions */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-2">
          <WishlistButton product={product} />
        </div>
        <div className="w-px h-8 bg-gray-100 dark:bg-gray-800" />
        <ShareButton productName={product.name} />
      </div>
    </div>
  );
}
