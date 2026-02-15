"use client";

import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";

interface ProductImageProps {
  image?: string;
  name: string;
  id: string;
}

export default function ProductImage({ image, name, id }: ProductImageProps) {
  const { t } = useLanguage();
  // Mocking multiple images for the gallery
  const images = [
    image || `https://picsum.photos/seed/${id}/800/800`,
    `https://picsum.photos/seed/${id}-2/800/800`,
    `https://picsum.photos/seed/${id}-3/800/800`,
    `https://picsum.photos/seed/${id}-4/800/800`,
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  return (
    <div className="w-full lg:w-1/2 space-y-6">
      {/* Main Image with Zoom */}
      <div 
        className="relative bg-white dark:bg-gray-900 rounded-[32px] overflow-hidden border border-gray-100 dark:border-gray-800 shadow-xl aspect-square group cursor-zoom-in"
        onMouseEnter={() => setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            <Image
              src={images[activeIndex]}
              alt={name}
              fill
              priority
              className={`object-contain p-8 transition-transform duration-200 ${isZoomed ? 'scale-150' : 'scale-100'}`}
              style={isZoomed ? {
                transformOrigin: `${mousePos.x}% ${mousePos.y}%`
              } : {}}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Zoom Icon Overlay */}
        <div className="absolute top-4 right-4 p-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
          <Maximize2 className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </div>

        {/* Navigation Arrows */}
        <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
            }}
            className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl pointer-events-auto opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
            }}
            className="p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-2xl shadow-xl pointer-events-auto opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`relative w-24 aspect-square rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
              activeIndex === idx 
                ? 'border-green-500 scale-95 shadow-lg shadow-green-500/20' 
                : 'border-gray-100 dark:border-gray-800 opacity-60 hover:opacity-100'
            }`}
          >
            <Image
              src={img}
              alt={`${name} ${t('thumbnail')} ${idx + 1}`}
              fill
              className="object-cover p-2"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
