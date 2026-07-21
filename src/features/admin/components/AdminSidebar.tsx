"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, BarChart3, ShoppingCart, Package, ListTree,
  Tag, Boxes, Users, Star, RotateCcw, HeadphonesIcon, Megaphone,
  FileText, Settings, Shield, UserCog, Activity, Bell, LogOut,
  ChevronDown, Search, Menu, X, Layers,
} from "lucide-react";

const navItems = [
  { label: "Overview", items: [
    { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
  ]},
  { label: "Commerce", items: [
    { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
    { href: "/admin/products", icon: Package, label: "Products" },
    { href: "/admin/categories", icon: ListTree, label: "Categories" },
    { href: "/admin/brands", icon: Tag, label: "Brands" },
    { href: "/admin/combos", icon: Layers, label: "Combo Packs" },
    { href: "/admin/coupons", icon: Tag, label: "Coupons" },
    { href: "/admin/inventory", icon: Boxes, label: "Inventory" },
  ]},
  { label: "People", items: [
    { href: "/admin/customers", icon: Users, label: "Customers" },
    { href: "/admin/reviews", icon: Star, label: "Reviews" },
    { href: "/admin/returns", icon: RotateCcw, label: "Returns" },
    { href: "/admin/support", icon: HeadphonesIcon, label: "Support" },
  ]},
  { label: "Growth", items: [
    { href: "/admin/marketing", icon: Megaphone, label: "Marketing" },
    { href: "/admin/reports", icon: FileText, label: "Reports" },
  ]},
  { label: "System", items: [
    { href: "/admin/users", icon: UserCog, label: "Users" },
    { href: "/admin/permissions", icon: Shield, label: "Permissions" },
    { href: "/admin/activity-logs", icon: Activity, label: "Activity Logs" },
    { href: "/admin/notifications", icon: Bell, label: "Notifications" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
  ]},
];

interface AdminSidebarProps {
  session: { user?: { name?: string | null; email?: string | null } } | null;
}

export default function AdminSidebar({ session }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(
    navItems.map((s) => s.label)
  );

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const toggleSection = (label: string) => {
    setExpandedSections((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`p-4 border-b border-gray-100 dark:border-gray-800 ${collapsed ? "px-3" : ""}`}>
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-500/20 shrink-0">
            <ShoppingCart className="h-5 w-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-sm font-bold text-gray-900 dark:text-white">Imran Shop</h1>
              <p className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">Admin Panel</p>
            </div>
          )}
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {navItems.map((section) => {
          const expanded = expandedSections.includes(section.label);
          return (
            <div key={section.label}>
              {!collapsed && (
                <button
                  onClick={() => toggleSection(section.label)}
                  className="flex w-full items-center justify-between px-3 py-1.5"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 dark:text-gray-500">{section.label}</span>
                  <ChevronDown className={`h-3 w-3 text-gray-400 transition-transform ${expanded ? "" : "-rotate-90"}`} />
                </button>
              )}
              <div className={`space-y-0.5 ${!collapsed && !expanded ? "hidden" : ""}`}>
                {section.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={`relative flex items-center gap-3 rounded-xl text-sm font-medium transition-all ${
                        collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5"
                      } ${
                        active
                          ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50 hover:text-gray-900 dark:hover:text-white"
                      }`}
                      title={collapsed ? item.label : undefined}
                    >
                      {active && (
                        <motion.div
                          layoutId="admin-sidebar-active"
                          className="absolute inset-0 rounded-xl bg-emerald-50 dark:bg-emerald-950/30"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      <item.icon className={`relative h-4 w-4 shrink-0 ${active ? "text-emerald-600 dark:text-emerald-400" : ""}`} />
                      {!collapsed && <span className="relative">{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      {/* User */}
      <div className={`p-3 border-t border-gray-100 dark:border-gray-800 ${collapsed ? "px-2" : ""}`}>
        {!collapsed ? (
          <div className="rounded-xl bg-gray-50 dark:bg-gray-800/50 p-3">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                {session?.user?.name?.charAt(0) || "A"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{session?.user?.name || "Admin"}</p>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 truncate">{session?.user?.email || ""}</p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-lg py-1.5 text-[11px] font-medium text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
            >
              <LogOut className="h-3 w-3" /> Sign Out
            </button>
          </div>
        ) : (
          <button onClick={() => signOut({ callbackUrl: "/" })} className="flex w-full items-center justify-center rounded-xl p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors">
            <LogOut className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Toggle */}
      <button onClick={() => setMobileOpen(true)} className="lg:hidden fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 shadow-lg">
        <Menu className="h-5 w-5 text-gray-600 dark:text-gray-400" />
      </button>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <motion.div initial={{ x: -280 }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="absolute left-0 top-0 bottom-0 w-[260px] bg-white dark:bg-gray-900 shadow-2xl">
            <div className="flex items-center justify-end p-2">
              <button onClick={() => setMobileOpen(false)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"><X className="h-4 w-4" /></button>
            </div>
            <SidebarContent />
          </motion.div>
        </div>
      )}

      {/* Desktop */}
      <aside className={`hidden lg:block shrink-0 transition-all duration-300 ${collapsed ? "w-[68px]" : "w-[240px]"}`}>
        <div className="sticky top-0 h-screen">
          <div className="h-full rounded-r-2xl border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 overflow-hidden">
            <SidebarContent />
          </div>
        </div>
      </aside>

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden lg:flex fixed top-6 z-40 items-center justify-center h-6 w-6 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-400 hover:text-gray-600 shadow-sm transition-all"
        style={{ left: collapsed ? "52px" : "224px" }}
      >
        <ChevronDown className={`h-3 w-3 transition-transform ${collapsed ? "-rotate-90" : "rotate-90"}`} />
      </button>
    </>
  );
}
