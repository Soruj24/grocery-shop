"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/providers/CartContext";
import { useLanguage } from "@/providers/LanguageContext";
import Image from "next/image";
import { getProductFallbackImage } from "@/lib/utils/category-utils";
import CartDrawerHeader from "./CartDrawerHeader";
import CartDrawerEmpty from "./CartDrawerEmpty";
import CartDrawerFooter from "./CartDrawerFooter";

export default function CartDrawer({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-[450px] bg-white dark:bg-[#0B1120] shadow-[0_0_100px_rgba(0,0,0,0.5)] z-[201] flex flex-col"
          >
            <CartDrawerHeader itemCount={cart.length} onClose={onClose} />

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
                          src={
                            item.image ||
                            getProductFallbackImage(item.name)
                          }
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
                          <div className="text-lg font-black text-green-600">
                            {t("currency_symbol")}
                            {item.price.toLocaleString("bn-BD")}
                          </div>

                          <div className="flex items-center gap-3 bg-white dark:bg-white/5 rounded-xl p-1 border border-gray-100 dark:border-white/10">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  Math.max(1, item.quantity - 1),
                                )
                              }
                              className="w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-white/10 flex items-center justify-center text-gray-500 transition-all"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="text-sm font-black w-4 text-center">
                              {item.quantity.toLocaleString("bn-BD")}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  item.quantity + 1,
                                )
                              }
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
                <CartDrawerEmpty onClose={onClose} />
              )}
            </div>

            {cart.length > 0 && (
              <CartDrawerFooter totalPrice={totalPrice} onClose={onClose} />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
