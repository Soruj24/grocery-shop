"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ShoppingBasket, ShoppingBag, Heart, LayoutGrid, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileNavLinksProps {
  onClose: () => void;
  totalWishlistItems: number;
}

const navItems = [
  { labelKey: "home_page" as const, href: "/", icon: ShoppingBasket },
  { labelKey: "all_products" as const, href: "/products", icon: ShoppingBag },
  { labelKey: "wishlist" as const, href: "/wishlist", icon: Heart, badge: true },
  { labelKey: "offers" as const, href: "/products?filter=deals", icon: LayoutGrid },
];

export default function MobileNavLinks({ onClose, totalWishlistItems }: MobileNavLinksProps) {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em]">{t("navigation")}</p>
      <div className="space-y-2">
        {navItems.map((item, idx) => (
          <motion.div key={item.href} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + idx * 0.05 }}>
            <Link
              href={item.href}
              onClick={onClose}
              className="flex items-center justify-between p-5 rounded-2xl text-foreground hover:bg-primary-subtle hover:text-primary transition-all group border border-transparent hover:border-primary/20"
              aria-label={t(item.labelKey)}
            >
              <div className="flex items-center gap-4">
                <item.icon size={20} className="group-hover:scale-110 transition-transform" />
                <span className="font-bold">{t(item.labelKey)}</span>
              </div>
              {item.badge ? (
                <span className="bg-rose-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-lg shadow-rose-500/30">{totalWishlistItems}</span>
              ) : (
                <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
