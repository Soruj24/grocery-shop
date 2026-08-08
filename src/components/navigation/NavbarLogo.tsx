"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBasket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/contexts/SettingsContext";

export default function NavbarLogo() {
  const { t } = useLanguage();
  const settings = useSettings();

  return (
    <Link href="/" className="group flex items-center gap-3 shrink-0">
      {settings.logo ? (
        <div className="relative w-10 h-10">
           <Image 
             src={settings.logo} 
             alt={settings.shopName} 
             fill 
             className="object-contain"
           />
        </div>
      ) : (
        <div className="relative w-10 h-10 bg-foreground rounded-xl flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
          <ShoppingBasket className="w-5 h-5 text-background" />
        </div>
      )}
      
      <div className="flex flex-col">
        <span className="text-xl font-semibold tracking-tight text-foreground leading-none">
          {settings.shopName ? (
            settings.shopName
          ) : (
            <>{t('brand_name_first')}<span className="text-muted-foreground">{t('brand_name_second')}</span></>
          )}
        </span>
        <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-[0.15em] mt-0.5">
          {t('brand_tagline')}
        </span>
      </div>
    </Link>
  );
}
