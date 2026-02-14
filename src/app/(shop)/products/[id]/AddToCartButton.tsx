"use client";

import { useState } from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { Product } from "@/types/product";
import { Toast } from "@/lib/toast";

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    Toast.fire({
      icon: 'success',
      title: 'কার্টে যোগ করা হয়েছে',
      background: '#020617',
      color: '#fff',
    });
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      {/* Quantity Selector */}
      <div className="flex items-center bg-gray-100 dark:bg-gray-800 p-2 rounded-2xl border border-gray-200 dark:border-gray-700">
        <button 
          onClick={() => setQuantity(Math.max(1, quantity - 1))}
          className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-900 rounded-xl shadow-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-12 text-center font-black text-gray-800 dark:text-gray-100 text-lg">{quantity}</span>
        <button 
          onClick={() => setQuantity(quantity + 1)}
          className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-900 rounded-xl shadow-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Add to Cart Button */}
      <button 
        onClick={handleAddToCart}
        disabled={product.stock <= 0}
        className="flex-1 w-full sm:w-auto flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500 text-white px-8 py-5 rounded-[24px] font-black text-lg transition-all shadow-xl shadow-green-900/20 active:scale-95 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:shadow-none"
      >
        <ShoppingCart className="w-6 h-6" />
        কার্টে যুক্ত করুন
      </button>
    </div>
  );
}
