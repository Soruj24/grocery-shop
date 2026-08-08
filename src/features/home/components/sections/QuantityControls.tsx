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
    <div className="flex items-center bg-black/[0.04] dark:bg-white/[0.06] rounded-xl p-1 gap-0.5">
      <button
        onClick={onDecrement}
        className="w-9 h-9 flex items-center justify-center bg-white dark:bg-[#09090b] hover:bg-rose-50 dark:hover:bg-rose-500/[0.08] hover:text-rose-500 rounded-lg transition-all duration-200 text-foreground shadow-[0_1px_2px_rgba(0,0,0,0.04)] active:scale-95"
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
        className="w-9 h-9 flex items-center justify-center bg-foreground hover:bg-primary text-background rounded-lg transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-foreground active:scale-95 shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
        aria-label="Increase quantity"
      >
        <Plus size={14} strokeWidth={2.5} />
      </button>
    </div>
  );
}
