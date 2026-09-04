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
      {/* Floating Cart Pill */}
      <AnimatePresence>
        {totalItems > 0 &&
          pathname !== "/cart" &&
          pathname !== "/checkout" && (
            <motion.div
              initial={{ y: 80, opacity: 0, scale: 0.9 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 80, opacity: 0, scale: 0.9 }}
              transition={{
                type: "spring",
                damping: 20,
                stiffness: 300,
              }}
              className="md:hidden fixed right-4 z-50"
              style={{
                bottom:
                  "calc(5.5rem + env(safe-area-inset-bottom))",
              }}
            >
              <Link href="/cart">
                <motion.div
                  whileTap={{ scale: 0.95 }}
                  className="bg-foreground text-background pl-3.5 pr-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-2.5 backdrop-blur-sm"
                >
                  <div className="relative">
                    <ShoppingBag className="w-4.5 h-4.5" />
                    <motion.span
                      key={totalItems}
                      initial={{ scale: 0.5 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1.5 -right-1.5 bg-white text-foreground text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center"
                    >
                      {totalItems > 9
                        ? "9+"
                        : totalItems}
                    </motion.span>
                  </div>
                  <div className="flex flex-col leading-none">
                    <span className="text-[8px] font-semibold uppercase tracking-wider opacity-50">
                      {t("total")}
                    </span>
                    <span className="text-sm font-bold tabular-nums">
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

      {/* Bottom Navigation Bar */}
      <div
        className="md:hidden fixed left-2.5 right-2.5 z-50"
        style={{
          bottom:
            "calc(0.5rem + env(safe-area-inset-bottom))",
        }}
      >
        <nav
          className="bg-card/70 backdrop-blur-2xl border border-border rounded-2xl px-2 py-2 shadow-lg"
          style={{
            paddingBottom:
              "calc(0.5rem + env(safe-area-inset-bottom))",
          }}
          aria-label="Bottom navigation"
        >
          <div className="flex justify-between items-center">
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
                  aria-current={isActive ? "page" : undefined}
                  className="relative flex flex-col items-center gap-0.5 px-3 py-2 rounded-xl min-w-[48px] min-h-[48px] justify-center"
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="bottomNavIndicator"
                      className="absolute inset-x-1 -top-0.5 h-[3px] bg-foreground rounded-full"
                      transition={{
                        type: "spring",
                        bounce: 0.2,
                        duration: 0.5,
                      }}
                    />
                  )}

                  {/* Icon */}
                  <motion.div
                    whileTap={{ scale: 0.85 }}
                    transition={{
                      duration: 0.1,
                    }}
                  >
                    <item.icon
                      className={`w-5 h-5 transition-colors duration-200 ${
                        isActive
                          ? "text-foreground"
                          : "text-muted-foreground/50"
                      }`}
                      strokeWidth={
                        isActive ? 2.2 : 1.8
                      }
                    />
                  </motion.div>

                  {/* Badge */}
                  {item.badge !== undefined &&
                    item.badge > 0 && (
                      <motion.span
                        key={item.badge}
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                        className="absolute top-0.5 right-1 bg-foreground text-background text-[7px] font-bold min-w-[14px] h-[14px] px-0.5 rounded-full flex items-center justify-center border-[1.5px] border-background"
                      >
                        {item.badge > 9
                          ? "9+"
                          : item.badge}
                      </motion.span>
                    )}

                  {/* Label */}
                  <span
                    className={`text-[9px] font-semibold transition-colors duration-200 ${
                      isActive
                        ? "text-foreground"
                        : "text-muted-foreground/50"
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
