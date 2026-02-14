"use client";

import Link from "next/link";

export default function FooterBottom() {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="mt-24 pt-12 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
      <p className="text-sm font-bold text-gray-400 dark:text-gray-500">
        © {currentYear} <span className="text-gray-900 dark:text-white font-black">EMRAN SHOP</span>. সর্বস্বত্ব সংরক্ষিত।
      </p>
      <div className="flex items-center gap-8">
        <Link href="/terms" className="text-sm font-bold text-gray-400 dark:text-gray-500 hover:text-green-600 transition-colors">শর্তাবলী</Link>
        <Link href="/privacy" className="text-sm font-bold text-gray-400 dark:text-gray-500 hover:text-green-600 transition-colors">প্রাইভেসি</Link>
        <Link href="/cookies" className="text-sm font-bold text-gray-400 dark:text-gray-500 hover:text-green-600 transition-colors">কুকিজ</Link>
      </div>
    </div>
  );
}
