"use client";

import { useLanguage } from "@/contexts/LanguageContext";

export default function LoadingState({ message }: { message?: string }) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20" />
        <div className="absolute inset-0 rounded-full border-2 border-primary border-r-transparent ds-animate-spin" />
      </div>
      <p className="text-sm font-semibold text-muted-foreground uppercase tracking-widest">
        {message || t("loading")}
      </p>
    </div>
  );
}
