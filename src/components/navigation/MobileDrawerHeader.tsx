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
    <div className="relative p-8 border-b border-border bg-muted">
      <div className="flex items-center justify-between mb-8">
        <Link href="/" className="flex items-center gap-3" onClick={onClose} aria-label={t("home_page")}>
          <div className="bg-primary p-2 rounded-xl shadow-lg shadow-primary">
            <ShoppingBasket className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black text-foreground">
            {t("brand_name_first")} <span className="text-primary">{t("brand_name_second")}</span>
          </span>
        </Link>
        <button
          onClick={onClose}
          className="w-12 h-12 rounded-2xl bg-card flex items-center justify-center text-muted-foreground hover:text-rose-500 transition-all border border-border hover:rotate-90 duration-300"
          aria-label="Close"
        >
          <X size={20} />
        </button>
      </div>

      {session ? (
        <div className="flex items-center gap-4 p-4 bg-card rounded-2xl border border-border shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-subtle to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-primary-foreground text-xl font-black shadow-lg shadow-primary relative z-10">
            {session.user?.name?.charAt(0)}
          </div>
          <div className="flex-1 min-w-0 relative z-10">
            <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-0.5">{t("welcome_back")}</p>
            <p className="text-sm font-black text-foreground truncate">{session.user?.name}</p>
          </div>
        </div>
      ) : (
        <Link
          href="/login"
          onClick={onClose}
          className="flex items-center gap-4 p-5 bg-foreground text-background rounded-2xl font-black text-base justify-center shadow-xl hover:bg-primary hover:text-primary-foreground transition-all hover:scale-[1.02] active:scale-[0.98]"
          aria-label={t("login_signup")}
        >
          <User size={18} />
          {t("login_signup")}
        </Link>
      )}
    </div>
  );
}
