"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShoppingBasket,
  ShoppingBag,
  Heart,
  LayoutGrid,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileNavLinksProps {
  onClose: () => void;
  totalWishlistItems: number;
}

const navItems = [
  {
    labelKey: "home_page" as const,
    href: "/",
    icon: ShoppingBasket,
  },
  {
    labelKey: "all_products" as const,
    href: "/products",
    icon: ShoppingBag,
  },
  {
    labelKey: "wishlist" as const,
    href: "/wishlist",
    icon: Heart,
    badge: true,
  },
  {
    labelKey: "offers" as const,
    href: "/products?filter=deals",
    icon: LayoutGrid,
  },
];

export default function MobileNavLinks({
  onClose,
  totalWishlistItems,
}: MobileNavLinksProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <p className="text-[10px] font-bold text-muted-foreground/60 uppercase tracking-[0.2em]">
        {t("navigation")}
      </p>
      <div className="space-y-1.5">
        {navItems.map((item, idx) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.1 + idx * 0.05,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
          >
            <Link
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between p-4 rounded-xl text-foreground hover:bg-black/[0.04] dark:hover:bg-white/[0.06] transition-all duration-200 group border border-transparent hover:border-black/[0.04] dark:hover:border-white/[0.04]"
              aria-label={t(item.labelKey)}
            >
              <div className="flex items-center gap-3.5">
                <item.icon
                  size={18}
                  className="text-muted-foreground group-hover:text-foreground transition-colors duration-200"
                />
                <span className="font-semibold text-sm">
                  {t(item.labelKey)}
                </span>
              </div>
              {item.badge ? (
                <span className="bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {totalWishlistItems}
                </span>
              ) : (
                <ChevronRight
                  size={14}
                  className="text-muted-foreground/40 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all duration-200"
                />
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
