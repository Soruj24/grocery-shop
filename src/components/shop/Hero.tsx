"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";

export default function Hero() {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);

  const slides = [
    {
      id: 1,
      title: t('hero_title_1'),
      subtitle: t('hero_subtitle_1'),
      desc: t('hero_desc_1'),
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2000",
      badge: t('hero_badge_1'),
      color: "from-green-400 via-emerald-400 to-teal-300"
    },
    {
      id: 2,
      title: t('hero_title_2'),
      subtitle: t('hero_subtitle_2'),
      desc: t('hero_desc_2'),
      image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=2000",
      badge: t('hero_badge_2'),
      color: "from-orange-400 via-amber-400 to-yellow-300"
    },
    {
      id: 3,
      title: t('hero_title_3'),
      subtitle: t('hero_subtitle_3'),
      desc: t('hero_desc_3'),
      image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=2000",
      badge: t('hero_badge_3'),
      color: "from-blue-400 via-indigo-400 to-purple-300"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[450px] lg:h-[600px] rounded-[32px] lg:rounded-[48px] overflow-hidden group mb-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <Image
            src={slides[current].image}
            alt={slides[current].title}
            fill
            className="object-cover"
            priority
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10" />
          
          {/* Content */}
          <div className="relative z-20 h-full flex flex-col justify-center px-6 lg:px-20 max-w-4xl text-white">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-green-600 px-4 py-2 rounded-full mb-6 w-fit shadow-lg shadow-green-600/30"
            >
              <span className="text-[10px] font-black uppercase tracking-widest">
                {slides[current].badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl lg:text-7xl font-black mb-4 leading-tight tracking-tight"
            >
              {slides[current].title} <br />
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slides[current].color}`}>
                {slides[current].subtitle}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-base lg:text-xl text-white/80 max-w-xl mb-8 font-medium leading-relaxed"
            >
              {slides[current].desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <Link
                href="/products"
                className="bg-white text-black min-w-[160px] min-h-[56px] px-8 py-4 rounded-2xl font-black text-sm hover:bg-green-600 hover:text-white transition-all shadow-xl active:scale-95 flex items-center justify-center gap-2"
              >
                {t('buy_now')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows (Desktop Only) */}
      <div className="hidden lg:flex absolute inset-x-8 top-1/2 -translate-y-1/2 justify-between items-center z-30 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={prevSlide}
          className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 rounded-full ${
              current === i 
                ? "w-10 h-2 bg-green-500" 
                : "w-2 h-2 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
