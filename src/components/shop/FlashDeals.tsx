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

interface FlashDealsProps {
  products: Product[];
}

export default function FlashDeals({ products }: FlashDealsProps) {
  const { addToCart } = useCart();
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const flashProducts = products.slice(0, 4);

  return (
    <section className="relative py-24 px-4 overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/10 border border-orange-500/20 text-orange-600 rounded-full text-xs font-black uppercase tracking-widest">
              <Zap size={14} className="fill-orange-600" />
              {t('flash_deals_badge')}
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight">
              {t('flash_deals_title_1')} <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-rose-600">{t('flash_deals_title_2')}</span>
            </h2>
          </div>

          <div className="flex items-center gap-4 bg-white dark:bg-white/5 p-4 rounded-3xl border border-gray-100 dark:border-white/10 shadow-xl">
            <Timer className="w-8 h-8 text-orange-500 animate-pulse" />
            <div className="flex items-center gap-3">
              {[
                { label: t('daily_deals_hour'), value: timeLeft.hours },
                { label: t('daily_deals_minute'), value: timeLeft.minutes },
                { label: t('daily_deals_second'), value: timeLeft.seconds }
              ].map((t, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-black text-gray-900 dark:text-white tabular-nums">
                      {t.value.toString().padStart(2, '0')}
                    </div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{t.label}</div>
                  </div>
                  {i < 2 && <div className="text-2xl font-black text-gray-200 dark:text-white/10">:</div>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {flashProducts.map((product, idx) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white dark:bg-[#0F172A] rounded-[40px] p-6 border border-gray-100 dark:border-white/5 hover:border-orange-500/30 transition-all duration-500 hover:-translate-y-2 shadow-sm hover:shadow-2xl hover:shadow-orange-500/10"
            >
              <div className="absolute top-6 left-6 z-10 flex flex-col gap-2">
                <div className="bg-rose-500 text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg shadow-rose-500/30">
                  {t('off_20_percent')}
                </div>
                <div className="bg-white/90 dark:bg-black/50 backdrop-blur-md text-[10px] font-black px-3 py-1.5 rounded-full flex items-center gap-1">
                  <Star size={10} className="fill-yellow-400 text-yellow-400" />
                  4.8
                </div>
              </div>

              <div className="relative aspect-square rounded-[32px] overflow-hidden bg-gray-50 dark:bg-white/5 mb-6">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-black text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors line-clamp-1">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">{t('buy_more_save_direct').replace('!', '')} {product.unit}</p>
                </div>

                <div className="flex items-end justify-between">
                    <div>
                      <div className="text-xs text-gray-400 line-through font-bold">{t('currency_symbol')}{Math.round(product.price * 1.25)}</div>
                      <div className="text-2xl font-black text-gray-900 dark:text-white">{t('currency_symbol')}{product.price}</div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          addToCart(product, 1);
                          toast.success(`${product.name} ${t('add_to_cart_success')}`);
                        }}
                        className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center hover:bg-orange-600 transition-all shadow-xl shadow-orange-500/20 active:scale-95"
                      >
                        <ShoppingBag className="w-6 h-6" />
                      </button>
                      <Link
                        href={`/products/${product._id}`}
                        className="w-12 h-12 rounded-2xl bg-gray-900 dark:bg-white text-white dark:text-black flex items-center justify-center hover:bg-gray-800 dark:hover:bg-gray-100 transition-all shadow-xl group/btn"
                      >
                        <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
