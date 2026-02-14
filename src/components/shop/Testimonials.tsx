"use client";

import { motion } from "framer-motion";
import { Star, Quote, User } from "lucide-react";

const TESTIMONIALS = [
  {
    id: 1,
    content: "আমি গত ৩ মাস ধরে এই দোকান থেকে বাজার করছি। পণ্যের মান সবসময়ই সেরা থাকে। বিশেষ করে তাদের দ্রুত ডেলিভারি সার্ভিস আমাকে মুগ্ধ করেছে। ঢাকার মধ্যে এতো দ্রুত ডেলিভারি আর কোথাও পাইনি।",
    author: "সাকিব আহমেদ",
    role: "রেগুলার কাস্টমার",
    rating: 5,
    size: "large",
    color: "bg-green-500"
  },
  {
    id: 2,
    content: "অর্গানিক ফলের খোঁজে অনেক ঘুরেছি, শেষ পর্যন্ত এখানেই ভরসা পেলাম। ফ্রেশ এবং সুস্বাদু!",
    author: "মারুফ হাসান",
    role: "ফল প্রেমী",
    rating: 5,
    size: "small",
    color: "bg-orange-500"
  },
  {
    id: 3,
    content: "প্যাকিং কোয়ালিটি খুবই উন্নত। কোনো পণ্যই নষ্ট হওয়ার ভয় থাকে না।",
    author: "রাহুল দাশ",
    role: "চাকুরীজীবী",
    rating: 4,
    size: "small",
    color: "bg-blue-500"
  },
  {
    id: 4,
    content: "কাস্টমার সাপোর্ট অনেক হেল্পফুল। যেকোনো সমস্যার দ্রুত সমাধান দেন তারা। তাদের ব্যবহারের জন্য আমি বার বার ফিরে আসি।",
    author: "আনিসা রহমান",
    role: "গৃহিণী",
    rating: 5,
    size: "medium",
    color: "bg-purple-500"
  },
  {
    id: 5,
    content: "দাম অনুযায়ী পণ্যের মান অনেক ভালো। বাজারের থেকে সাশ্রয়ী মনে হয়েছে।",
    author: "তানভীর হোসেন",
    role: "স্টুডেন্ট",
    rating: 5,
    size: "small",
    color: "bg-emerald-500"
  }
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 blur-[120px] rounded-full -mr-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 blur-[120px] rounded-full -ml-64 -mb-64 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 rounded-full text-xs font-black uppercase tracking-[0.2em]"
          >
            <Quote size={14} className="animate-pulse" />
            কাস্টমার ফিডব্যাক
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight"
          >
            আমাদের প্রিয় <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">কাস্টমাররা যা বলেন</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px]">
          {TESTIMONIALS.map((testimonial, idx) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative p-8 rounded-[40px] border border-gray-100 dark:border-white/5 bg-white dark:bg-[#0F172A] shadow-sm hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 transition-all duration-500 flex flex-col justify-between group ${
                testimonial.size === "large" ? "md:col-span-2 md:row-span-2" : 
                testimonial.size === "medium" ? "md:row-span-2" : ""
              }`}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={16} 
                        className={`${i < testimonial.rating ? "text-orange-400 fill-orange-400" : "text-gray-200 dark:text-white/10"}`} 
                      />
                    ))}
                  </div>
                  <Quote size={40} className="text-gray-100 dark:text-white/5 absolute top-8 right-8" />
                </div>
                <p className={`text-gray-600 dark:text-gray-300 font-medium leading-relaxed ${testimonial.size === "large" ? "text-xl" : "text-base"}`}>
                  &ldquo;{testimonial.content}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-4 pt-6 border-t border-gray-50 dark:border-white/5">
                <div className={`w-12 h-12 rounded-2xl ${testimonial.color} flex items-center justify-center text-white shadow-lg`}>
                  <User size={24} />
                </div>
                <div>
                  <h4 className="font-black text-gray-900 dark:text-white">{testimonial.author}</h4>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
