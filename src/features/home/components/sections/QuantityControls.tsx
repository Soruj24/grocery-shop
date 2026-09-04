"use client";

import { Plus, Minus } from "lucide-react";

interface QuantityControlsProps {
  quantity: number;
  stock: number;
  onIncrement: () => void;
  onDecrement: () => void;
  locale?: string;
}

export default function QuantityControls({
  quantity,
  stock,
  onIncrement,
  onDecrement,
  locale = "bn-BD",
}: QuantityControlsProps) {
  return (
    <div className="flex items-center bg-muted rounded-xl p-1 gap-0.5">
      <button
        onClick={onDecrement}
        className="w-9 h-9 flex items-center justify-center bg-card hover:bg-danger-subtle hover:text-danger rounded-lg transition-all duration-200 text-foreground shadow-xs active:scale-95"
        aria-label="Decrease quantity"
      >
        <Minus size={14} strokeWidth={2.5} />
      </button>
      <span className="w-8 text-center text-sm font-bold text-foreground select-none tabular-nums">
        {quantity.toLocaleString(locale)}
      </span>
      <button
        onClick={onIncrement}
        disabled={quantity >= stock}
        className="w-9 h-9 flex items-center justify-center bg-foreground hover:bg-primary text-background rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-foreground active:scale-95 shadow-xs"
        aria-label="Increase quantity"
      >
        <Plus size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
}
