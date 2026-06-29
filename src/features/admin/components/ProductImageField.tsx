"use client";

import { Image as ImageIcon } from "lucide-react";
import { ADMIN_INPUT_CLASSES } from "./ProductFormField";

interface ProductImageFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export default function ProductImageField({
  value,
  onChange,
}: ProductImageFieldProps) {
  return (
    <div className="space-y-2 md:col-span-2">
      <label className="text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-widest px-1">
        প্রোডাক্ট ইমেজ প্রিভিউ
      </label>
      <div className="flex items-center gap-6 p-6 bg-gray-50 dark:bg-gray-800 rounded-[2rem] border border-gray-100 dark:border-gray-700 group">
        <div className="w-24 h-24 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden flex items-center justify-center relative shadow-sm">
          {value ? (
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-cover"
            />
          ) : (
            <ImageIcon className="w-8 h-8 text-gray-200 dark:text-gray-700" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={ADMIN_INPUT_CLASSES}
            placeholder="ইমেজ URL দিন (যেমন: https://...)"
          />
          <p className="text-[10px] font-bold text-gray-500 dark:text-gray-600 uppercase tracking-widest px-1">
            সরাসরি ইমেজের লিংক এখানে পেস্ট করুন
          </p>
        </div>
      </div>
    </div>
  );
}
