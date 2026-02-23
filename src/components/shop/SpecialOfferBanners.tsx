"use client";

import OfferBanner from "./SpecialOfferBanners/OfferBanner";
import { getProductFallbackImage } from "@/lib/category-utils";
import { useLanguage } from "@/components/LanguageContext";

export default function SpecialOfferBanners() {
  const { t } = useLanguage();

  return (
    <section className="grid lg:grid-cols-2 gap-10">
      <OfferBanner 
        badge={t('banner_1_badge')}
        title={t('banner_1_title')}
        desc={t('banner_1_desc')}
        buttonText={t('banner_1_button')}
        image={getProductFallbackImage("orange")}
        href="/products?q=orange"
        gradient="bg-gradient-to-br from-orange-400 to-rose-500"
        shadow="shadow-orange-500/20"
        textColor="text-white"
        buttonTextColor="text-orange-600"
      />

      <OfferBanner 
        badge={t('banner_2_badge')}
        title={t('banner_2_title')}
        desc={t('banner_2_desc')}
        buttonText={t('banner_2_button')}
        image={getProductFallbackImage("bread")}
        href="/products?q=bread"
        gradient="bg-gradient-to-br from-blue-500 to-indigo-600"
        shadow="shadow-blue-500/20"
        textColor="text-white"
        buttonTextColor="text-blue-600"
        rotate="rotate-6"
      />
    </section>
  );
}
