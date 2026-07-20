"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MobileDrawerFooter() {
  const { t } = useLanguage();

  return (
    <div className="p-6 sm:p-8 border-t border-border space-y-4 bg-muted">
      <button
        onClick={() => signOut()}
        className="flex items-center gap-4 w-full p-5 text-rose-500 font-black hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-all group border border-transparent hover:border-rose-200 dark:hover:border-rose-500/20"
        aria-label={t("logout")}
      >
        <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-500/10 flex items-center justify-center group-hover:bg-rose-100 transition-colors">
          <LogOut size={20} />
        </div>
        {t("logout")}
      </button>
    </div>
  );
}
