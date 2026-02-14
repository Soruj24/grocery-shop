"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { 
  LayoutDashboard, 
  Package, 
  ListTree, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  Layers
} from "lucide-react";

interface AdminSidebarProps {
  session: Session | null;
}

export default function AdminSidebar({ session }: AdminSidebarProps) {
  const pathname = usePathname();

  const menuItems = [
    { name: "ড্যাশবোর্ড", icon: LayoutDashboard, href: "/admin/dashboard" },
    { name: "প্রোডাক্ট", icon: Package, href: "/admin/products" },
    { name: "ক্যাটাগরি", icon: ListTree, href: "/admin/categories" },
    { name: "কম্বো প্যাক", icon: Layers, href: "/admin/combos" },
    { name: "অর্ডার", icon: ShoppingCart, href: "/admin/orders" },
    { name: "কাস্টমার", icon: Users, href: "/admin/customers" },
    { name: "সেটিিংস", icon: Settings, href: "/admin/settings" },
  ];

  return (
    <aside className="w-72 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col sticky top-0 h-screen transition-all duration-300">
      <div className="p-8">
        <Link href="/admin" className="flex items-center gap-3 group">
          <div className="bg-gradient-to-br from-green-500 to-green-700 dark:from-green-600 dark:to-green-900 p-2.5 rounded-2xl group-hover:rotate-12 transition-all duration-300 shadow-lg shadow-green-200 dark:shadow-green-900/20">
            <ShoppingCart className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-xl font-black text-gray-900 dark:text-white leading-tight">ইমরান</h1>
            <span className="text-[10px] font-bold text-green-600 dark:text-green-500 uppercase tracking-[0.2em]">অ্যাডমিন প্যানেল</span>
          </div>
        </Link>
      </div>

      <div className="flex-1 px-6 space-y-1.5 overflow-y-auto custom-scrollbar">
        <p className="px-4 py-3 text-[11px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em]">প্রধান মেনু</p>
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group relative ${
                isActive 
                  ? "bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 shadow-sm" 
                  : "text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3.5 z-10">
                <div className={`p-2 rounded-xl transition-all duration-300 ${isActive ? "bg-green-600 text-white shadow-md shadow-green-200 dark:shadow-green-900/40" : "bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 group-hover:bg-white dark:group-hover:bg-gray-700 group-hover:text-gray-900 dark:group-hover:text-white group-hover:shadow-sm"}`}>
                  <item.icon className="w-4.5 h-4.5" />
                </div>
                <span className={`font-bold text-[13.5px] ${isActive ? "text-green-700 dark:text-green-400" : "text-gray-500 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"}`}>{item.name}</span>
              </div>
              {isActive && (
                <div className="w-1.5 h-1.5 rounded-full bg-green-600 shadow-sm shadow-green-200 dark:shadow-green-900/40" />
              )}
            </Link>
          );
        })}
      </div>

      <div className="p-6 border-t border-gray-50 dark:border-gray-800">
        <div className="bg-gray-50/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-[2rem] p-5 border border-gray-100 dark:border-gray-700 relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-4 -mt-4 w-16 h-16 bg-green-500/5 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
          <div className="flex items-center gap-3.5 relative z-10">
            <div className="relative">
              <div className="w-11 h-11 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center text-green-600 font-black shadow-sm border border-gray-100 dark:border-gray-700">
                {session?.user?.name?.charAt(0)}
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full shadow-sm" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[13px] font-black text-gray-900 dark:text-white truncate">{session?.user?.name}</span>
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">সুপার অ্যাডমিন</span>
            </div>
          </div>
          
          <button 
            onClick={() => signOut({ callbackUrl: '/' })}
            className="mt-4 w-full flex items-center justify-center gap-2.5 px-4 py-2.5 text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20 rounded-xl transition-all duration-300 font-bold text-xs border border-transparent hover:border-red-100 dark:hover:border-red-900/30"
          >
            <LogOut className="w-4 h-4" />
            <span>লগআউট করুন</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
