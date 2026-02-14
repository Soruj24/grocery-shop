"use client";

import { useWishlist } from "@/components/WishlistContext";
import ProductCard from "@/components/ProductCard";
import WishlistHeader from "@/components/shop/wishlist/WishlistHeader";
import EmptyWishlistState from "@/components/shop/wishlist/EmptyWishlistState";
import PageBackground from "@/components/ui/PageBackground";

export default function WishlistPage() {
  const { wishlist, totalWishlistItems, clearWishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 relative overflow-hidden">
      <PageBackground
        color1="bg-red-500/5"
        color2="bg-emerald-500/5"
        color3="bg-blue-500/5"
      />

      {/* Header */}
      <WishlistHeader totalItems={totalWishlistItems} onClear={clearWishlist} />

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
