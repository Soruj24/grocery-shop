"use client";

import FooterLogo from "./FooterLogo";
import FooterLinks from "./FooterLinks";
import FooterContact from "./FooterContact";
import FooterBottom from "./FooterBottom";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const quickLinks = [
    { name: t('nav_products'), href: "/products" },
    { name: t('nav_cart'), href: "/cart" },
    { name: t('nav_wishlist'), href: "/wishlist" },
    { name: t('my_orders'), href: "/orders" }
  ];

  const customerServiceLinks = [
    { name: t('about_us'), href: "/about" },
    { name: t('help'), href: "/support" },
    { name: t('privacy_policy'), href: "/privacy" },
    { name: t('terms_conditions'), href: "/terms" }
  ];

  return (
    <footer className="bg-card border-t border-border mt-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
          <FooterLogo />
          <FooterLinks title={t('quick_links')} links={quickLinks} />
          <FooterLinks title={t('customer_service')} links={customerServiceLinks} />
          <FooterContact />
        </div>

        <FooterBottom />
      </div>
    </footer>
  );
}
