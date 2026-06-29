"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/providers/LanguageContext";
import { Slide } from "@/hooks/useHeroSlides";

interface HeroSlideContentProps {
  slide: Slide;
}

export default function HeroSlideContent({ slide }: HeroSlideContentProps) {
  const { t } = useLanguage();
  const reduceMotion = useReducedMotion();
  const d = reduceMotion ? 0.2 : 0.6;

  return (
    <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-12 lg:px-16 max-w-4xl text-white">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3, duration: d }}
        className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full mb-6 w-fit hover:bg-white/20 transition-colors cursor-default">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
        </span>
        <span className="text-xs font-bold uppercase tracking-widest text-green-300">{slide.badge}</span>
      </motion.div>
      <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: d, ease: "easeOut" }}
        className="text-4xl md:text-5xl lg:text-7xl font-black mb-6 leading-[1.1] tracking-tight drop-shadow-lg">
        {slide.title} <br />
        <span className={`text-transparent bg-clip-text bg-gradient-to-r ${slide.color} drop-shadow-none`}>{slide.subtitle}</span>
      </motion.h1>
      <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: d }}
        className="text-lg md:text-xl text-gray-200 max-w-xl mb-10 font-medium leading-relaxed drop-shadow-md">
        {slide.desc}
      </motion.p>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: d }}
        className="flex flex-wrap items-center gap-4">
        <Link href="/products"
          className="bg-green-600 hover:bg-green-500 text-white min-w-[180px] h-[56px] px-8 rounded-2xl font-bold text-sm transition-all shadow-xl shadow-green-600/30 hover:shadow-green-500/40 hover:-translate-y-1 flex items-center justify-center gap-2 group/btn relative overflow-hidden">
          <div className="absolute inset-0 bg-white/20 translate-y-full group-hover/btn:translate-y-0 transition-transform duration-300 ease-out" />
          <span className="relative z-10 flex items-center gap-2">{t("buy_now")} <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" /></span>
        </Link>
        <Link href="/categories"
          className="bg-white/5 backdrop-blur-md border border-white/20 text-white min-w-[160px] h-[56px] px-8 rounded-2xl font-bold text-sm hover:bg-white hover:text-black transition-all flex items-center justify-center hover:-translate-y-1">
          {t("browse_collections")}
        </Link>
      </motion.div>
    </div>
  );
}
