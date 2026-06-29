"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getProductFallbackImage } from "@/constants/fallback-images";

export interface Slide {
  id: number;
  title: string;
  subtitle: string;
  desc: string;
  image: string;
  badge: string;
  color: string;
}

export interface HeroSlidesData {
  slides?: Slide[];
}

export function useHeroSlides(data?: HeroSlidesData) {
  const { t } = useLanguage();
  const [current, setCurrent] = useState(0);

  const defaultSlides: Slide[] = [
    { id: 1, title: t("hero_title_1"), subtitle: t("hero_subtitle_1"), desc: t("hero_desc_1"), image: getProductFallbackImage("vegetable"), badge: t("hero_badge_1"), color: "from-green-400 via-emerald-400 to-teal-300" },
    { id: 2, title: t("hero_title_2"), subtitle: t("hero_subtitle_2"), desc: t("hero_desc_2"), image: getProductFallbackImage("fruit"), badge: t("hero_badge_2"), color: "from-orange-400 via-amber-400 to-yellow-300" },
    { id: 3, title: t("hero_title_3"), subtitle: t("hero_subtitle_3"), desc: t("hero_desc_3"), image: getProductFallbackImage("fish"), badge: t("hero_badge_3"), color: "from-blue-400 via-indigo-400 to-purple-300" },
  ];

  const slides = (data?.slides && data.slides.length > 0) ? data.slides : defaultSlides;

  useEffect(() => {
    const timer = setInterval(() => setCurrent((prev) => (prev + 1) % slides.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return { slides, current, setCurrent, nextSlide, prevSlide };
}
