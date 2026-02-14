import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroCountdown from "./HeroCountdown";

export default function HeroContent() {
  return (
    <div className="relative z-20 h-full flex flex-col justify-center px-8 sm:px-24 max-w-4xl text-white">
      <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-[24px] mb-10 w-fit">
        <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
        <span className="text-xs font-black tracking-[0.3em] uppercase text-white/90">
          নতুন অফার - ২০% ছাড়
        </span>
      </div>

      <h1 className="text-7xl sm:text-9xl font-black mb-10 leading-[0.9] tracking-tighter">
        তাজা বাজার <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-300">
          আপনার দরজায়
        </span>
      </h1>

      <p className="text-white/70 mb-14 text-xl sm:text-2xl max-w-2xl leading-relaxed font-medium">
        মোহাম্মদ ইমরান হোসাইন মুদির দোকানে আপনাকে স্বাগতম। আমরা দিচ্ছি সরাসরি
        ফার্ম থেকে সংগৃহীত সেরা মানের পণ্য।
      </p>

      <div className="flex flex-wrap items-center gap-8">
        <Link
          href="/products"
          className="group relative bg-white text-black px-12 py-6 rounded-[28px] font-black text-xl transition-all duration-500 flex items-center overflow-hidden hover:pr-16 active:scale-95 shadow-[0_20px_40px_-10px_rgba(255,255,255,0.2)]"
        >
          <span className="relative z-10">বাজার শুরু করুন</span>
          <div className="absolute right-6 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
            <ArrowRight className="w-6 h-6" />
          </div>
        </Link>

        <HeroCountdown />
      </div>
    </div>
  );
}
