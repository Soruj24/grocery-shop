"use client";

import { Plus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { toast } from "react-hot-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProductFallbackImage } from "@/constants/fallback-images";

interface FrequentlyBoughtTogetherProps {
  currentProduct: Product;
  relatedProducts: Product[];
}

export default function FrequentlyBoughtTogether({
  currentProduct,
  relatedProducts,
}: FrequentlyBoughtTogetherProps) {
  const { t } = useLanguage();
  const { addToCart } = useCart();

  if (!relatedProducts || relatedProducts.length === 0)
    return null;

  const bundleProducts = [
    currentProduct,
    ...relatedProducts.slice(0, 2),
  ];
  const totalPrice = bundleProducts.reduce(
    (sum, p) => sum + (p.discountPrice || p.price),
    0
  );
  const originalPrice = bundleProducts.reduce(
    (sum, p) => sum + p.price,
    0
  );

  const handleAddBundle = () => {
    bundleProducts.forEach((p) => addToCart(p, 1));
    toast.success(t("bundle_success"));
  };

  return (
    <div className="bg-white dark:bg-[#09090b] rounded-xl border border-black/[0.04] dark:border-white/[0.04] p-8 md:p-10 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <h2 className="text-xl font-bold text-foreground mb-8">
        {t("bundle_offer_title")}
      </h2>

      <div className="flex flex-col lg:flex-row items-center gap-8">
        <div className="flex flex-wrap items-center justify-center gap-4 flex-1">
          {bundleProducts.map((product, idx) => (
            <div
              key={product._id}
              className="flex items-center gap-4"
            >
              <div className="relative w-28 aspect-square bg-black/[0.02] dark:bg-white/[0.02] rounded-xl border border-black/[0.04] dark:border-white/[0.04] p-3">
                <Image
                  src={
                    product.image ||
                    getProductFallbackImage(
                      product.name
                    )
                  }
                  alt={product.name}
                  fill
                  sizes="112px"
                  className="object-contain p-2"
                />
              </div>
              {idx < bundleProducts.length - 1 && (
                <div className="w-8 h-8 bg-black/[0.04] dark:bg-white/[0.06] rounded-full flex items-center justify-center">
                  <Plus className="w-4 h-4 text-muted-foreground/50" />
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="w-full lg:w-72 space-y-5 text-center lg:text-left">
          <div className="space-y-1.5">
            <p className="text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider">
              {t("bundle_total_price")}
            </p>
            <div className="flex items-baseline justify-center lg:justify-start gap-3">
              <span className="text-3xl font-bold text-foreground tracking-[-0.03em]">
                {t("currency_symbol")}
                {Math.round(
                  totalPrice * 0.95
                ).toLocaleString("bn-BD")}
              </span>
              <span className="text-base text-muted-foreground/40 line-through font-medium">
                {t("currency_symbol")}
                {totalPrice.toLocaleString("bn-BD")}
              </span>
            </div>
            <p className="text-[10px] font-semibold text-primary bg-primary/[0.06] px-2.5 py-1 rounded-full inline-block">
              {t("bundle_extra_discount")}
            </p>
          </div>

          <button
            onClick={handleAddBundle}
            className="w-full flex items-center justify-center gap-2.5 bg-foreground text-background py-3.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 active:scale-[0.98]"
          >
            <ShoppingCart className="w-4 h-4" />
            {t("bundle_add_all")}
          </button>
        </div>
      </div>
    </div>
  );
}
