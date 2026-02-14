"use client";

import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartContext";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingCart() {
  const { cart } = useCart();
  const pathname = usePathname();
  const totalItems = cart?.reduce((acc, item) => acc + item.quantity, 0) || 0;
  const totalPrice = cart?.reduce((acc, item) => acc + (item.price * item.quantity), 0) || 0;

  // Don't show on cart page or checkout page
  if (pathname === '/cart' || pathname === '/checkout' || totalItems === 0) return null;

  return (
    <div className="fixed bottom-24 right-6 z-40 lg:bottom-10 lg:right-10">
      <Link href="/cart">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-green-600 text-white p-4 rounded-[28px] shadow-2xl shadow-green-600/40 flex items-center gap-4 group overflow-hidden relative"
        >
          {/* Shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shine" />
          
          <div className="relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-green-600">
              {totalItems}
            </span>
          </div>
          
          <div className="hidden lg:flex flex-col items-start pr-2">
            <span className="text-[10px] font-black uppercase tracking-widest opacity-70">আমার কার্ট</span>
            <span className="font-black">৳{totalPrice}</span>
          </div>
        </motion.div>
      </Link>
    </div>
  );
}
