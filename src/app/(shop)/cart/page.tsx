"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import EmptyCartState from "@/features/cart/components/EmptyCartState";
import CartItemEnhanced from "@/features/cart/components/CartItemEnhanced";
import CartSummary from "@/features/cart/components/CartSummary";
import SaveForLater from "@/features/cart/components/SaveForLater";
import CrossSell from "@/features/cart/components/CrossSell";
import CartSkeleton from "@/features/cart/components/CartSkeleton";
import { useLanguage } from "@/contexts/LanguageContext";
import { confirmAlert, toast } from "@/utils/swal";
import { useWishlist } from "@/contexts/WishlistContext";

export default function CartPage() {
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    totalPrice,
    clearCart,
  } = useCart();
  const { addToWishlist } = useWishlist();
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [savedForLater, setSavedForLater] = useState<
    string[]
  >([]);

  useEffect(() => {
    const timer = setTimeout(
      () => setIsLoading(false),
      500
    );
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <CartSkeleton />;

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
        toast.success("কার্ট খালি করা হয়েছে");
      } catch {
        toast.error("কার্ট খালি করতে ব্যর্থ");
      }
    }
  };

  const handleSaveForLater = (id: string) => {
    setSavedForLater((prev) => [...prev, id]);
    removeFromCart(id);
    toast.success("Saved for later");
  };

  const handleMoveToCart = (id: string) => {
    setSavedForLater((prev) =>
      prev.filter((i) => i !== id)
    );
    const item = cart.find((i) => i._id === id);
    if (item) addToCart(item, 1);
  };

  const handleRemoveSaved = (id: string) => {
    setSavedForLater((prev) =>
      prev.filter((i) => i !== id)
    );
  };

  const handleMoveToWishlist = (id: string) => {
    const item = cart.find((i) => i._id === id);
    if (item) addToWishlist(item as any);
    toast.success("Added to wishlist");
  };

  const savedItems = cart.filter((item) =>
    savedForLater.includes(item._id)
  );
  const activeItems = cart.filter(
    (item) => !savedForLater.includes(item._id)
  );

  return (
    <div className="max-w-7xl mx-auto py-6 md:py-12 px-4 space-y-8 md:space-y-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.3,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6"
      >
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
            {t("your_shopping_bag")}
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground/60">
              {cart.length.toLocaleString("bn-BD")}{" "}
              {t("items_in_bag_count_suffix")}
            </span>
            <span className="text-sm font-semibold text-foreground">
              {t("currency_symbol")}
              {totalPrice.toLocaleString("bn-BD")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleClearCart}
            className="px-4 py-2 rounded-lg text-rose-500 bg-rose-500/[0.06] font-medium text-xs hover:bg-rose-500/[0.1] transition-all"
          >
            সব মুছুন
          </button>
          <Link
            href="/products"
            className="text-sm font-medium text-foreground flex items-center gap-2 hover:gap-3 transition-all"
          >
            {t("continue_shopping")}{" "}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

      <div className="hidden lg:grid grid-cols-12 gap-6 px-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
        <span className="col-span-6">পণ্য</span>
        <span className="col-span-2">দাম</span>
        <span className="col-span-2">পরিমাণ</span>
        <span className="col-span-2 text-right">
          সাব-টোটাল
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-12 items-start">
        <motion.div
          className="lg:col-span-2 space-y-5"
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: {
                staggerChildren: 0.04,
              },
            },
          }}
        >
          {activeItems.map((item, idx) => (
            <motion.div
              key={
                item._id || `cart-item-${idx}`
              }
              variants={{
                hidden: {
                  opacity: 0,
                  y: 10,
                },
                show: {
                  opacity: 1,
                  y: 0,
                },
              }}
            >
              <CartItemEnhanced
                item={item}
                onRemove={removeFromCart}
                onUpdateQuantity={updateQuantity}
                onSaveForLater={handleSaveForLater}
                onMoveToWishlist={
                  handleMoveToWishlist
                }
              />
            </motion.div>
          ))}
        </motion.div>

        <CartSummary totalPrice={totalPrice} />
      </div>

      <SaveForLater
        items={savedItems}
        onMoveToCart={handleMoveToCart}
        onRemove={handleRemoveSaved}
        onMoveToWishlist={(id) => {
          const item = savedItems.find(
            (i) => i._id === id
          );
          if (item) addToWishlist(item as any);
          toast.success("Added to wishlist");
        }}
      />

      <CrossSell />

      <div
        className="md:hidden fixed left-0 right-0 z-40"
        style={{
          bottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="mx-4 mb-4 bg-white dark:bg-[#09090b] border border-black/[0.06] dark:border-white/[0.06] rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] px-4 py-3 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-muted-foreground/50">
              {t("grand_total")}
            </span>
            <span className="text-xl font-bold text-foreground tracking-tight">
              {t("currency_symbol")}
              {totalPrice.toLocaleString("bn-BD")}
            </span>
          </div>
          <Link
            href="/checkout"
            className="bg-foreground text-background px-5 py-3 rounded-lg font-semibold text-sm active:scale-[0.98] transition-all"
          >
            {t("checkout_button")}
          </Link>
        </div>
      </div>
    </div>
  );
}
