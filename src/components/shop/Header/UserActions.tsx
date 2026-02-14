"use client";

import { useState } from "react";
import Link from "next/link";
import { 
  ShoppingCart, 
  Heart, 
  User, 
  ChevronDown, 
  LayoutGrid, 
  ShoppingBasket, 
  Settings, 
  LogOut 
} from "lucide-react";
import { useCart } from "@/components/CartContext";
import { useWishlist } from "@/components/WishlistContext";
import { useSession, signOut } from "next-auth/react";
import ThemeToggle from "@/components/ThemeToggle";

export default function UserActions() {
  const { totalItems } = useCart();
  const { totalWishlistItems } = useWishlist();
  const { data: session } = useSession();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <div className="flex items-center gap-3 sm:gap-6">
      <ThemeToggle />

      {/* Wishlist */}
      <Link 
        href="/wishlist" 
        className="relative p-4 bg-gray-50 dark:bg-white/5 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-gray-700 dark:text-gray-400 hover:text-rose-500 rounded-[20px] transition-all group hidden sm:flex border border-transparent hover:border-rose-100 dark:hover:border-rose-500/20"
      >
        <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" />
        {totalWishlistItems > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-rose-500 text-white text-[10px] font-black min-w-[22px] h-[22px] px-1.5 rounded-full flex items-center justify-center border-[3px] border-white dark:border-black shadow-xl">
            {totalWishlistItems}
          </span>
        )}
      </Link>

      {/* Cart */}
      <Link 
        href="/cart" 
        className="relative p-4 bg-gray-50 dark:bg-white/5 hover:bg-green-50 dark:hover:bg-green-500/10 text-gray-700 dark:text-gray-400 hover:text-green-600 rounded-[20px] transition-all group border border-transparent hover:border-green-100 dark:hover:border-green-500/20"
      >
        <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
        {totalItems > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-green-600 text-white text-[10px] font-black min-w-[22px] h-[22px] px-1.5 rounded-full flex items-center justify-center border-[3px] border-white dark:border-black shadow-xl">
            {totalItems}
          </span>
        )}
      </Link>

      {/* Profile / Auth */}
      <div className="relative">
        {session ? (
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 p-1.5 pr-4 bg-gray-50 dark:bg-white/5 hover:bg-white dark:hover:bg-black rounded-2xl transition-all border border-transparent hover:border-gray-100 dark:hover:border-white/10 group shadow-sm hover:shadow-md"
          >
            <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center text-white text-lg font-black shadow-lg shadow-green-500/20 ring-2 ring-white dark:ring-black">
              {session.user?.name?.charAt(0)}
            </div>
            <div className="hidden lg:flex flex-col items-start text-left">
              <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">আমার অ্যাকাউন্ট</span>
              <span className="text-sm font-black text-gray-900 dark:text-white line-clamp-1">{session.user?.name?.split(' ')[0]}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-500 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>
        ) : (
          <Link 
            href="/login" 
            className="group flex items-center gap-3 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl font-black text-sm transition-all hover:bg-green-600 hover:text-white shadow-xl hover:shadow-green-500/20 active:scale-95"
          >
            <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline uppercase tracking-widest">লগইন</span>
          </Link>
        )}

        {/* Profile Dropdown */}
        {isProfileOpen && session && (
          <div className="absolute right-0 mt-4 w-72 bg-white dark:bg-[#020617] rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] border border-gray-100 dark:border-white/5 py-3 z-[100] animate-in fade-in zoom-in slide-in-from-top-4 duration-300 backdrop-blur-3xl">
            <div className="px-6 py-4 border-b border-gray-50 dark:border-white/5 mb-2">
              <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-1">লগইন করা আছে</p>
              <p className="text-base font-black text-gray-900 dark:text-white truncate">{session.user?.email}</p>
            </div>
            
            <div className="px-2 space-y-1">
              <Link 
                href="/admin/dashboard" 
                className="flex items-center gap-4 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-500/10 hover:text-green-600 rounded-2xl transition-all font-bold group"
                onClick={() => setIsProfileOpen(false)}
              >
                <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-500/20 transition-colors">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                ড্যাশবোর্ড
              </Link>
              
              <Link 
                href="/orders" 
                className="flex items-center gap-4 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-500/10 hover:text-green-600 rounded-2xl transition-all font-bold group"
                onClick={() => setIsProfileOpen(false)}
              >
                <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-500/20 transition-colors">
                  <ShoppingBasket className="w-5 h-5" />
                </div>
                আমার অর্ডার
              </Link>

              <Link 
                href="/settings" 
                className="flex items-center gap-4 px-4 py-3 text-gray-600 dark:text-gray-400 hover:bg-green-50 dark:hover:bg-green-500/10 hover:text-green-600 rounded-2xl transition-all font-bold group"
                onClick={() => setIsProfileOpen(false)}
              >
                <div className="w-10 h-10 rounded-xl bg-gray-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-green-100 dark:group-hover:bg-green-500/20 transition-colors">
                  <Settings className="w-5 h-5" />
                </div>
                সেটিংস
              </Link>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-50 dark:border-white/5 px-2">
              <button 
                onClick={() => signOut()}
                className="flex items-center gap-4 w-full px-4 py-4 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all font-black group"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center group-hover:bg-rose-100 dark:group-hover:bg-rose-500/20 transition-colors">
                  <LogOut className="w-5 h-5" />
                </div>
                লগ আউট
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
