import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function ProductSectionHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-xl md:text-2xl font-black text-gray-800 dark:text-gray-100">
          সেরা পণ্যসমূহ
        </h2>
        <p className="text-xs text-gray-500 font-medium">আপনার জন্য বাছাইকৃত সেরা পণ্য</p>
      </div>

      <Link
        href="/products"
        className="text-sm font-bold text-green-600 hover:text-green-700 flex items-center gap-1 group"
      >
        সবগুলো দেখুন
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
