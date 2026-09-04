"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function MobileDrawerFooter() {
  const { t } = useLanguage();

  return (
    <div className="p-6 sm:p-8 border-t border-border space-y-4 bg-subtle">
      <button
        onClick={() => signOut()}
        className="flex items-center gap-3 w-full p-4 text-danger font-semibold text-sm hover:bg-danger-subtle rounded-xl transition-all duration-200 group border border-transparent hover:border-danger/20"
        aria-label={t("logout")}
      >
        <div className="w-9 h-9 rounded-lg bg-danger-subtle flex items-center justify-center group-hover:bg-danger-subtle transition-colors duration-200">
          <LogOut size={16} />
        </div>
        {t("logout")}
      </button>
    </div>
  );
}
