"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { useSettings } from "@/context/SettingsContext";

export default function FooterBottom() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const settings = useSettings();
  
  return (
    <div className="mt-24 pt-12 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
      <p className="text-sm font-bold text-gray-400 dark:text-gray-500">
        {settings.copyrightText ? (
           settings.copyrightText
        ) : (
           <>© {currentYear} <span className="text-gray-900 dark:text-white font-black">{settings.shopName || `${t('brand_name_first')} ${t('brand_name_second')}`}</span>. {t('all_rights_reserved')}</>
        )}
      </p>
      <div className="flex items-center gap-8">
        <Link href="/track-order" className="text-sm font-bold text-gray-400 dark:text-gray-500 hover:text-green-600 transition-colors">অর্ডার ট্র্যাক</Link>
        <Link href="/terms" className="text-sm font-bold text-gray-400 dark:text-gray-500 hover:text-green-600 transition-colors">{t('terms_conditions')}</Link>
        <Link href="/privacy" className="text-sm font-bold text-gray-400 dark:text-gray-500 hover:text-green-600 transition-colors">{t('privacy_policy')}</Link>
        <Link href="/cookies" className="text-sm font-bold text-gray-400 dark:text-gray-500 hover:text-green-600 transition-colors">{t('cookies')}</Link>
      </div>
    </div>
  );
}
