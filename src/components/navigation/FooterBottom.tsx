"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/contexts/SettingsContext";

export default function FooterBottom() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();
  const settings = useSettings();
  
  return (
    <div className="mt-20 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="space-y-4 text-center md:text-left">
        <p className="text-sm font-bold text-muted-foreground">
          {settings.copyrightText ? (
             settings.copyrightText
          ) : (
             <>© {currentYear} <span className="text-foreground font-black">{settings.shopName || `${t('brand_name_first')} ${t('brand_name_second')}`}</span>. {t('all_rights_reserved')}</>
          )}
        </p>
        <div className="flex flex-wrap justify-center md:justify-start gap-6">
          <Link href="/terms" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">{t('terms_conditions')}</Link>
          <Link href="/privacy" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">{t('privacy_policy')}</Link>
          <Link href="/cookies" className="text-xs font-bold text-muted-foreground hover:text-primary transition-colors uppercase tracking-wider">{t('cookies')}</Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-xs font-black text-muted-foreground uppercase tracking-widest hidden sm:block">We Accept</span>
        <div className="flex items-center gap-2">
           {['Visa', 'Mastercard', 'Amex', 'Bkash', 'Nagad'].map((payment) => (
             <div key={payment} className="h-8 px-3 bg-card border border-border rounded-lg flex items-center justify-center text-[10px] font-black uppercase tracking-wider text-muted-foreground hover:border-primary/30 hover:text-primary transition-colors cursor-default">
               {payment}
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
