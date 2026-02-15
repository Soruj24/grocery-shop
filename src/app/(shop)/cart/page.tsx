"use client";

import { useCart } from "@/components/CartContext";
import { ArrowRight } from "lucide-react";
import Link from "next/link"; 
import EmptyCartState from "@/components/shop/cart/EmptyCartState";
import CartItemRow from "@/components/shop/cart/CartItemRow";
import CartSummary from "@/components/shop/cart/CartSummary";
import { useLanguage } from "@/components/LanguageContext";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();
  const { t, language } = useLanguage();

  if (cart.length === 0) {
    return <EmptyCartState />;
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 space-y-12 relative">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tight">{t('your_shopping_bag')}</h1>
          <p className="text-gray-500 dark:text-gray-400 font-bold text-lg">
            {t('items_in_bag_count_prefix')} {cart.length.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')} {t('items_in_bag_count_suffix')}
          </p>
        </div>
        <Link 
          href="/products"
          className="text-green-600 dark:text-green-500 font-black flex items-center gap-2 hover:gap-4 transition-all"
        >
          {t('continue_shopping')} <ArrowRight className="w-5 h-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {cart.map((item) => (
            <CartItemRow
              key={item._id}
              item={item}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
            />
          ))}
        </div>

        {/* Order Summary */}
        <CartSummary totalPrice={totalPrice} />
      </div>
    </div>
  );
}
