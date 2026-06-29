
import { TranslationKey } from "@/lib/constants/translations";
interface TimeLeft { hours: number; minutes: number; seconds: number; }
interface DailyDealsTimerProps { timeLeft: TimeLeft; t: (key: TranslationKey) => string; }

export default function DailyDealsTimer({ timeLeft, t }: DailyDealsTimerProps) {
  const units = [
    { label: t("daily_deals_hour"), value: timeLeft.hours },
    { label: t("daily_deals_minute"), value: timeLeft.minutes },
    { label: t("daily_deals_second"), value: timeLeft.seconds },
  ];
  return (
    <div className="flex flex-wrap justify-center md:justify-start gap-4">
      {units.map((unit, i) => (
        <div key={i} className="flex flex-col items-center group">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center text-2xl md:text-3xl font-black shadow-lg group-hover:bg-white group-hover:text-orange-600 transition-all duration-300 transform group-hover:-translate-y-1">
            {unit.value.toLocaleString("bn-BD", { minimumIntegerDigits: 2 })}
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest mt-3 text-white/80 group-hover:text-white transition-colors">{unit.label}</span>
        </div>
      ))}
    </div>
  );
}
