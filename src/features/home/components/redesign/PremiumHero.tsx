"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Truck,
  ShieldCheck,
  Leaf,
  Search,
  Flame,
} from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { useHeroSlides } from "@/features/home/hooks/useHeroSlides";
import { getProductFallbackImage } from "@/constants/fallback-images";
import { Category } from "@/types/category";

export default function PremiumHero({
  categories = [],
}: {
  categories?: Category[];
}) {
  const { t } = useLanguage();
  const router = useRouter();
  const { slides, current, setCurrent, nextSlide, prevSlide } =
    useHeroSlides();
  const reduceMotion = useReducedMotion();
  const [direction, setDirection] = useState(1);
  const [query, setQuery] = useState("");

  const go = (fn: () => void, dir: number) => {
    setDirection(dir);
    fn();
  };

  const active = slides[current];

  const pills = [
    {
      icon: Truck,
      label: t("free_delivery_msg") ?? "ফ্রি ডেলিভারি",
    },
    {
      icon: ShieldCheck,
      label: t("feature_title_2"),
    },
    {
      icon: Leaf,
      label: t("organic_100_label") ?? "১০০% অর্গানিক",
    },
  ];

  const chips = (categories ?? []).slice(0, 6);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(
      q ? `/products?q=${encodeURIComponent(q)}` : "/products"
    );
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-8 lg:pt-10">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
        {/* Main slider */}
        <div className="relative lg:col-span-8 lg:h-[580px]">
          <div className="relative h-[440px] overflow-hidden rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] ring-1 ring-black/[0.04] lg:h-full dark:ring-white/[0.04]">
            <AnimatePresence
              mode="wait"
              custom={direction}
            >
              <motion.div
                key={active.id}
                custom={direction}
                initial={{
                  opacity: 0,
                  scale: reduceMotion ? 1 : 1.06,
                }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  duration: reduceMotion ? 0.25 : 0.8,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className="absolute inset-0"
              >
                <Image
                  src={
                    active.image ||
                    getProductFallbackImage("vegetable")
                  }
                  alt={active.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${active.color} mix-blend-overlay opacity-25`}
                />
              </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 lg:justify-center lg:p-16">
              <div className="max-w-xl space-y-6">
                <motion.span
                  key={`badge-${active.id}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/[0.12] px-5 py-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white backdrop-blur-md ring-1 ring-white/[0.15]"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {active.badge}
                </motion.span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`copy-${active.id}`}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.45 }}
                    className="space-y-4"
                  >
                    <h1 className="text-4xl font-extrabold leading-[1.05] tracking-[-0.03em] text-white drop-shadow-lg md:text-5xl lg:text-6xl">
                      {active.title}
                    </h1>
                    <p className="max-w-md text-base font-medium text-white/80 md:text-lg lg:text-xl">
                      {active.desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/products"
                    className="group inline-flex items-center gap-2.5 rounded-full bg-white px-8 py-4 text-sm font-bold text-foreground shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(0,0,0,0.18)] active:scale-[0.98]"
                  >
                    {t("hero_start_shopping")}
                    <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/products?tag=deals"
                    className="inline-flex items-center gap-2 rounded-full bg-white/[0.1] px-7 py-4 text-sm font-bold text-white ring-1 ring-white/[0.2] backdrop-blur-md transition-all duration-300 hover:bg-white/[0.18] active:scale-[0.98]"
                  >
                    {t("todays_deals")}
                  </Link>
                </div>
              </div>
            </div>

            {/* Nav */}
            <div className="absolute right-6 top-6 z-30 flex gap-2">
              <button
                onClick={() => go(prevSlide, -1)}
                aria-label="Previous slide"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.12] text-white ring-1 ring-white/[0.15] backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-foreground active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => go(nextSlide, 1)}
                aria-label="Next slide"
                className="flex h-12 w-12 items-center justify-center rounded-full bg-white/[0.12] text-white ring-1 ring-white/[0.15] backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-foreground active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-6 left-8 z-30 flex gap-2.5 lg:bottom-auto lg:left-16 lg:top-1/2 lg:-translate-y-1/2 lg:flex-col">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                  className="group p-1"
                >
                  <span
                    className={`block rounded-full transition-all duration-500 ${
                      i === current
                        ? "h-2 w-8 bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]"
                        : "h-2 w-2 bg-white/35 group-hover:bg-white/60"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Side promo stack */}
        <div className="hidden flex-col gap-5 lg:col-span-4 lg:flex">
          {[
            {
              href: "/products?tag=deals",
              key: "fruit",
              badge:
                t("daily_deal_label") ?? "ডেইলি ডিল",
              badgeColor: "bg-orange-500",
              titleLine1:
                t("fresh_summer_fruits_title_line1") ??
                "ফ্রেশ সামার",
              titleLine2:
                t("fresh_summer_fruits_title_line2") ??
                "ফ্রুটস",
              price: `${t("percent_30")} ${t("daily_deals_off")}`,
              priceColor: "text-orange-400",
            },
            {
              href: "/products?tag=new",
              key: "vegetable",
              badge:
                t("new_arrival_badge") ?? "নিউ",
              badgeColor: "bg-emerald-500",
              titleLine1:
                t("organic_fresh_vegetables_title_line1") ??
                "অর্গানিক",
              titleLine2:
                t("organic_fresh_vegetables_title_line2") ??
                "ভেজিটেবলস",
              price:
                t("price_120_tk") ?? "৳১২০",
              priceColor: "text-emerald-400",
            },
          ].map((card) => (
            <Link
              key={card.key}
              href={card.href}
              className="group relative h-[270px] overflow-hidden rounded-3xl ring-1 ring-black/[0.04] shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-500 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] dark:ring-white/[0.04]"
            >
              <Image
                src={getProductFallbackImage(card.key)}
                alt={card.titleLine1}
                fill
                sizes="33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
              <div className="absolute left-5 top-5">
                <span
                  className={`inline-flex rounded-full px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-white ${card.badgeColor}`}
                >
                  {card.badge}
                </span>
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xl font-extrabold leading-tight text-white">
                  {card.titleLine1}
                  <br />
                  {card.titleLine2}
                </p>
                <p
                  className={`mt-1.5 text-sm font-extrabold ${card.priceColor}`}
                >
                  {card.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Search + trust band */}
      <div className="mt-5 grid grid-cols-1 gap-4 rounded-3xl border border-black/[0.04] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.04)] lg:mt-7 lg:grid-cols-[1.6fr_1fr] lg:gap-5 dark:border-white/[0.04] dark:bg-white/[0.02]">
        <form
          onSubmit={onSearch}
          className="group relative flex items-center rounded-2xl bg-zinc-50 px-5 ring-1 ring-transparent transition-all duration-300 focus-within:bg-white focus-within:ring-primary/[0.2] focus-within:shadow-[0_0_0_3px_rgba(0,0,0,0.03)] dark:bg-white/[0.03]"
        >
          <Search className="h-5 w-5 shrink-0 text-muted-foreground/60 transition-colors duration-300 group-focus-within:text-primary" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search_placeholder")}
            className="w-full bg-transparent px-4 py-4 text-sm font-medium text-foreground placeholder:text-muted-foreground/50 focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-foreground px-6 py-3 text-sm font-bold text-background transition-all duration-300 hover:bg-primary active:scale-[0.98]"
          >
            {t("search_button")}
          </button>
        </form>
        <div className="grid grid-cols-3 gap-3">
          {pills.map((pill) => (
            <div
              key={pill.label}
              className="flex items-center justify-center gap-2.5 rounded-2xl bg-zinc-50 px-3 py-3.5 text-center text-xs font-semibold text-foreground transition-all duration-300 hover:bg-primary/[0.06] hover:text-primary dark:bg-white/[0.03]"
            >
              <pill.icon className="h-4 w-4 shrink-0 text-primary/70" />
              <span className="hidden sm:inline">
                {pill.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick category chips */}
      {chips.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center gap-2.5 px-1">
          <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-muted-foreground/60">
            <Flame className="h-3.5 w-3.5 text-danger" />
            {t("popular_now") ?? "আজকের হট"}
          </span>
          {chips.map((cat) => (
            <Link
              key={cat._id}
              href={`/products?category=${cat._id}`}
              className="rounded-full border border-black/[0.06] bg-white px-4 py-2 text-xs font-semibold text-foreground transition-all duration-300 hover:border-primary/[0.2] hover:bg-primary/[0.04] hover:text-primary dark:border-white/[0.06] dark:bg-white/[0.02]"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
