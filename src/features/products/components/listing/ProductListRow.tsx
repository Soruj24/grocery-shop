"use client";

import { Plus, Heart, Share2, Eye, GitCompareArrows, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { handleShare } from "@/utils/product-utils";
import { getProductFallbackImage } from "@/constants/fallback-images";
import { Badge, Rating, Button } from "@/components/ui";
import { useCompare } from "./CompareContext";
import { Toast } from "@/utils/toast";

export default function ProductListRow({
  product,
  onQuickView,
}: {
  product: Product;
  onQuickView?: (product: Product) => void;
}) {
  const { addToCart, updateQuantity, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const cartItem = cart?.find((item) => item._id === product._id);
  const active = isInWishlist(product._id);
  const { items: compareItems, toggleCompare, isComparing } = useCompare();
  const comparing = isComparing(product._id);

  const finalPrice = product.discountPrice ?? product.price;
  const off = product.discount
    ? product.discount
    : Math.round(((product.price - finalPrice) / product.price) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-border bg-card p-4 shadow-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg sm:flex-row sm:items-center"
    >
      {/* Image */}
      <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-subtle sm:h-40 sm:w-40">
        <Link href={`/products/${product._id}`} className="block h-full w-full">
          <Image
            src={product.image || getProductFallbackImage(product.name)}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, 160px"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </Link>
        {off > 0 && (
          <span className="absolute left-2 top-2">
            <Badge tone="danger" size="xs">
              -{off}% {t("off")}
            </Badge>
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-center gap-2">
          {product.category?.name && (
            <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
              {product.category.name}
            </span>
          )}
          {typeof product.rating === "number" && (
            <Rating value={product.rating} size="xs" showValue count={product.reviews} />
          )}
        </div>
        <Link href={`/products/${product._id}`} className="block">
          <h3 className="line-clamp-2 text-base font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>
        {product.description && (
          <p className="line-clamp-2 hidden text-sm text-muted-foreground sm:block">
            {product.description}
          </p>
        )}
        <div className="mt-1 flex items-center gap-3">
          <span className="text-xl font-black text-primary">
            {t("currency_symbol")}
            {finalPrice.toLocaleString("bn-BD")}
          </span>
          {off > 0 && (
            <span className="text-sm font-bold text-muted-foreground line-through">
              {t("currency_symbol")}
              {product.price.toLocaleString("bn-BD")}
            </span>
          )}
          {product.stock === 0 && (
            <Badge tone="neutral" size="xs">
              {t("out_of_stock_label")}
            </Badge>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 sm:flex-col sm:gap-2">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onQuickView?.(product)}
            title={t("quick_view")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-muted text-muted-foreground transition-all hover:bg-primary hover:text-primary-foreground active:scale-95"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            onClick={() => {
              toggleWishlist(product);
              Toast.fire({
                icon: "success",
                title: active ? t("removed_from_wishlist") : t("added_to_wishlist"),
              });
            }}
            title={t("wishlist")}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all active:scale-95 ${
              active ? "bg-rose-500 text-white" : "bg-muted text-muted-foreground hover:bg-rose-500 hover:text-white"
            }`}
          >
            <Heart className={`h-5 w-5 ${active ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={() => {
              if (!comparing && compareItems.length >= 4) return;
              toggleCompare(product);
            }}
            title={t("compare")}
            className={`flex h-10 w-10 items-center justify-center rounded-full transition-all active:scale-95 ${
              comparing ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            {comparing ? <Check className="h-5 w-5" /> : <GitCompareArrows className="h-5 w-5" />}
          </button>
        </div>

        {product.stock === 0 ? (
          <span className="rounded-xl bg-muted px-4 py-2.5 text-xs font-black text-muted-foreground">
            {t("out_of_stock_label")}
          </span>
        ) : !cartItem ? (
          <Button
            variant="primary"
            size="md"
            onClick={() => {
              addToCart(product, 1);
              Toast.fire({ icon: "success", title: t("added_to_cart") });
            }}
            leftIcon={<Plus size={18} strokeWidth={3} />}
            className="rounded-xl"
          >
            {t("add_to_cart")}
          </Button>
        ) : (
          <div className="flex items-center gap-1 rounded-xl border border-border bg-muted p-1">
            <button
              onClick={() => cartItem.quantity > 1 && updateQuantity(product._id, cartItem.quantity - 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-card shadow-sm transition-colors hover:bg-rose-100 hover:text-rose-600"
            >
              <Plus className="h-4 w-4 rotate-45" />
            </button>
            <span className="w-6 text-center text-sm font-black tabular-nums">
              {cartItem.quantity.toLocaleString("bn-BD")}
            </span>
            <button
              onClick={() => cartItem.quantity < product.stock && updateQuantity(product._id, cartItem.quantity + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-card shadow-sm transition-colors hover:bg-primary-subtle hover:text-primary"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
