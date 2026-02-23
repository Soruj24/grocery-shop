"use client";

import { motion } from "framer-motion";
import { Zap, Timer, ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { useCart } from "@/components/CartContext";
import { toast } from "react-hot-toast";
import { ShoppingBag } from "lucide-react";

import { useLanguage } from "@/components/LanguageContext";
import { getProductFallbackImage } from "@/lib/category-utils";

interface FlashDealsProps {
  products: Product[];
}

export default function FlashDeals({ products }: FlashDealsProps) {
  const { addToCart } = useCart();
  const { t, language } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0)
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0)
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.slice(0, 4);

  return (
    <section className="relative py-12 lg:py-20 px-4 overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-rose-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-end justify-between gap-8">
          <div className="space-y-6 text-center lg:text-left w-full lg:w-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange-100 dark:bg-orange-900/30 border border-orange-200 dark:border-orange-800 text-orange-600 dark:text-orange-400 rounded-full text-xs font-black uppercase tracking-widest mx-auto lg:mx-0"
            >
              <Zap size={14} className="fill-current animate-pulse" />
              <span>{t("flash_deals_badge")}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-7xl font-black text-gray-900 dark:text-white tracking-tight leading-none"
            >
              {t("flash_deals_title_1")}{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-600">
                {t("flash_deals_title_2")}
              </span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-500 dark:text-gray-400 font-medium max-w-lg mx-auto lg:mx-0"
            >
              Hurry up! These offers are limited time only. Grab your favorites
              before they&apos;re gone.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-4"
            >
              <Link
                href="/products?filter=flash-deals"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-bold hover:bg-orange-600 dark:hover:bg-orange-400 hover:text-white transition-colors shadow-lg shadow-orange-500/20"
              >
                View All Deals
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-6 bg-white dark:bg-gray-900/50 backdrop-blur-xl p-8 rounded-[32px] border border-gray-100 dark:border-white/10 shadow-2xl shadow-orange-500/10 mx-auto lg:mx-0"
          >
            <div className="bg-orange-100 dark:bg-orange-500/20 p-4 rounded-full">
              <Timer className="w-10 h-10 text-orange-600 dark:text-orange-500 animate-pulse" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3">
                Offer Ends In
              </span>
              <div className="flex items-center gap-3">
                {[
                  { label: "Hrs", value: timeLeft.hours },
                  { label: "Mins", value: timeLeft.minutes },
                  { label: "Secs", value: timeLeft.seconds },
                ].map((t, i) => (
                  <div key={i} className="flex items-end gap-2">
                    <div className="bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl w-16 h-16 flex items-center justify-center text-3xl font-black tabular-nums shadow-xl shadow-gray-900/20 dark:shadow-white/10 border border-gray-800 dark:border-gray-100 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      {t.value.toString().padStart(2, "0")}
                    </div>
                    <span className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-wider">
                      {t.label}
                    </span>
                    {i < 2 && (
                      <span className="text-3xl font-black text-gray-300 dark:text-gray-700 mx-1 mb-4">
                        :
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {flashProducts.map((product, idx) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white dark:bg-gray-900 rounded-[32px] p-4 hover:p-0 transition-all duration-500 border border-gray-100 dark:border-gray-800 hover:border-orange-500/30 overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-orange-500/10"
            >
              <div className="relative aspect-[4/5] rounded-[24px] group-hover:rounded-none overflow-hidden bg-gray-50 dark:bg-gray-800 transition-all duration-500">
                <Image
                  src={
                    product.image ||
                    getProductFallbackImage(product.nameEn || product.name)
                  }
                  alt={
                    language === "en"
                      ? product.nameEn || product.name
                      : product.name
                  }
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 25vw, 20vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Discount Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div className="bg-rose-600 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg shadow-rose-600/30 flex items-center gap-1">
                    <Zap size={12} className="fill-current" />
                    <span>-25% OFF</span>
                  </div>
                </div>

                {/* Quick Action Buttons (Hover) */}
                <div className="absolute right-4 top-4 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-500 delay-100">
                  <button
                    onClick={() => {
                      addToCart(product, 1);
                      toast.success(
                        `${language === "en" ? product.nameEn || product.name : product.name} ${t("add_to_cart_success")}`,
                      );
                    }}
                    className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-lg hover:bg-orange-500 hover:text-white transition-colors"
                  >
                    <ShoppingBag size={18} />
                  </button>
                  <Link
                    href={`/products/${product._id}`}
                    className="w-10 h-10 rounded-full bg-white text-gray-900 flex items-center justify-center shadow-lg hover:bg-black hover:text-white transition-colors"
                  >
                    <ArrowRight size={18} />
                  </Link>
                </div>

                {/* Content Overlay (Hover) */}
                <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 text-white bg-gradient-to-t from-black/90 to-transparent">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-orange-300">
                      <span>In Stock</span>
                      <span>12 Left</span>
                    </div>
                    <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                      <div className="w-[60%] h-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Default Content (Visible when not hovering) */}
              <div className="pt-4 px-2 group-hover:hidden">
                <div className="flex items-start justify-between gap-4 mb-2">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                    {language === "en"
                      ? product.nameEn || product.name
                      : product.name}
                  </h3>
                  <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-lg">
                    <Star
                      size={12}
                      className="fill-yellow-400 text-yellow-400"
                    />
                    <span className="text-xs font-bold">4.9</span>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mb-1">
                      {product.unit === "kg"
                        ? t("unit_kg")
                        : product.unit === "g"
                          ? t("unit_g")
                          : product.unit}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-black text-gray-900 dark:text-white">
                        {t("currency_symbol")}
                        {product.price.toLocaleString(
                          language === "bn" ? "bn-BD" : "en-US",
                        )}
                      </span>
                      <span className="text-sm text-gray-400 line-through font-bold">
                        {t("currency_symbol")}
                        {Math.round(product.price * 1.25).toLocaleString(
                          language === "bn" ? "bn-BD" : "en-US",
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center">
          <Link
            href="/products?sort=price_asc"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-full font-black overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all hover:-translate-y-1"
          >
            <span className="relative z-10">{t("see_all_deals")}</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
