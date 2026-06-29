

import Link from "next/link";
import { Star } from "lucide-react";
import { Product } from "@/types/product";
import { TranslationKey } from "@/lib/constants/translations";
import { getUnitLabel } from "@/lib/utils/product-utils";

interface ProductInfoProps {
  product: Product;
  t: (key: TranslationKey) => string;
}

export default function ProductInfo({ product, t }: ProductInfoProps) {
  return (
    <div className="p-6 flex flex-col flex-1 relative bg-white dark:bg-gray-900 z-10">
      <div className="mb-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <p className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider bg-gray-100 dark:bg-white/5 px-2 py-1 rounded-md inline-block">
            {getUnitLabel(product.unit, t)}
          </p>
          <div className="flex items-center gap-1">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span className="text-[10px] font-bold text-gray-500 dark:text-gray-400">4.8</span>
          </div>
        </div>

        <Link href={`/products/${product._id}`} className="group/title block">
          <h3 className="text-base font-bold text-gray-800 dark:text-gray-100 line-clamp-2 leading-tight group-hover/title:text-green-600 transition-colors h-10">
            {product.name}
          </h3>
        </Link>
      </div>

      <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex items-end justify-between gap-3">
        <div className="flex flex-col">
          {product.discountPrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-green-600">
                {t("currency_symbol")}{product.discountPrice.toLocaleString("bn-BD")}
              </span>
              <span className="text-xs text-gray-400 line-through decoration-rose-500/50">
                {t("currency_symbol")}{product.price.toLocaleString("bn-BD")}
              </span>
            </div>
          ) : (
            <span className="text-xl font-black text-gray-800 dark:text-gray-100">
              {t("currency_symbol")}{product.price.toLocaleString("bn-BD")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
