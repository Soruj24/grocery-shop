"use client";

import { ReactNode, useState, useEffect, useRef, KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Command, ArrowRight, Hash, Package, ShoppingCart, Users, Settings, FileText } from "lucide-react";

interface CommandItem {
  id: string;
  label: string;
  icon: React.ElementType;
  href: string;
  category: string;
}

const defaultItems: CommandItem[] = [
  { id: "dashboard", label: "Dashboard", icon: Hash, href: "/admin/dashboard", category: "Navigation" },
  { id: "orders", label: "Orders", icon: ShoppingCart, href: "/admin/orders", category: "Navigation" },
  { id: "products", label: "Products", icon: Package, href: "/admin/products", category: "Navigation" },
  { id: "customers", label: "Customers", icon: Users, href: "/admin/customers", category: "Navigation" },
  { id: "settings", label: "Settings", icon: Settings, href: "/admin/settings", category: "Navigation" },
  { id: "analytics", label: "Analytics", icon: FileText, href: "/admin/analytics", category: "Navigation" },
  { id: "coupons", label: "Coupons", icon: Hash, href: "/admin/coupons", category: "Navigation" },
  { id: "categories", label: "Categories", icon: Hash, href: "/admin/categories", category: "Navigation" },
  { id: "brands", label: "Brands", icon: Hash, href: "/admin/brands", category: "Navigation" },
  { id: "inventory", label: "Inventory", icon: Hash, href: "/admin/inventory", category: "Navigation" },
  { id: "reviews", label: "Reviews", icon: Hash, href: "/admin/reviews", category: "Navigation" },
  { id: "returns", label: "Returns", icon: Hash, href: "/admin/returns", category: "Navigation" },
  { id: "support", label: "Support Tickets", icon: Hash, href: "/admin/support", category: "Navigation" },
  { id: "marketing", label: "Marketing", icon: Hash, href: "/admin/marketing", category: "Navigation" },
  { id: "reports", label: "Reports", icon: Hash, href: "/admin/reports", category: "Navigation" },
  { id: "users", label: "Users", icon: Hash, href: "/admin/users", category: "Navigation" },
  { id: "permissions", label: "Permissions", icon: Hash, href: "/admin/permissions", category: "Navigation" },
  { id: "activity-logs", label: "Activity Logs", icon: Hash, href: "/admin/activity-logs", category: "Navigation" },
  { id: "notifications", label: "Notifications", icon: Hash, href: "/admin/notifications", category: "Navigation" },
];

interface AdminCommandPaletteProps {
  items?: CommandItem[];
  onSelect?: (item: CommandItem) => void;
}

export default function AdminCommandPalette({ items = defaultItems, onSelect }: AdminCommandPaletteProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler as unknown as EventListener);
    return () => window.removeEventListener("keydown", handler as unknown as EventListener);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1)); }
    if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex((i) => Math.max(i - 1, 0)); }
    if (e.key === "Enter" && filtered[selectedIndex]) {
      if (onSelect) onSelect(filtered[selectedIndex]);
      else window.location.href = filtered[selectedIndex].href;
      setOpen(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-3 py-2 text-sm text-gray-400 hover:border-gray-300 dark:hover:border-gray-700 transition-colors w-full max-w-xs"
      >
        <Search className="h-4 w-4" />
        <span className="flex-1 text-left">Search...</span>
        <kbd className="hidden sm:inline-flex items-center gap-0.5 rounded-md bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">
          <Command className="h-2.5 w-2.5" />K
        </kbd>
      </button>

      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100]">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <div className="fixed inset-x-0 top-[20%] mx-auto max-w-lg px-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.15 }}
                className="rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-2xl overflow-hidden"
              >
                <div className="flex items-center gap-3 border-b border-gray-100 dark:border-gray-800 px-4">
                  <Search className="h-4 w-4 text-gray-400" />
                  <input
                    ref={inputRef}
                    type="text"
                    placeholder="Type a command..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 bg-transparent py-3.5 text-sm text-gray-900 dark:text-white placeholder:text-gray-400 outline-none"
                  />
                  <kbd className="rounded-md bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">ESC</kbd>
                </div>
                <div className="max-h-80 overflow-y-auto p-2">
                  {filtered.length === 0 ? (
                    <div className="py-8 text-center text-sm text-gray-400">No results found</div>
                  ) : (
                    filtered.map((item, i) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          if (onSelect) onSelect(item);
                          else window.location.href = item.href;
                          setOpen(false);
                        }}
                        className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors ${
                          i === selectedIndex
                            ? "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                        }`}
                      >
                        <item.icon className="h-4 w-4 shrink-0" />
                        <span className="flex-1 text-left font-medium">{item.label}</span>
                        <ArrowRight className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100" />
                      </button>
                    ))
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
