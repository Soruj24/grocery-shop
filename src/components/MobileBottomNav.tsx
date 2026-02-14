"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Search, ShoppingCart, Heart, User } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();

  const navItems = [
    { label: "হোম", icon: Home, href: "/" },
    { label: "সার্চ", icon: Search, href: "/products" },
    { label: "কার্ট", icon: ShoppingCart, href: "/cart", badge: totalItems },
    { label: "উইশলিস্ট", icon: Heart, href: "/wishlist", badge: totalWishlistItems },
    { label: "প্রোফাইল", icon: User, href: "/login" },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-xl border-t border-gray-100 dark:border-gray-800 px-4 py-3 pb-safe">
      <div className="flex justify-between items-center max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`relative flex flex-col items-center gap-1 transition-all duration-300 ${
                isActive 
                  ? "text-green-600 dark:text-green-500 scale-110" 
                  : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300"
              }`}
            >
              <item.icon className={`w-6 h-6 ${isActive ? "fill-current" : ""}`} />
              <span className="text-[10px] font-black uppercase tracking-tighter">{item.label}</span>
              
              {item.badge !== undefined && item.badge > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-black min-w-[16px] h-4 px-1 rounded-full flex items-center justify-center border-2 border-white dark:border-black shadow-sm">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
