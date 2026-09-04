"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Play,
  RotateCw,
  X,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Product } from "@/types/product";
import { getProductFallbackImage } from "@/constants/fallback-images";

interface ProductImageProps {
  image?: string;
  name: string;
  id: string;
  product?: Product;
}

type ViewMode = "image" | "video" | "360";

export default function ProductImage({
  image,
  name,
  id,
  product,
}: ProductImageProps) {
  const { t } = useLanguage();

  const productName = product?.name || name;
  const primaryImage =
    image || getProductFallbackImage(productName);

  const images = product?.images?.length
    ? product.images
    : [primaryImage];
  const videoUrl = product?.video;
  const view360Images = product?.view360 || [];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({
    x: 0,
    y: 0,
  });
  const [viewMode, setViewMode] =
    useState<ViewMode>("image");
  const [isFullscreen, setIsFullscreen] =
    useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number } | null>(
    null
  );

  const discountPercent =
    product?.discount ||
    (product?.discountPrice
      ? Math.round(
          ((product.price - product.discountPrice) /
            product.price) *
            100
        )
      : 0);

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    if (viewMode !== "image") return;
    const {
      left,
      top,
      width,
      height,
    } = e.currentTarget.getBoundingClientRect();
    const x =
      ((e.clientX - left) / width) * 100;
    const y =
      ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handle360MouseDown = (
    e: React.MouseEvent
  ) => {
    if (viewMode !== "360") return;
    setIsDragging(true);
    dragStartRef.current = { x: e.clientX };
  };

  const handle360MouseMove = (
    e: React.MouseEvent
  ) => {
    if (
      !isDragging ||
      !dragStartRef.current ||
      viewMode !== "360"
    )
      return;
    const diff =
      e.clientX - dragStartRef.current.x;
    setDragOffset((prev) => prev + diff);
    dragStartRef.current = { x: e.clientX };
  };

  const handle360MouseUp = () => {
    setIsDragging(false);
    dragStartRef.current = null;
  };

  return (
    <div className="w-full lg:w-1/2 space-y-5">
      {/* View Mode Tabs */}
      <div className="flex gap-1.5 p-1 bg-muted rounded-xl w-fit">
        <button
          onClick={() => setViewMode("image")}
          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 ${
            viewMode === "image"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Photos
        </button>
        {videoUrl && (
          <button
            onClick={() => setViewMode("video")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              viewMode === "video"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Play className="w-3 h-3" /> Video
          </button>
        )}
        {view360Images.length > 0 && (
          <button
            onClick={() => setViewMode("360")}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
              viewMode === "360"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <RotateCw className="w-3 h-3" /> 360°
          </button>
        )}
      </div>

      {/* Main Image */}
      <div
        className="relative bg-subtle rounded-2xl overflow-hidden border border-border aspect-square group cursor-zoom-in"
        onMouseEnter={() =>
          viewMode === "image" && setIsZoomed(true)
        }
        onMouseLeave={() => {
          setIsZoomed(false);
          handle360MouseUp();
        }}
        onMouseMove={
          viewMode === "image"
            ? handleMouseMove
            : handle360MouseMove
        }
        onMouseDown={handle360MouseDown}
        onMouseUp={handle360MouseUp}
      >
        {/* Discount badge */}
        {discountPercent > 0 &&
          viewMode === "image" && (
            <div className="absolute top-4 left-4 z-10">
              <span className="inline-flex items-center rounded-lg bg-rose-500 px-3 py-1.5 text-[11px] font-bold text-white shadow-[0_2px_12px_rgba(244,63,94,0.35)]">
                -{discountPercent}%
              </span>
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
                src={
                  view360Images[
                    Math.abs(
                      Math.round(dragOffset / 100)
                    ) % view360Images.length
                  ]
                }
                alt={`${name} 360° view`}
                fill
                className="object-contain p-8 pointer-events-none"
                draggable={false}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-card/80 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-semibold text-muted-foreground flex items-center gap-2 border border-border">
                <RotateCw className="w-3.5 h-3.5" />
                Drag to rotate 360°
              </div>
            </motion.div>
          ) : (
            <motion.div
              key={`image-${activeIndex}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{
                duration: 0.4,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="w-full h-full"
            >
              <Image
                src={images[activeIndex]}
                alt={name}
                fill
                priority
                className={`object-contain p-8 transition-transform duration-500 ease-out ${
                  isZoomed
                    ? "scale-[1.5]"
                    : "scale-100"
                }`}
                style={
                  isZoomed
                    ? {
                        transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                      }
                    : {}
                }
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Zoom indicator */}
        {viewMode === "image" && (
          <div className="absolute top-4 right-4 p-2.5 bg-card/80 backdrop-blur-md rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-border">
            <Maximize2 className="w-4 h-4 text-muted-foreground" />
          </div>
        )}

        {/* Navigation arrows */}
        {viewMode === "image" &&
          images.length > 1 && (
            <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((prev) =>
                    prev === 0
                      ? images.length - 1
                      : prev - 1
                  );
                }}
                className="p-2.5 bg-card/80 backdrop-blur-md rounded-xl shadow-md pointer-events-auto opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-3 group-hover:translate-x-0 border border-border"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveIndex((prev) =>
                    prev === images.length - 1
                      ? 0
                      : prev + 1
                  );
                }}
                className="p-2.5 bg-card/80 backdrop-blur-md rounded-xl shadow-md pointer-events-auto opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-3 group-hover:translate-x-0 border border-border"
              >
                <ChevronRight className="w-5 h-5 text-foreground" />
              </button>
            </div>
          )}
      </div>

      {/* Thumbnail slider */}
      {viewMode === "image" && images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative w-20 aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 shrink-0 ${
                activeIndex === idx
                  ? "border-foreground shadow-lg"
                  : "border-transparent opacity-50 hover:opacity-100 hover:border-border-strong"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} ${t("thumbnail")} ${idx + 1}`}
                fill
                sizes="80px"
                className="object-cover p-1.5"
              />
            </button>
          ))}
        </div>
      )}

      {/* Fullscreen modal */}
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
              className="absolute top-4 right-4 p-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-all z-10"
            >
              <X className="w-6 h-6" />
            </button>
            <motion.div
              key={activeIndex}
              initial={{ scale: 0.9, opacity: 0 }}
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
