"use client";

import Link from "next/link";
import { LayoutGrid, ChevronDown, Flame, Percent, Star, Clock } from "lucide-react";
import CategoryMegaMenu from "./CategoryMegaMenu";
import { motion, AnimatePresence } from "framer-motion";
import { Category } from "@/types/category";

interface DesktopNavProps {
  categories: Category[];
  isCategoryMenuOpen: boolean;
  setIsCategoryMenuOpen: (open: boolean) => void;
}

export default function DesktopNav({
  categories,
  isCategoryMenuOpen,
  setIsCategoryMenuOpen,
}: DesktopNavProps) {
  return (
    <div className="hidden lg:block border-t border-gray-100 dark:border-white/5 bg-white/80 dark:bg-black/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-8">
        <div className="flex items-center gap-8">
          {/* Mega Menu Toggle */}
          <div 
            className="relative"
            onMouseEnter={() => setIsCategoryMenuOpen(true)}
            onMouseLeave={() => setIsCategoryMenuOpen(false)}
          >
            <Link
              href="/categories"
              className="flex items-center gap-3 py-4 px-6 bg-green-600 hover:bg-green-700 text-white font-black text-sm transition-all rounded-b-2xl shadow-lg shadow-green-600/20 group"
            >
              <LayoutGrid className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
              সব ক্যাটাগরি
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-500 ${
                  isCategoryMenuOpen ? "rotate-180" : ""
                }`}
              />
            </Link>

            {/* Category Dropdown/Mega Menu */}
            <AnimatePresence>
              {isCategoryMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 z-[100]"
                >
                  <CategoryMegaMenu
                    categories={categories}
                    onClose={() => setIsCategoryMenuOpen(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <nav className="flex items-center gap-2">
            {[
              { label: 'অফার জোন', href: '/products?filter=offers', icon: Percent, color: 'text-orange-500 bg-orange-500/10' },
              { label: 'সেরা ডিল', href: '/products?filter=deals', icon: Flame, color: 'text-rose-500 bg-rose-500/10' },
              { label: 'নতুন পণ্য', href: '/products?sort=newest', icon: Star, color: 'text-blue-500 bg-blue-500/10' },
              { label: 'জনপ্রিয়', href: '/products?sort=popular', icon: Clock, color: 'text-emerald-500 bg-emerald-500/10' },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="group flex items-center gap-2 px-4 py-2 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-all"
              >
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${item.color}`}>
                  <item.icon size={16} />
                </div>
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-green-600 transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 text-xs font-black text-gray-400 uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            ফ্রি ডেলিভারি ৳৫০০+ অর্ডারে
          </div>
        </div>
      </div>
    </div>
  );
}
