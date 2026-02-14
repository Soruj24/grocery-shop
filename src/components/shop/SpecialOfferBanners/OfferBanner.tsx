"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface OfferBannerProps {
  badge: string;
  title: string;
  desc: string;
  buttonText: string;
  image: string;
  gradient: string;
  shadow: string;
  textColor: string;
  buttonTextColor: string;
  rotate?: string;
}

export default function OfferBanner({
  badge,
  title,
  desc,
  buttonText,
  image,
  gradient,
  shadow,
  textColor,
  buttonTextColor,
  rotate = "-rotate-6"
}: OfferBannerProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className={`group relative ${gradient} rounded-[60px] p-12 overflow-hidden flex flex-col justify-center min-h-[450px] shadow-2xl ${shadow} transition-all duration-500`}
    >
      {/* Decorative Overlays */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-l from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 text-white max-w-lg space-y-6">
        <motion.span 
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/20 backdrop-blur-xl border border-white/20 px-6 py-2 rounded-full text-xs font-black uppercase tracking-[0.2em] mb-4 inline-block"
        >
          {badge}
        </motion.span>
        
        <motion.h3 
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-6xl font-black mb-4 leading-[1.1] tracking-tight"
        >
          {title}
        </motion.h3>
        
        <motion.p 
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/80 text-xl mb-8 font-medium leading-relaxed"
        >
          {desc}
        </motion.p>
        
        <motion.button 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`bg-white ${buttonTextColor} hover:pr-12 px-10 py-5 rounded-3xl font-black text-lg transition-all shadow-2xl active:scale-95 flex items-center gap-3 relative overflow-hidden group/btn`}
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-5 h-5 absolute right-4 opacity-0 group-hover/btn:opacity-100 transition-all" />
        </motion.button>
      </div>

      {/* Product Image */}
      <motion.img
        initial={{ scale: 0.8, opacity: 0, rotate: 10 }}
        whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
        src={image}
        className={`absolute right-[-10%] md:right-[-5%] top-1/2 -translate-y-1/2 h-[120%] w-1/2 object-contain group-hover:scale-110 group-hover:${rotate} transition-transform duration-700 pointer-events-none drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]`}
        alt={title}
      />
    </motion.div>
  );
}
