import { Package } from "lucide-react";
import Link from "next/link";

export default function EmptyOrdersState() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
      <div className="bg-gray-100 dark:bg-gray-900 p-8 rounded-full">
        <Package className="w-16 h-16 text-gray-400 dark:text-gray-600" />
      </div>
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-gray-800 dark:text-gray-100">
          কোন অর্ডার পাওয়া যায়নি
        </h2>
        <p className="text-gray-500 dark:text-gray-400 max-w-xs mx-auto font-medium">
          আপনি এখন পর্যন্ত কোনো অর্ডার করেননি। এখনই কেনাকাটা শুরু করুন!
        </p>
      </div>
      <Link
        href="/products"
        className="bg-green-600 text-white px-10 py-4 rounded-2xl font-black hover:bg-green-700 transition-all shadow-xl shadow-green-900/20 active:scale-95"
      >
        বাজার করুন
      </Link>
    </div>
  );
}
