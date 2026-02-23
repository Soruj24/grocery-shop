"use client";

import { useState } from "react";
import { ShoppingCart, Minus, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
  const isOutOfStock = product.stock <= 0;
  const isMaxReached = currentCartQuantity >= product.stock;

  // Reset local quantity if it exceeds maxAddable or if it's 0 when it could be 1
  if (maxAddable === 0 && quantity !== 0) {
    setQuantity(0);
  } else if (quantity > maxAddable && maxAddable > 0) {
    setQuantity(maxAddable);
  } else if (maxAddable > 0 && quantity === 0) {
    setQuantity(1);
  }

  const handleAddToCart = () => {
    if (quantity <= 0) return;
    
    if (currentCartQuantity + quantity > product.stock) {
        Toast.fire({
            icon: 'error',
            title: t('out_of_stock_label'),
        });
        return;
    }

    addToCart(product, quantity);
    Toast.fire({
      icon: 'success',
      title: t('added_to_cart'),
    });
  };

  const increment = () => {
    if (quantity < maxAddable) {
        setQuantity(q => q + 1);
    } else {
        Toast.fire({
            icon: 'warning',
            title: t('low_stock'),
        });
    }
  };

  const decrement = () => {
    if (quantity > 1) {
        setQuantity(q => q - 1);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-6">
      {/* Quantity Selector */}
      <div className={`flex items-center bg-gray-100 dark:bg-gray-800 p-2 rounded-2xl border border-gray-200 dark:border-gray-700 ${isOutOfStock || isMaxReached ? 'opacity-50 pointer-events-none' : ''}`}>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={decrement}
          disabled={quantity <= 1}
          className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-900 rounded-xl shadow-sm text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Minus className="w-4 h-4" />
        </motion.button>
        <span className="w-12 text-center font-black text-gray-800 dark:text-gray-100 text-lg tabular-nums">{quantity}</span>
        <motion.button 
          whileTap={{ scale: 0.9 }}
          onClick={increment}
          disabled={quantity >= maxAddable}
          className="w-10 h-10 flex items-center justify-center bg-white dark:bg-gray-900 rounded-xl shadow-sm text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Add to Cart Button */}
      <motion.button 
        whileTap={{ scale: 0.98 }}
        onClick={handleAddToCart}
        disabled={isOutOfStock || isMaxReached}
        className={`flex-1 w-full sm:w-auto px-8 py-4 rounded-[20px] font-black text-sm uppercase tracking-wider flex items-center justify-center gap-3 transition-all shadow-xl ${
          isOutOfStock 
            ? "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed shadow-none" 
            : isMaxReached
              ? "bg-amber-500 text-white shadow-amber-500/30 hover:bg-amber-600"
              : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 shadow-gray-900/30 dark:shadow-white/20 hover:bg-gray-800 dark:hover:bg-gray-100 hover:-translate-y-1"
        }`}
      >
        <ShoppingCart className="w-5 h-5" />
        {isOutOfStock 
          ? t('out_of_stock_label') 
          : isMaxReached 
            ? t('stock_available') // Or specific message for max reached? Using stock_available for now as "In Stock" but maybe "Max Added" is better.
            : t('add_to_cart')}
      </motion.button>
    </div>
  );
}
