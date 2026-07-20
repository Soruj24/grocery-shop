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
    <div className="flex items-center bg-muted rounded-2xl p-1 border border-border shadow-inner">
      <button
        onClick={onDecrement}
        className="w-10 h-10 flex items-center justify-center bg-card hover:bg-rose-100 dark:hover:bg-rose-900/30 hover:text-rose-600 rounded-xl transition-all text-foreground shadow-sm"
      >
        <Minus size={18} strokeWidth={3} />
      </button>
      <span className="w-8 text-center text-sm font-black text-foreground select-none tabular-nums">
        {quantity.toLocaleString(locale)}
      </span>
      <button
        onClick={onIncrement}
        disabled={quantity >= stock}
        className="w-10 h-10 flex items-center justify-center bg-card hover:bg-primary-subtle dark:hover:bg-primary-subtle hover:text-primary rounded-xl transition-all text-foreground disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-card disabled:hover:text-foreground shadow-sm"
      >
        <Plus size={18} strokeWidth={3} />
      </button>
    </div>
  );
}
