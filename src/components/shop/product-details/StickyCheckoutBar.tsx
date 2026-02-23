"use client";

import { ShoppingBag, Zap, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartContext";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";
import { toast } from "react-hot-toast";

interface StickyCheckoutBarProps {
  product: Product;
}

export default function StickyCheckoutBar({ product }: StickyCheckoutBarProps) {
  const { addToCart, cart } = useCart();
  const router = useRouter();
  const { t, language } = useLanguage();

  const cartItem = cart.find(item => item._id === product._id);
  const currentCartQuantity = cartItem ? cartItem.quantity : 0;
  const isMaxReached = currentCartQuantity >= product.stock;

  const handleBuyNow = () => {
    if (isMaxReached) {
        toast.error(t('low_stock'));
        return;
    }
    addToCart(product, 1);
    router.push("/checkout");
  };

  const handleAddToCart = () => {
    if (isMaxReached) {
        toast.error(t('low_stock'));
        return;
    }
    addToCart(product, 1);
    toast.success(t('added_to_cart'));
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4 pointer-events-none">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border border-gray-200 dark:border-gray-800 rounded-[2rem] p-3 pl-5 flex items-center gap-4 shadow-2xl shadow-gray-200/50 dark:shadow-black/50 pointer-events-auto"
      >
        <div className="flex-1 flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
            {t('price_label')}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-gray-900 dark:text-white">
              {t('currency_symbol')}{(product.discountPrice || product.price).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
            </span>
            {product.discountPrice && (
                <span className="text-xs text-gray-400 line-through decoration-rose-500/50">
                    {t('currency_symbol')}{product.price.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
                </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isMaxReached}
            className="w-12 h-12 flex items-center justify-center bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
            aria-label={t('add_to_cart')}
          >
            <ShoppingBag className="w-5 h-5" />
            {currentCartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-green-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900 shadow-sm">
                {currentCartQuantity}
              </span>
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleBuyNow}
            disabled={product.stock === 0 || isMaxReached}
            className={`h-12 px-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-green-600/20 disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed hover:shadow-green-600/40 transition-shadow ${product.stock <= 5 ? 'animate-pulse' : ''}`}
          >
            <Zap className="w-4 h-4 fill-white" />
            <span className="whitespace-nowrap">
                {product.stock === 0 ? t('out_of_stock') : isMaxReached ? t('low_stock') : t('order_now')}
            </span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
