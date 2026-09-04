"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroCountdown from "./HeroCountdown";
import { useLanguage } from "@/contexts/LanguageContext";

export default function HeroContent() {
  const { t } = useLanguage();
  return (
    <div className="relative z-20 h-full flex flex-col justify-center px-5 sm:px-8 lg:px-24 max-w-4xl text-white">
      <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-4 sm:px-6 py-2 sm:py-3 rounded-full mb-6 sm:mb-10 w-fit max-w-full">
        <span className="w-2.5 h-2.5 bg-primary rounded-full animate-pulse shadow-primary shrink-0" />
        <span className="text-[10px] sm:text-xs font-black tracking-[0.2em] sm:tracking-[0.3em] uppercase text-white/90 truncate">
          {t('hero_badge_1')}
        </span>
      </div>

      <h1 className="text-5xl sm:text-7xl lg:text-9xl font-black mb-6 sm:mb-10 leading-[0.95] tracking-tighter text-balance">
        {t('hero_title_1')} <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-primary-subtle-foreground to-accent">
          {t('hero_subtitle_1')}
        </span>
      </h1>

      <p className="text-white/70 mb-8 sm:mb-14 text-base sm:text-xl lg:text-2xl max-w-2xl leading-relaxed font-medium line-clamp-3 sm:line-clamp-none">
        {t('hero_welcome')}
      </p>

      <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-center gap-3 sm:gap-8">
        <Link
          href="/products"
          className="group relative bg-primary text-primary-foreground px-8 sm:px-12 py-4 sm:py-6 rounded-full font-black text-base sm:text-xl transition-all duration-500 flex items-center justify-center overflow-hidden hover:pr-16 active:scale-95 shadow-primary"
        >
          <span className="relative z-10">{t('hero_start_shopping')}</span>
          <div className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
            <ArrowRight className="w-6 h-6" />
          </div>
        </Link>

        <Link
          href="/products?filter=deals"
          className="group relative bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 sm:px-12 py-4 sm:py-6 rounded-full font-black text-base sm:text-xl transition-all duration-500 flex items-center justify-center hover:bg-white hover:text-black active:scale-95"
        >
          {t('hero_todays_offers')}
        </Link>
      </div>
    </div>
  );
}
