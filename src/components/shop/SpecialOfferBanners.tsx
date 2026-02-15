"use client";

import OfferBanner from "./SpecialOfferBanners/OfferBanner";

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
        image="https://images.unsplash.com/photo-1610832958506-aa56338406cd?auto=format&fit=crop&q=80&w=600"
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
        image="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600"
        gradient="bg-gradient-to-br from-blue-500 to-indigo-600"
        shadow="shadow-blue-500/20"
        textColor="text-white"
        buttonTextColor="text-blue-600"
        rotate="rotate-6"
      />
    </section>
  );
}
