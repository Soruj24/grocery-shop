"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const slides = [
  {
    id: 1,
    title: "তাজা বাজার",
    subtitle: "৬০ মিনিটে ডেলিভারি",
    desc: "সরাসরি ফার্ম থেকে সংগৃহীত সেরা মানের পণ্য এখন আপনার দোরগোড়ায়।",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=2000",
    badge: "নতুন অফার - ২০% ছাড়",
    color: "from-green-400 via-emerald-400 to-teal-300"
  },
  {
    id: 2,
    title: "অর্গানিক ফল",
    subtitle: "১০০% প্রাকৃতিক গুণমান",
    desc: "কোনো রকম কেমিক্যাল ছাড়াই উৎপাদিত সেরা মানের ফল সংগ্রহ করুন আমাদের থেকে।",
    image: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&q=80&w=2000",
    badge: "ফ্রি হোম ডেলিভারি",
    color: "from-orange-400 via-amber-400 to-yellow-300"
  },
  {
    id: 3,
    title: "সেরা মুদি বাজার",
    subtitle: "সাশ্রয়ী মূল্যে সেরা পণ্য",
    desc: "চাউল, ডাল, তেল সহ সকল নিত্যপ্রয়োজনীয় পণ্য কিনুন সবচেয়ে কম দামে।",
    image: "https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&q=80&w=2000",
    badge: "আজকের সেরা ডিল",
    color: "from-blue-400 via-indigo-400 to-purple-300"
  }
];

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[600px] lg:h-[750px] rounded-[48px] lg:rounded-[60px] overflow-hidden group">
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
          <div className="absolute inset-0 bg-gradient-to-tr from-[#020617] via-[#020617]/40 to-transparent z-10" />
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-[#020617] to-transparent z-10" />
          
          {/* Content */}
          <div className="relative z-20 h-full flex flex-col justify-center px-8 sm:px-24 max-w-5xl text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-[24px] mb-8 lg:mb-10 w-fit"
            >
              <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
              <span className="text-[10px] lg:text-xs font-black tracking-[0.3em] uppercase text-white/90">
                {slides[current].badge}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl sm:text-7xl lg:text-9xl font-black mb-8 lg:mb-10 leading-[1] lg:leading-[0.9] tracking-tighter"
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
              className="text-white/70 mb-10 lg:mb-14 text-lg lg:text-2xl max-w-2xl leading-relaxed font-medium"
            >
              {slides[current].desc}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center gap-6 lg:gap-8"
            >
              <Link
                href="/products"
                className="group relative bg-[#00D26A] text-black px-10 lg:px-12 py-5 lg:py-6 rounded-[24px] lg:rounded-[28px] font-black text-lg lg:text-xl transition-all duration-500 flex items-center overflow-hidden hover:pr-16 active:scale-95 shadow-[0_20px_40px_-10px_rgba(0,210,106,0.3)]"
              >
                <span className="relative z-10">বাজার শুরু করুন</span>
                <div className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
                  <ArrowRight className="w-6 h-6" />
                </div>
              </Link>

              <Link
                href="/products?filter=deals"
                className="group relative bg-white/10 backdrop-blur-md text-white border border-white/20 px-10 lg:px-12 py-5 lg:py-6 rounded-[24px] lg:rounded-[28px] font-black text-lg lg:text-xl transition-all duration-500 flex items-center hover:bg-white hover:text-black active:scale-95"
              >
                আজকের অফার
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <div className="absolute inset-x-8 lg:inset-x-12 top-1/2 -translate-y-1/2 z-30 flex justify-between pointer-events-none">
        <button
          onClick={prevSlide}
          className="p-4 lg:p-6 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full border border-white/10 transition-all pointer-events-auto hover:scale-110 active:scale-95 group"
        >
          <ChevronLeft className="w-6 h-6 lg:w-8 lg:h-8 group-hover:-translate-x-1 transition-transform" />
        </button>
        <button
          onClick={nextSlide}
          className="p-4 lg:p-6 bg-black/20 hover:bg-black/40 backdrop-blur-md text-white rounded-full border border-white/10 transition-all pointer-events-auto hover:scale-110 active:scale-95 group"
        >
          <ChevronRight className="w-6 h-6 lg:w-8 lg:h-8 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`transition-all duration-500 rounded-full ${
              current === index 
                ? "w-12 h-3 bg-[#00D26A]" 
                : "w-3 h-3 bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
