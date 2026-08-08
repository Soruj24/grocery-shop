"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Package, Heart, Star, MapPin, CreditCard,
  Ticket, Bell, Clock, Shield, Settings, HeadphonesIcon,
  RotateCcw, Download, FileText, LogOut, ChevronLeft, Menu, X,
} from "lucide-react";
import { useState } from "react";

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
      <div className="p-5 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="h-10 w-10 rounded-full bg-foreground flex items-center justify-center text-background font-medium text-sm">
              {session?.user?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-card bg-success" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-medium text-foreground truncate">
              {session?.user?.name || "User"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {session?.user?.email || ""}
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-5">
        {navSections.map((section) => (
          <div key={section.label}>
            <p className="px-3 mb-1.5 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
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
                    className={`relative flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    {active && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute inset-0 rounded-lg bg-muted"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                    <item.icon className={`relative h-4 w-4 ${active ? "text-foreground" : ""}`} />
                    <span className="relative">{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-3 border-t border-border">
        <Link
          href="/"
          className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Shop
        </Link>
        <button
          onClick={() => signOut()}
          className="flex w-full items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium text-danger hover:bg-danger-subtle transition-colors"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed bottom-20 right-4 z-50 flex h-12 w-12 items-center justify-center rounded-xl bg-foreground text-background shadow-lg"
      >
        <Menu className="h-5 w-5" />
      </button>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute left-0 top-0 bottom-0 w-72 bg-card shadow-2xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <p className="text-sm font-medium text-foreground">My Account</p>
              <button onClick={() => setMobileOpen(false)} className="p-1.5 rounded-lg hover:bg-muted">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <SidebarContent />
          </motion.div>
        </div>
      )}

      <aside className="hidden lg:block w-64 shrink-0">
        <div className="sticky top-24">
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <SidebarContent />
          </div>
        </div>
      </aside>
    </>
  );
}
