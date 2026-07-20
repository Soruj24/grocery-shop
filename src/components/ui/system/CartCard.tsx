import * as React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { cn } from "./types";
import { IconButton } from "./IconButton";

export interface CartCardProps {
  name: string;
  image?: string;
  price: number;
  quantity: number;
  stock?: number;
  currencySymbol?: string;
  unitSlot?: React.ReactNode; // unit label e.g. "1 kg"
  imageSlot?: React.ReactNode;
  onIncrement?: () => void;
  onDecrement?: () => void;
  onRemove?: () => void;
  className?: string;
}

export function CartCard({
  name,
  image,
  price,
  quantity,
  stock = 99,
  currencySymbol = "৳",
  unitSlot,
  imageSlot,
  onIncrement,
  onDecrement,
  onRemove,
  className,
}: CartCardProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-lg border border-border bg-card p-3",
        className,
      )}
    >
      <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-md bg-muted">
        {imageSlot ??
          (image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image} alt={name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-muted to-border" />
          ))}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-2">
          <h4 className="line-clamp-2 text-sm font-bold text-foreground">{name}</h4>
          {onRemove && (
            <button
              type="button"
              onClick={onRemove}
              aria-label="Remove item"
              className="text-muted-foreground hover:text-danger transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-2">
          <span className="text-base font-extrabold text-primary">
            {currencySymbol}
            {(price * quantity).toLocaleString()}
          </span>
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
        </div>
        {unitSlot}
      </div>
    </div>
  );
}
CartCard.displayName = "CartCard";
