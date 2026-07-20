import * as React from "react";
import { cn, type Tone } from "./types";
import { Badge } from "./Badge";
import { Card } from "./Card";

export interface OrderCardProps {
  orderId: string;
  date?: string;
  status?: { label: string; tone?: Tone };
  total: number;
  currencySymbol?: string;
  itemCount?: number;
  thumbnailSlot?: React.ReactNode; // e.g. first product image(s)
  metaSlot?: React.ReactNode; // delivery address / payment method
  actionSlot?: React.ReactNode; // track / reorder buttons
  className?: string;
}

export function OrderCard({
  orderId,
  date,
  status,
  total,
  currencySymbol = "৳",
  itemCount,
  thumbnailSlot,
  metaSlot,
  actionSlot,
  className,
}: OrderCardProps) {
  return (
    <Card padding="md" className={cn("flex flex-col gap-4", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
            Order
          </p>
          <p className="font-extrabold text-foreground">#{orderId}</p>
          {date && <p className="text-xs text-muted-foreground mt-0.5">{date}</p>}
        </div>
        {status && <Badge tone={status.tone ?? "info"} soft dot>{status.label}</Badge>}
      </div>

      <div className="flex items-center gap-4">
        {thumbnailSlot && (
          <div className="flex -space-x-3">{thumbnailSlot}</div>
        )}
        <div className="text-sm text-muted-foreground">
          {itemCount !== undefined && <span>{itemCount} items</span>}
          {metaSlot && <div className="mt-1">{metaSlot}</div>}
        </div>
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
        <div>
          <p className="text-xs text-muted-foreground">Total</p>
          <p className="text-lg font-extrabold text-foreground">
            {currencySymbol}
            {total.toLocaleString()}
          </p>
        </div>
        {actionSlot}
      </div>
    </Card>
  );
}
OrderCard.displayName = "OrderCard";
