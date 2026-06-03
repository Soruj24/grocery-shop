"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Leaf, ArrowRight } from "lucide-react";
import { getProductFallbackImage } from "@/lib/category-utils";

interface HeroSideBannerProps {
  href: string;
  imageKey: string;
  badge: string;
  badgeColor: string;
  icon: "clock" | "leaf";
  iconLabel: string;
  titleLine1: string;
  titleLine2: string;
  subtitlePrefix: string;
  priceText: string;
  priceColor: string;
  hoverTextColor: string;
}

export default function HeroSideBanner({ href, imageKey, badge, badgeColor, icon, iconLabel, titleLine1, titleLine2, subtitlePrefix, priceText, priceColor, hoverTextColor }: HeroSideBannerProps) {
  return (
    <Link href={href} className="relative flex-1 rounded-[40px] overflow-hidden group cursor-pointer ring-1 ring-gray-100 dark:ring-white/10 shadow-lg shadow-gray-200/50 dark:shadow-black/30 block">
      <Image src={getProductFallbackImage(imageKey)} alt={titleLine1} fill sizes="(max-width: 1280px) 33vw, 25vw"
        className="object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
      <div className="absolute bottom-0 left-0 p-8 text-white w-full translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
        <div className="flex items-center gap-2 mb-3">
          <div className={`${badgeColor} text-white text-[10px] font-black uppercase tracking-widest py-1 px-3 rounded-lg w-fit shadow-lg shadow-orange-500/30`}>{badge}</div>
          <div className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest py-1 px-2 rounded-lg">
            {icon === "clock" ? <Clock className="w-3 h-3 inline mr-1" /> : <Leaf className="w-3 h-3 inline mr-1" />}
            {iconLabel}
          </div>
        </div>
        <h3 className={`text-2xl font-black mb-1 leading-tight transition-colors ${hoverTextColor}`}>
          {titleLine1} <br /> {titleLine2}
        </h3>
        <div className="flex items-center justify-between mt-4 border-t border-white/10 pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-gray-300 uppercase tracking-wider font-bold">{subtitlePrefix}</span>
            <span className={`text-3xl font-black ${priceColor}`}>{priceText}</span>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:bg-white group-hover:text-black transition-all hover:scale-110 active:scale-95 shadow-lg">
            <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </Link>
  );
}
