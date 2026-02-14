"use client";

import { motion } from "framer-motion";
import { TrendingUp, ShoppingCart, Plus } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';

export default function BuyMoreSaveMore() {
  const [emblaRef] = useEmblaCarousel({ 
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const offers = [
    { name: "মিনিকেট চাল", base: "৳৭৫/কেজি", tiered: "৫কেজি কিনলে ৳৭০/কেজি", img: "🍚", save: "সাশ্রয় ৳২৫" },
    { name: "সয়াবিন তেল", base: "৳১৬৫/লিটার", tiered: "৫লিটার কিনলে ৳১৫৮/লিটার", img: "🛢️", save: "সাশ্রয় ৳৩৫" },
    { name: "চিনি (সাদা)", base: "৳১৪০/কেজি", tiered: "৩কেজি কিনলে ৳১৩৫/কেজি", img: "🧂", save: "সাশ্রয় ৳১৫" },
    { name: "মসুর ডাল", base: "৳১৩৫/কেজি", tiered: "৫কেজি কিনলে ৳১২৮/কেজি", img: "🍲", save: "সাশ্রয় ৳৩৫" },
    { name: "গুড়ো সাবান", base: "৳১২০/প্যাক", tiered: "৩প্যাক কিনলে ৳১১০/প্যাক", img: "🧼", save: "সাশ্রয় ৳৩০" },
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-white/[0.02] rounded-[60px] px-8 md:px-12">
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white">যত বেশি, তত সাশ্রয়!</h2>
            <p className="text-gray-500 font-bold">বেশি পরিমাণে কিনুন আর প্রতি ইউনিটে ডিসকাউন্ট পান।</p>
          </div>
          <div className="flex items-center gap-3 bg-white dark:bg-gray-900 px-6 py-3 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest text-xs">ভলিউম ডিসকাউন্ট</span>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {offers.map((offer, i) => (
              <div key={i} className="flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_28%] min-w-0">
                <motion.div 
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-900 rounded-[40px] p-8 border border-gray-100 dark:border-white/5 shadow-xl shadow-gray-200/50 dark:shadow-none h-full flex flex-col"
                >
                  <div className="w-20 h-20 bg-gray-50 dark:bg-black/20 rounded-3xl flex items-center justify-center text-4xl mb-6">
                    {offer.img}
                  </div>
                  
                  <div className="space-y-2 mb-6 flex-1">
                    <h3 className="text-xl font-black text-gray-800 dark:text-white">{offer.name}</h3>
                    <p className="text-sm font-bold text-gray-400">সাধারণ দাম: {offer.base}</p>
                    <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-2xl border border-green-100 dark:border-green-900/30 mt-4">
                      <p className="text-green-600 dark:text-green-400 font-black text-sm">{offer.tiered}</p>
                      <p className="text-[10px] font-black uppercase text-orange-500 mt-1">{offer.save} সরাসরি!</p>
                    </div>
                  </div>

                  <button className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-green-600 hover:text-white dark:hover:bg-green-600 dark:hover:text-white transition-all group">
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                    পরিমাণ বাড়ান
                  </button>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
