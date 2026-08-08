"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MobileDrawerFooter() {
  const { t } = useLanguage();

  return (
    <div className="p-6 sm:p-8 border-t border-black/[0.06] dark:border-white/[0.06] space-y-4 bg-black/[0.02] dark:bg-white/[0.02]">
      <button
        onClick={() => signOut()}
        className="flex items-center gap-3 w-full p-4 text-rose-500 font-semibold text-sm hover:bg-rose-500/[0.06] dark:hover:bg-rose-500/[0.08] rounded-xl transition-all duration-200 group border border-transparent hover:border-rose-200/50 dark:hover:border-rose-500/[0.15]"
        aria-label={t("logout")}
      >
        <div className="w-9 h-9 rounded-lg bg-rose-500/[0.06] dark:bg-rose-500/[0.08] flex items-center justify-center group-hover:bg-rose-500/[0.1] transition-colors duration-200">
          <LogOut size={16} />
        </div>
        {t("logout")}
      </button>
    </div>
  );
}
