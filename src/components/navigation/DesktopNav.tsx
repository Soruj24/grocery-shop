"use client";

import Link from "next/link";
import {
  LayoutGrid,
  ChevronDown,
  Flame,
  Percent,
  Star,
  Clock,
  Truck,
} from "lucide-react";
import CategoryMegaMenu from "./CategoryMegaMenu";
import { motion, AnimatePresence } from "framer-motion";
import { Category } from "@/types/category";
import { useLanguage } from "@/contexts/LanguageContext";

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

    const navLinks = [
    {
      label: t("nav_offers"),
      href: "/products?filter=offers",
      icon: Percent,
      color: "text-warning",
    },
    {
      label: t("nav_deals"),
      href: "/products?filter=deals",
      icon: Flame,
      color: "text-danger",
    },
    {
      label: t("nav_new"),
      href: "/products?sort=newest",
      icon: Star,
      color: "text-info",
    },
    {
      label: t("nav_popular"),
      href: "/products?sort=popular",
      icon: Clock,
      color: "text-success",
    },
    {
      label: t("track_order") ?? "অর্ডার ট্র্যাক",
      href: "/track-order",
      icon: Truck,
      color: "text-muted-foreground",
    },
  ];

  return (
    <div className="hidden lg:block bg-card/60 backdrop-blur-md sticky top-[33px] z-40">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 flex items-center justify-between gap-6 h-11">
        <div className="flex items-center gap-5 h-full">
          <div
            className="relative h-full flex items-center"
            onMouseEnter={() =>
              setIsCategoryMenuOpen(true)
            }
            onMouseLeave={() =>
              setIsCategoryMenuOpen(false)
            }
          >
            <Link
              href="/categories"
              className="flex items-center gap-2 py-1.5 px-4 bg-foreground text-background font-semibold text-xs transition-all duration-300 rounded-lg hover:opacity-90 active:scale-[0.98] group"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span className="uppercase tracking-wider">
                {t("all_categories")}
              </span>
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-300 ${
                  isCategoryMenuOpen
                    ? "rotate-180"
                    : ""
                }`}
              />
            </Link>

            <AnimatePresence>
              {isCategoryMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{
                    duration: 0.15,
                    ease: [
                      0.21, 0.47, 0.32, 0.98,
                    ],
                  }}
                  className="absolute top-full left-0 pt-3 z-[100]"
                >
                  <CategoryMegaMenu
                    categories={categories}
                    onClose={() =>
                      setIsCategoryMenuOpen(false)
                    }
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="w-px h-4 bg-border" />

          <nav className="flex items-center gap-0.5">
            {navLinks.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-muted transition-colors duration-200"
              >
                <item.icon
                  size={13}
                  className={item.color}
                />
                <span className="text-xs font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                  {item.label}
                </span>
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/products?sort=price_asc"
            className="flex items-center gap-2 px-3 py-1.5 bg-muted text-muted-foreground rounded-lg border border-border hover:border-border-strong transition-colors duration-200 text-xs font-medium"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t("free_delivery_msg")}
          </Link>
        </div>
      </div>
    </div>
  );
}
