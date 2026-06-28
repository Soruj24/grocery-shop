"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useWishlist } from "@/components/WishlistContext";
import { useLanguage } from "@/components/LanguageContext";

export default function WishlistIcon() {
  const { totalWishlistItems } = useWishlist();
  const { t } = useLanguage();

  return (
    <Link
      href="/wishlist"
      title={t("wishlist") || "Wishlist"}
      className="relative h-12 w-12 flex items-center justify-center bg-gray-50 dark:bg-white/5 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-gray-700 dark:text-gray-400 hover:text-rose-500 rounded-2xl transition-all group hidden sm:flex border border-transparent hover:border-rose-100 dark:hover:border-rose-500/20 shadow-sm hover:shadow-md"
    >
      <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" />
      {totalWishlistItems > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-black min-w-[20px] h-[20px] px-1 rounded-full flex items-center justify-center border-2 border-white dark:border-black shadow-lg"
        >
          {totalWishlistItems}
        </motion.span>
      )}
    </Link>
  );
}
