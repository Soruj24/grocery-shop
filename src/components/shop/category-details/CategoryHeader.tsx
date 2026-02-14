import Link from "next/link";
import { ShoppingBag, ArrowLeft } from "lucide-react";
import { Category as ICategory } from "@/types/category";
import Image from "next/image";

interface CategoryHeaderProps {
  category: ICategory;
  totalCount: number;
}

export default function CategoryHeader({ category, totalCount }: CategoryHeaderProps) {
  return (
    <section className="relative h-[350px] rounded-[60px] overflow-hidden flex items-center">
      <div className="absolute inset-0">
        <Image
          src={category.image || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1000"}
          alt={category.name}
          className="w-full h-full object-cover brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      </div>
      
      <div className="relative z-20 px-12 md:px-20 space-y-6">
        <Link
          href="/categories"
          className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white text-sm font-black hover:bg-white/20 transition-all mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> সব ক্যাটাগরি
        </Link>
        <div className="space-y-2">
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            {category.name}
          </h1>
          <p className="text-green-100/80 max-w-lg font-bold text-lg leading-relaxed">
            {category.name} ক্যাটাগরির সেরা এবং তাজা পণ্যগুলো আমাদের সংগ্রহে রয়েছে।
          </p>
        </div>
        <div className="flex items-center gap-4 pt-4">
          <div className="px-6 py-3 bg-green-600/90 backdrop-blur-md rounded-[20px] text-white font-black text-sm shadow-xl shadow-green-600/20">
            {totalCount}টি পণ্য
          </div>
          <div className="w-12 h-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-[20px] flex items-center justify-center">
            <ShoppingBag className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
