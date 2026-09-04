"use client";

import { useState } from "react";
import { Zap, CheckCircle2, AlertCircle } from "lucide-react";
import AddToCartButton from "@/app/(shop)/products/[id]/AddToCartButton";
import WishlistButton from "@/app/(shop)/products/[id]/WishlistButton";
import ShareButton from "@/app/(shop)/products/[id]/ShareButton";
import ProductHighlights from "./ProductHighlights";
import VariantSelector from "./VariantSelector";
import ShippingInfo from "./ShippingInfo";
import DeliveryEstimation from "./DeliveryEstimation";
import CouponOffer from "./CouponOffer";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import type { TranslationKey } from "@/constants/translations";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({
  product,
}: ProductInfoProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedVariants, setSelectedVariants] =
    useState<Record<string, string>>({});

  const unitToKey: Record<string, string> = {
    pcs: "unit_piece",
    kg: "unit_kg",
    g: "unit_g",
    l: "unit_l",
    ml: "unit_ml",
    pack: "unit_pack",
    box: "unit_box",
    bottle: "unit_bottle",
    dozen: "unit_dozen",
  };

  const handleBuyNow = () => {
    if (product.stock === 0) return;
    addToCart(product, 1);
    router.push("/checkout");
  };

  const discountPercent =
    product.discount ||
    (product.discountPrice
      ? Math.round(
          ((product.price - product.discountPrice) /
            product.price) *
            100
        )
      : 0);

  const productName = product.name;
  const productDesc = product.description;
  const categoryName = product.category?.name;

  return (
    <div className="w-full lg:w-1/2 space-y-7">
      <div className="space-y-5">
        {/* Category + Rating + Stock */}
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            {categoryName && (
              <span className="inline-flex items-center rounded-lg bg-muted px-3 py-1.5 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                {categoryName}
              </span>
            )}
            <div className="flex items-center gap-1.5">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i <
                        Math.floor(
                          product.rating ?? 4.9
                        )
                          ? "fill-amber-400 text-amber-400"
                          : "fill-black/[0.08] text-black/[0.08] dark:fill-white/[0.1] dark:text-white/[0.1]"
                      }`}
                    />
                  )
                )}
              </div>
              <span className="text-sm font-semibold text-muted-foreground">
                ({product.reviews ?? 120})
              </span>
            </div>
          </div>
          <div
            className={`flex items-center gap-1.5 text-sm font-semibold ${
              product.stock === 0
                ? "text-danger"
                : product.stock <= 5
                ? "text-amber-500"
                : "text-emerald-500"
            }`}
          >
            {product.stock === 0 ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <CheckCircle2 className="w-4 h-4" />
            )}
            <span>
              {product.stock === 0
                ? t("out_of_stock_label")
                : product.stock <= 5
                ? `${t("low_stock")} - ${product.stock} ${t(
                    (unitToKey[
                      product.unit || "pcs"
                    ] || "unit_piece") as TranslationKey
                  )}`
                : t("stock_available")}
            </span>
          </div>
        </div>

        {/* Product name */}
        <h1 className="text-3xl md:text-[2.5rem] font-bold text-foreground leading-tight tracking-[-0.03em]">
          {productName}
        </h1>

        {/* Description */}
        {productDesc && (
          <p className="text-muted-foreground text-base leading-relaxed line-clamp-3">
            {productDesc}
          </p>
        )}

        {/* Price section */}
        <div className="flex items-center gap-6 bg-subtle p-6 rounded-2xl border border-border">
          <div className="space-y-1">
            <p className="text-[11px] font-semibold text-muted-foreground/60 uppercase tracking-wider">
              {t("current_price")}
            </p>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-foreground tracking-[-0.03em]">
                {t("currency_symbol")}
                {(
                  product.discountPrice ||
                  product.price
                ).toLocaleString("bn-BD")}
              </span>
              {product.discountPrice && (
                <span className="text-lg text-muted-foreground/50 line-through font-medium">
                  {t("currency_symbol")}
                  {product.price.toLocaleString(
                    "bn-BD"
                  )}
                </span>
              )}
            </div>
          </div>

          {discountPercent > 0 && (
            <div className="ml-auto bg-rose-500 text-white px-4 py-2 rounded-xl font-bold text-lg shadow-[0_2px_12px_rgba(244,63,94,0.3)]">
              -{discountPercent}%
            </div>
          )}
        </div>
      </div>

      {/* Variant Selector */}
      {product.variants &&
        product.variants.length > 0 && (
          <VariantSelector
            variants={product.variants}
            selectedVariants={selectedVariants}
            onSelect={(name, option) =>
              setSelectedVariants((prev) => ({
                ...prev,
                [name]: option,
              }))
            }
          />
        )}

      {/* Shipping Info */}
      <ShippingInfo />

      {/* Delivery Estimation */}
      <DeliveryEstimation />

      {/* Coupon Offers */}
      <CouponOffer />

      {/* Add to Cart + Buy Now */}
      <div className="flex flex-col gap-4 pt-5 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-3">
          <AddToCartButton product={product} />
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className={`flex-1 bg-foreground hover:bg-primary text-background px-8 py-4 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-300 active:scale-[0.98] ${
              product.stock === 0
                ? "opacity-30 cursor-not-allowed"
                : ""
            }`}
          >
            <Zap className="w-4 h-4" />
            {t("buy_now")}
          </motion.button>
        </div>

        <div className="flex items-center justify-between gap-4 pt-3">
          <WishlistButton product={product} />
          <ShareButton product={product} />
        </div>
      </div>

      <ProductHighlights />
    </div>
  );
}
