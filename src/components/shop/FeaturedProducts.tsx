"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Star, Sparkles, ShoppingBag, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const TABS = [
  { id: "trending", label: "ট্রেন্ডিং", icon: TrendingUp, color: "from-blue-500 to-cyan-500" },
  { id: "bestsellers", label: "বেস্ট সেলার", icon: Star, color: "from-amber-400 to-orange-600" },
  { id: "new", label: "নতুন পণ্য", icon: Sparkles, color: "from-purple-500 to-pink-600" }
];

export default function FeaturedProducts({ products }: { products: any[] }) {
  const [activeTab, setActiveTab] = useState("trending");

  // Mock filtering for UI demonstration
  const filteredProducts = products.slice(0, 4);

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        <div className="flex flex-col items-center space-y-10">
          <div className="text-center space-y-4">
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight">
              বাছাইকৃত <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">সেরা পণ্য</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 font-medium max-w-xl mx-auto">
              সবচেয়ে জনপ্রিয় এবং নতুন আসা পণ্যের সমাহার থেকে আপনার পছন্দের পণ্যটি বেছে নিন।
            </p>
          </div>

          <div className="flex p-2 bg-gray-100 dark:bg-white/5 rounded-[32px] w-fit">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex items-center gap-3 px-8 py-4 rounded-[24px] font-black transition-all duration-500 ${
                  activeTab === tab.id 
                    ? "text-white" 
                    : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="activeTab"
                    className={`absolute inset-0 bg-gradient-to-r ${tab.color} rounded-[24px] shadow-lg`}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <tab.icon className={`w-5 h-5 relative z-10 ${activeTab === tab.id ? "animate-pulse" : ""}`} />
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white dark:bg-[#0F172A] rounded-[40px] p-6 border border-gray-100 dark:border-white/5 hover:border-green-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-green-500/10"
              >
                <div className="relative aspect-square rounded-[32px] overflow-hidden bg-gray-50 dark:bg-white/5 mb-6">
                  {product.image && (
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 dark:bg-black/90 backdrop-blur-md px-4 py-2 rounded-2xl text-[10px] font-black text-green-600 uppercase tracking-widest shadow-xl">
                    {activeTab === "trending" ? "Trending" : activeTab === "bestsellers" ? "Best Seller" : "New"}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-black text-gray-900 dark:text-white group-hover:text-green-600 transition-colors truncate">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">{product.unit}</p>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-black text-gray-900 dark:text-white">৳{product.price}</div>
                    <button className="w-14 h-14 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl flex items-center justify-center hover:bg-green-600 hover:text-white transition-all active:scale-95 shadow-lg">
                      <ShoppingBag size={24} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center pt-8">
          <Link
            href="/products"
            className="group flex items-center gap-4 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 px-12 py-5 rounded-[28px] font-black text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-all"
          >
            সবগুলো পণ্য দেখুন
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
