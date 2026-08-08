"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/contexts/SettingsContext";

export default function FooterBottom() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const settings = useSettings();
  
  return (
    <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
      <div className="space-y-3 text-center md:text-left">
        <p className="text-sm text-muted-foreground">
          {settings.copyrightText ? (
             settings.copyrightText
          ) : (
             <>© {currentYear} <span className="text-foreground font-medium">{settings.shopName || `${t('brand_name_first')} ${t('brand_name_second')}`}</span>. {t('all_rights_reserved')}</>
          )}
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-4">
          <Link href="/terms" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t('terms_conditions')}</Link>
          <Link href="/privacy" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t('privacy_policy')}</Link>
          <Link href="/cookies" className="text-xs text-muted-foreground hover:text-foreground transition-colors">{t('cookies')}</Link>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-xs text-muted-foreground hidden sm:block">We Accept</span>
        <div className="flex items-center gap-1.5">
           {['Visa', 'Mastercard', 'Amex', 'Bkash', 'Nagad'].map((payment) => (
             <div key={payment} className="h-7 px-2.5 bg-muted border border-border rounded-md flex items-center justify-center text-[10px] font-medium text-muted-foreground">
               {payment}
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
