"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Plus, Minus, ArrowRight, Trash2 } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useLanguage } from "@/components/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { getProductFallbackImage } from "@/lib/category-utils";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-[450px] bg-white dark:bg-[#0B1120] shadow-[0_0_100px_rgba(0,0,0,0.5)] z-[201] flex flex-col"
          >
            {/* Header */}
            <div className="p-8 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                  <ShoppingBag size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-black text-gray-900 dark:text-white">{t('your_bag')}</h2>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-widest">{cart.length.toLocaleString('bn-BD')}{t('items_suffix')}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-12 h-12 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-all"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              {cart.length > 0 ? (
                <div className="space-y-6">
                  {cart.map((item, idx) => (
                    <motion.div
                      layout
                      key={item._id || `cart-item-${idx}`}
                      className="flex gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-3xl border border-transparent hover:border-green-500/20 transition-all group"
                    >
                      <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-white dark:bg-white/5 flex-shrink-0">
                        <Image
                          src={item.image || getProductFallbackImage(item.name)}
                          alt={item.name}
                          fill
                          sizes="96px"
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                            {item.name}
                          </h3>
                          <button 
                            onClick={() => removeFromCart(item._id)}
                            className="text-gray-400 hover:text-rose-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-lg font-black text-green-600">{t('currency_symbol')}{item.price.toLocaleString('bn-BD')}</div>
                          
                          <div className="flex items-center gap-3 bg-white dark:bg-white/5 rounded-xl p-1 border border-gray-100 dark:border-white/10">
                            <button
                              onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                              className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-center text-gray-500 transition-all"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-black w-4 text-center">{item.quantity.toLocaleString('bn-BD')}</span>
                            <button
                              onClick={() => updateQuantity(item._id, item.quantity + 1)}
                              className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-center text-gray-500 transition-all"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-24 h-24 bg-gray-50 dark:bg-white/5 rounded-[40px] flex items-center justify-center text-gray-200 dark:text-white/10">
                    <ShoppingBag size={48} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-black text-gray-900 dark:text-white">{t('cart_empty_title')}</h3>
                    <p className="text-gray-400 font-medium">{t('cart_empty_desc')}</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-green-600 text-white px-8 py-4 rounded-2xl font-black shadow-lg shadow-green-600/20 active:scale-95 transition-all"
                  >
                    {t('cart_start_shopping')}
                  </button>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-8 border-t border-gray-100 dark:border-white/5 space-y-6 bg-gray-50/50 dark:bg-white/[0.02]">
                {/* Promo Code */}
                <div className="relative group">
                  <input 
                    type="text" 
                    placeholder={t('coupon_placeholder')}
                    className="w-full px-6 py-4 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all pr-24"
                  />
                  <button className="absolute right-2 top-2 bottom-2 px-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-xl text-xs font-black uppercase tracking-widest hover:bg-green-600 hover:text-white transition-all">
                    {t('apply_coupon')}
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-gray-500 font-bold">
                    <span>{t('subtotal')}</span>
                    <span>{t('currency_symbol')}{totalPrice.toLocaleString('bn-BD')}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 font-bold">
                    <span>{t('delivery_charge')}</span>
                    <span className="text-green-600">{t('free')}</span>
                  </div>
                  <div className="flex justify-between text-2xl font-black text-gray-900 dark:text-white pt-3 border-t border-gray-100 dark:border-white/10">
                    <span>{t('total_label')}</span>
                    <span>{t('currency_symbol')}{totalPrice.toLocaleString('bn-BD')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Link
                    href="/cart"
                    onClick={onClose}
                    className="flex items-center justify-center px-6 py-5 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl font-black text-gray-900 dark:text-white hover:bg-gray-50 transition-all"
                  >
                    {t('view_cart')}
                  </Link>
                  <Link
                    href="/checkout"
                    onClick={onClose}
                    className="flex items-center justify-center gap-3 px-6 py-5 bg-green-600 text-white rounded-3xl font-black shadow-xl shadow-green-600/20 hover:bg-green-700 transition-all group"
                  >
                    {t('checkout')}
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
