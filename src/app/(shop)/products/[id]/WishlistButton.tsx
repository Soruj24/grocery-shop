"use client";

import { Heart } from "lucide-react";
import { motion } from "framer-motion";
import { useWishlist } from "@/components/WishlistContext";
import { Toast } from "@/lib/toast";
import { Product } from "@/types/product";
import { useLanguage } from "@/components/LanguageContext";

export default function WishlistButton({ product }: { product: Product }) {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { t } = useLanguage();
  const active = isInWishlist(product._id);

  const handleToggle = () => {
    toggleWishlist(product);
    const isAdding = !active;
    Toast.fire({
      icon: 'success',
      title: isAdding ? t('added_to_wishlist') : t('removed_from_wishlist'),
      background: '#020617',
      color: '#fff',
    });
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={handleToggle}
      className={`flex items-center gap-2 text-sm font-black transition-colors ${
        active
          ? "text-red-600 dark:text-red-500"
          : "text-gray-500 hover:text-red-500 dark:text-gray-400 dark:hover:text-red-400"
      }`}
    >
      <motion.div
        animate={{ scale: active ? [1, 1.2, 1] : 1 }}
        transition={{ duration: 0.3 }}
      >
        <Heart className={`w-5 h-5 ${active ? "fill-current" : ""}`} />
      </motion.div>
      <span>{active ? t('wishlist_remove') : t('wishlist_add')}</span>
    </motion.button>
  );
}
