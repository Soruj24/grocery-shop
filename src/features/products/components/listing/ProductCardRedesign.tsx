"use client";

import { Plus, Heart, Share2, Eye, GitCompareArrows, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { useProductSwipe } from "@/features/products/hooks/useProductSwipe";
import { handleShare } from "@/utils/product-utils";
import { getProductFallbackImage } from "@/constants/fallback-images";
import { Badge, Rating, Button } from "@/components/ui";
import { useCompare } from "./CompareContext";
import { Toast } from "@/utils/toast";

export default function ProductCardRedesign({
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

  const swipe = useProductSwipe({
    product,
    onAddToCart: () => {
      addToCart(product, 1);
      Toast.fire({ icon: "success", title: t("added_to_cart") });
    },
    onToggleWishlist: () => {
      toggleWishlist(product);
      Toast.fire({
        icon: "success",
        title: active ? t("removed_from_wishlist") : t("added_to_wishlist"),
      });
    },
  });

  const finalPrice = product.discountPrice ?? product.price;
  const off = product.discount
    ? product.discount
    : Math.round(((product.price - finalPrice) / product.price) * 100);

  const quickAdd = () => {
    if (!cartItem) {
      addToCart(product, 1);
      Toast.fire({ icon: "success", title: t("added_to_cart") });
    }
  };

  return (
    <motion.div
      style={{ x: swipe.x, rotate: swipe.rotate, cursor: "grab" }}
      whileTap={{ cursor: "grabbing" }}
      whileDrag={reduceMotion ? undefined : { scale: 1.04, zIndex: 50 }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={reduceMotion ? 0.3 : 0.6}
      dragSnapToOrigin
      onDragEnd={swipe.handleDragEnd}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-500 hover:border-primary/30 hover:shadow-xl"
    >
      {/* Swipe overlay */}
      <motion.div
        style={{ backgroundColor: swipe.overlayColor, opacity: swipe.overlayOpacity }}
        className="pointer-events-none absolute inset-0 z-30 mix-blend-multiply dark:mix-blend-overlay"
      />

      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden bg-subtle">
        <Link href={`/products/${product._id}`} className="block h-full w-full">
          <Image
            src={product.image || getProductFallbackImage(product.name)}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </Link>

        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* Badges */}
        <div className="absolute left-3 top-3 z-20 flex flex-col gap-1.5">
          {off > 0 && (
            <Badge tone="danger" size="sm" className="shadow-sm">
              -{off}% {t("off")}
            </Badge>
          )}
          {product.isDeal && (
            <Badge tone="warning" size="xs">
              {t("todays_deals")}
            </Badge>
          )}
        </div>

        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute bottom-3 left-3 z-20">
            <Badge tone="warning" size="xs">
              {t("low_stock")}
            </Badge>
          </div>
        )}

        {/* Hover action rail */}
        <div className="absolute right-3 top-3 z-20 flex translate-x-14 flex-col gap-2 transition-transform duration-300 group-hover:translate-x-0">
          <button
            onClick={() => onQuickView?.(product)}
            title={t("quick_view")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted-foreground shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground active:scale-95"
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
            className={`flex h-10 w-10 items-center justify-center rounded-full shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95 ${
              active
                ? "bg-rose-500 text-white"
                : "bg-card text-muted-foreground hover:bg-rose-500 hover:text-white"
            }`}
          >
            <Heart className={`h-5 w-5 ${active ? "fill-current" : ""}`} />
          </button>
          <button
            onClick={(e) => handleShare(product.name, product._id, t)}
            title={t("share")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted-foreground shadow-lg backdrop-blur-md transition-all hover:scale-110 hover:bg-accent hover:text-accent-foreground active:scale-95"
          >
            <Share2 className="h-5 w-5" />
          </button>
          <button
            onClick={() => {
              if (!comparing && compareItems.length >= 4) {
                Toast.fire({ icon: "info", title: t("compare_max") ?? "সর্বোচ্চ ৪টি" });
                return;
              }
              toggleCompare(product);
            }}
            title={t("compare")}
            className={`flex h-10 w-10 items-center justify-center rounded-full shadow-lg backdrop-blur-md transition-all hover:scale-110 active:scale-95 ${
              comparing
                ? "bg-primary text-primary-foreground"
                : "bg-card text-muted-foreground hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            {comparing ? <Check className="h-5 w-5" /> : <GitCompareArrows className="h-5 w-5" />}
          </button>
        </div>

        {product.stock === 0 && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
            <span className="rotate-[-6deg] rounded-full bg-card px-4 py-2 text-xs font-black text-foreground shadow-lg">
              {t("out_of_stock_label")}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="mb-2 flex items-start justify-between gap-2">
          {product.category?.name && (
            <span className="rounded-full bg-muted px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
              {product.category.name}
            </span>
          )}
          {typeof product.rating === "number" && (
            <Rating value={product.rating} size="xs" showValue={false} />
          )}
        </div>

        <Link href={`/products/${product._id}`} className="block">
          <h3 className="line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div className="flex flex-col">
            <span className="text-lg font-black text-primary">
              {t("currency_symbol")}
              {finalPrice.toLocaleString("bn-BD")}
            </span>
            {off > 0 && (
              <span className="text-xs font-bold text-muted-foreground line-through">
                {t("currency_symbol")}
                {product.price.toLocaleString("bn-BD")}
              </span>
            )}
          </div>

          {product.stock === 0 ? (
            <span className="rounded-xl bg-muted px-4 py-2.5 text-xs font-black text-muted-foreground">
              {t("out_of_stock_label")}
            </span>
          ) : !cartItem ? (
            <Button
              variant="primary"
              size="md"
              onClick={quickAdd}
              leftIcon={<Plus size={18} strokeWidth={3} />}
              className="rounded-xl"
              aria-label={t("add_to_cart")}
            >
              <span className="sr-only">{t("add_to_cart")}</span>
            </Button>
          ) : (
            <div onClick={(e) => e.preventDefault()}>
              <div className="flex items-center gap-1 rounded-xl border border-border bg-muted p-1">
                <button
                  onClick={() =>
                    cartItem.quantity > 1 &&
                    updateQuantity(product._id, cartItem.quantity - 1)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-card text-foreground shadow-sm transition-colors hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-900/30"
                >
                  <Plus className="h-4 w-4 rotate-45" />
                </button>
                <span className="w-6 text-center text-sm font-black tabular-nums">
                  {cartItem.quantity.toLocaleString("bn-BD")}
                </span>
                <button
                  onClick={() =>
                    cartItem.quantity < product.stock &&
                    updateQuantity(product._id, cartItem.quantity + 1)
                  }
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-card text-foreground shadow-sm transition-colors hover:bg-primary-subtle hover:text-primary"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
