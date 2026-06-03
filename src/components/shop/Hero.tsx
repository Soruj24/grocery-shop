"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageContext";
import { useHeroSlides } from "@/hooks/useHeroSlides";
import HeroStats from "./Hero/HeroStats";
import HeroSlideContent from "./Hero/HeroSlideContent";
import HeroSideBanner from "./Hero/HeroSideBanner";

export default function Hero({ data }: { data?: { slides?: Array<{ id: number; title: string; subtitle: string; desc: string; image: string; badge: string; color: string }> } }) {
  const { t } = useLanguage();
  const { slides, current, setCurrent, nextSlide, prevSlide } = useHeroSlides(data);
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 h-auto min-h-[460px] lg:h-[600px] w-full">
      <section className="lg:col-span-8 relative h-[420px] lg:h-full rounded-[32px] lg:rounded-[48px] overflow-hidden group shadow-2xl shadow-gray-200/50 dark:shadow-black/50 ring-1 ring-gray-100 dark:ring-white/10">
        <AnimatePresence mode="wait">
          <motion.div key={slides[current].id} initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.1 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : 0.8, ease: "easeOut" }} className="absolute inset-0">
            <Image src={slides[current].image} alt={slides[current].title} fill sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover transition-transform duration-[8000ms] ease-linear scale-100 group-hover:scale-110" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
            <HeroSlideContent slide={slides[current]} />
          </motion.div>
        </AnimatePresence>

        <div className="hidden lg:flex absolute bottom-12 right-12 gap-3 z-30">
          <button onClick={prevSlide}
            className="w-12 h-12 bg-black/20 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95 group/nav">
            <ChevronLeft className="w-6 h-6 group-hover/nav:-translate-x-0.5 transition-transform" />
          </button>
          <button onClick={nextSlide}
            className="w-12 h-12 bg-black/20 backdrop-blur-md border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-all hover:scale-110 active:scale-95 group/nav">
            <ChevronRight className="w-6 h-6 group-hover/nav:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="absolute bottom-8 left-8 lg:left-16 z-30 flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)} className="group/dot p-2">
              <div className={`transition-all duration-500 h-1.5 rounded-full ${current === i ? "w-10 bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" : "w-2 bg-white/30 group-hover/dot:bg-white/60"}`} />
            </button>
          ))}
        </div>
        <HeroStats />
      </section>

      <div className="hidden lg:flex flex-col gap-4 lg:col-span-4 h-full">
        <HeroSideBanner href="/category/fruit" imageKey="fruit" badge={t("daily_deal_label")} badgeColor="bg-orange-500"
          icon="clock" iconLabel={t("hours_left_24")} titleLine1={t("fresh_summer_fruits_title_line1")}
          titleLine2={t("fresh_summer_fruits_title_line2")} subtitlePrefix={t("up_to")}
          priceText={`${t("percent_30")} ${t("daily_deals_off")}`} priceColor="text-orange-400" hoverTextColor="group-hover:text-orange-300" />
        <HeroSideBanner href="/category/vegetable" imageKey="vegetable" badge={t("new_arrival_badge")} badgeColor="bg-green-500"
          icon="leaf" iconLabel={t("organic_100_label")} titleLine1={t("organic_fresh_vegetables_title_line1")}
          titleLine2={t("organic_fresh_vegetables_title_line2")} subtitlePrefix={t("starting_at")}
          priceText={t("price_120_tk")} priceColor="text-green-400" hoverTextColor="group-hover:text-green-300" />
      </div>
    </div>
  );
}
