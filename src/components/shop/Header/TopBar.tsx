"use client";

import Link from "next/link";
import { PhoneCall, Star } from "lucide-react";
import LocationSelector from "./LocationSelector";
import { useLanguage } from "@/components/LanguageContext";

export default function TopBar() {
  const { t } = useLanguage();
  return (
    <div className="bg-[#0B1120] text-gray-400 py-2.5 px-4 hidden md:block border-b border-white/5 transition-colors relative z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-[10px] font-bold uppercase tracking-widest">
        <div className="flex items-center gap-6">
          <LocationSelector />
          <div className="w-px h-3 bg-white/10" />
          <div className="flex items-center gap-2 group cursor-default">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500"></span>
            </span>
            <span className="group-hover:text-white transition-colors">{t('fresh_organic')}</span>
          </div>
          <div className="flex items-center gap-2 group cursor-pointer hover:text-white transition-colors">
            <PhoneCall className="w-3 h-3 text-green-500" />
            <span>{t('helpline')}: <span className="text-white">{t('helpline_number')}</span></span>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/track-order" className="hover:text-white transition-colors flex items-center gap-2">
            {t('track_order')}
          </Link>
          <div className="w-px h-3 bg-white/10" />
          <Link href="/products?filter=offers" className="flex items-center gap-2 text-yellow-500 hover:text-yellow-400 transition-all group">
            <Star className="w-3 h-3 fill-current group-hover:rotate-180 transition-transform duration-500" />
            {t('special_offers')}
          </Link>
        </div>
      </div>
    </div>
  );
}
