"use client";

 
import { Moon, Star, ArrowRight, Plus } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageContext";

export default function RamadanOffers() {
  const { t } = useLanguage();
  const offers = [
    {
      title: t('ramadan_combo_title'),
      discount: t('ramadan_combo_off'),
      icon: "🍱",
      color: "bg-emerald-500",
    },
    {
      title: t('ramadan_dates_title'),
      discount: t('ramadan_dates_off'),
      icon: "🌴",
      color: "bg-amber-500",
    },
    {
      title: t('ramadan_drinks_title'),
      discount: t('ramadan_drinks_off'),
      icon: "🍹",
      color: "bg-blue-500",
    },
  ];

  return (
    <section className="py-12 relative overflow-hidden">
      {/* Islamic Pattern Background Mockup */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none">
        <div className="grid grid-cols-6 gap-4 transform rotate-12">
          {Array.from({ length: 24 }).map((_, i) => (
            <Star key={i} className="w-12 h-12" />
          ))}
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center gap-8 bg-[#1a2e35] rounded-32px p-8 md:p-12 text-white relative border border-emerald-500/20 shadow-2xl shadow-emerald-950/20">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full border border-emerald-500/20">
            <Moon className="w-4 h-4 fill-current" />
            <span className="text-xs font-black uppercase tracking-widest">
              {t('ramadan_badge')}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black tracking-tight leading-tight">
            {t('ramadan_title')} <br />
            <span className="text-emerald-400">{t('ramadan_subtitle')}</span>
          </h2>

          <p className="text-gray-400 font-medium max-w-md">
            {t('ramadan_desc')}
          </p>

          <Link
            href="/products"
            className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 rounded-2xl font-black transition-all inline-flex items-center gap-3 shadow-lg shadow-emerald-500/20 active:scale-95"
          >
            {t('ramadan_view_all')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
          {offers.map((offer, i) => (
            <div
              key={i}
              className={`${offer.color} bg-opacity-5 border border-white/5 rounded-2xl p-6 flex items-center gap-4 group transition-all cursor-pointer hover:bg-opacity-10`}
            >
              <div className="text-4xl bg-white/10 p-3 rounded-2xl group-hover:scale-105 transition-transform">
                {offer.icon}
              </div>
              <div>
                <h4 className="font-black text-lg">{offer.title}</h4>
                <p className="text-emerald-400 font-bold text-sm">
                  {offer.discount}
                </p>
              </div>
            </div>
          ))}
          <Link
            href="/products"
            className="bg-white/5 border border-dashed border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center gap-2 text-center group cursor-pointer hover:bg-white/10 transition-all"
          >
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
              <Plus className="w-5 h-5 text-gray-400" />
            </div>
            <span className="text-sm font-black text-gray-400">{t('ramadan_more_offers')}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function PlusIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  );
}
