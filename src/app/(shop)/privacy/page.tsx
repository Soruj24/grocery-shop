"use client";

import { useLanguage } from "@/components/LanguageContext";

export default function PrivacyPage() {
  const { t } = useLanguage();
  return (
    <div className="max-w-4xl mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-8">{t('privacy_title')}</h1>
      <div className="prose dark:prose-invert max-w-none">
        <p>{t('privacy_content')}</p>
      </div>
    </div>
  );
}
