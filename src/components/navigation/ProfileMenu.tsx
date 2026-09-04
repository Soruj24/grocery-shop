"use client";

import { useState, useRef, useEffect } from "react";
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
  const [isProfileOpen, setIsProfileOpen] =
    useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(
    null
  );

  const handleMouseEnter = () => {
    if (timeoutRef.current)
      clearTimeout(timeoutRef.current);
    setIsProfileOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(
      () => setIsProfileOpen(false),
      150
    );
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current)
        clearTimeout(timeoutRef.current);
    };
  }, []);

  if (!session) {
    return (
      <Link
        href="/login"
        className="flex items-center gap-2 h-9 px-4 bg-foreground text-background rounded-lg font-semibold text-xs transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
      >
        <User className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">
          {t("login")}
        </span>
      </Link>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className="flex items-center gap-2 h-9 pl-1 pr-3 bg-muted hover:bg-muted rounded-lg transition-all duration-200"
        aria-expanded={isProfileOpen}
        aria-haspopup="true"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setIsProfileOpen(!isProfileOpen);
          }
          if (
            e.key === "Escape"
          ) {
            setIsProfileOpen(false);
          }
        }}
      >
        <div className="w-7 h-7 bg-foreground rounded-md flex items-center justify-center text-background text-xs font-bold">
          {session.user?.name?.charAt(0)}
        </div>
        <div className="hidden lg:flex flex-col items-start text-left leading-tight">
          <span className="text-[10px] text-muted-foreground/60">
            {t("register")}
          </span>
          <span className="text-xs font-semibold text-foreground line-clamp-1">
            {session.user?.name?.split(" ")[0]}
          </span>
        </div>
        <ChevronDown
          className={`w-3.5 h-3.5 text-muted-foreground/50 transition-transform duration-300 ${
            isProfileOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{
              duration: 0.15,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="absolute right-0 mt-2 w-64 bg-card rounded-xl shadow-lg border border-border py-1.5 z-[100]"
            role="menu"
          >
            <div className="px-4 py-3 border-b border-border mb-1">
              <p className="text-[11px] text-muted-foreground/60 mb-0.5">
                {t("logged_in_as")}
              </p>
              <p className="text-sm font-semibold text-foreground truncate">
                {session.user?.email}
              </p>
            </div>

            <div className="px-1.5 space-y-0.5">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg transition-colors duration-200 font-medium"
                onClick={() =>
                  setIsProfileOpen(false)
                }
                role="menuitem"
              >
                <LayoutGrid className="w-4 h-4" />
                {t("dashboard")}
              </Link>

              <Link
                href="/orders"
                className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg transition-colors duration-200 font-medium"
                onClick={() =>
                  setIsProfileOpen(false)
                }
                role="menuitem"
              >
                <ShoppingBasket className="w-4 h-4" />
                {t("my_orders")}
              </Link>

              <Link
                href="/settings"
                className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground hover:bg-muted rounded-lg transition-colors duration-200 font-medium"
                onClick={() =>
                  setIsProfileOpen(false)
                }
                role="menuitem"
              >
                <Settings className="w-4 h-4" />
                {t("settings")}
              </Link>
            </div>

            <div className="mt-1 pt-1 border-t border-border px-1.5">
              <button
                onClick={() => signOut()}
                className="flex items-center gap-3 w-full px-3 py-2 text-sm text-danger hover:bg-danger-subtle rounded-lg transition-colors duration-200 font-medium"
                role="menuitem"
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
