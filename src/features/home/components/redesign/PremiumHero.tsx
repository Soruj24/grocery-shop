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

export default function PremiumHero({ categories = [] }: { categories?: Category[] }) {
  const { t } = useLanguage();
  const router = useRouter();
  const { slides, current, setCurrent, nextSlide, prevSlide } = useHeroSlides();
  const reduceMotion = useReducedMotion();
  const [direction, setDirection] = useState(1);
  const [query, setQuery] = useState("");

  const go = (fn: () => void, dir: number) => {
    setDirection(dir);
    fn();
  };

  const active = slides[current];

  const pills = [
    { icon: Truck, label: t("free_delivery_msg") ?? "ফ্রি ডেলিভারি" },
    { icon: ShieldCheck, label: t("feature_title_2") },
    { icon: Leaf, label: t("organic_100_label") ?? "১০০% অর্গানিক" },
  ];

  const chips = (categories ?? []).slice(0, 6);

  const onSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = query.trim();
    router.push(q ? `/products?q=${encodeURIComponent(q)}` : "/products");
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-6 lg:pt-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-6">
        {/* Main slider */}
        <div className="relative lg:col-span-8 lg:h-[560px]">
          <div className="relative h-[420px] overflow-hidden rounded-3xl shadow-2xl shadow-black/10 ring-1 ring-border lg:h-full">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active.id}
                custom={direction}
                initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduceMotion ? 0.25 : 0.9, ease: "easeOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={active.image || getProductFallbackImage("vegetable")}
                  alt={active.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/45 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${active.color} mix-blend-overlay opacity-30`}
                />
              </motion.div>
            </AnimatePresence>

            {/* Content */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-7 lg:justify-center lg:p-14">
              <div className="max-w-xl space-y-5">
                <motion.span
                  key={`badge-${active.id}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-black uppercase tracking-[0.18em] text-white backdrop-blur-md ring-1 ring-white/20"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  {active.badge}
                </motion.span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`copy-${active.id}`}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -18 }}
                    transition={{ duration: 0.5 }}
                    className="space-y-3"
                  >
                    <h1 className="text-4xl font-black leading-[1.05] text-white drop-shadow-lg md:text-5xl lg:text-6xl">
                      {active.title}
                    </h1>
                    <p className="max-w-md text-base font-medium text-white/85 md:text-lg">
                      {active.desc}
                    </p>
                  </motion.div>
                </AnimatePresence>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/products"
                    className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 text-sm font-black text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:bg-primary-hover active:scale-95"
                  >
                    {t("hero_start_shopping")}
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                  <Link
                    href="/products?tag=deals"
                    className="inline-flex items-center gap-2 rounded-full bg-white/10 px-7 py-3.5 text-sm font-black text-white ring-1 ring-white/25 backdrop-blur-md transition-all hover:bg-white/20 active:scale-95"
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
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-md transition-all hover:scale-110 hover:bg-white hover:text-black active:scale-95"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => go(nextSlide, 1)}
                aria-label="Next slide"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/20 backdrop-blur-md transition-all hover:scale-110 hover:bg-white hover:text-black active:scale-95"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-6 left-7 z-30 flex gap-2 lg:bottom-auto lg:left-14 lg:top-1/2 lg:-translate-y-1/2 lg:flex-col">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  aria-label={`Go to slide ${i + 1}`}
                  className="group p-1.5"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-500 ${
                      i === current
                        ? "w-8 bg-primary shadow-primary"
                        : "w-2 bg-white/40 group-hover:bg-white/70"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Side promo stack */}
        <div className="hidden flex-col gap-4 lg:col-span-4 lg:flex">
          {[
            {
              href: "/products?tag=deals",
              key: "fruit",
              badge: t("daily_deal_label") ?? "ডেইলি ডিল",
              badgeColor: "bg-orange-500",
              titleLine1: t("fresh_summer_fruits_title_line1") ?? "ফ্রেশ সামার",
              titleLine2: t("fresh_summer_fruits_title_line2") ?? "ফ্রুটস",
              price: `${t("percent_30")} ${t("daily_deals_off")}`,
              priceColor: "text-orange-400",
            },
            {
              href: "/products?tag=new",
              key: "vegetable",
              badge: t("new_arrival_badge") ?? "নিউ",
              badgeColor: "bg-green-500",
              titleLine1: t("organic_fresh_vegetables_title_line1") ?? "অর্গানিক",
              titleLine2: t("organic_fresh_vegetables_title_line2") ?? "ভেজিটেবলস",
              price: t("price_120_tk") ?? "৳১২০",
              priceColor: "text-green-400",
            },
          ].map((card) => (
            <Link
              key={card.key}
              href={card.href}
              className="group relative h-[270px] overflow-hidden rounded-3xl ring-1 ring-border shadow-lg transition-all hover:shadow-xl"
            >
              <Image
                src={getProductFallbackImage(card.key)}
                alt={card.titleLine1}
                fill
                sizes="33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute left-5 top-5">
                <span
                  className={`inline-flex rounded-full px-3 py-1 text-[11px] font-black uppercase tracking-wider text-white ${card.badgeColor}`}
                >
                  {card.badge}
                </span>
              </div>
              <div className="absolute bottom-5 left-5 right-5">
                <p className="text-xl font-black leading-tight text-white">
                  {card.titleLine1}
                  <br />
                  {card.titleLine2}
                </p>
                <p className={`mt-1 text-sm font-black ${card.priceColor}`}>
                  {card.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Search + trust band */}
      <div className="mt-4 grid grid-cols-1 gap-3 rounded-3xl border border-border bg-card p-4 shadow-sm lg:mt-6 lg:grid-cols-[1.6fr_1fr] lg:gap-4">
        <form
          onSubmit={onSearch}
          className="group relative flex items-center rounded-2xl bg-muted px-4 ring-1 ring-transparent transition-all focus-within:bg-background focus-within:ring-primary/40"
        >
          <Search className="h-5 w-5 shrink-0 text-muted-foreground group-focus-within:text-primary" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search_placeholder")}
            className="w-full bg-transparent px-3 py-4 text-sm font-semibold text-foreground placeholder:text-muted-foreground focus:outline-none"
          />
          <button
            type="submit"
            className="shrink-0 rounded-xl bg-primary px-5 py-2.5 text-sm font-black text-primary-foreground transition-all hover:bg-primary-hover active:scale-95"
          >
            {t("search_button")}
          </button>
        </form>
        <div className="grid grid-cols-3 gap-3">
          {pills.map((pill) => (
            <div
              key={pill.label}
              className="flex items-center justify-center gap-2 rounded-2xl bg-muted px-2 py-3 text-center text-xs font-bold text-foreground transition-colors hover:bg-primary-subtle hover:text-primary"
            >
              <pill.icon className="h-4 w-4 shrink-0 text-primary" />
              <span className="hidden sm:inline">{pill.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Quick category chips */}
      {chips.length > 0 && (
        <div className="mt-3 flex flex-wrap items-center gap-2 px-1">
          <span className="flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.18em] text-muted-foreground">
            <Flame className="h-3.5 w-3.5 text-danger" />
            {t("popular_now") ?? "আজকের হট"}
          </span>
          {chips.map((cat) => (
            <Link
              key={cat._id}
              href={`/products?category=${cat._id}`}
              className="rounded-full border border-border bg-subtle px-4 py-1.5 text-xs font-bold text-foreground transition-all hover:border-primary/40 hover:bg-primary-subtle hover:text-primary"
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
