import * as React from "react";
import { Plus, Minus } from "lucide-react";
import { cn, type Tone } from "./types";
import { Badge } from "./Badge";
import { IconButton } from "./IconButton";
import { Rating } from "./Rating";

export interface ProductCardProps {
  name: string;
  image?: string;
  price: number;
  compareAtPrice?: number;
  currencySymbol?: string;
  rating?: number;
  reviewCount?: number;
  badge?: { label: string; tone?: Tone };
  outOfStock?: boolean;
  quantity?: number;
  stock?: number;
  onAddToCart?: () => void;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onWishlist?: () => void;
  wishlisted?: boolean;
  imageSlot?: React.ReactNode;
  actionSlot?: React.ReactNode;
  className?: string;
  /** Presentational only — no business logic. */
  skeleton?: boolean;
}

export function ProductCard({
  name,
  image,
  price,
  compareAtPrice,
  currencySymbol = "৳",
  rating,
  reviewCount,
  badge,
  outOfStock,
  quantity = 0,
  stock = 99,
  onAddToCart,
  onIncrement,
  onDecrement,
  onWishlist,
  wishlisted,
  imageSlot,
  actionSlot,
  className,
  skeleton,
}: ProductCardProps) {
  if (skeleton) {
    return (
      <div
        className={cn(
          "rounded-xl border border-border bg-card p-3 flex flex-col gap-4 animate-pulse",
          className,
        )}
      >
        <div className="aspect-square rounded-lg bg-muted" />
        <div className="h-4 w-2/3 rounded bg-muted" />
        <div className="h-6 w-1/2 rounded bg-muted" />
        <div className="h-10 w-full rounded-md bg-muted" />
      </div>
    );
  }

  const discount = compareAtPrice && compareAtPrice > price
    ? Math.round(((compareAtPrice - price) / compareAtPrice) * 100)
    : 0;

  return (
    <div
      className={cn(
        "group relative flex flex-col rounded-xl border border-border bg-card shadow-sm",
        "transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30",
        className,
      )}
    >
      <div className="relative aspect-square overflow-hidden rounded-t-xl bg-muted">
        {imageSlot ??
          (image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt={name}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-muted to-border" />
          ))}

        {badge && (
          <span className="absolute left-3 top-3">
            <Badge tone={badge.tone ?? "primary"} size="sm" dot>
              {badge.label}
            </Badge>
          </span>
        )}
        {discount > 0 && (
          <span className="absolute right-3 top-3">
            <Badge tone="danger" size="sm">
              -{discount}%
            </Badge>
          </span>
        )}
        {onWishlist && (
          <button
            type="button"
            onClick={onWishlist}
            aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute right-3 bottom-3 rounded-full bg-card/90 p-2 text-muted-foreground shadow-sm backdrop-blur transition-colors hover:text-danger"
          >
            <span className={cn(wishlisted && "text-danger")}>♥</span>
          </button>
        )}
        {outOfStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <span className="rounded-full bg-card px-4 py-1.5 text-xs font-bold text-foreground">
              Out of stock
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="line-clamp-2 min-h-[2.5rem] font-bold text-foreground text-sm leading-snug">
          {name}
        </h3>

        {rating !== undefined && (
          <Rating value={rating} size="xs" count={reviewCount} />
        )}

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div>
            <span className="text-lg font-extrabold text-foreground">
              {currencySymbol}
              {price.toLocaleString()}
            </span>
            {compareAtPrice && (
              <span className="ml-2 text-xs text-muted-foreground line-through">
                {currencySymbol}
                {compareAtPrice.toLocaleString()}
              </span>
            )}
          </div>

          {actionSlot ??
            (quantity > 0 ? (
              <div className="flex items-center gap-1 rounded-md border border-border bg-card p-1">
                <IconButton size="xs" variant="ghost" aria-label="Decrease" onClick={onDecrement}>
                  <Minus className="h-3.5 w-3.5" />
                </IconButton>
                <span className="w-6 text-center text-sm font-bold">{quantity}</span>
                <IconButton
                  size="xs"
                  variant="ghost"
                  aria-label="Increase"
                  disabled={quantity >= stock}
                  onClick={onIncrement}
                >
                  <Plus className="h-3.5 w-3.5" />
                </IconButton>
              </div>
            ) : (
              <IconButton
                size="sm"
                aria-label="Add to cart"
                disabled={outOfStock}
                onClick={onAddToCart}
              >
                <Plus className="h-4 w-4" />
              </IconButton>
            ))}
        </div>
      </div>
    </div>
  );
}
ProductCard.displayName = "ProductCard";
