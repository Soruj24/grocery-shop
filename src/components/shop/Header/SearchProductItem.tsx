"use client";

import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { getProductFallbackImage } from "@/lib/category-utils";
import type { Product } from "@/types/product";

interface SearchProductItemProps {
  product: Product;
  index: number;
  selectedIndex: number;
  onProductClick: (id: string) => void;
}

export default function SearchProductItem({
  product,
  index,
  selectedIndex,
  onProductClick,
}: SearchProductItemProps) {
  const { t } = useLanguage();
  const isSelected = selectedIndex === index;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
    >
      <Link
        href={`/products/${product._id}`}
        onClick={() => onProductClick(product._id)}
        className={`flex items-center gap-4 p-3 rounded-2xl transition-all group border relative overflow-hidden ${
          isSelected
            ? "bg-green-50 dark:bg-green-500/10 border-green-200 dark:border-green-500/30"
            : "hover:bg-gray-50 dark:hover:bg-white/5 border-transparent hover:border-gray-100 dark:hover:border-white/5"
        }`}
      >
        <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5 flex-shrink-0 relative group-hover:shadow-md transition-shadow">
          <Image
            src={product.image || getProductFallbackImage(product.name)}
            alt={product.name}
            fill
            sizes="64px"
            className={`object-cover transition-transform duration-500 ${product.stock <= 0 ? "grayscale" : "group-hover:scale-110"}`}
          />
          {product.stock <= 0 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-[10px] font-black text-white uppercase tracking-wider text-center px-1 leading-tight">
                {t("out_of_stock")}
              </span>
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h4
            className={`text-sm font-bold truncate transition-colors mb-1 ${
              isSelected
                ? "text-green-600"
                : "text-gray-900 dark:text-white group-hover:text-green-600"
            }`}
          >
            {product.name}
          </h4>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-black text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-500/10 px-2 py-0.5 rounded-md">
              {t("currency_symbol")}
              {(product.discountPrice || product.price).toLocaleString("bn-BD")}
            </span>
            {product.discountPrice && (
              <span className="text-[10px] text-gray-400 line-through decoration-red-400 decoration-2">
                {t("currency_symbol")}
                {product.price.toLocaleString("bn-BD")}
              </span>
            )}
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
              /{" "}
              {product.unit === "kg"
                ? t("unit_kg")
                : product.unit === "g"
                  ? t("unit_g")
                  : product.unit || t("default_unit")}
            </span>
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            {(product.rating || 0) > 0 && (
              <div className="flex items-center gap-1">
                <Star className="w-3 h-3 text-orange-400 fill-current" />
                <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">
                  {(product.rating || 0).toLocaleString("bn-BD")}
                </span>
              </div>
            )}
            {product.stock > 0 && product.stock <= 5 && (
              <span className="text-[10px] font-bold text-orange-500 animate-pulse">
                {t("low_stock")}
              </span>
            )}
          </div>
        </div>
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isSelected
              ? "bg-green-500 text-white shadow-lg shadow-green-500/30"
              : "bg-gray-100 dark:bg-white/5 text-gray-400 group-hover:bg-green-500 group-hover:text-white"
          }`}
        >
          <ArrowRight
            className={`w-4 h-4 transition-transform ${
              isSelected ? "translate-x-0" : "group-hover:translate-x-0.5"
            }`}
          />
        </div>
      </Link>
    </motion.div>
  );
}
