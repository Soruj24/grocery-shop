"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingBag, Heart, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function BottomNav() {
  const pathname = usePathname();
  const { cart } = useCart();
  const { t } = useLanguage();
  const totalItems = cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;

  const navItems = [
    { name: t('nav_home'), icon: Home, path: "/" },
    { name: t('nav_search'), icon: Search, path: "/search" },
    { name: t('nav_cart'), icon: ShoppingBag, path: "/cart", badge: totalItems },
    { name: t('nav_wishlist'), icon: Heart, path: "/wishlist" },
    { name: t('nav_profile'), icon: User, path: "/profile" },
  ];

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-4">
      <div className="bg-card/80 dark:bg-card/80 backdrop-blur-2xl border border-border shadow-lg rounded-2xl flex items-center justify-around py-3">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link key={item.path} href={item.path} className="relative group flex flex-col items-center">
              <motion.div
                whileTap={{ scale: 0.8 }}
                className={`p-2 rounded-2xl transition-all ${
                  isActive 
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/30" 
                    : "text-muted-foreground group-hover:text-primary"
                }`}
              >
                <Icon size={22} className={isActive ? "fill-current" : ""} />
                
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-danger text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-card dark:border-card">
                    {item.badge}
                  </span>
                )}
              </motion.div>
              <span className={`text-[10px] font-bold mt-1 ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
