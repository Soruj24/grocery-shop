"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion } from "framer-motion";
import {
  LayoutDashboard, BarChart3, ShoppingCart, Package, ListTree,
  Tag, Boxes, Users, Star, RotateCcw, HeadphonesIcon, Megaphone,
  FileText, Settings, Shield, UserCog, Activity, Bell, LogOut,
  ChevronDown, Menu, X, Layers,
} from "lucide-react";
import { cn } from "@/utils/utils";

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

  const toggleSection = useCallback((label: string) => {
    setExpandedSections((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label]
    );
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className={cn("p-4 border-b border-border", collapsed ? "px-3" : "")}>
        <Link href="/admin/dashboard" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-foreground shrink-0">
            <ShoppingCart className="h-5 w-5 text-background" />
          </div>
          {!collapsed && (
            <div>
              <h1 className="text-sm font-semibold text-foreground">Emran Shop</h1>
              <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Admin Panel</p>
            </div>
          )}
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4" aria-label="Admin navigation">
        {navItems.map((section) => {
          const expanded = expandedSections.includes(section.label);
          return (
            <div key={section.label}>
              {!collapsed && (
                <button
                  onClick={() => toggleSection(section.label)}
                  aria-expanded={expanded}
                  className="flex w-full items-center justify-between px-3 py-1.5"
                >
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">{section.label}</span>
                  <ChevronDown className={cn("h-3 w-3 text-muted-foreground transition-transform", !expanded && "-rotate-90")} aria-hidden="true" />
                </button>
              )}
              <div className={cn("space-y-0.5", !collapsed && !expanded ? "hidden" : "")}>
                {section.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeMobile}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "relative flex items-center gap-2.5 rounded-lg text-sm font-medium transition-colors",
                        collapsed ? "justify-center px-2 py-2" : "px-3 py-2",
                        active
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      )}
                      title={collapsed ? item.label : undefined}
                    >
                      {active && (
                        <motion.div
                          layoutId="admin-sidebar-active"
                          className="absolute inset-0 rounded-lg bg-muted"
                          transition={{ type: "spring", stiffness: 350, damping: 30 }}
                        />
                      )}
                      <item.icon className={cn("relative h-4 w-4 shrink-0", active && "text-foreground")} aria-hidden="true" />
                      {!collapsed && <span className="relative">{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </nav>

      <div className={cn("p-3 border-t border-border", collapsed ? "px-2" : "")}>
        {!collapsed ? (
          <div className="rounded-lg bg-muted p-3">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-foreground flex items-center justify-center text-background text-xs font-medium shrink-0" aria-hidden="true">
                {session?.user?.name?.charAt(0) || "A"}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-foreground truncate">{session?.user?.name || "Admin"}</p>
                <p className="text-[10px] text-muted-foreground truncate">{session?.user?.email || ""}</p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-lg py-1.5 text-xs font-medium text-muted-foreground hover:text-danger hover:bg-danger-subtle transition-colors"
              aria-label="Sign out"
            >
              <LogOut className="h-3 w-3" /> Sign Out
            </button>
          </div>
        ) : (
          <button onClick={() => signOut({ callbackUrl: "/" })} className="flex w-full items-center justify-center rounded-lg p-2 text-muted-foreground hover:text-danger hover:bg-danger-subtle transition-colors" aria-label="Sign out">
            <LogOut className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      <button onClick={() => setMobileOpen(true)} className="lg:hidden fixed top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-xl bg-card border border-border shadow-lg" aria-label="Open menu">
        <Menu className="h-5 w-5 text-muted-foreground" />
      </button>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={closeMobile} aria-hidden="true" />
          <motion.div initial={{ x: -280 }} animate={{ x: 0 }} transition={{ type: "spring", stiffness: 300, damping: 30 }} className="absolute left-0 top-0 bottom-0 w-[260px] bg-card shadow-2xl">
            <div className="flex items-center justify-end p-2">
              <button onClick={closeMobile} className="p-2 rounded-lg hover:bg-muted" aria-label="Close menu"><X className="h-4 w-4 text-muted-foreground" /></button>
            </div>
            <SidebarContent />
          </motion.div>
        </div>
      )}

      <aside className={cn("hidden lg:block shrink-0 transition-all duration-300", collapsed ? "w-[68px]" : "w-[240px]")}>
        <div className="sticky top-0 h-screen">
          <div className="h-full border-r border-border bg-card overflow-hidden">
            <SidebarContent />
          </div>
        </div>
      </aside>

      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          "hidden lg:flex fixed top-6 z-40 items-center justify-center",
          "h-6 w-6 rounded-full border border-border bg-card",
          "text-muted-foreground hover:text-foreground shadow-sm transition-all",
        )}
        style={{ left: collapsed ? "52px" : "224px" }}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        <ChevronDown className={cn("h-3 w-3 transition-transform", collapsed ? "-rotate-90" : "rotate-90")} aria-hidden="true" />
      </button>
    </>
  );
}
