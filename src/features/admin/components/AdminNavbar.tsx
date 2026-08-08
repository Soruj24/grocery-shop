"use client";

import { usePathname } from "next/navigation";
import { LayoutDashboard, ChevronRight, User as UserIcon } from "lucide-react";
import { cn } from "@/utils/utils";

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
    <header className={cn(
      "h-16 bg-card/80 backdrop-blur-md border-b border-border",
      "flex items-center justify-between px-6 sticky top-0 z-40",
    )}>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground">
          <LayoutDashboard className="w-4.5 h-4.5" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
            <span>অ্যাডমিন</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground">প্যানেল</span>
          </div>
          <h2 className="text-lg font-semibold text-foreground tracking-tight">
            {getPageTitle()}
          </h2>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">সিস্টেম অনলাইন</span>
        </div>
        <button className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors">
          <UserIcon className="w-4.5 h-4.5" />
        </button>
      </div>
    </header>
  );
}
