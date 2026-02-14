import { Star, Clock } from "lucide-react";

export default function HeroStats() {
  return (
    <>
      <div className="absolute top-24 right-24 z-30 hidden lg:block animate-float">
        <div className="bg-white/5 backdrop-blur-2xl p-8 rounded-[40px] border border-white/10 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-green-500/30">
              <Star className="w-7 h-7 fill-current" />
            </div>
            <div>
              <p className="text-white font-black text-2xl tracking-tight">৪.৯ রেটিং</p>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest">৫০০০+ সন্তুষ্ট কাস্টমার</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-24 right-24 z-30 hidden lg:block animate-float animation-delay-2000">
        <div className="bg-white/5 backdrop-blur-2xl p-8 rounded-[40px] border border-white/10 shadow-[0_32px_64px_-15px_rgba(0,0,0,0.5)]">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-rose-600 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-orange-500/30">
              <Clock className="w-7 h-7" />
            </div>
            <div>
              <p className="text-white font-black text-2xl tracking-tight">দ্রুত ডেলিভারি</p>
              <p className="text-white/50 text-xs font-bold uppercase tracking-widest">৩০ মিনিটে আপনার দোরগোড়ায়</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
