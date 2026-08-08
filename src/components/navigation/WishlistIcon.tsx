"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useWishlist } from "@/contexts/WishlistContext";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WishlistIcon() {
  const { totalWishlistItems } = useWishlist();
  const { t } = useLanguage();

  return (
    <Link
      href="/wishlist"
      title={t("wishlist") || "Wishlist"}
      className="relative hidden sm:flex h-9 w-9 items-center justify-center text-muted-foreground rounded-xl transition-all duration-200 hover:bg-rose-500/[0.06] hover:text-rose-500 dark:hover:bg-rose-500/[0.08] active:scale-[0.95]"
    >
      <Heart className="w-[18px] h-[18px]" />
      {totalWishlistItems > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-0.5 -right-0.5 bg-rose-500 text-white text-[9px] font-bold min-w-[17px] h-[17px] px-1 rounded-full flex items-center justify-center border-[1.5px] border-white dark:border-[#09090b]"
        >
          {totalWishlistItems}
        </motion.span>
      )}
    </Link>
  );
}
