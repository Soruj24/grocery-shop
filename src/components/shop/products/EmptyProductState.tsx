import { ShoppingBag } from "lucide-react";
import Link from "next/link";

export default function EmptyProductState() {
  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center bg-white dark:bg-gray-900 rounded-[40px] border border-dashed border-gray-200 dark:border-gray-800 space-y-6">
      <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-full">
        <ShoppingBag className="w-16 h-16 text-gray-200 dark:text-gray-700" />
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-black text-gray-800 dark:text-gray-100">
          দুঃখিত, কোনো প্রোডাক্ট পাওয়া যায়নি
        </h3>
        <p className="text-gray-500 dark:text-gray-400 font-medium">
          আপনার সার্চ বা ফিল্টার পরিবর্তন করে চেষ্টা করুন
        </p>
      </div>
      <Link
        href="/products"
        className="bg-green-600 text-white px-8 py-3 rounded-2xl font-black shadow-lg shadow-green-900/20 hover:bg-green-700 transition-all"
      >
        সব প্রোডাক্ট দেখুন
      </Link>
    </div>
  );
}
