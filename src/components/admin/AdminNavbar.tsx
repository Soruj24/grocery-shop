"use client";

import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  ChevronRight,
  User as UserIcon
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

export default function AdminNavbar() {
  const pathname = usePathname();

  const getPageTitle = () => {
    switch (pathname) {
      case "/admin": return "ড্যাশবোর্ড";
      case "/admin/products": return "প্রোডাক্ট";
      case "/admin/categories": return "ক্যাটাগরি";
      case "/admin/orders": return "অর্ডার";
      case "/admin/customers": return "কাস্টমার";
      case "/admin/settings": return "সেটিংস";
      default: return "ড্যাশবোর্ড";
    }
  };

  return (
    <header className="h-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-100 dark:border-gray-800 flex items-center justify-between px-10 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500 shadow-inner">
          <LayoutDashboard className="w-5 h-5" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            <span>অ্যাডমিন</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-green-600 dark:text-green-500">প্যানেল</span>
          </div>
          <h2 className="text-lg font-black text-gray-900 dark:text-white tracking-tight">
            {getPageTitle()}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[11px] font-black text-gray-600 dark:text-gray-400 uppercase tracking-wider">সিস্টেম অনলাইন</span>
        </div>
        <div className="w-10 h-10 rounded-2xl bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-all duration-300">
          <UserIcon className="w-5 h-5" />
        </div>
      </div>
    </header>
  );
}
