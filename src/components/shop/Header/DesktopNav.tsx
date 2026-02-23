"use client";

import Link from "next/link";
import { LayoutGrid, ChevronDown, Flame, Percent, Star, Clock, Truck } from "lucide-react";
import CategoryMegaMenu from "./CategoryMegaMenu";
import { motion, AnimatePresence } from "framer-motion";
import { Category } from "@/types/category";
import { useLanguage } from "@/components/LanguageContext";

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
  const { t } = useLanguage();

  return (
    <div className="hidden lg:block border-t border-gray-100 dark:border-white/5 bg-white/80 dark:bg-black/80 backdrop-blur-md sticky top-[72px] z-40">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-8 h-16">
        <div className="flex items-center gap-8 h-full">
          {/* Mega Menu Toggle */}
          <div 
            className="relative h-full flex items-center"
            onMouseEnter={() => setIsCategoryMenuOpen(true)}
            onMouseLeave={() => setIsCategoryMenuOpen(false)}
          >
            <Link
              href="/categories"
              className="flex items-center gap-3 py-2.5 px-6 bg-gray-900 dark:bg-white text-white dark:text-black font-black text-sm transition-all rounded-full hover:shadow-lg hover:scale-105 active:scale-95 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <LayoutGrid className="w-5 h-5 relative z-10 group-hover:rotate-180 transition-transform duration-500" />
              <span className="relative z-10 uppercase tracking-wider">{t('all_categories')}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-500 relative z-10 ${
                  isCategoryMenuOpen ? "rotate-180" : ""
                }`}
              />
            </Link>

            {/* Category Dropdown/Mega Menu */}
            <AnimatePresence>
              {isCategoryMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-full left-0 pt-4 z-[100]"
                >
                  <CategoryMegaMenu
                    categories={categories}
                    onClose={() => setIsCategoryMenuOpen(false)}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-px h-8 bg-gray-200 dark:bg-white/10" />

          <nav className="flex items-center gap-1">
            {[
              { label: t('nav_offers'), href: '/products?filter=offers', icon: Percent, color: 'text-orange-500', badge: 'HOT' },
              { label: t('nav_deals'), href: '/products?filter=deals', icon: Flame, color: 'text-rose-500', badge: 'SALE' },
              { label: t('nav_new'), href: '/products?sort=newest', icon: Star, color: 'text-blue-500' },
              { label: t('nav_popular'), href: '/products?sort=popular', icon: Clock, color: 'text-emerald-500' },
              { label: 'অর্ডার ট্র্যাক', href: '/track-order', icon: Truck, color: 'text-purple-500' },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="group relative flex items-center gap-2 px-4 py-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
              >
                <item.icon size={18} className={`${item.color} group-hover:scale-110 transition-transform duration-300`} />
                <span className="text-sm font-bold text-gray-600 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {item.label}
                </span>
                {item.badge && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-rose-500 text-[8px] font-bold text-white items-center justify-center">
                      !
                    </span>
                  </span>
                )}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <Link 
            href="/products?sort=price_asc"
            className="flex items-center gap-2 px-5 py-2.5 bg-green-50 dark:bg-green-500/10 rounded-full border border-green-100 dark:border-green-500/20 hover:bg-green-100 dark:hover:bg-green-500/20 transition-colors group"
          >
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse group-hover:scale-150 transition-transform" />
            <span className="text-xs font-black text-green-700 dark:text-green-400 uppercase tracking-widest group-hover:text-green-800 dark:group-hover:text-green-300">
              {t('free_delivery_msg')}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
