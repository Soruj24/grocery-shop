"use client";

import Link from "next/link";
import { PhoneCall, Star, MapPin } from "lucide-react";
import LocationSelector from "./LocationSelector";

export default function TopBar() {
  return (
    <div className="bg-green-700 dark:bg-[#020617] text-white py-2 px-4 hidden md:block border-b border-white/5 transition-colors">
      <div className="max-w-7xl mx-auto flex justify-between items-center text-[11px] font-black uppercase tracking-[0.2em]">
        <div className="flex items-center gap-8">
          <LocationSelector />
          <div className="flex items-center gap-3 group cursor-default">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400"></span>
            </span>
            <span className="text-green-50/90 dark:text-gray-400">একদম টাটকা ও অর্গানিক গ্রোসারি</span>
          </div>
          <div className="flex items-center gap-3 group cursor-pointer hover:text-green-300 transition-colors">
            <PhoneCall className="w-3.5 h-3.5" />
            <span className="text-green-50/90 dark:text-gray-400">হেল্পলাইন: +৮৮০ ১২৩৪-৫৬৭৮৯০</span>
          </div>
        </div>
        <div className="flex items-center gap-8">
          <Link href="/support" className="hover:text-green-300 transition-colors flex items-center gap-2">
            অর্ডার ট্র্যাক করুন
          </Link>
          <Link href="/offers" className="flex items-center gap-2 bg-yellow-400 text-black px-4 py-1 rounded-full hover:bg-yellow-500 transition-all group shadow-lg shadow-yellow-400/20">
            <Star className="w-3.5 h-3.5 fill-current animate-spin-slow" />
            স্পেশাল অফার
          </Link>
        </div>
      </div>
    </div>
  );
}
