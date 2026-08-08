"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Minus,
  Trash2,
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
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
            className="fixed right-0 top-0 h-full w-full max-w-[420px] bg-white dark:bg-[#09090b] shadow-[0_0_40px_rgba(0,0,0,0.15)] z-[201] flex flex-col"
          >
            <CartDrawerHeader
              itemCount={cart.length}
              onClose={onClose}
            />

            <div className="flex-1 overflow-y-auto p-5 custom-scrollbar">
              {cart.length > 0 ? (
                <div className="space-y-4">
                  {cart.map((item, idx) => (
                    <motion.div
                      layout
                      key={
                        item._id ||
                        `cart-item-${idx}`
                      }
                      className="flex gap-3.5 p-3.5 bg-black/[0.02] dark:bg-white/[0.02] rounded-xl border border-black/[0.04] dark:border-white/[0.04] group"
                    >
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden bg-black/[0.02] dark:bg-white/[0.02] shrink-0">
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

                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-semibold text-xs text-foreground line-clamp-2 leading-tight">
                            {item.name}
                          </h3>
                          <button
                            onClick={() =>
                              removeFromCart(
                                item._id
                              )
                            }
                            className="text-muted-foreground/40 hover:text-rose-500 transition-colors shrink-0"
                          >
                            <Trash2
                              size={14}
                            />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm font-bold text-foreground">
                            {t(
                              "currency_symbol"
                            )}
                            {item.price.toLocaleString(
                              "bn-BD"
                            )}
                          </div>

                          <div className="flex items-center gap-1 bg-black/[0.04] dark:bg-white/[0.06] rounded-lg p-0.5">
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  Math.max(
                                    1,
                                    item.quantity -
                                      1
                                  )
                                )
                              }
                              className="w-7 h-7 rounded-md hover:bg-black/[0.06] dark:hover:bg-white/[0.1] flex items-center justify-center text-muted-foreground/60 transition-colors"
                            >
                              <Minus
                                size={12}
                              />
                            </button>
                            <span className="text-xs font-bold w-5 text-center tabular-nums">
                              {item.quantity.toLocaleString(
                                "bn-BD"
                              )}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(
                                  item._id,
                                  item.quantity +
                                    1
                                )
                              }
                              className="w-7 h-7 rounded-md hover:bg-black/[0.06] dark:hover:bg-white/[0.1] flex items-center justify-center text-muted-foreground/60 transition-colors"
                            >
                              <Plus
                                size={12}
                              />
                            </button>
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
