"use client";

import { Facebook, Instagram, Youtube, ShoppingBasket } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSettings } from "@/contexts/SettingsContext";
import Image from "next/image";
import Link from "next/link";

export default function FooterLogo() {
  const { t } = useLanguage();
  const settings = useSettings();

  const socialLinks = [
    { icon: Facebook, href: settings.facebook || "#", show: !!settings.facebook },
    { icon: Instagram, href: settings.instagram || "#", show: !!settings.instagram },
    { icon: Youtube, href: settings.youtube || "#", show: !!settings.youtube },
  ].filter(link => link.show);

  return (
    <div className="space-y-6">
      <Link href="/" className="inline-flex flex-col group">
        {settings.logo ? (
          <div className="relative w-40 h-12">
            <Image 
              src={settings.logo} 
              alt={settings.shopName} 
              fill 
              className="object-contain object-left" 
            />
          </div>
        ) : (
          <div className="flex items-center gap-2.5">
             <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                <ShoppingBasket className="w-4 h-4 text-background" />
             </div>
             <span className="text-lg font-semibold tracking-tight text-foreground">
               {settings.shopName || `${t('brand_name_first')} ${t('brand_name_second')}`}
             </span>
          </div>
        )}
      </Link>
      
      <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
        {settings.footerDescription || t('footer_desc')}
      </p>

      <div className="flex gap-2">
        {socialLinks.length > 0 ? (
           socialLinks.map((item, i) => (
            <a
              key={i}
              href={item.href} 
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <item.icon className="w-4 h-4" />
            </a>
          ))
        ) : (
           [Facebook, Instagram, Youtube].map((Icon, i) => (
            <a
              key={i}
              href="#" 
              className="w-9 h-9 rounded-lg flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))
        )}
      </div>
    </div>
  );
}
