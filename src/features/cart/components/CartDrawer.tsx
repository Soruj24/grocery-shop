"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  Trash2,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { getProductFallbackImage } from "@/constants/fallback-images";
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
  const {
    cart,
    removeFromCart,
    updateQuantity,
    totalPrice,
  } = useCart();
  const { t } = useLanguage();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 28,
              stiffness: 300,
            }}
            className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-white dark:bg-[#09090b] shadow-[0_0_40px_rgba(0,0,0,0.15)] z-[201] flex flex-col"
            style={{
              paddingTop:
                "env(safe-area-inset-top)",
            }}
          >
            <CartDrawerHeader
              itemCount={cart.length}
              onClose={onClose}
            />

            <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 custom-scrollbar">
              {cart.length > 0 ? (
                <div className="space-y-3">
                  {cart.map((item, idx) => (
                    <motion.div
                      layout
                      key={
                        item._id ||
                        `cart-item-${idx}`
                      }
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: idx * 0.04,
                        ease: [
                          0.21, 0.47, 0.32, 0.98,
                        ],
                      }}
                      className="flex gap-3.5 p-3.5 bg-black/[0.02] dark:bg-white/[0.02] rounded-xl border border-black/[0.04] dark:border-white/[0.04] group"
                    >
                      <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-black/[0.02] dark:bg-white/[0.02] shrink-0">
                        <Image
                          src={
                            item.image ||
                            getProductFallbackImage(
                              item.name
                            )
                          }
                          alt={item.name}
                          fill
                          sizes="80px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-semibold text-xs text-foreground line-clamp-2 leading-tight">
                            {item.name}
                          </h3>
                          <motion.button
                            whileTap={{ scale: 0.85 }}
                            onClick={() =>
                              removeFromCart(
                                item._id
                              )
                            }
                            className="p-1.5 -mr-1 -mt-0.5 rounded-lg text-muted-foreground/40 hover:text-rose-500 hover:bg-rose-500/[0.06] transition-all shrink-0 min-w-[32px] min-h-[32px] flex items-center justify-center"
                            aria-label={t("remove")}
                          >
                            <Trash2 size={14} />
                          </motion.button>
                        </div>

                        <div className="flex items-center justify-between gap-2">
                          <div className="text-sm font-bold text-foreground tabular-nums">
                            {t("currency_symbol")}
                            {item.price.toLocaleString(
                              "bn-BD"
                            )}
                          </div>

                          <div className="flex items-center gap-0.5 bg-black/[0.04] dark:bg-white/[0.06] rounded-lg p-0.5">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  Math.max(
                                    1,
                                    item.quantity - 1
                                  )
                                )
                              }
                              className="w-8 h-8 rounded-md hover:bg-black/[0.06] dark:hover:bg-white/[0.1] flex items-center justify-center text-muted-foreground/60 transition-colors min-w-[32px] min-h-[32px]"
                              aria-label={t(
                                "decrease_quantity"
                              )}
                            >
                              <Minus size={12} />
                            </motion.button>
                            <motion.span
                              key={item.quantity}
                              initial={{ scale: 0.8 }}
                              animate={{ scale: 1 }}
                              className="text-xs font-bold w-6 text-center tabular-nums select-none"
                            >
                              {item.quantity.toLocaleString(
                                "bn-BD"
                              )}
                            </motion.span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  item.quantity + 1
                                )
                              }
                              className="w-8 h-8 rounded-md hover:bg-black/[0.06] dark:hover:bg-white/[0.1] flex items-center justify-center text-muted-foreground/60 transition-colors min-w-[32px] min-h-[32px]"
                              aria-label={t(
                                "increase_quantity"
                              )}
                            >
                              <Plus size={12} />
                            </motion.button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <CartDrawerEmpty
                  onClose={onClose}
                />
              )}
            </div>

            {cart.length > 0 && (
              <CartDrawerFooter
                totalPrice={totalPrice}
                onClose={onClose}
              />
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
