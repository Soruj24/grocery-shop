"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  ShoppingBag,
  Heart,
  User,
  LayoutGrid,
} from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useWishlist } from "@/contexts/WishlistContext";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { totalItems, cart } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { t } = useLanguage();

  const totalPrice =
    cart?.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    ) || 0;

  const navItems = [
    {
      label: t("nav_home"),
      icon: Home,
      href: "/",
    },
    {
      label: t("nav_categories"),
      icon: LayoutGrid,
      href: "/products",
    },
    {
      label: t("nav_cart"),
      icon: ShoppingBag,
      href: "/cart",
      badge: totalItems,
    },
    {
      label: t("nav_wishlist"),
      icon: Heart,
      href: "/wishlist",
      badge: totalWishlistItems,
    },
    {
      label: t("nav_profile"),
      icon: User,
      href: "/login",
    },
  ];

  return (
    <>
      <AnimatePresence>
        {totalItems > 0 &&
          pathname !== "/cart" &&
          pathname !== "/checkout" && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="md:hidden fixed right-4 z-50"
              style={{
                bottom:
                  "calc(5.5rem + env(safe-area-inset-bottom))",
              }}
            >
              <Link href="/cart">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-foreground text-background px-4 py-3 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.12)] flex items-center gap-2.5"
                >
                  <div className="relative">
                    <ShoppingBag className="w-5 h-5" />
                    <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-foreground">
                      {totalItems.toLocaleString(
                        "bn-BD"
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] font-medium uppercase tracking-wider opacity-50 leading-none">
                      {t("total")}
                    </span>
                    <span className="text-sm font-semibold leading-none">
                      {t("currency_symbol")}
                      {totalPrice.toLocaleString(
                        "bn-BD"
                      )}
                    </span>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          )}
      </AnimatePresence>

      <div
        className="md:hidden fixed left-3 right-3 z-50"
        style={{
          bottom:
            "calc(0.75rem + env(safe-area-inset-bottom))",
        }}
      >
        <nav
          className="bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-xl border border-black/[0.06] dark:border-white/[0.06] rounded-2xl px-4 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
          style={{
            paddingBottom:
              "calc(0.625rem + env(safe-area-inset-bottom))",
          }}
          aria-label="Bottom navigation"
        >
          <div className="flex justify-between items-center gap-1">
            {navItems.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" &&
                  pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-label={item.label}
                  className={`relative flex flex-col items-center gap-1 px-3 py-1.5 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground/60"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute -top-0.5 w-5 h-0.5 bg-foreground rounded-full"
                      transition={{
                        type: "spring",
                        bounce: 0.15,
                        duration: 0.5,
                      }}
                    />
                  )}

                  <div className="relative">
                    <item.icon
                      className={`w-5 h-5 transition-all duration-200 ${
                        isActive
                          ? "scale-110"
                          : ""
                      }`}
                    />

                    {item.badge !== undefined &&
                      item.badge > 0 && (
                        <span className="absolute -top-1 -right-1.5 bg-foreground text-background text-[8px] font-bold min-w-[15px] h-[15px] px-0.5 rounded-full flex items-center justify-center border-[1.5px] border-white dark:border-[#09090b]">
                          {item.badge.toLocaleString(
                            "bn-BD"
                          )}
                        </span>
                      )}
                  </div>

                  <span
                    className={`text-[10px] font-medium transition-all duration-200 ${
                      isActive
                        ? "opacity-100"
                        : "opacity-50"
                    }`}
                  >
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
