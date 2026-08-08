"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  LayoutDashboard, BarChart3, ShoppingCart, Package, ListTree,
  Tag, Boxes, Users, Star, RotateCcw, HeadphonesIcon, Megaphone,
  FileText, Settings, Shield, UserCog, Activity, Bell, LogOut,
  ChevronRight, Menu, X, Layers, CreditCard, Search,
  ChevronsLeft, ChevronsRight,
} from "lucide-react";
import { cn } from "@/utils/utils";

/* ─── Navigation Data ─── */
interface NavItem {
  href: string;
  icon: React.ElementType;
  label: string;
  badge?: number;
}

interface NavSection {
  label: string;
  items: NavItem[];
}

const navSections: NavSection[] = [
  {
    label: "Overview",
    items: [
      { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
      { href: "/admin/analytics", icon: BarChart3, label: "Analytics" },
    ],
  },
  {
    label: "Commerce",
    items: [
      { href: "/admin/orders", icon: ShoppingCart, label: "Orders" },
      { href: "/admin/products", icon: Package, label: "Products" },
      { href: "/admin/categories", icon: ListTree, label: "Categories" },
      { href: "/admin/brands", icon: Tag, label: "Brands" },
      { href: "/admin/combos", icon: Layers, label: "Combos" },
      { href: "/admin/coupons", icon: Tag, label: "Coupons" },
      { href: "/admin/inventory", icon: Boxes, label: "Inventory" },
    ],
  },
  {
    label: "People",
    items: [
      { href: "/admin/customers", icon: Users, label: "Customers" },
      { href: "/admin/reviews", icon: Star, label: "Reviews" },
      { href: "/admin/returns", icon: RotateCcw, label: "Returns" },
      { href: "/admin/support", icon: HeadphonesIcon, label: "Support" },
    ],
  },
  {
    label: "Growth",
    items: [
      { href: "/admin/marketing", icon: Megaphone, label: "Marketing" },
      { href: "/admin/reports", icon: FileText, label: "Reports" },
    ],
  },
  {
    label: "System",
    items: [
      { href: "/admin/users", icon: UserCog, label: "Users" },
      { href: "/admin/permissions", icon: Shield, label: "Permissions" },
      { href: "/admin/activity-logs", icon: Activity, label: "Logs" },
      { href: "/admin/notifications", icon: Bell, label: "Notifications" },
      { href: "/admin/settings", icon: Settings, label: "Settings" },
    ],
  },
];

/* ─── Tooltip Component ─── */
function Tooltip({ children, content, side = "right" }: { children: React.ReactNode; content: string; side?: "left" | "right" }) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  const show = () => {
    timeoutRef.current = setTimeout(() => setVisible(true), 400);
  };
  const hide = () => {
    clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  return (
    <div className="relative" onMouseEnter={show} onMouseLeave={hide} onFocus={show} onBlur={hide}>
      {children}
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, x: side === "right" ? -4 : 4 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: side === "right" ? -4 : 4 }}
            transition={{ duration: 0.1 }}
            className={cn(
              "absolute top-1/2 -translate-y-1/2 z-50 px-2.5 py-1.5 rounded-md",
              "bg-foreground text-background text-xs font-medium whitespace-nowrap",
              "shadow-lg pointer-events-none",
              side === "right" ? "left-full ml-2" : "right-full mr-2",
            )}
            role="tooltip"
          >
            {content}
            <div
              className={cn(
                "absolute top-1/2 -translate-y-1/2 w-2 h-2 rotate-45 bg-foreground",
                side === "right" ? "-left-1" : "-right-1",
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Nav Link Component ─── */
function NavLink({ item, active, collapsed, onClick }: { item: NavItem; active: boolean; collapsed: boolean; onClick?: () => void }) {
  const link = (
    <Link
      href={item.href}
      onClick={onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg text-[13px] font-medium transition-all duration-150",
        collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      {active && (
        <motion.div
          layoutId="sidebar-active"
          className="absolute inset-0 rounded-lg bg-primary/10"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}
      <item.icon className={cn("relative h-4 w-4 shrink-0 transition-colors", active ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} aria-hidden="true" />
      {!collapsed && <span className="relative truncate">{item.label}</span>}
      {!collapsed && item.badge !== undefined && item.badge > 0 && (
        <span className={cn(
          "relative ml-auto flex h-5 min-w-[20px] items-center justify-center rounded-full px-1.5",
          "text-[10px] font-semibold",
          active ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
        )}>
          {item.badge > 99 ? "99+" : item.badge}
        </span>
      )}
    </Link>
  );

  if (collapsed) {
    return <Tooltip content={item.label}>{link}</Tooltip>;
  }
  return link;
}

/* ─── Section Component ─── */
function NavSectionGroup({ section, expanded, onToggle, collapsed, activeHref, onNavigate }: {
  section: NavSection;
  expanded: boolean;
  onToggle: () => void;
  collapsed: boolean;
  activeHref: string;
  onNavigate?: () => void;
}) {
  const hasActiveChild = section.items.some(
    (item) => activeHref === item.href || activeHref.startsWith(item.href + "/"),
  );

  if (collapsed) {
    return (
      <div className="space-y-0.5">
        {section.items.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            active={activeHref === item.href || activeHref.startsWith(item.href + "/")}
            collapsed
            onClick={onNavigate}
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <button
        onClick={onToggle}
        aria-expanded={expanded}
        className={cn(
          "flex w-full items-center gap-2 px-3 py-1.5 rounded-lg",
          "text-[11px] font-semibold uppercase tracking-wider",
          "text-muted-foreground/60 hover:text-muted-foreground transition-colors",
        )}
      >
        <span className="truncate">{section.label}</span>
        <ChevronRight
          className={cn("h-3 w-3 shrink-0 transition-transform duration-200", expanded && "rotate-90")}
          aria-hidden="true"
        />
      </button>
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="space-y-0.5">
              {section.items.map((item) => (
                <NavLink
                  key={item.href}
                  item={item}
                  active={activeHref === item.href || activeHref.startsWith(item.href + "/")}
                  collapsed={false}
                  onClick={onNavigate}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── User Section ─── */
function UserSection({ session, collapsed }: { session: { user?: { name?: string | null; email?: string | null } } | null; collapsed: boolean }) {
  const initials = (session?.user?.name || "A")
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const content = (
    <div className={cn("flex items-center", collapsed ? "justify-center" : "gap-3")}>
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-semibold shrink-0">
        {initials}
      </div>
      {!collapsed && (
        <div className="min-w-0 flex-1">
          <p className="text-[13px] font-medium text-foreground truncate">{session?.user?.name || "Admin"}</p>
          <p className="text-[11px] text-muted-foreground truncate">{session?.user?.email || ""}</p>
        </div>
      )}
    </div>
  );

  return (
    <div className={cn("p-3 border-t border-border")}>
      {collapsed ? (
        <Tooltip content={session?.user?.name || "Admin"} side="right">
          <div className="flex justify-center">{content}</div>
        </Tooltip>
      ) : (
        <div className="rounded-lg bg-muted/50 p-2.5 space-y-2">
          {content}
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex w-full items-center justify-center gap-2 rounded-lg py-1.5 text-[11px] font-medium text-muted-foreground hover:text-danger hover:bg-danger-subtle transition-colors"
            aria-label="Sign out"
          >
            <LogOut className="h-3 w-3" />
            <span>Sign Out</span>
          </button>
        </div>
      )}
    </div>
  );
}

/* ─── Main Sidebar Component ─── */
interface AdminSidebarProps {
  session: { user?: { name?: string | null; email?: string | null } } | null;
}

export default function AdminSidebar({ session }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(
    navSections.map((s) => s.label),
  );

  const unreadCount = useSelector((state: RootState) => state.notifications.unreadCount);

  const navSectionsWithBadges = navSections.map((section) => ({
    ...section,
    items: section.items.map((item) => {
      if (item.href === "/admin/notifications") {
        return { ...item, badge: unreadCount };
      }
      return item;
    }),
  }));

  const toggleSection = useCallback((label: string) => {
    setExpandedSections((prev) =>
      prev.includes(label) ? prev.filter((s) => s !== label) : [...prev, label],
    );
  }, []);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const SidebarContent = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={cn("flex items-center border-b border-border", collapsed ? "justify-center px-2 py-4" : "gap-3 px-4 py-4")}>
        <Link href="/admin/dashboard" className="flex items-center gap-3 min-w-0">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-foreground shrink-0">
            <ShoppingCart className="h-4 w-4 text-background" />
          </div>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden"
            >
              <h1 className="text-sm font-semibold text-foreground whitespace-nowrap">Emran Shop</h1>
              <p className="text-[10px] font-medium text-muted-foreground whitespace-nowrap">Admin</p>
            </motion.div>
          )}
        </Link>
      </div>

      {/* Search (expanded only) */}
      {!collapsed && !isMobile && (
        <div className="px-3 pt-3">
          <button className="flex w-full items-center gap-2.5 rounded-lg border border-border bg-muted/50 px-3 py-2 text-[13px] text-muted-foreground hover:bg-muted transition-colors">
            <Search className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">Search...</span>
            <kbd className="ml-auto inline-flex items-center gap-0.5 rounded border border-border bg-background px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
              <span className="text-[9px]">⌘</span>K
            </kbd>
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-1" aria-label="Admin navigation">
        {navSectionsWithBadges.map((section) => (
          <NavSectionGroup
            key={section.label}
            section={section}
            expanded={expandedSections.includes(section.label)}
            onToggle={() => toggleSection(section.label)}
            collapsed={collapsed}
            activeHref={pathname}
            onNavigate={isMobile ? closeMobile : undefined}
          />
        ))}
      </nav>

      {/* Collapse Toggle (desktop only) */}
      {!isMobile && (
        <div className="px-2 py-2 border-t border-border">
          {collapsed ? (
            <Tooltip content="Expand sidebar" side="right">
              <button
                onClick={() => setCollapsed(false)}
                className="flex w-full items-center justify-center rounded-lg p-2 text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                aria-label="Expand sidebar"
              >
                <ChevronsRight className="h-4 w-4" />
              </button>
            </Tooltip>
          ) : (
            <button
              onClick={() => setCollapsed(true)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-[13px] font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              aria-label="Collapse sidebar"
            >
              <ChevronsLeft className="h-4 w-4 shrink-0" />
              <span>Collapse</span>
            </button>
          )}
        </div>
      )}

      {/* User */}
      <UserSection session={session} collapsed={collapsed} />
    </div>
  );

  return (
    <>
      {/* Mobile Hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-3 left-3 z-50 flex h-9 w-9 items-center justify-center rounded-lg bg-card border border-border"
        aria-label="Open menu"
      >
        <Menu className="h-4 w-4 text-muted-foreground" />
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={closeMobile}
              aria-hidden="true"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="absolute left-0 top-0 bottom-0 w-[260px] bg-card border-r border-border"
            >
              <div className="flex items-center justify-end p-2">
                <button
                  onClick={closeMobile}
                  className="p-2 rounded-lg hover:bg-muted text-muted-foreground"
                  aria-label="Close menu"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <SidebarContent isMobile />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden lg:block shrink-0 transition-all duration-300 ease-in-out",
          collapsed ? "w-[68px]" : "w-[240px]",
        )}
        aria-label="Admin sidebar"
      >
        <div className="sticky top-0 h-screen">
          <div className="h-full border-r border-border bg-card overflow-hidden">
            <SidebarContent />
          </div>
        </div>
      </aside>
    </>
  );
}
