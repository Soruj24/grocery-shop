

import Link from "next/link";
import { Product } from "@/types/product";
import { TranslationKey } from "@/constants/translations";
import { getUnitLabel } from "@/utils/product-utils";
import { Badge, Rating } from "@/components/ui";

interface ProductInfoProps {
  product: Product;
  t: (key: TranslationKey) => string;
}

export default function ProductInfo({ product, t }: ProductInfoProps) {
  return (
    <div className="p-6 flex flex-col flex-1 relative bg-card z-10">
      <div className="mb-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Badge tone="neutral" size="xs">
            {getUnitLabel(product.unit, t)}
          </Badge>
          <Rating value={4.8} size="xs" showValue={false} className="text-[10px]" />
        </div>

        <Link href={`/products/${product._id}`} className="group/title block">
          <h3 className="text-base font-bold text-foreground line-clamp-2 leading-tight group-hover/title:text-primary transition-colors h-10">
            {product.name}
          </h3>
        </Link>
      </div>

      <div className="mt-auto pt-4 border-t border-border flex items-end justify-between gap-3">
        <div className="flex flex-col">
          {product.discountPrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-black text-primary">
                {t("currency_symbol")}{product.discountPrice.toLocaleString("bn-BD")}
              </span>
              <span className="text-xs text-muted-foreground line-through decoration-danger/50">
                {t("currency_symbol")}{product.price.toLocaleString("bn-BD")}
              </span>
            </div>
          ) : (
            <span className="text-xl font-black text-foreground">
              {t("currency_symbol")}{product.price.toLocaleString("bn-BD")}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
