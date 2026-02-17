"use client";

import { useState, useEffect } from "react"; 
import { Zap, ArrowRight } from "lucide-react";

import { useLanguage } from "@/components/LanguageContext";

import Link from "next/link";
import Image from "next/image";
import { getProductFallbackImage } from "@/lib/category-utils";

export default function DailyDealsBanner() {
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

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-rose-600 rounded-32px p-8 md:p-12 text-white">
      {/* Background Subtle Gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[100px] rounded-full -mr-32 -mt-32" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="space-y-8 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
            <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span className="text-xs font-black uppercase tracking-widest">
              {t("daily_deals_badge")}
            </span>
          </div>

          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-black leading-tight tracking-tighter">
              {t("daily_deals_title")} <br />
              <span className="text-yellow-300">
                {t("daily_deals_subtitle")}
              </span>
            </h2>
            <p className="text-white/80 text-lg font-medium max-w-md">
              {t("daily_deals_desc")}
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {[
              { label: t("daily_deals_hour"), value: timeLeft.hours },
              { label: t("daily_deals_minute"), value: timeLeft.minutes },
              { label: t("daily_deals_second"), value: timeLeft.seconds },
            ].map((unit, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="bg-white text-gray-900 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-black shadow-xl">
                  {unit.value.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US', { minimumIntegerDigits: 2 })}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest mt-2 text-white/60">
                  {unit.label}
                </span>
              </div>
            ))}
          </div>

          <Link
            href="/products"
            className="group bg-white text-rose-600 px-8 py-4 rounded-2xl font-black text-lg inline-flex items-center gap-3 hover:bg-yellow-300 hover:text-gray-900 transition-all shadow-2xl active:scale-95"
          >
            {t("daily_deals_view_offers")}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="relative w-full max-w-md aspect-square">
          <div className="relative z-10 w-full h-full">
            {/* Mock Product Image */}
            <div className="bg-white/5 backdrop-blur-xl rounded-32px w-full h-full border border-white/10 p-8 flex items-center justify-center overflow-hidden">
              <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
                <div className="w-48 h-48 bg-white/10 rounded-full blur-2xl absolute" />
                <div className="relative w-48 h-48">
                  <Image
                    src={getProductFallbackImage("apple")}
                    alt={t("daily_deals_product_name")}
                    fill
                    sizes="(max-width: 768px) 192px, 192px"
                    className="object-contain drop-shadow-2xl"
                  />
                </div>
                <div className="text-center relative z-10">
                  <div className="text-3xl font-black">
                    {t("daily_deals_product_name")}
                  </div>
                  <div className="text-yellow-300 font-black text-xl">
                    {t("price_80_tk")}{" "}
                    <span className="text-white/50 line-through text-sm font-bold">
                      {t("price_160_tk")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Badge */}
          <div className="absolute -top-6 -right-6 bg-yellow-300 text-gray-900 w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-2xl z-20 border-4 border-rose-500">
            <span className="text-[10px] font-black uppercase">
              {t("daily_deals_max")}
            </span>
            <span className="text-2xl font-black">{t("percent_50")}</span>
            <span className="text-[10px] font-black uppercase">
              {t("daily_deals_off")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
