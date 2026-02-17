"use client";

import { ShoppingBag, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartContext";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/components/LanguageContext";
import { Toast } from "@/lib/toast";

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
    if (isMaxReached) return;
    addToCart(product, 1);
    router.push("/checkout");
  };

  const handleAddToCart = () => {
    if (isMaxReached) {
        Toast.fire({
            icon: 'warning',
            title: t('low_stock'),
            background: '#020617',
            color: '#fff',
        });
        return;
    }
    addToCart(product, 1);
    Toast.fire({
      icon: 'success',
      title: t('added_to_cart'),
      background: '#020617',
      color: '#fff',
    });
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-4">
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-2xl border border-gray-100 dark:border-white/5 rounded-[32px] p-4 flex items-center gap-4 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)]"
      >
        <div className="flex-1 flex flex-col pl-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            {t('price_label')}
          </span>
          <span className="text-xl font-black text-gray-800 dark:text-white">
            {t('currency_symbol')}{(product.discountPrice || product.price).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
          </span>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isMaxReached}
            className="p-4 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-white rounded-[24px] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ShoppingBag className="w-6 h-6" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleBuyNow}
            disabled={product.stock === 0 || isMaxReached}
            className="px-8 py-4 bg-green-600 text-white rounded-[24px] font-black flex items-center gap-2 shadow-lg shadow-green-600/30 disabled:opacity-50 disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed"
          >
            <Zap className="w-5 h-5 fill-current" />
            {product.stock === 0 ? t('out_of_stock') : isMaxReached ? t('low_stock') : t('order_now')}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
