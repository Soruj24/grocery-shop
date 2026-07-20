"use client";

import { useWishlist } from "@/contexts/WishlistContext";
import ProductCard from "@/features/products/components/ProductCard";
import EmptyWishlistState from "@/features/wishlist/components/EmptyWishlistState";
import { Heart, Trash2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function WishlistSection() {
  const { t } = useLanguage();
  const { wishlist, totalWishlistItems, clearWishlist } = useWishlist();

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-black text-foreground flex items-center gap-3">
            <Heart className="text-danger" fill="currentColor" />
            {t('wishlist_title')}
          </h2>
          <p className="text-muted-foreground mt-1">{t('wishlist_desc')}</p>
        </div>
        
        {wishlist.length > 0 && (
          <button
            onClick={clearWishlist}
            className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-danger hover:bg-danger-subtle rounded-md transition-all"
          >
            <Trash2 size={16} />
            {t('clear_all')}
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
