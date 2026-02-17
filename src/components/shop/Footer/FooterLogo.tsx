"use client";

import { Facebook, Twitter, Instagram, Youtube, ShoppingBasket } from "lucide-react";
import { useLanguage } from "@/components/LanguageContext";
import { useSettings } from "@/context/SettingsContext";
import Image from "next/image";
import Link from "next/link";

export default function FooterLogo() {
  const { t } = useLanguage();
  const settings = useSettings();

  const socialLinks = [
    { icon: Facebook, href: settings.facebook || "#", show: !!settings.facebook },
    { icon: Instagram, href: settings.instagram || "#", show: !!settings.instagram },
    { icon: Youtube, href: settings.youtube || "#", show: !!settings.youtube },
    // Twitter is not in settings schema, but we can keep it or remove it. 
    // Since it's not in schema, I'll remove it or just show if present (not present in schema).
  ].filter(link => link.show);

  return (
    <div className="space-y-8">
      <Link href="/" className="flex flex-col">
        {settings.logo ? (
          <div className="relative w-48 h-16">
            <Image 
              src={settings.logo} 
              alt={settings.shopName} 
              fill 
              className="object-contain object-left" 
            />
          </div>
        ) : (
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-700 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/20">
                <ShoppingBasket className="w-6 h-6 text-white" />
             </div>
             <div>
                <span className="text-2xl font-black tracking-tighter text-gray-900 dark:text-white leading-none block">
                  {settings.shopName || `${t('brand_name_first')} ${t('brand_name_second')}`}
                </span>
             </div>
          </div>
        )}
        <span className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] mt-3">
            {t('premium_grocery')}
        </span>
      </Link>
      
      <p className="text-gray-500 dark:text-gray-400 leading-relaxed font-bold text-sm">
        {settings.footerDescription || t('footer_desc')}
      </p>

      <div className="flex gap-4">
        {socialLinks.length > 0 ? (
          socialLinks.map((item, i) => (
            <a 
              key={i}
              href={item.href} 
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-[18px] flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-green-600 hover:text-white transition-all duration-500 group border border-transparent hover:border-green-400/20"
            >
              <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          ))
        ) : (
          // Default placeholders if no social links set
           [Facebook, Instagram, Youtube].map((Icon, i) => (
            <a 
              key={i}
              href="#" 
              className="w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-[18px] flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-green-600 hover:text-white transition-all duration-500 group border border-transparent hover:border-green-400/20"
            >
              <Icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          ))
        )}
      </div>
    </div>
  );
}
