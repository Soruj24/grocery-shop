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
    <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-2xl p-1 border border-gray-200 dark:border-gray-700 shadow-inner">
      <button
        onClick={onDecrement}
        className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-700 hover:bg-rose-100 dark:hover:bg-rose-900/30 hover:text-rose-600 rounded-xl transition-all text-gray-600 dark:text-gray-300 shadow-sm"
      >
        <Minus size={18} strokeWidth={3} />
      </button>
      <span className="w-8 text-center text-sm font-black dark:text-white select-none tabular-nums">
        {quantity.toLocaleString(locale)}
      </span>
      <button
        onClick={onIncrement}
        disabled={quantity >= stock}
        className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-700 hover:bg-green-100 dark:hover:bg-green-900/30 hover:text-green-600 rounded-xl transition-all text-gray-600 dark:text-gray-300 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600 shadow-sm"
      >
        <Plus size={18} strokeWidth={3} />
      </button>
    </div>
  );
}
