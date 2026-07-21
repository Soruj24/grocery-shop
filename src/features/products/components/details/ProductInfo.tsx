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
import { Badge, Rating } from "@/components/ui";
import type { TranslationKey } from "@/constants/translations";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const { t } = useLanguage();
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const unitToKey: Record<string, string> = {
    pcs: 'unit_piece',
    kg: 'unit_kg',
    g: 'unit_g',
    l: 'unit_l',
    ml: 'unit_ml',
    pack: 'unit_pack',
    box: 'unit_box',
    bottle: 'unit_bottle',
    dozen: 'unit_dozen',
  };

  const handleBuyNow = () => {
    if (product.stock === 0) return;
    addToCart(product, 1);
    router.push("/checkout");
  };

  const discountPercent = product.discount || (product.discountPrice ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0);

  const productName = product.name;
  const productDesc = product.description;
  const categoryName = product.category?.name;

  return (
    <div className="w-full lg:w-1/2 space-y-8">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge tone="primary" size="md" className="uppercase tracking-widest">
              {categoryName || t('grocery')}
            </Badge>
            <div className="flex items-center gap-1.5 bg-warning-subtle px-3 py-1.5 rounded-2xl text-warning">
              <Rating value={product.rating || 4.9} size="xs" />
              <span className="text-sm font-black">{(product.rating || 4.9).toLocaleString('bn-BD')} ({(product.reviews || 120).toLocaleString('bn-BD')} {t('reviews_count')})</span>
            </div>
          </div>
          <div className={`flex items-center gap-1.5 font-bold text-sm ${
            product.stock === 0
              ? "text-danger"
              : product.stock <= 5
                ? "text-warning"
                : "text-success"
          }`}>
            {product.stock === 0 ? <AlertCircle className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
            <span>
              {product.stock === 0
                ? t('out_of_stock_label')
                : product.stock <= 5
                  ? `${t('low_stock')} - ${product.stock} ${t((unitToKey[product.unit || 'pcs'] || 'unit_piece') as TranslationKey)}`
                  : t('stock_available')}
            </span>
          </div>
        </div>

        <h1 className="text-3xl md:text-5xl font-black text-foreground leading-tight tracking-tight">
          {productName}
        </h1>

        {productDesc && (
          <p className="text-muted-foreground text-base leading-relaxed line-clamp-3">
            {productDesc}
          </p>
        )}

        <div className="flex items-center gap-6 bg-subtle p-6 rounded-2xl border border-border">
          <div className="space-y-1">
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{t('current_price')}</p>
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-black text-foreground">
                {t('currency_symbol')}{(product.discountPrice || product.price).toLocaleString('bn-BD')}
              </span>
              {product.discountPrice && (
                <span className="text-xl text-muted-foreground line-through font-bold decoration-2 decoration-danger/50">
                  {t('currency_symbol')}{product.price.toLocaleString('bn-BD')}
                </span>
              )}
            </div>
          </div>

          {discountPercent > 0 && (
            <div className="ml-auto bg-danger text-danger-foreground px-4 py-2 rounded-2xl font-black text-xl shadow-lg shadow-danger/20 rotate-3">
              -{discountPercent.toLocaleString('bn-BD')}%
            </div>
          )}
        </div>
      </div>

      {/* Variant Selector */}
      {product.variants && product.variants.length > 0 && (
        <VariantSelector
          variants={product.variants}
          selectedVariants={selectedVariants}
          onSelect={(name, option) => setSelectedVariants((prev) => ({ ...prev, [name]: option }))}
        />
      )}

      {/* Shipping Info */}
      <ShippingInfo />

      {/* Delivery Estimation */}
      <DeliveryEstimation />

      {/* Coupon Offers */}
      <CouponOffer />

      <div className="flex flex-col gap-4 pt-4 border-t border-border">
        <div className="flex flex-col sm:flex-row gap-4">
          <AddToCartButton product={product} />
          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={handleBuyNow}
            disabled={product.stock === 0}
            className={`flex-1 bg-primary hover:bg-primary-hover text-primary-foreground px-8 py-4 rounded-lg font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary ${product.stock === 0 ? 'opacity-50 cursor-not-allowed shadow-none' : 'hover:-translate-y-1'}`}
          >
            <Zap className="w-5 h-5 fill-current" />
            {t('buy_now')}
          </motion.button>
        </div>

        <div className="flex items-center justify-between gap-4 pt-4">
          <WishlistButton product={product} />
          <ShareButton product={product} />
        </div>
      </div>

      <ProductHighlights />
    </div>
  );
}
