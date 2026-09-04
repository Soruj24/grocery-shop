"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/contexts/CartContext";
import { ArrowRight, ShoppingBag } from "lucide-react";
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

  // Estimated delivery: 2 days from now
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 2);
  const formattedDelivery = deliveryDate.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 md:py-12 space-y-8">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.4,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className="flex flex-col md:flex-row md:items-end justify-between gap-5"
      >
        <div className="space-y-1.5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-foreground text-background rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
              {t("your_shopping_bag")}
            </h1>
          </div>
          <p className="text-sm font-medium text-muted-foreground/60 ml-[52px]">
            {cart.length.toLocaleString("bn-BD")}{" "}
            {t("items_in_bag_count_suffix")} ·{" "}
            <span className="text-foreground font-semibold">
              {t("currency_symbol")}
              {totalPrice.toLocaleString("bn-BD")}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-3 ml-[52px] md:ml-0">
          <button
            onClick={handleClearCart}
            className="px-4 py-2 rounded-lg text-danger bg-danger-subtle font-medium text-xs hover:bg-danger-subtle/80 transition-all"
          >
            সব মুছুন
          </button>
          <Link
            href="/products"
            className="text-sm font-medium text-muted-foreground/60 flex items-center gap-1.5 hover:text-foreground transition-colors"
          >
            {t("continue_shopping")}{" "}
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </motion.div>

      {/* Estimated Delivery Banner */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-subtle border border-border rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-xs font-semibold text-foreground">
            Estimated Delivery
          </span>
        </div>
        <span className="text-sm font-bold text-foreground sm:ml-auto">
          {formattedDelivery}
        </span>
      </motion.div>

      {/* Column Headers (Desktop) */}
      <div className="hidden lg:grid grid-cols-12 gap-6 px-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/40">
        <span className="col-span-7">পণ্য</span>
        <span className="col-span-2">দাম</span>
        <span className="col-span-2">পরিমাণ</span>
        <span className="col-span-1 text-right">
          মোট
        </span>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
        {/* Product List */}
        <motion.div
          className="lg:col-span-2 space-y-3"
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
                  y: 12,
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

        {/* Order Summary */}
        <CartSummary totalPrice={totalPrice} />
      </div>

      {/* Save for Later */}
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

      {/* Cross Sell */}
      <CrossSell />

      {/* Mobile Checkout Bar */}
      <div
        className="md:hidden fixed left-0 right-0 z-40"
        style={{
          bottom: "env(safe-area-inset-bottom)",
        }}
      >
        <div className="mx-4 mb-4 bg-card border border-border rounded-xl shadow-xl px-4 py-3 flex items-center justify-between backdrop-blur-xl bg-card/95">
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
            className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold text-sm active:scale-[0.98] transition-all flex items-center gap-2 shadow-primary"
          >
            {t("checkout_button")}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
