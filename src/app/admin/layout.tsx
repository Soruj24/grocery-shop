"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import { 
  LayoutDashboard, 
  Package, 
  ListTree, 
  ShoppingCart, 
  Users, 
  Settings, 
  LogOut,
  ChevronRight,
  User as UserIcon
} from "lucide-react";
import ThemeToggle from "@/components/ThemeToggle";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  return (
    <div className="flex min-h-screen bg-gray-50/50 dark:bg-gray-950">
      <AdminSidebar session={session} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#fcfdfd] dark:bg-gray-950">
        <AdminNavbar />

        <div className="flex-1 p-10 overflow-y-auto custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
}
