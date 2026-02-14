"use client";

import { motion } from "framer-motion";
import { ShoppingBag, Star, ArrowRight, Gift } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ComboOffers() {
  const combos = [
    {
      id: 1,
      name: "ফ্যামিলি বাজার প্যাক",
      items: ["৫ কেজি চাল", "২ লিটার তেল", "১ কেজি ডাল", "১ কেজি চিনি"],
      price: 1250,
      oldPrice: 1450,
      image: "https://cdn-icons-png.flaticon.com/512/3081/3081840.png",
      tag: "বেস্ট ভ্যালু"
    },
    {
      id: 2,
      name: "ব্রেকফাস্ট কম্বো",
      items: ["১ প্যাকেট পাউরুটি", "১ ডজন ডিম", "৫০০ গ্রাম জেলি", "১ কেজি কলা"],
      price: 450,
      oldPrice: 520,
      image: "https://cdn-icons-png.flaticon.com/512/2611/2611158.png",
      tag: "জনপ্রিয়"
    },
    {
      id: 3,
      name: "রান্নাঘর কিট",
      items: ["১ কেজি পেঁয়াজ", "৫০০ গ্রাম রসুন", "২৫০ গ্রাম আদা", "১ কেজি আলু"],
      price: 320,
      oldPrice: 380,
      image: "https://cdn-icons-png.flaticon.com/512/2329/2329903.png",
      tag: "সুপার সেভার"
    }
  ];

  return (
    <section className="relative py-32 px-4 overflow-hidden bg-gray-50/50 dark:bg-black/20">
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-500/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto space-y-20">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8">
          <div className="space-y-6 max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-black uppercase tracking-[0.2em]"
            >
              <Gift size={14} className="animate-bounce" />
              সেরা সাশ্রয়ী অফার
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tight leading-[1.1]"
            >
              একসাথে কিনুন <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600">বেশি সাশ্রয় করুন</span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-lg text-gray-500 dark:text-gray-400 font-medium leading-relaxed"
            >
              আমাদের বিশেষ কম্বো প্যাকগুলো আপনার পরিবারের মাসিক বাজারকে করবে আরও সহজ এবং সাশ্রয়ী। আজই বেছে নিন আপনার প্রয়োজনীয় প্যাকটি।
            </motion.p>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <Link 
              href="/products?category=combos"
              className="group flex items-center gap-4 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 px-10 py-5 rounded-[28px] font-black text-gray-900 dark:text-white hover:bg-blue-600 hover:text-white hover:border-transparent transition-all duration-500 shadow-xl shadow-blue-500/5 hover:shadow-blue-500/20"
            >
              সবগুলো কম্বো দেখুন
              <div className="bg-blue-100 dark:bg-white/10 p-2 rounded-xl group-hover:bg-white/20 transition-colors">
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {combos.map((combo, idx) => (
            <motion.div
              key={combo.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
              className="group relative bg-white dark:bg-[#0F172A] rounded-[48px] p-10 border border-gray-100 dark:border-white/5 hover:border-blue-500/30 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_70px_rgba(59,130,246,0.15)] overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute -bottom-20 -right-20 w-48 h-48 bg-blue-500/5 blur-[80px] rounded-full group-hover:bg-blue-500/10 transition-colors" />
              
              <div className="absolute top-10 right-10 bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-[10px] font-black px-5 py-2.5 rounded-full shadow-lg shadow-blue-500/30 z-10 uppercase tracking-widest">
                {combo.tag}
              </div>

              <div className="relative w-48 h-48 mx-auto mb-10">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-full blur-2xl group-hover:blur-3xl group-hover:scale-110 transition-all duration-700" />
                <img 
                  src={combo.image} 
                  alt={combo.name}
                  className="relative w-full h-full object-contain transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-700"
                />
              </div>

              <div className="space-y-8 text-center relative z-10">
                <div className="space-y-4">
                  <h3 className="text-3xl font-black text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors">{combo.name}</h3>
                  <div className="flex flex-wrap justify-center gap-2.5">
                    {combo.items.map((item, i) => (
                      <span key={i} className="text-[11px] font-black text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-100 dark:border-white/5 group-hover:border-blue-500/20 group-hover:bg-blue-50/50 dark:group-hover:bg-blue-500/10 transition-colors">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-8 border-t border-gray-50 dark:border-white/5">
                  <div className="text-left">
                    <div className="text-sm text-gray-400 line-through font-bold mb-1">৳{combo.oldPrice}</div>
                    <div className="text-4xl font-black text-gray-900 dark:text-white flex items-center gap-1">
                      <span className="text-lg">৳</span>{combo.price}
                    </div>
                  </div>
                  <button className="flex items-center gap-3 bg-gray-900 dark:bg-white text-white dark:text-black hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white px-8 py-5 rounded-[24px] font-black transition-all duration-500 shadow-xl hover:shadow-blue-500/30 active:scale-95 group/btn">
                    <ShoppingBag size={22} className="group-hover/btn:scale-110 transition-transform" />
                    কার্টে যোগ করুন
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
