"use client";

import { Globe, CircleDollarSign } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/contexts/SettingsContext";

export function CurrencyTag() {
  const { currencySymbol } = useSettings();
  return (
    <span className="hidden items-center gap-1 rounded-2xl bg-muted px-3 py-2 text-xs font-black text-foreground transition-colors hover:bg-primary-subtle hover:text-primary lg:inline-flex">
      <CircleDollarSign className="w-4 h-4" />
      {currencySymbol}
    </span>
  );
}

export function LanguageTag() {
  return (
    <span className="hidden items-center gap-1.5 rounded-2xl bg-muted px-3 py-2 text-xs font-black uppercase tracking-wider text-foreground transition-colors hover:bg-primary-subtle hover:text-primary xl:inline-flex">
      <Globe className="w-4 h-4" />
      বাং
    </span>
  );
}
