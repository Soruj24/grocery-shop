"use client";

import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Trash2, Star } from "lucide-react";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: typeof wishlist[0]) => {
    addToCart({
      _id: item._id,
      name: item.name,
      price: item.price,
      image: item.image,
    }, 1);
    removeFromWishlist(item._id);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Wishlist</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-12 text-center">
          <Heart className="mx-auto h-12 w-12 text-gray-300 dark:text-gray-600 mb-3" />
          <p className="text-sm font-semibold text-gray-900 dark:text-white">Your wishlist is empty</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 mb-4">Save items you love for later</p>
          <Link href="/products" className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-emerald-600 transition-colors">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {wishlist.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4 flex gap-4"
            >
              <div className="h-20 w-20 shrink-0 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Heart className="h-6 w-6 text-gray-300" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <Link href={`/products/${item._id}`} className="text-sm font-semibold text-gray-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 line-clamp-1">
                  {item.name}
                </Link>
                <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-1">৳{item.price.toLocaleString()}</p>
                <div className="flex items-center gap-2 mt-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center gap-1.5 rounded-lg bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-white hover:bg-emerald-600 transition-colors"
                  >
                    <ShoppingCart className="h-3 w-3" /> Add to Cart
                  </button>
                  <button
                    onClick={() => removeFromWishlist(item._id)}
                    className="flex items-center gap-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 px-3 py-1.5 text-[11px] font-medium text-gray-600 dark:text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="h-3 w-3" /> Remove
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
