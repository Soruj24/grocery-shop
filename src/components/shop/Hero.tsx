"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Clock, Leaf, Timer, TrendingUp } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";
import { getProductFallbackImage } from "@/lib/category-utils";
import HeroStats from "./Hero/HeroStats";

export default function Hero({ data }: { data?: { slides?: Array<{ id: number; title: string; subtitle: string; desc: string; image: string; badge: string; color: string }> } }) {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);
  const reduceMotion = useReducedMotion();

  const defaultSlides = [
    {
      id: 1,
      title: t('hero_title_1'),
      subtitle: t('hero_subtitle_1'),
      desc: t('hero_desc_1'),
      image: getProductFallbackImage("vegetable"),
      badge: t('hero_badge_1'),
      color: "from-green-400 via-emerald-400 to-teal-300"
    },
    {
      id: 2,
      title: t('hero_title_2'),
      subtitle: t('hero_subtitle_2'),
      desc: t('hero_desc_2'),
      image: getProductFallbackImage("fruit"),
      badge: t('hero_badge_2'),
      color: "from-orange-400 via-amber-400 to-yellow-300"
    },
    {
      id: 3,
      title: t('hero_title_3'),
      subtitle: t('hero_subtitle_3'),
      desc: t('hero_desc_3'),
      image: getProductFallbackImage("fish"),
      badge: t('hero_badge_3'),
      color: "from-blue-400 via-indigo-400 to-purple-300"
    }
  ];

  const slides = (data?.slides && data.slides.length > 0) ? data.slides : defaultSlides;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 h-auto min-h-[460px] lg:h-[600px] w-full">
      {/* Main Slider */}
      <section className="lg:col-span-8 relative h-[420px] lg:h-full rounded-[32px] lg:rounded-[48px] overflow-hidden group shadow-2xl shadow-gray-200/50 dark:shadow-black/50 ring-1 ring-gray-100 dark:ring-white/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={slides[current].id}
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            {/* Background Image */}
            <Image
              src={slides[current].image}
              alt={slides[current].title}
              fill
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover transition-transform duration-[8000ms] ease-linear scale-100 group-hover:scale-110"
              priority
            />
            {/* Overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            
            {/* Content */}
            <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-12 lg:px-16 max-w-4xl text-white">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: reduceMotion ? 0.2 : 0.6 }}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6 w-fit hover:bg-white/20 transition-colors cursor-default"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-green-300">
                  {slides[current].badge}
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: reduceMotion ? 0.2 : 0.6, ease: "easeOut" }}
                className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight drop-shadow-lg"
              >
                {slides[current].title} <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slides[current].color} drop-shadow-none`}>
                  {slides[current].subtitle}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: reduceMotion ? 0.2 : 0.6 }}
                className="text-lg md:text-xl text-gray-200 max-w-xl mb-10 font-medium leading-relaxed drop-shadow-md"
              >
                {slides[current].desc}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: reduceMotion ? 0.2 : 0.6 }}
                className="flex flex-wrap items-center gap-4"
              >
                <Link
                  href="/products"
                  className="bg-green-600 hover:bg-green-500 text-white min-w-[180px] h-[56px] px-8 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-green-600/30 hover:shadow-green-500/40 hover:-translate-y-1 flex items-center justify-center gap-2 group/btn relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 flex items-center gap-2">
                    {t('buy_now')}
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  href="/categories"
                  className="bg-white/5 backdrop-blur-md border border-white/20 text-white min-w-[160px] h-[56px] px-8 rounded-2xl font-bold text-sm hover:bg-white hover:text-black transition-all flex items-center justify-center hover:-translate-y-1"
                >
                  View Collections
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation Arrows (Desktop Only) */}
        <div className="hidden lg:flex absolute bottom-12 right-12 gap-3 z-30">
          <button
            onClick={prevSlide}
            className="w-12 h-12 bg-black/20 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95 group/nav"
          >
            <ChevronLeft className="w-6 h-6 group-hover/nav:-translate-x-0.5 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="w-12 h-12 bg-black/20 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95 group/nav"
          >
            <ChevronRight className="w-6 h-6 group-hover/nav:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Progress Dots */}
        <div className="absolute bottom-8 left-8 lg:left-16 z-30 flex gap-2">
          {slides.map((_: unknown, i: number) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="group/dot p-2"
            >
              <div className={`transition-all duration-500 h-1.5 rounded-full ${
                current === i 
                  ? "w-10 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" 
                  : "w-2 bg-white/30 group-hover/dot:bg-white/60"
              }`} />
            </button>
          ))}
        </div>
        <HeroStats />
      </section>

      {/* Right Side Banners (Desktop Only) */}
      <div className="hidden lg:flex flex-col gap-4 lg:col-span-4 h-full">
        {/* Top Banner - Fresh Fruits */}
        <Link href="/category/fruit" className="relative flex-1 rounded-[40px] overflow-hidden group cursor-pointer ring-1 ring-gray-100 dark:ring-white/10 shadow-lg shadow-gray-200/50 dark:shadow-black/30 block">
          <Image
            src={getProductFallbackImage("fruit")}
            alt="Fresh Fruits"
            fill
            sizes="(max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          
          <div className="absolute bottom-0 left-0 p-8 text-white w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-orange-500 text-white text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded-lg w-fit shadow-lg shadow-orange-500/30">
                Daily Deal
              </div>
              <div className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest py-1 px-2 rounded-lg">
                <Clock className="w-3 h-3 inline mr-1" />
                24h Left
              </div>
            </div>
            
            <h3 className="text-2xl font-black mb-1 leading-tight group-hover:text-orange-300 transition-colors">
              Fresh Summer <br/> Fruits Sale
            </h3>
            
            <div className="flex items-center justify-between mt-4 border-t border-white/10 pt-4">
              <div className="flex flex-col">
                <span className="text-xs text-gray-300 uppercase tracking-wider font-bold">Up to</span>
                <span className="text-3xl font-black text-orange-400">30% OFF</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-black transition-all hover:scale-110 active:scale-95 shadow-lg">
                <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </Link>

        {/* Bottom Banner - Fast Delivery */}
        <Link href="/category/vegetable" className="relative flex-1 rounded-[40px] overflow-hidden group cursor-pointer ring-1 ring-gray-100 dark:ring-white/10 shadow-lg shadow-gray-200/50 dark:shadow-black/30 block">
          <Image
            src={getProductFallbackImage("vegetable")}
            alt="Organic Vegetables"
            fill
            sizes="(max-width: 1280px) 33vw, 25vw"
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
          
          <div className="absolute bottom-0 left-0 p-8 text-white w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-green-500 text-white text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded-lg w-fit shadow-lg shadow-green-500/30">
                New Arrival
              </div>
              <div className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest py-1 px-2 rounded-lg">
                <Leaf className="w-3 h-3 inline mr-1" />
                100% Organic
              </div>
            </div>

            <h3 className="text-2xl font-black mb-1 leading-tight group-hover:text-green-300 transition-colors">
              Organic Fresh <br/> Vegetables
            </h3>

            <div className="flex items-center justify-between mt-4 border-t border-white/10 pt-4">
              <div className="flex flex-col">
                <span className="text-xs text-gray-300 uppercase tracking-wider font-bold">Starting at</span>
                <span className="text-3xl font-black text-green-400">$12.99</span>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-black transition-all hover:scale-110 active:scale-95 shadow-lg">
                <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
