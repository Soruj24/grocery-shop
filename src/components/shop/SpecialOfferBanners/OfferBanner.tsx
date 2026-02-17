"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

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
      className={`group relative ${gradient} rounded-32px p-8 md:p-12 overflow-hidden flex flex-col justify-center min-h-[350px] md:min-h-[450px] shadow-2xl ${shadow} transition-all duration-500`}
    >
      {/* Decorative Overlays */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      
      {/* Content */}
      <div className="relative z-10 text-white max-w-lg space-y-4 md:space-y-6">
        <motion.span 
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-xl border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-2 inline-block"
        >
          {badge}
        </motion.span>
        
        <motion.h3 
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl md:text-5xl font-black mb-2 leading-[1.1] tracking-tight"
        >
          {title}
        </motion.h3>
        
        <motion.p 
          initial={{ x: -20, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-white/80 text-base md:text-lg mb-6 font-medium leading-relaxed max-w-[250px] md:max-w-md"
        >
          {desc}
        </motion.p>
        
        <motion.button 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className={`bg-white ${buttonTextColor} min-h-[56px] min-w-[160px] hover:pr-12 px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3 relative overflow-hidden group/btn`}
        >
          <span>{buttonText}</span>
          <ArrowRight className="w-4 h-4 absolute right-4 opacity-0 group-hover/btn:opacity-100 transition-all" />
        </motion.button>
      </div>

      {/* Product Image */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
        whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ delay: 0.3, duration: 0.8, type: "spring" }}
        className={`absolute right-[-5%] bottom-[-10%] md:bottom-auto md:top-1/2 md:-translate-y-1/2 h-[60%] md:h-[90%] w-1/2 pointer-events-none drop-shadow-2xl`}
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 50vw, 33vw"
          className="object-contain group-hover:scale-105 transition-transform duration-700"
        />
      </motion.div>
    </motion.div>
  );
}
