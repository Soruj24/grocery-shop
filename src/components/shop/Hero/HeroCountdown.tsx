export default function HeroCountdown() {
  return (
    <div className="hidden sm:flex items-center gap-6 bg-white/5 backdrop-blur-xl border border-white/10 px-8 py-4 rounded-[32px] shadow-2xl">
      <div className="flex flex-col items-center">
        <span className="text-2xl font-black tabular-nums">০৫</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">ঘন্টা</span>
      </div>
      <span className="text-2xl font-black text-white/20">:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-black tabular-nums">৪৫</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">মিনিট</span>
      </div>
      <span className="text-2xl font-black text-white/20">:</span>
      <div className="flex flex-col items-center">
        <span className="text-2xl font-black tabular-nums">৩০</span>
        <span className="text-[10px] font-black uppercase tracking-widest text-white/40">সেকেন্ড</span>
      </div>
      <div className="ml-4 w-px h-10 bg-white/10" />
      <div className="flex flex-col">
        <span className="text-xs font-black text-green-400 uppercase tracking-widest">ফ্ল্যাশ সেল!</span>
        <span className="text-[10px] font-bold text-white/40">সীমিত সময়ের জন্য</span>
      </div>
    </div>
  );
}
