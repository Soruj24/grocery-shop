"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "@/types/product";
import { TranslationKey } from "@/constants/translations";
import { getUnitLabel } from "@/utils/product-utils";

interface ProductInfoProps {
  product: Product;
  t: (key: TranslationKey) => string;
}

export default function ProductInfo({
  product,
  t,
}: ProductInfoProps) {
  const discount = product.discountPrice
    ? Math.round(
        ((product.price - product.discountPrice) /
          product.price) *
          100
      )
    : 0;

  return (
    <div className="p-5 flex flex-col flex-1 relative bg-card z-10">
      {/* Unit badge */}
      <div className="mb-3">
        <span className="inline-flex items-center rounded-md bg-muted px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">
          {getUnitLabel(product.unit, t)}
        </span>
      </div>

      {/* Product name */}
      <Link
        href={`/products/${product._id}`}
        className="group/title block"
      >
        <h3 className="text-[15px] font-semibold text-foreground line-clamp-2 leading-snug group-hover/title:text-primary transition-colors duration-300 min-h-[2.5rem]">
          {product.name}
        </h3>
      </Link>

      {/* Rating */}
      <div className="flex items-center gap-1.5 mt-3">
        <div className="flex items-center gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-3 h-3 ${
                i <
                Math.floor(product.rating ?? 4.5)
                  ? "fill-amber-400 text-amber-400"
                  : "fill-black/[0.08] text-black/[0.08] dark:fill-white/[0.1] dark:text-white/[0.1]"
              }`}
            />
          ))}
        </div>
        <span className="text-[11px] font-medium text-muted-foreground/60">
          ({product.reviews ?? 0})
        </span>
      </div>

      {/* Price */}
      <div className="mt-auto pt-4 flex items-end justify-between gap-2">
        <div className="flex flex-col">
          {product.discountPrice ? (
            <>
              <span className="text-xl font-bold text-foreground tracking-[-0.02em]">
                {t("currency_symbol")}
                {product.discountPrice.toLocaleString(
                  "bn-BD"
                )}
              </span>
              <span className="text-xs font-medium text-muted-foreground/50 line-through mt-0.5">
                {t("currency_symbol")}
                {product.price.toLocaleString(
                  "bn-BD"
                )}
              </span>
            </>
          ) : (
            <span className="text-xl font-bold text-foreground tracking-[-0.02em]">
              {t("currency_symbol")}
              {product.price.toLocaleString(
                "bn-BD"
              )}
            </span>
          )}
        </div>

        {discount > 0 && (
          <span className="text-[11px] font-bold text-danger bg-danger-subtle dark:bg-danger-subtle px-2 py-0.5 rounded-md">
            -{discount}%
          </span>
        )}
      </div>
    </div>
  );
}
