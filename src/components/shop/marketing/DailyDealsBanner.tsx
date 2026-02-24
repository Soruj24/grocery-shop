"use client";

import { useState, useEffect } from "react";
import { Zap, ArrowRight, Timer } from "lucide-react";
import { motion } from "framer-motion";

import { useLanguage } from "@/components/LanguageContext";

import Link from "next/link";
import Image from "next/image";
import { getProductFallbackImage } from "@/lib/category-utils";

export default function DailyDealsBanner({
  data,
}: {
  data?: {
    badge?: string;
    title?: string;
    subtitle?: string;
    desc?: string;
    productName?: string;
    image?: string;
    price?: string;
    originalPrice?: string;
    discount?: string;
  };
}) {
  interface DailyDealsBannerData {
    badge?: string;
    title?: string;
    subtitle?: string;
    desc?: string;
    productName?: string;
    image?: string;
    price?: string;
    originalPrice?: string;
    discount?: string;
  }
  const { t } = useLanguage();
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30,
  });

  const content = {
    badge: data?.badge || t("daily_deals_badge"),
    title: data?.title || t("daily_deals_title"),
    subtitle: data?.subtitle || t("daily_deals_subtitle"),
    desc: data?.desc || t("daily_deals_desc"),
    productName: data?.productName || t("daily_deals_product_name"),
    image: data?.image || getProductFallbackImage("apple"),
    price: data?.price || t("price_80_tk"),
    originalPrice: data?.originalPrice || t("price_160_tk"),
    discount: data?.discount || t("percent_50"),
  };

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-rose-600 rounded-[32px] p-8 md:p-12 text-white shadow-2xl shadow-orange-900/20"
    >
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -mr-32 -mt-32 animate-pulse" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="space-y-8 max-w-xl text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 shadow-lg"
          >
            <Timer className="w-4 h-4 text-yellow-300" />
            <span className="text-xs font-black uppercase tracking-widest text-yellow-300">
              {content.badge}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">
              {content.title} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 drop-shadow-sm">
                {content.subtitle}
              </span>
            </h2>
            <p className="text-white/90 text-lg font-medium max-w-md leading-relaxed">
              {content.desc}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center md:justify-start gap-4"
          >
            {[
              { label: t("daily_deals_hour"), value: timeLeft.hours },
              { label: t("daily_deals_minute"), value: timeLeft.minutes },
              { label: t("daily_deals_second"), value: timeLeft.seconds },
            ].map((unit, i) => (
              <div key={i} className="flex flex-col items-center group">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-black shadow-lg group-hover:bg-white group-hover:text-orange-600 transition-all duration-300 transform group-hover:-translate-y-1">
                  {unit.value.toLocaleString('bn-BD', { minimumIntegerDigits: 2 })}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest mt-3 text-white/80 group-hover:text-white transition-colors">
                  {unit.label}
                </span>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Link
              href="/products"
              className="group bg-white text-orange-600 px-8 py-4 rounded-full font-black text-lg inline-flex items-center gap-3 hover:bg-yellow-400 hover:text-gray-900 transition-all shadow-xl hover:shadow-yellow-400/30 active:scale-95 transform hover:-translate-y-1"
            >
              {t("daily_deals_view_offers")}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
          whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative w-full max-w-md aspect-square"
        >
          <div className="relative z-10 w-full h-full">
            {/* Mock Product Image */}
            <div className="bg-white/10 backdrop-blur-xl rounded-[40px] w-full h-full border border-white/20 p-8 flex items-center justify-center overflow-hidden shadow-2xl">
              <div className="relative w-full h-full flex flex-col items-center justify-center gap-6">
                <div className="w-64 h-64 bg-white/20 rounded-full blur-3xl absolute animate-pulse" />
                <div className="relative w-56 h-56 transform hover:scale-110 transition-transform duration-700">
                  <Image
                    src={content.image}
                    alt={content.productName}
                    fill
                    sizes="(max-width: 768px) 192px, 224px"
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
                <div className="text-center relative z-10">
                  <h3 className="text-2xl font-black mb-2 text-shadow-sm">
                    {content.productName}
                  </h3>
                  <div className="inline-flex items-baseline gap-3 bg-black/20 px-4 py-2 rounded-full backdrop-blur-sm">
                    <span className="text-yellow-300 font-black text-2xl">
                      {content.price}
                    </span>
                    <span className="text-white/60 line-through text-sm font-bold">
                      {content.originalPrice}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Badge */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 bg-yellow-400 text-gray-900 w-28 h-28 rounded-full flex flex-col items-center justify-center shadow-2xl z-20 border-4 border-white/20 backdrop-blur-sm"
          >
            <span className="text-[10px] font-black uppercase tracking-wider">
              {t("daily_deals_max")}
            </span>
            <span className="text-3xl font-black leading-none my-1">
              {content.discount}
            </span>
            <span className="text-[10px] font-black uppercase tracking-wider">
              {t("daily_deals_off")}
            </span>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
