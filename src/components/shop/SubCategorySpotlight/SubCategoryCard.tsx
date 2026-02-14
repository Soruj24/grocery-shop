import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SubCategoryCardProps {
  id: string;
  name: string;
  count: number;
  index: number;
}

export default function SubCategoryCard({ id, name, count, index }: SubCategoryCardProps) {
  return (
    <Link
      href={`/category/${id}`}
      className="group relative bg-[#0F172A]/40 backdrop-blur-xl p-8 rounded-[40px] border border-white/5 hover:border-white/10 transition-all duration-700 hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] flex flex-col items-center text-center overflow-hidden"
    >
      {/* Decorative Number */}
      <div className="absolute top-6 right-6 text-6xl font-black text-white/5 select-none group-hover:text-white/10 transition-colors">
        {index + 1}
      </div>

      <div className="w-16 h-16 rounded-3xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:bg-green-600/20 group-hover:border-green-600/30 transition-all duration-500">
        <ArrowRight className="w-8 h-8 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
      </div>

      <h3 className="text-lg font-black text-white group-hover:text-green-400 transition-colors">
        {name}
      </h3>
      <p className="text-xs font-bold text-gray-500 mt-2 uppercase tracking-widest">
        {count}+ পণ্য
      </p>
    </Link>
  );
}
