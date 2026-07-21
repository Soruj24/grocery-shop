"use client";

import { useState } from "react";
import { Plus, Heart, Share2, X, Check, Star } from "lucide-react";
import Image from "next/image";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { handleShare } from "@/utils/product-utils";
import { getProductFallbackImage } from "@/constants/fallback-images";
import { Badge, Rating, Button, Modal } from "@/components/ui";
import { Toast } from "@/utils/toast";

export default function QuickViewModal({
  product,
  open,
  onClose,
}: {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}) {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { t } = useLanguage();
  const [qty, setQty] = useState(1);

  if (!product) return null;
  const active = isInWishlist(product._id);
  const finalPrice = product.discountPrice ?? product.price;
  const off = product.discount
    ? product.discount
    : Math.round(((product.price - finalPrice) / product.price) * 100);

  const add = () => {
    addToCart(product, qty);
    Toast.fire({ icon: "success", title: t("added_to_cart") });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="lg" title={undefined}>
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-subtle">
          <Image
            src={product.image || getProductFallbackImage(product.name)}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 40vw"
            className="object-cover"
          />
          {off > 0 && (
            <span className="absolute left-3 top-3">
              <Badge tone="danger" size="sm">
                -{off}% {t("off")}
              </Badge>
            </span>
          )}
        </div>

        <div className="flex flex-col">
          {product.category?.name && (
            <span className="mb-2 w-fit rounded-full bg-muted px-3 py-1 text-[10px] font-black uppercase tracking-wider text-muted-foreground">
              {product.category.name}
            </span>
          )}
          <h2 className="text-xl font-black leading-tight text-foreground">
            {product.name}
          </h2>

          <div className="mt-2 flex items-center gap-2">
            {typeof product.rating === "number" && (
              <Rating value={product.rating} size="sm" showValue count={product.reviews} />
            )}
            {product.stock > 0 ? (
              <span className="text-xs font-bold text-success">{t("in_stock")}</span>
            ) : (
              <span className="text-xs font-bold text-danger">{t("out_of_stock_label")}</span>
            )}
          </div>

          <div className="mt-4 flex items-baseline gap-3">
            <span className="text-2xl font-black text-primary">
              {t("currency_symbol")}
              {finalPrice.toLocaleString("bn-BD")}
            </span>
            {off > 0 && (
              <span className="text-sm font-bold text-muted-foreground line-through">
                {t("currency_symbol")}
                {product.price.toLocaleString("bn-BD")}
              </span>
            )}
          </div>

          {product.description && (
            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          )}

          <div className="mt-auto space-y-3 pt-5">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 rounded-xl border border-border bg-muted p-1">
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-card shadow-sm transition-colors hover:bg-rose-100 hover:text-rose-600"
                >
                  <Plus className="h-4 w-4 rotate-45" />
                </button>
                <span className="w-8 text-center text-sm font-black tabular-nums">
                  {qty.toLocaleString("bn-BD")}
                </span>
                <button
                  onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}
                  disabled={qty >= (product.stock || 99)}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-card shadow-sm transition-colors hover:bg-primary-subtle hover:text-primary disabled:opacity-30"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              {product.unit && (
                <span className="text-xs font-bold text-muted-foreground">
                  / {product.unit}
                </span>
              )}
            </div>

            <div className="flex gap-2">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                loading={false}
                onClick={add}
                leftIcon={<Plus size={18} strokeWidth={3} />}
                disabled={product.stock === 0}
              >
                {t("add_to_cart")}
              </Button>
              <button
                onClick={() => {
                  toggleWishlist(product);
                  Toast.fire({
                    icon: "success",
                    title: active ? t("removed_from_wishlist") : t("added_to_wishlist"),
                  });
                }}
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border transition-all active:scale-95 ${
                  active ? "bg-rose-500 text-white" : "bg-card text-muted-foreground hover:bg-rose-500 hover:text-white"
                }`}
              >
                <Heart className={`h-5 w-5 ${active ? "fill-current" : ""}`} />
              </button>
              <button
                onClick={(e) => handleShare(product.name, product._id, t)}
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-muted-foreground transition-all hover:bg-accent hover:text-accent-foreground active:scale-95"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
