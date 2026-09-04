"use client";

import Link from "next/link";
import { ShoppingBasket, X, User } from "lucide-react";
import { Session } from "next-auth";
import { useLanguage } from "@/contexts/LanguageContext";

interface MobileDrawerHeaderProps {
  onClose: () => void;
  session: Session | null;
}

export default function MobileDrawerHeader({
  onClose,
  session,
}: MobileDrawerHeaderProps) {
  const { t } = useLanguage();

  return (
    <div className="relative p-6 border-b border-border bg-subtle">
      <div className="flex items-center justify-between mb-6">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={onClose}
          aria-label={t("home_page")}
        >
          <div className="bg-foreground p-2 rounded-xl">
            <ShoppingBasket className="w-5 h-5 text-background" />
          </div>
          <span className="text-lg font-bold text-foreground tracking-[-0.02em]">
            {t("brand_name_first")}{" "}
            <span className="text-muted-foreground">
              {t("brand_name_second")}
            </span>
          </span>
        </Link>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground hover:text-danger hover:bg-danger-subtle transition-all duration-300 border border-border"
          aria-label="Close"
        >
          <X size={18} />
        </button>
      </div>

      {session ? (
        <div className="flex items-center gap-3 p-3.5 bg-muted rounded-xl border border-border">
          <div className="w-10 h-10 bg-foreground rounded-xl flex items-center justify-center text-background text-sm font-bold">
            {session.user?.name?.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-semibold text-muted-foreground/60 uppercase tracking-widest mb-0.5">
              {t("welcome_back")}
            </p>
            <p className="text-sm font-semibold text-foreground truncate">
              {session.user?.name}
            </p>
          </div>
        </div>
      ) : (
        <Link
          href="/login"
          onClick={onClose}
          className="flex items-center gap-3 p-4 bg-foreground text-background rounded-xl font-semibold text-sm justify-center transition-all duration-300 hover:opacity-90 active:scale-[0.98]"
          aria-label={t("login_signup")}
        >
          <User size={16} />
          {t("login_signup")}
        </Link>
      )}
    </div>
  );
}
