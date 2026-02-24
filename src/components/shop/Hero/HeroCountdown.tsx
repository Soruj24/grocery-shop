import { useLanguage } from "@/components/LanguageContext";

export default function HeroCountdown() {
  const { t } = useLanguage();

  const formatNumber = (num: number) => {
    return num.toLocaleString('bn-BD', { minimumIntegerDigits: 2 });
  };

  return (
    <div className="hidden sm:flex items-center gap-6 bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-[32px] shadow-2xl">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-black tabular-nums">{formatNumber(5)}</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t('countdown_hours')}</span>
      </div>
      <span className="text-2xl font-black text-white/20">:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-black tabular-nums">{formatNumber(45)}</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t('countdown_minutes')}</span>
      </div>
      <span className="text-2xl font-black text-white/20">:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-black tabular-nums">{formatNumber(30)}</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t('countdown_seconds')}</span>
      </div>
      <div className="ml-4 w-px h-10 bg-white/10" />
      <div className="flex flex-col">
        <span className="text-xs font-black text-green-400 uppercase tracking-widest">{t('countdown_flash_sale')}</span>
        <span className="text-[10px] font-bold text-white/40">{t('countdown_limited_time')}</span>
      </div>
    </div>
  );
}
