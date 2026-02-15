import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroCountdown from "./HeroCountdown";
import { useLanguage } from "@/components/LanguageContext";

export default function HeroContent() {
  const { t } = useLanguage();
  return (
    <div className="relative z-20 h-full flex flex-col justify-center px-8 sm:px-24 max-w-4xl text-white">
      <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-[24px] mb-10 w-fit">
        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
        <span className="text-xs font-black tracking-[0.3em] uppercase text-white/90">
          {t('hero_badge_1')}
        </span>
      </div>

      <h1 className="text-7xl sm:text-9xl font-black mb-10 leading-[0.9] tracking-tighter">
        {t('hero_title_1')} <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-300">
          {t('hero_subtitle_1')}
        </span>
      </h1>

      <p className="text-white/70 mb-14 text-xl sm:text-2xl max-w-2xl leading-relaxed font-medium">
        {t('hero_welcome')}
      </p>

      <div className="flex flex-wrap items-center gap-8">
        <Link
          href="/products"
          className="group relative bg-[#00D26A] text-black px-12 py-6 rounded-[28px] font-black text-xl transition-all duration-500 flex items-center overflow-hidden hover:pr-16 active:scale-95 shadow-[0_20px_40px_-10px_rgba(0,210,106,0.3)]"
        >
          <span className="relative z-10">{t('hero_start_shopping')}</span>
          <div className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
            <ArrowRight className="w-6 h-6" />
          </div>
        </Link>

        <Link
          href="/products?filter=deals"
          className="group relative bg-white/10 backdrop-blur-md text-white border border-white/20 px-12 py-6 rounded-[28px] font-black text-xl transition-all duration-500 flex items-center hover:bg-white hover:text-black active:scale-95"
        >
          {t('hero_todays_offers')}
        </Link>
      </div>
    </div>
  );
}
