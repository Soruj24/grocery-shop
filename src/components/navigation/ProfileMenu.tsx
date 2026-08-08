"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  ChevronDown,
  LayoutGrid,
  ShoppingBasket,
  Settings,
  LogOut,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ProfileMenu() {
  const { data: session } = useSession();
  const { t } = useLanguage();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  if (!session) {
    return (
      <Link
        href="/login"
        className="flex items-center gap-2 h-9 px-4 bg-foreground text-background rounded-lg font-medium text-xs transition-all hover:opacity-90 active:scale-[0.98]"
      >
        <User className="w-4 h-4" />
        <span className="hidden sm:inline">
          {t("login")}
        </span>
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsProfileOpen(true)}
      onMouseLeave={() => setIsProfileOpen(false)}
    >
      <button className="flex items-center gap-2 h-9 pl-1 pr-3 bg-muted hover:bg-border/50 rounded-lg transition-colors">
        <div className="w-7 h-7 bg-foreground rounded-md flex items-center justify-center text-background text-xs font-medium">
          {session.user?.name?.charAt(0)}
        </div>
        <div className="hidden lg:flex flex-col items-start text-left leading-tight">
          <span className="text-[10px] text-muted-foreground">
            {t("register")}
          </span>
          <span className="text-xs font-medium text-foreground line-clamp-1">
            {session.user?.name?.split(" ")[0]}
          </span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-muted-foreground transition-transform duration-300 ${isProfileOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 bg-card rounded-xl shadow-lg border border-border py-2 z-[100]"
          >
            <div className="px-4 py-3 border-b border-border mb-1">
              <p className="text-[11px] text-muted-foreground mb-0.5">
                {t("logged_in_as")}
              </p>
              <p className="text-sm font-medium text-foreground truncate">
                {session.user?.email}
              </p>
            </div>

            <div className="px-1.5 space-y-0.5">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                onClick={() => setIsProfileOpen(false)}
              >
                <LayoutGrid className="w-4 h-4" />
                {t("dashboard")}
              </Link>

              <Link
                href="/orders"
                className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                onClick={() => setIsProfileOpen(false)}
              >
                <ShoppingBasket className="w-4 h-4" />
                {t("my_orders")}
              </Link>

              <Link
                href="/settings"
                className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg transition-colors font-medium"
                onClick={() => setIsProfileOpen(false)}
              >
                <Settings className="w-4 h-4" />
                {t("settings")}
              </Link>
            </div>

            <div className="mt-1 pt-1 border-t border-border px-1.5">
              <button
                onClick={() => signOut()}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm text-danger hover:bg-danger-subtle rounded-lg transition-colors font-medium"
              >
                <LogOut className="w-4 h-4" />
                {t("logout")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
