import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Category } from "@/types/category";
import Image from "next/image";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  // Limited sub-categories for display
  const displaySubCategories = category.subCategories?.slice(0, 5) || [];
  const remainingCount =
    (category.subCategories?.length || 0) - displaySubCategories.length;

  return (
    <div className="group h-full">
      <div className="relative flex flex-col bg-[#0B1120] rounded-[48px] border border-white/5 p-8 h-full transition-all duration-500 hover:border-white/10 hover:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)]">
        {/* Top Header Section */}
        <div className="flex justify-between items-start mb-8">
          {/* Category Image - Circular with glow */}
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            {category.image ? (
              <Image
                src={category.image}
                alt={category.name}
                width={80}
                height={80}
                className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-white/5 text-2xl font-bold text-white/20">
                {category.name.charAt(0)}
              </div>
            )}
          </div>

          {/* Action Button - Bright Green */}
          <Link
            href={`/category/${category._id}`}
            className="w-12 h-12 rounded-full bg-[#00D26A] flex items-center justify-center text-black shadow-[0_0_20px_rgba(0,210,106,0.3)] hover:scale-110 transition-transform duration-300"
          >
            <ArrowRight size={20} strokeWidth={3} />
          </Link>
        </div>

        {/* Title Section */}
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-1">
            {category.name}{" "}
            <span className="text-white/70">
              ({category.nameEn || "Collection"})
            </span>
          </h3>
          <p className="text-sm text-white/40 font-medium">
            {category.subCategories?.length || 0}টি সাব-ক্যাটাগরি
          </p>
        </div>

        {/* Sub-categories Pills */}
        <div className="flex flex-col gap-2.5 mb-8 flex-1">
          {displaySubCategories.map((sub: any, idx: number) => (
            <div
              key={idx}
              className="px-5 py-2.5 rounded-full bg-white/5 border border-white/5 text-sm text-white/60 font-medium hover:bg-white/10 hover:text-white transition-all cursor-default"
            >
              {sub.name} {category.nameEn && `(${category.nameEn})`} {idx + 1}
            </div>
          ))}

          {remainingCount > 0 && (
            <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-[#00D26A]/10 text-[#00D26A] text-xs font-bold border border-[#00D26A]/20">
              +{remainingCount} আরো
            </div>
          )}
        </div>

        {/* Footer Link */}
        <Link
          href={`/category/${category._id}`}
          className="flex justify-between items-center pt-6 border-t border-white/5 group/footer"
        >
          <span className="text-lg font-bold text-white group-hover/footer:text-[#00D26A] transition-colors">
            সব পণ্য দেখুন
          </span>
          <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 group-hover/footer:bg-white/10 group-hover/footer:text-white transition-all">
            <ChevronRight size={20} />
          </div>
        </Link>
      </div>
    </div>
  );
}
