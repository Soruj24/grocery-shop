"use client";

import { Heart } from "lucide-react";
import { useWishlist } from "@/components/WishlistContext";
import { Toast } from "@/lib/toast";
import { Product } from "@/types/product";

export default function WishlistButton({ product }: { product: Product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const active = isInWishlist(product._id);

  const handleToggle = () => {
    toggleWishlist(product);
    const isAdding = !active;
    Toast.fire({
      icon: 'success',
      title: isAdding ? 'উইশলিস্টে যোগ করা হয়েছে' : 'উইশলিস্ট থেকে সরানো হয়েছে',
      background: '#020617',
      color: '#fff',
    });
  };

  return (
    <button
      onClick={handleToggle}
      className={`flex items-center gap-2 text-sm font-black transition-colors ${
        active
          ? "text-red-600 dark:text-red-500"
          : "text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
      }`}
    >
      <Heart className={`w-5 h-5 ${active ? "fill-current" : ""}`} />
      {active ? "উইশলিস্ট থেকে সরান" : "উইশলিস্টে রাখুন"}
    </button>
  );
}
