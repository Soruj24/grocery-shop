"use client";

import { useWishlist } from "@/components/WishlistContext";
import ProductCard from "@/components/ProductCard";
import EmptyWishlistState from "@/components/shop/wishlist/EmptyWishlistState";
import { Heart, Trash2 } from "lucide-react";

export default function WishlistSection() {
  const { wishlist, totalWishlistItems, clearWishlist } = useWishlist();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
            <Heart className="text-rose-500" fill="currentColor" />
            আপনার উইশলিস্ট
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1">আপনার পছন্দের প্রোডাক্টগুলো এখানে সংরক্ষিত আছে</p>
        </div>
        
        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-xl transition-all"
          >
            <Trash2 size={16} />
            সব মুছে ফেলুন
          </button>
        )}
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <EmptyWishlistState />
      )}
    </div>
  );
}
