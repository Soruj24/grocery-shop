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
        className="group flex items-center gap-3 h-12 px-6 bg-foreground text-background rounded-2xl font-black text-sm transition-all hover:bg-primary hover:text-primary-foreground shadow-xl active:scale-95"
      >
        <User className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="hidden sm:inline uppercase tracking-widest">
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
      <button className="flex items-center gap-3 h-12 pl-1.5 pr-4 bg-muted hover:bg-card rounded-2xl transition-all border border-transparent hover:border-border group shadow-sm hover:shadow-md">
        <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary-hover rounded-xl flex items-center justify-center text-white text-base font-black shadow-lg shadow-primary">
          {session.user?.name?.charAt(0)}
        </div>
        <div className="hidden lg:flex flex-col items-start text-left leading-tight">
          <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">
            {t("register")}
          </span>
          <span className="text-sm font-black text-foreground line-clamp-1">
            {session.user?.name?.split(" ")[0]}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-muted-foreground transition-transform duration-500 ${isProfileOpen ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isProfileOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute right-0 mt-4 w-72 bg-card rounded-2xl shadow-2xl border border-border py-3 z-[100] backdrop-blur-3xl overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-border mb-2">
              <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">
                {t("logged_in_as")}
              </p>
              <p className="text-base font-black text-foreground truncate">
                {session.user?.email}
              </p>
            </div>

            <div className="px-2 space-y-1">
              <Link
                href="/admin/dashboard"
                className="flex items-center gap-4 px-4 py-3 text-muted-foreground hover:bg-primary-subtle hover:text-primary rounded-2xl transition-all font-bold group"
                onClick={() => setIsProfileOpen(false)}
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary-subtle transition-colors">
                  <LayoutGrid className="w-5 h-5" />
                </div>
                {t("dashboard")}
              </Link>

              <Link
                href="/orders"
                className="flex items-center gap-4 px-4 py-3 text-muted-foreground hover:bg-primary-subtle hover:text-primary rounded-2xl transition-all font-bold group"
                onClick={() => setIsProfileOpen(false)}
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary-subtle transition-colors">
                  <ShoppingBasket className="w-5 h-5" />
                </div>
                {t("my_orders")}
              </Link>

              <Link
                href="/settings"
                className="flex items-center gap-4 px-4 py-3 text-muted-foreground hover:bg-primary-subtle hover:text-primary rounded-2xl transition-all font-bold group"
                onClick={() => setIsProfileOpen(false)}
              >
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center group-hover:bg-primary-subtle transition-colors">
                  <Settings className="w-5 h-5" />
                </div>
                {t("settings")}
              </Link>
            </div>

            <div className="mt-3 pt-3 border-t border-border px-2">
              <button
                onClick={() => signOut()}
                className="flex items-center gap-4 w-full px-4 py-4 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all font-black group"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center group-hover:bg-rose-100 dark:group-hover:bg-rose-500/20 transition-colors">
                  <LogOut className="w-5 h-5" />
                </div>
                {t("logout")}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
