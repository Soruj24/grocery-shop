"use client";

import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";
import { useSettings } from "@/context/SettingsContext";
import { CreditCard } from "lucide-react";

export default function FooterBottom() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const settings = useSettings();
  
  return (
    <div className="mt-20 pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="space-y-4 text-center md:text-left">
        <p className="text-sm font-bold text-gray-400 dark:text-gray-500">
          {settings.copyrightText ? (
             settings.copyrightText
          ) : (
             <>© {currentYear} <span className="text-gray-900 dark:text-white font-black">{settings.shopName || `${t('brand_name_first')} ${t('brand_name_second')}`}</span>. {t('all_rights_reserved')}</>
          )}
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          <Link href="/terms" className="text-xs font-bold text-gray-400 dark:text-gray-500 hover:text-green-600 transition-colors uppercase tracking-wider">{t('terms_conditions')}</Link>
          <Link href="/privacy" className="text-xs font-bold text-gray-400 dark:text-gray-500 hover:text-green-600 transition-colors uppercase tracking-wider">{t('privacy_policy')}</Link>
          <Link href="/cookies" className="text-xs font-bold text-gray-400 dark:text-gray-500 hover:text-green-600 transition-colors uppercase tracking-wider">{t('cookies')}</Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest hidden sm:block">We Accept</span>
        <div className="flex items-center gap-2">
           {['Visa', 'Mastercard', 'Amex', 'Bkash', 'Nagad'].map((payment) => (
             <div key={payment} className="h-8 px-3 bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 rounded-lg flex items-center justify-center text-[10px] font-black uppercase tracking-wider text-gray-500 hover:border-green-500/30 hover:text-green-600 transition-colors cursor-default">
               {payment}
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
