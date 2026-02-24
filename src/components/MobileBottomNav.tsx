"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home,  ShoppingBag, Heart, User, LayoutGrid } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/LanguageContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { totalItems, cart } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { t } = useLanguage();

  const totalPrice = cart?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;

  const navItems = [
    { label: t('nav_home'), icon: Home, href: "/" },
    { label: t('nav_categories'), icon: LayoutGrid, href: "/products" },
    { label: t('nav_cart'), icon: ShoppingBag, href: "/cart", badge: totalItems },
    { label: t('nav_wishlist'), icon: Heart, href: "/wishlist", badge: totalWishlistItems },
    { label: t('nav_profile'), icon: User, href: "/login" },
  ];

  return (
    <>
      {/* Floating Cart for Mobile */}
      <AnimatePresence>
        {totalItems > 0 && pathname !== '/cart' && pathname !== '/checkout' && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="md:hidden fixed right-6 z-50"
            style={{ bottom: 'calc(7rem + env(safe-area-inset-bottom))' }}
          >
            <Link href="/cart">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white p-4 rounded-[24px] shadow-2xl shadow-green-600/40 flex items-center gap-3"
              >
                <div className="relative">
                  <ShoppingBag className="w-6 h-6" />
                  <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-green-600">
                    {totalItems.toLocaleString('bn-BD')}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase tracking-widest opacity-70 leading-none">{t('total')}</span>
                  <span className="font-black leading-none">{t('currency_symbol')}{totalPrice.toLocaleString('bn-BD')}</span>
                </div>
              </motion.div>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="md:hidden fixed left-4 right-4 z-50" style={{ bottom: 'calc(1.5rem + env(safe-area-inset-bottom))' }}>
      <nav className="bg-white/80 dark:bg-black/80 backdrop-blur-2xl border border-gray-100/50 dark:border-white/10 rounded-[32px] px-6 py-4 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-black/50" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }} aria-label="Bottom navigation">
        <div className="flex justify-between items-center relative gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-label={item.label}
                className={`relative flex flex-col items-center gap-1.5 px-2 py-2 rounded-2xl transition-all duration-500 ${
                  isActive 
                    ? "text-green-700 dark:text-green-400 bg-green-50/70 dark:bg-green-500/10"
                    : "text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -top-1 w-1.5 h-1.5 bg-green-500 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <div className="relative">
                  <item.icon className={`w-7 h-7 transition-transform duration-500 ${isActive ? "scale-110" : ""}`} />
                  
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-green-600 text-white text-[9px] font-black min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center border-2 border-white dark:border-black shadow-lg">
                      {item.badge.toLocaleString('bn-BD')}
                    </span>
                  )}
                </div>
                
                <span className={`text-[10px] font-black uppercase tracking-wider transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-70"}`}>
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
    </>
  );
}
