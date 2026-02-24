"use client";

import { useCart } from "@/components/CartContext";
import { ArrowRight } from "lucide-react";
import Link from "next/link"; 
import { motion } from "framer-motion";
import EmptyCartState from "@/components/shop/cart/EmptyCartState";
import CartItemRow from "@/components/shop/cart/CartItemRow";
import CartSummary from "@/components/shop/cart/CartSummary";
import { useLanguage } from "@/components/LanguageContext";
import { confirmAlert, toast } from "@/lib/swal";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { t } = useLanguage();

  if (cart.length === 0) {
    return <EmptyCartState />;
  }

  const handleClearCart = async () => {
    const res = await confirmAlert({
      title: "সব পণ্য মুছে ফেলবেন?",
      text: "এটি আনডু করা যাবে না",
      confirmButtonText: "হ্যাঁ, মুছুন",
      cancelButtonText: "বাতিল",
    });
    if (res.isConfirmed) {
      try {
        clearCart();
        toast.success("কার্ট খালি করা হয়েছে");
      } catch {
        toast.error("কার্ট খালি করতে ব্যর্থ");
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 md:py-12 px-4 space-y-8 md:space-y-12">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6"
      >
        <div className="space-y-3">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 dark:text-white tracking-tight">{t('your_shopping_bag')}</h1>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-black">
              {t('items_in_bag_count_prefix')} {cart.length.toLocaleString('bn-BD')} {t('items_in_bag_count_suffix')}
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 text-xs font-black">
              {t('currency_symbol')}{totalPrice.toLocaleString('bn-BD')}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleClearCart}
            className="px-4 py-2 rounded-xl text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10 font-black text-xs hover:bg-rose-100 dark:hover:bg-rose-500/20 transition-all"
          >
            সব মুছুন
          </button>
          <Link 
            href="/products"
            className="text-green-600 dark:text-green-500 font-black flex items-center gap-2 hover:gap-4 transition-all"
          >
            {t('continue_shopping')} <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </motion.div>

      <div className="hidden lg:grid grid-cols-12 gap-6 px-2 text-[11px] font-black uppercase tracking-widest text-gray-400">
        <span className="col-span-6">পণ্য</span>
        <span className="col-span-2">দাম</span>
        <span className="col-span-2">পরিমাণ</span>
        <span className="col-span-2 text-right">সাব-টোটাল</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12 items-start">
        {/* Cart Items */}
        <motion.div 
          className="lg:col-span-2 space-y-6"
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
        >
          {cart.map((item, idx) => (
            <motion.div key={item._id || `cart-item-${idx}`} variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}>
              <CartItemRow
                item={item}
                removeFromCart={removeFromCart}
                updateQuantity={updateQuantity}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Order Summary */}
        <CartSummary totalPrice={totalPrice} />
      </div>

      <div className="md:hidden fixed left-0 right-0 z-40" style={{ bottom: 'env(safe-area-inset-bottom)' }}>
        <div className="mx-4 mb-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl shadow-2xl px-4 py-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{t('grand_total')}</span>
            <span className="text-2xl font-black text-gray-900 dark:text-white">{t('currency_symbol')}{totalPrice.toLocaleString('bn-BD')}</span>
          </div>
          <Link href="/checkout" className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-xl font-black active:scale-95 transition-all">
            {t('checkout_button')}
          </Link>
        </div>
      </div>
    </div>
  );
}
