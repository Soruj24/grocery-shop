"use client";

import Link from "next/link";
import { ShoppingBag, ArrowRight, Trash2, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/contexts/CartContext";
import { useSettings } from "@/contexts/SettingsContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { CartCard, EmptyState } from "@/components/ui";

export default function CartPreview({ onClose }: { onClose?: () => void }) {
  const { cart, totalItems, totalPrice, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const { currencySymbol, freeDeliveryThreshold } = useSettings();
  const { t } = useLanguage();

  if (cart.length === 0) {
    return (
      <div className="w-[360px] p-2">
        <EmptyState
          icon={<ShoppingBag className="w-7 h-7" />}
          title={t("empty_cart_title")}
          description={t("empty_cart_desc")}
        />
        <Link
          href="/products"
          onClick={onClose}
          className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary-hover"
        >
          {t("cart_start_shopping")}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  const remaining =
    freeDeliveryThreshold > 0 ? Math.max(0, freeDeliveryThreshold - totalPrice) : 0;

  return (
    <div className="w-[360px]">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-primary" />
          <h3 className="text-base font-black text-foreground">{t("cart")}</h3>
          <span className="rounded-full bg-primary-subtle px-2 py-0.5 text-xs font-bold text-primary">
            {totalItems}
          </span>
        </div>
        <button
          onClick={clearCart}
          className="flex items-center gap-1 text-xs font-bold text-muted-foreground transition-colors hover:text-danger"
        >
          <Trash2 className="w-3.5 h-3.5" />
          {t("clear_all")}
        </button>
      </div>

      {remaining > 0 && (
        <div className="flex items-center gap-2 bg-success-subtle px-5 py-2.5 text-xs font-bold text-success">
          <Sparkles className="w-4 h-4" />
          {t("free_delivery_remaining")} {currencySymbol}
          {remaining.toLocaleString("bn-BD")}
        </div>
      )}

      <div className="max-h-[340px] space-y-2 overflow-y-auto ds-custom-scrollbar p-3">
        <AnimatePresence initial={false}>
          {cart.map((item) => (
            <motion.div
              key={item._id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -12 }}
            >
              <CartCard
                name={item.name}
                image={item.image}
                price={item.price}
                quantity={item.quantity}
                currencySymbol={currencySymbol}
                onIncrement={() => updateQuantity(item._id, item.quantity + 1)}
                onDecrement={() => updateQuantity(item._id, item.quantity - 1)}
                onRemove={() => removeFromCart(item._id)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="border-t border-border p-4">
        <div className="mb-3 flex items-center justify-between">
          <span className="text-sm font-bold text-muted-foreground">
            {t("cart_subtotal")}
          </span>
          <span className="text-lg font-black text-foreground">
            {currencySymbol}
            {totalPrice.toLocaleString("bn-BD")}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Link
            href="/cart"
            onClick={onClose}
            className="flex items-center justify-center rounded-md border border-border-strong px-4 py-2.5 text-sm font-bold text-foreground transition-all hover:bg-muted active:scale-95"
          >
            {t("view_cart")}
          </Link>
          <Link
            href="/checkout"
            onClick={onClose}
            className="flex items-center justify-center gap-1.5 rounded-md bg-primary px-4 py-2.5 text-sm font-black text-primary-foreground transition-all hover:bg-primary-hover active:scale-95"
          >
            {t("checkout_button")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
