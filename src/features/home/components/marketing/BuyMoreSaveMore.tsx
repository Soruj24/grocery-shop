"use client";

import { motion } from "framer-motion";
import { TrendingUp, Plus } from "lucide-react";
import useEmblaCarousel from 'embla-carousel-react';
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import { getProductFallbackImage } from "@/constants/fallback-images";

export default function BuyMoreSaveMore() {
  const { t } = useLanguage();
  const [emblaRef] = useEmblaCarousel({ 
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true
  });

  const offers = [
    { name: t('buy_more_rice'), base: `${t('price_75_tk')}/${t('buy_more_unit_kg')}`, tiered: t('buy_more_rice_tiered'), img: getProductFallbackImage("rice"), save: `${t('buy_more_save')} ${t('price_25_tk')}` },
    { name: t('buy_more_oil'), base: `${t('price_165_tk')}/${t('buy_more_unit_liter')}`, tiered: t('buy_more_oil_tiered'), img: getProductFallbackImage("oil"), save: `${t('buy_more_save')} ${t('price_35_tk')}` },
    { name: t('buy_more_sugar'), base: `${t('price_140_tk')}/${t('buy_more_unit_kg')}`, tiered: t('buy_more_sugar_tiered'), img: getProductFallbackImage("sugar"), save: `${t('buy_more_save')} ${t('price_15_tk')}` },
    { name: t('buy_more_dal'), base: `${t('price_135_tk')}/${t('buy_more_unit_kg')}`, tiered: t('buy_more_dal_tiered'), img: getProductFallbackImage("dal"), save: `${t('buy_more_save')} ${t('price_35_tk')}` },
    { name: t('buy_more_soap'), base: `${t('price_120_tk')}/${t('buy_more_unit_pack')}`, tiered: t('buy_more_soap_tiered'), img: getProductFallbackImage("soap"), save: `${t('buy_more_save')} ${t('price_30_tk')}` },
  ];

  return (
    <section className="py-8 bg-subtle rounded-2xl px-8 md:px-12">
      <div className="space-y-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-4xl font-black text-foreground">{t('buy_more_title')}</h2>
            <p className="text-muted-foreground font-bold">{t('buy_more_desc')}</p>
          </div>
          <div className="flex items-center gap-3 bg-card px-6 py-3 rounded-2xl border border-border shadow-sm">
            <TrendingUp className="w-5 h-5 text-primary" />
            <span className="font-black text-foreground uppercase tracking-widest text-xs">{t('buy_more_badge')}</span>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {offers.map((offer, i) => (
              <div key={i} className="flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_28%] min-w-0">
                <motion.div
                  whileHover={{ y: -10 }}
                  className="bg-card rounded-2xl p-8 border border-border shadow-sm h-full flex flex-col"
                >
                  <div className="w-20 h-20 bg-muted rounded-3xl flex items-center justify-center mb-6 overflow-hidden relative">
                    <Image
                      src={offer.img}
                      alt={offer.name}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>

                  <div className="space-y-2 mb-6 flex-1">
                    <h3 className="text-xl font-black text-foreground">{offer.name}</h3>
                    <p className="text-sm font-bold text-muted-foreground">{t('buy_more_regular_price')}: {offer.base}</p>
                    <div className="bg-primary-subtle p-4 rounded-2xl border border-primary-border mt-4">
                      <p className="text-primary-subtle-foreground font-black text-sm">{offer.tiered}</p>
                      <p className="text-[10px] font-black uppercase text-warning mt-1">{offer.save} {t('buy_more_save_direct')}</p>
                    </div>
                  </div>

                  <button className="w-full bg-foreground text-background py-4 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-primary hover:text-primary-foreground transition-all group">
                    <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                    {t('buy_more_increase_qty')}
                  </button>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
