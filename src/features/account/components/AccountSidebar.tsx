"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Package, Heart, Star, MapPin, CreditCard,
  Ticket, Bell, Clock, Shield, Settings, HeadphonesIcon,
  RotateCcw, Download, FileText, LogOut, ChevronLeft, User, Menu, X,
} from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const navSections = [
  {
    label: "Overview",
    items: [
      { href: "/account/overview", icon: LayoutDashboard, label: "Overview" },
      { href: "/account/orders", icon: Package, label: "Orders" },
      { href: "/account/wishlist", icon: Heart, label: "Wishlist" },
      { href: "/account/reviews", icon: Star, label: "Reviews" },
    ],
  },
  {
    label: "Account",
    items: [
      { href: "/account/addresses", icon: MapPin, label: "Addresses" },
      { href: "/account/payments", icon: CreditCard, label: "Payment Methods" },
      { href: "/account/coupons", icon: Ticket, label: "Coupons" },
      { href: "/account/notifications", icon: Bell, label: "Notifications" },
      { href: "/account/recently-viewed", icon: Clock, label: "Recently Viewed" },
    ],
  },
  {
    label: "Settings",
    items: [
      { href: "/account/security", icon: Shield, label: "Security" },
      { href: "/account/preferences", icon: Settings, label: "Preferences" },
    ],
  },
  {
    label: "Help",
    items: [
      { href: "/account/support", icon: HeadphonesIcon, label: "Support" },
      { href: "/account/returns", icon: RotateCcw, label: "Returns" },
      { href: "/account/downloads", icon: Download, label: "Downloads" },
      { href: "/account/invoices", icon: FileText, label: "Invoices" },
    ],
  },
];

export default function AccountSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* User Profile */}
      <div className="p-5 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-11 w-11 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-emerald-500/20">
              {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-white dark:border-gray-900 bg-emerald-400" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
              {session?.user?.name || "User"}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {session?.user?.email || ""}
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-5">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="px-3 mb-1.5 text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                      active
                        ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute inset-0 rounded-xl bg-emerald-50 dark:bg-emerald-950/30"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <item.icon className={`relative h-4 w-4 ${active ? "text-emerald-600 dark:text-emerald-400" : ""}`} />
                    <span className="relative">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-gray-100 dark:border-gray-800">
        <Link
          href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Shop
        </Link>
        <button
          onClick={() => signOut()}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-20 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute left-0 top-0 bottom-0 w-72 bg-white dark:bg-gray-900 shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
              <p className="text-sm font-bold text-gray-900 dark:text-white">My Account</p>
              <button onClick={() => setMobileOpen(false)} className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>
            <SidebarContent />
          </motion.div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24">
          <div className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm overflow-hidden">
            <SidebarContent />
          </div>
        </div>
      </aside>
    </>
  );
}
