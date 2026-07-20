"use client";

import { ShoppingBag, Zap, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { Product } from "@/types/product";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "react-hot-toast";

interface StickyCheckoutBarProps {
  product: Product;
}

export default function StickyCheckoutBar({ product }: StickyCheckoutBarProps) {
  const { addToCart, cart } = useCart();
  const router = useRouter();
  const { t } = useLanguage();

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
        className="bg-card/90 dark:bg-card/90 backdrop-blur-xl border border-border rounded-xl p-3 pl-5 flex items-center gap-4 shadow-lg pointer-events-auto"
      >
        <div className="flex-1 flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {t('price_label')}
          </span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-xl font-black text-foreground">
              {t('currency_symbol')}{(product.discountPrice || product.price).toLocaleString('bn-BD')}
            </span>
            {product.discountPrice && (
                <span className="text-xs text-muted-foreground line-through decoration-danger/50">
                    {t('currency_symbol')}{product.price.toLocaleString('bn-BD')}
                </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleAddToCart}
            disabled={product.stock === 0 || isMaxReached}
            className="w-12 h-12 flex items-center justify-center bg-muted text-foreground rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-border transition-colors relative"
            aria-label={t('add_to_cart')}
          >
            <ShoppingBag className="w-5 h-5" />
            {currentCartQuantity > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-card shadow-sm">
                {currentCartQuantity.toLocaleString('bn-BD')}
              </span>
            )}
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleBuyNow}
            disabled={product.stock === 0 || isMaxReached}
            className={`h-12 px-6 bg-primary hover:bg-primary-hover text-primary-foreground rounded-2xl font-bold flex items-center gap-2 shadow-lg shadow-primary disabled:opacity-50 disabled:grayscale disabled:cursor-not-allowed transition-shadow ${product.stock <= 5 ? 'animate-pulse' : ''}`}
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
