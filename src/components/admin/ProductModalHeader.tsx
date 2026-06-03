"use client";

import { X, Package } from "lucide-react";
import type { AdminProduct } from "@/types/admin";

interface ProductModalHeaderProps {
  editingProduct: AdminProduct | null;
  onClose: () => void;
}

export default function ProductModalHeader({
  editingProduct,
  onClose,
}: ProductModalHeaderProps) {
  return (
    <div className="p-10 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center bg-gray-50/30 dark:bg-gray-800/30 rounded-t-[3rem]">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-500 shadow-sm border border-gray-100 dark:border-gray-700">
          <Package className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white">
            {editingProduct ? "প্রোডাক্ট এডিট করুন" : "নতুন প্রোডাক্ট যোগ করুন"}
          </h3>
          <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            সঠিক তথ্য দিয়ে ফর্মটি পূরণ করুন
          </p>
        </div>
      </div>
      <button
        onClick={onClose}
        className="p-3 bg-white dark:bg-gray-800 text-gray-400 dark:text-gray-500 hover:text-rose-600 dark:hover:text-rose-500 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-300 hover:rotate-90"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
