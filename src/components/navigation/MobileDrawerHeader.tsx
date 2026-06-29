"use client";

import Link from "next/link";
import { ShoppingBasket, X, User } from "lucide-react";
import { Session } from "next-auth";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileDrawerHeaderProps {
  onClose: () => void;
  session: Session | null;
}

export default function MobileDrawerHeader({ onClose, session }: MobileDrawerHeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="relative p-8 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/[0.02]">
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center gap-3" onClick={onClose} aria-label={t("home_page")}>
          <div className="bg-green-600 p-2 rounded-xl shadow-lg shadow-green-600/20">
            <ShoppingBasket className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black text-gray-900 dark:text-white">
            {t("brand_name_first")} <span className="text-green-600">{t("brand_name_second")}</span>
          </span>
        </Link>
        <button
          onClick={onClose}
          className="w-12 h-12 rounded-2xl bg-white dark:bg-white/5 flex items-center justify-center text-gray-400 hover:text-rose-500 transition-all border border-gray-100 dark:border-white/10 hover:rotate-90 duration-300"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      {session ? (
        <div className="flex items-center gap-4 p-4 bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-12 h-12 bg-green-500 rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-lg shadow-green-500/20 relative z-10">
            {session.user?.name?.charAt(0)}
          </div>
          <div className="flex-1 min-w-0 relative z-10">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-0.5">{t("welcome_back")}</p>
            <p className="text-sm font-black text-gray-900 dark:text-white truncate">{session.user?.name}</p>
          </div>
        </div>
      ) : (
        <Link
          href="/login"
          onClick={onClose}
          className="flex items-center gap-4 p-5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-3xl font-black text-base justify-center shadow-xl hover:bg-green-600 hover:text-white transition-all hover:scale-[1.02] active:scale-[0.98]"
          aria-label={t("login_signup")}
        >
          <User size={18} />
          {t("login_signup")}
        </Link>
      )}
    </div>
  );
}
