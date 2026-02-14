import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function CategorySectionHeader() {
  return (
    <div className="relative z-10 flex flex-col md:flex-row justify-between items-center md:items-end gap-8 mb-20">
      <div className="text-center md:text-left">
        <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
          পছন্দের ক্যাটাগরি বেছে নিন
        </h2>
      </div>
      
      <Link
        href="/products"
        className="group flex items-center gap-4 bg-[#0F172A] hover:bg-white text-white hover:text-black border border-white/5 px-10 py-5 rounded-[24px] font-black transition-all duration-700 shadow-2xl hover:shadow-white/10"
      >
        সব ক্যাটাগরি
        <div className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-black/5 flex items-center justify-center transition-colors">
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </div>
  );
}
