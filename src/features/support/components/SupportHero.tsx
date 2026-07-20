"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import Image from "next/image";
import { getProductFallbackImage } from "@/constants/fallback-images";

export default function SupportHero() {
  return (
    <div className="relative rounded-2xl overflow-hidden mb-16 min-h-[400px] flex items-center justify-center text-center">
      <Image src={getProductFallbackImage("support")} alt="Customer Support" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 backdrop-blur-[2px]" />
      <div className="relative z-10 space-y-6 max-w-3xl px-6 py-12">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          className="w-20 h-20 bg-primary rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-primary mb-6">
          <Phone className="w-10 h-10 text-white" />
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black text-white tracking-tight">
          আমরা কিভাবে <span className="text-primary">আপনাকে সাহায্য</span> করতে পারি?
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-white/80 font-medium text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          আপনার যেকোনো জিজ্ঞাসা বা সমস্যার জন্য আমাদের সাথে যোগাযোগ করুন। আমরা ২৪/৭ আপনার সেবায় নিয়োজিত।
        </motion.p>
      </div>
    </div>
  );
}
