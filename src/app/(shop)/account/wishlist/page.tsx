"use client";

import { useWishlist } from "@/contexts/WishlistContext";
import { useCart } from "@/contexts/CartContext";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  ShoppingCart,
  Trash2,
  ArrowUpRight,
} from "lucide-react";
import { getProductFallbackImage } from "@/constants/fallback-images";

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (item: (typeof wishlist)[0]) => {
    addToCart(
      {
        _id: item._id,
        name: item.name,
        price: item.price,
        image: item.image,
      },
      1
    );
    removeFromWishlist(item._id);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
          Wishlist
        </h1>
        <p className="text-sm text-muted-foreground/50 mt-1">
          {wishlist.length}{" "}
          {wishlist.length === 1 ? "item" : "items"}{" "}
          saved
        </p>
      </motion.div>

      {/* Empty State */}
      {wishlist.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] p-12 text-center shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
        >
          <Heart className="mx-auto h-10 w-10 text-muted-foreground/20 mb-3" />
          <p className="text-sm font-semibold text-foreground">
            Your wishlist is empty
          </p>
          <p className="text-[11px] text-muted-foreground/50 mt-1 mb-4">
            Save items you love for later
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background hover:opacity-90 transition-all active:scale-[0.98]"
          >
            Browse Products
          </Link>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {wishlist.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: i * 0.04,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="rounded-2xl border border-black/[0.04] dark:border-white/[0.04] bg-white dark:bg-[#09090b] p-4 flex gap-4 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_16px_rgba(0,0,0,0.06)] transition-shadow"
            >
              <div className="h-20 w-20 shrink-0 rounded-xl bg-black/[0.04] dark:bg-white/[0.06] overflow-hidden">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center">
                    <Heart className="h-6 w-6 text-muted-foreground/20" />
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <Link
                  href={`/products/${item._id}`}
                  className="text-sm font-semibold text-foreground hover:text-muted-foreground/70 line-clamp-1 flex items-center gap-1"
                >
                  {item.name}
                  <ArrowUpRight className="h-3 w-3 opacity-0 group-hover:opacity-100" />
                </Link>
                <p className="text-base font-bold text-foreground mt-1">
                  ৳{item.price.toLocaleString()}
                </p>
                <div className="flex items-center gap-2 mt-2.5">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex items-center gap-1.5 rounded-lg bg-foreground px-3 py-1.5 text-[11px] font-semibold text-background hover:opacity-90 transition-all"
                  >
                    <ShoppingCart className="h-3 w-3" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() =>
                      removeFromWishlist(item._id)
                    }
                    className="flex items-center gap-1.5 rounded-lg bg-black/[0.04] dark:bg-white/[0.06] px-3 py-1.5 text-[11px] font-medium text-muted-foreground/60 hover:text-rose-500 hover:bg-rose-500/[0.06] transition-all"
                  >
                    <Trash2 className="h-3 w-3" />
                    Remove
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
