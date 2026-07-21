"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, Play, RotateCw, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Product } from "@/types/product";
import { getProductFallbackImage } from "@/constants/fallback-images";
import { Badge } from "@/components/ui";

interface ProductImageProps {
  image?: string;
  name: string;
  id: string;
  product?: Product;
}

type ViewMode = "image" | "video" | "360";

export default function ProductImage({ image, name, id, product }: ProductImageProps) {
  const { t } = useLanguage();

  const productName = product?.name || name;
  const primaryImage = image || getProductFallbackImage(productName);

  const images = product?.images?.length ? product.images : [primaryImage];
  const videoUrl = product?.video;
  const view360Images = product?.view360 || [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [viewMode, setViewMode] = useState<ViewMode>("image");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number } | null>(null);

  const discountPercent = product?.discount || (product?.discountPrice ? Math.round(((product.price - product.discountPrice) / product.price) * 100) : 0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (viewMode !== "image") return;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handle360MouseDown = (e: React.MouseEvent) => {
    if (viewMode !== "360") return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX };
  };

  const handle360MouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !dragStartRef.current || viewMode !== "360") return;
    const diff = e.clientX - dragStartRef.current.x;
    setDragOffset((prev) => prev + diff);
    dragStartRef.current = { x: e.clientX };
  };

  const handle360MouseUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  return (
    <div className="w-full lg:w-1/2 space-y-6">
      {/* View Mode Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setViewMode("image")}
          className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
            viewMode === "image" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
          }`}
        >
          Photos
        </button>
        {videoUrl && (
          <button
            onClick={() => setViewMode("video")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              viewMode === "video" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            <Play className="w-3 h-3 inline mr-1" /> Video
          </button>
        )}
        {view360Images.length > 0 && (
          <button
            onClick={() => setViewMode("360")}
            className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
              viewMode === "360" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
            }`}
          >
            <RotateCw className="w-3 h-3 inline mr-1" /> 360°
          </button>
        )}
      </div>

      <div
        className="relative bg-card rounded-2xl overflow-hidden border border-border shadow-lg aspect-square group cursor-zoom-in"
        onMouseEnter={() => viewMode === "image" && setIsZoomed(true)}
        onMouseLeave={() => { setIsZoomed(false); handle360MouseUp(); }}
        onMouseMove={viewMode === "image" ? handleMouseMove : handle360MouseMove}
        onMouseDown={handle360MouseDown}
        onMouseUp={handle360MouseUp}
      >
        {discountPercent > 0 && viewMode === "image" && (
          <div className="absolute top-6 left-6 z-10">
            <Badge tone="warning" size="lg" className="font-black animate-bounce-slow">
              {discountPercent.toLocaleString('bn-BD')}% {t('off')}
            </Badge>
          </div>
        )}

        <AnimatePresence mode="wait">
          {viewMode === "video" && videoUrl ? (
            <motion.div
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full"
            >
              <video
                src={videoUrl}
                controls
                className="w-full h-full object-contain"
                autoPlay
                muted
                loop
              />
            </motion.div>
          ) : viewMode === "360" ? (
            <motion.div
              key="360"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none"
            >
              <Image
                src={view360Images[Math.abs(Math.round(dragOffset / 100)) % view360Images.length]}
                alt={`${name} 360° view`}
                fill
                className="object-contain p-8 pointer-events-none"
                draggable={false}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/80 backdrop-blur-sm px-4 py-2 rounded-full text-xs font-bold text-muted-foreground flex items-center gap-2">
                <RotateCw className="w-3 h-3" />
                Drag to rotate 360°
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`image-${activeIndex}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full h-full"
            >
              <Image
                src={images[activeIndex]}
                alt={name}
                fill
                priority
                className={`object-contain p-8 transition-transform duration-500 ease-out ${isZoomed ? 'scale-150' : 'scale-100'}`}
                style={isZoomed ? {
                  transformOrigin: `${mousePos.x}% ${mousePos.y}%`
                } : {}}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {viewMode === "image" && (
          <div className="absolute top-4 right-4 p-3 bg-card backdrop-blur-md rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
            <Maximize2 className="w-5 h-5 text-muted-foreground" />
          </div>
        )}

        {viewMode === "image" && images.length > 1 && (
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
              }}
              className="p-3 bg-card backdrop-blur-md rounded-2xl shadow-lg pointer-events-auto opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-4 group-hover:translate-x-0"
            >
              <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
              }}
              className="p-3 bg-card backdrop-blur-md rounded-2xl shadow-lg pointer-events-auto opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0"
            >
              <ChevronRight className="w-6 h-6 text-foreground" />
            </button>
          </div>
        )}
      </div>

      {viewMode === "image" && images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-24 aspect-square rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                activeIndex === idx
                  ? 'border-primary scale-95 shadow-lg shadow-primary'
                  : 'border-border opacity-60 hover:opacity-100'
              }`}
            >
              <Image
                src={img}
                alt={`${productName} ${t('thumbnail')} ${(idx + 1).toLocaleString('bn-BD')}`}
                fill
                sizes="96px"
                className="object-cover p-2"
              />
            </button>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setIsFullscreen(false)}
          >
            <button
              onClick={() => setIsFullscreen(false)}
              className="absolute top-4 right-4 p-3 bg-white/10 rounded-full text-white hover:bg-white/20 transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              key={activeIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-3xl aspect-square"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[activeIndex]}
                alt={name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 75vw"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
