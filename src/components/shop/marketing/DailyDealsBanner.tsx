"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Timer, Zap, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function DailyDealsBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-orange-600 to-rose-600 rounded-[40px] p-8 md:p-12 text-white">
      {/* Animated Background Elements */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full -mr-32 -mt-32" 
      />
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="space-y-8 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
            <Zap className="w-4 h-4 text-yellow-300 fill-yellow-300" />
            <span className="text-xs font-black uppercase tracking-widest">ফ্ল্যাশ ডিল - শুধুমাত্র আজকের জন্য</span>
          </div>

          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black leading-tight tracking-tighter">
              সেরা বাজার <br /> 
              <span className="text-yellow-300">অর্ধেক দামে!</span>
            </h2>
            <p className="text-white/80 text-lg font-medium max-w-md">
              প্রতিদিন নতুন নতুন গ্রোসারি আইটেমে পাচ্ছেন ৫০% পর্যন্ত ডিসকাউন্ট। সময় শেষ হওয়ার আগেই লুফে নিন।
            </p>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            {[
              { label: "ঘণ্টা", value: timeLeft.hours },
              { label: "মিনিট", value: timeLeft.minutes },
              { label: "সেকেন্ড", value: timeLeft.seconds }
            ].map((unit, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className="bg-white text-gray-900 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-black shadow-xl">
                  {String(unit.value).padStart(2, '0')}
                </div>
                <span className="text-[10px] font-black uppercase tracking-widest mt-2 text-white/60">{unit.label}</span>
              </div>
            ))}
          </div>

          <button className="group bg-white text-rose-600 px-8 py-4 rounded-2xl font-black text-lg flex items-center gap-3 hover:bg-yellow-300 hover:text-gray-900 transition-all shadow-2xl active:scale-95">
            অফার দেখুন
            <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        <div className="relative w-full max-w-md aspect-square">
          <motion.div 
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10 w-full h-full"
          >
            {/* Mock Product Image */}
            <div className="bg-white/10 backdrop-blur-2xl rounded-[60px] w-full h-full border border-white/20 p-8 flex items-center justify-center overflow-hidden">
               <div className="relative w-full h-full flex flex-col items-center justify-center gap-4">
                  <div className="w-48 h-48 bg-white/20 rounded-full blur-2xl absolute" />
                  <span className="text-9xl">🍎</span>
                  <div className="text-center">
                    <div className="text-3xl font-black">তাজা আপেল</div>
                    <div className="text-yellow-300 font-black text-xl">৳৮০ <span className="text-white/50 line-through text-sm font-bold">৳১৬০</span></div>
                  </div>
               </div>
            </div>
          </motion.div>
          
          {/* Floating Badge */}
          <motion.div 
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute -top-6 -right-6 bg-yellow-300 text-gray-900 w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-2xl z-20 border-4 border-rose-500"
          >
            <span className="text-[10px] font-black uppercase">সর্বোচ্চ</span>
            <span className="text-2xl font-black">৫০%</span>
            <span className="text-[10px] font-black uppercase">ছাড়</span>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
