"use client";

import { useLanguage } from "@/components/LanguageContext";

export default function LoadingState({ message }: { message?: string }) {
  const { t } = useLanguage();
  
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-gray-400 dark:text-gray-500 font-black animate-pulse uppercase tracking-widest">
        {message || t('loading')}
      </div>
    </div>
  );
}
