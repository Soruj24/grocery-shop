"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingBag, Heart, User } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";

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
      <div className="bg-white/80 dark:bg-gray-950/80 backdrop-blur-2xl border border-gray-100 dark:border-white/5 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.1)] rounded-[32px] flex items-center justify-around py-3">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link key={item.path} href={item.path} className="relative group flex flex-col items-center">
              <motion.div
                whileTap={{ scale: 0.8 }}
                className={`p-2 rounded-2xl transition-all ${
                  isActive 
                    ? "bg-green-500 text-white shadow-lg shadow-green-500/30" 
                    : "text-gray-400 group-hover:text-green-500"
                }`}
              >
                <Icon size={22} className={isActive ? "fill-current" : ""} />
                
                {item.badge && item.badge > 0 && (
                  <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-gray-950">
                    {item.badge}
                  </span>
                )}
              </motion.div>
              <span className={`text-[10px] font-bold mt-1 ${isActive ? "text-green-600" : "text-gray-400"}`}>
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
