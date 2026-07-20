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
    <footer className="bg-card dark:bg-card border-t border-border mt-20 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full -ml-64 -mt-64 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-info/5 blur-[120px] rounded-full -mr-64 -mb-64 pointer-events-none" />

      {/* Main Footer Info */}
      <div className="max-w-7xl mx-auto px-8 py-24 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
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

