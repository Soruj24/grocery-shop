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
    <Link href="/" className="group flex items-center gap-4 shrink-0">
      {settings.logo ? (
        <div className="relative w-14 h-14">
           <Image 
             src={settings.logo} 
             alt={settings.shopName} 
             fill 
             className="object-contain"
           />
        </div>
      ) : (
        <div className="relative w-14 h-14 bg-gradient-to-br from-primary to-primary-hover rounded-2xl flex items-center justify-center transform transition-all duration-700 group-hover:rotate-[360deg] shadow-primary">
          <ShoppingBasket className="w-8 h-8 text-white" />
          <div className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-yellow-400 rounded-full border-4 border-background animate-bounce shadow-lg"></div>
        </div>
      )}
      
      <div className="flex flex-col">
        <span className="text-2xl lg:text-3xl font-black tracking-tighter text-foreground leading-[0.8]">
          {settings.shopName ? (
            settings.shopName
          ) : (
            <>{t('brand_name_first')}<span className="text-primary">{t('brand_name_second')}</span></>
          )}
        </span>
        <span className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] mt-2">
          {t('brand_tagline')}
        </span>
      </div>
    </Link>
  );
}
