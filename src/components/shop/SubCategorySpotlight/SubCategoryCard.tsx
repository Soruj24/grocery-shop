import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { useLanguage } from "@/components/LanguageContext";
import { getCategoryFallbackImage } from "@/lib/category-utils";

interface SubCategoryCardProps {
  id: string;
  name: string;
  image?: string;
  count: number;
  index: number;
}

export default function SubCategoryCard({ id, name, image, count, index }: SubCategoryCardProps) {
  const { t, language } = useLanguage();
  return (
    <Link
      href={`/category/${id}`}
      className="group relative bg-white dark:bg-[#0F172A] rounded-[32px] overflow-hidden border border-gray-100 dark:border-white/5 hover:border-green-500/30 dark:hover:border-green-500/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-green-500/10"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image || getCategoryFallbackImage(name)}
          alt={name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
      </div>

      <div className="relative p-6 h-full flex flex-col justify-end items-start z-10 min-h-[200px]">
        {/* Decorative Number */}
        <div className="absolute top-4 right-4 text-4xl font-black text-white/10 select-none group-hover:text-white/20 transition-colors">
          {(index + 1).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
        </div>

        <h3 className="text-xl font-black text-white group-hover:text-green-400 transition-colors mb-1">
          {name}
        </h3>
        
        <div className="flex items-center justify-between w-full mt-2">
          <p className="text-xs font-bold text-gray-300 uppercase tracking-widest bg-white/10 backdrop-blur-md px-3 py-1 rounded-full">
            {count.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}+ {t('products_suffix')}
          </p>
          
          <div className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-green-500 group-hover:border-green-500 transition-all duration-300 transform group-hover:scale-110">
            <ArrowRight className="w-5 h-5 -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
          </div>
        </div>
      </div>
    </Link>
  );
}
