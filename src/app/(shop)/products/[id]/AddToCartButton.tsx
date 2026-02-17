"use client";

import { useState, useEffect } from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { Product } from "@/types/product";
import { Toast } from "@/lib/toast";
import { useLanguage } from "@/components/LanguageContext";

export default function AddToCartButton({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, cart } = useCart();
  const { t } = useLanguage();

  const cartItem = cart.find((item) => item._id === product._id);
  const currentCartQuantity = cartItem ? cartItem.quantity : 0;
  
  // Calculate max addable quantity
  const maxAddable = Math.max(0, product.stock - currentCartQuantity);

  // Reset local quantity if it exceeds maxAddable or if it's 0 when it could be 1
  useEffect(() => {
    if (quantity > maxAddable && maxAddable > 0) {
      setQuantity(maxAddable);
    } else if (maxAddable === 0) {
        setQuantity(0); 
    } else if (quantity === 0 && maxAddable > 0) {
        setQuantity(1);
    }
  }, [maxAddable, quantity]);

  const handleAddToCart = () => {
    if (quantity <= 0) return;
    
    if (currentCartQuantity + quantity > product.stock) {
        Toast.fire({
            icon: 'error',
            title: t('out_of_stock_label'),
            background: '#020617',
            color: '#fff',
        });
        return;
    }

    addToCart(product, quantity);
    Toast.fire({
      icon: 'success',
      title: t('added_to_cart'),
      background: '#020617',
      color: '#fff',
    });
    // Reset quantity logic is handled by useEffect as maxAddable changes
  };

  const increment = () => {
    if (quantity < maxAddable) {
        setQuantity(q => q + 1);
    } else {
        Toast.fire({
            icon: 'warning',
            title: t('low_stock'),
            background: '#020617',
            color: '#fff',
        });
    }
  };

  const decrement = () => {
    if (quantity > 1) {
        setQuantity(q => q - 1);
    }
  };

  const isOutOfStock = product.stock <= 0;
  const isMaxReached = currentCartQuantity >= product.stock;

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      {/* Quantity Selector */}
      <div className={`flex items-center bg-gray-100 dark:bg-gray-800 p-2 rounded-2xl border border-gray-200 dark:border-gray-700 ${isOutOfStock || isMaxReached ? 'opacity-50 pointer-events-none' : ''}`}>
        <button 
          onClick={decrement}
          disabled={quantity <= 1}
          className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-900 rounded-xl shadow-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="w-4 h-4" />
        </button>
        <span className="w-12 text-center font-black text-gray-800 dark:text-gray-100 text-lg">{quantity}</span>
        <button 
          onClick={increment}
          disabled={quantity >= maxAddable}
          className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-900 rounded-xl shadow-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Add to Cart Button */}
      <button 
        onClick={handleAddToCart}
        disabled={isOutOfStock || isMaxReached || quantity <= 0}
        className="flex-1 w-full sm:w-auto flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-500 text-white px-8 py-5 rounded-[24px] font-black text-lg transition-all shadow-xl shadow-green-900/20 active:scale-95 disabled:bg-gray-200 dark:disabled:bg-gray-800 disabled:shadow-none disabled:cursor-not-allowed disabled:text-gray-400"
      >
        <ShoppingCart className="w-6 h-6" />
        {isOutOfStock ? t('out_of_stock_label') : isMaxReached ? t('low_stock') : t('add_to_cart_btn')}
      </button>
    </div>
  );
}
