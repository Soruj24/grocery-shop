import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductSectionHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-8 mb-20">
      <div className="text-center md:text-left">
        <div className="inline-flex items-center gap-3 bg-green-50 dark:bg-green-900/30 px-5 py-2.5 rounded-2xl mb-6">
          <span className="w-2.5 h-2.5 bg-green-600 rounded-full animate-ping" />
          <span className="text-green-600 dark:text-green-400 font-black text-xs uppercase tracking-[0.3em]">
            সেরা ডিল
          </span>
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight leading-tight">
          সেরা পণ্যসমূহ <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-600">
            আপনার জন্য
          </span>
        </h2>
      </div>

      <Link
        href="/products"
        className="group relative flex items-center gap-4 bg-gray-900 dark:bg-white text-white dark:text-black px-10 py-5 rounded-[24px] font-black transition-all duration-500 hover:shadow-2xl hover:shadow-green-600/20"
      >
        সবগুলো দেখুন
        <div className="w-8 h-8 rounded-full bg-white/10 dark:bg-black/5 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all">
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </div>
      </Link>
    </div>
  );
}
