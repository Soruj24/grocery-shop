"use client";

import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

export default function FooterLogo() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col">
        <span className="text-3xl font-black tracking-tighter text-gray-900 dark:text-white leading-none">
          EMRAN<span className="text-green-600 dark:text-green-500">SHOP</span>
        </span>
        <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mt-2">Premium Grocery</span>
      </div>
      <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-bold text-sm">
        আপনার নিত্যপ্রয়োজনীয় সকল মুদি পণ্য এখন এক জায়গাতেই। আমরা দিচ্ছি সেরা মানের নিশ্চয়তা এবং দ্রুততম ডেলিভারি।
      </p>
      <div className="flex gap-4">
        {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
          <a 
            key={i}
            href="#" 
            className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-[18px] flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-green-600 hover:text-white transition-all duration-500 group border border-transparent hover:border-green-400/20"
          >
            <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </a>
        ))}
      </div>
    </div>
  );
}
