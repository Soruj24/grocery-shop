"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home,  ShoppingBag, Heart, User, LayoutGrid } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

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
                className="bg-primary text-primary-foreground p-4 rounded-2xl shadow-2xl shadow-primary/40 flex items-center gap-3"
              >
                <div className="relative">
                  <ShoppingBag className="w-6 h-6" />
                   <span className="absolute -top-2 -right-2 bg-danger text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-primary">
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
        <nav className="bg-card/80 dark:bg-card/80 backdrop-blur-2xl border border-border rounded-2xl px-6 py-4 shadow-lg" style={{ paddingBottom: 'calc(1rem + env(safe-area-inset-bottom))' }} aria-label="Bottom navigation">
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
                    ? "text-primary dark:text-primary bg-primary-subtle"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute -top-1 w-1.5 h-1.5 bg-primary rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                
                <div className="relative">
                  <item.icon className={`w-7 h-7 transition-transform duration-500 ${isActive ? "scale-110" : ""}`} />
                   
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-[9px] font-black min-w-[18px] h-[18px] px-1 rounded-full flex items-center justify-center border-2 border-card dark:border-card shadow-lg">
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
