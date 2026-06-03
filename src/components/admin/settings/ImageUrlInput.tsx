"use client";

import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

interface ImageUrlInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function ImageUrlInput({
  label,
  value,
  onChange,
  placeholder,
}: ImageUrlInputProps) {
  return (
    <div className="group">
      <label className="block text-[11px] font-black text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] mb-3 ml-1">
        {label}
      </label>
      <div className="flex gap-3 items-center">
        <div className="relative w-12 h-12 rounded-xl bg-gray-100 dark:bg-gray-800 overflow-hidden flex-shrink-0 border border-gray-200 dark:border-gray-700">
          {value ? (
            <Image src={value} alt={label} fill className="object-cover" />
          ) : (
            <ImageIcon className="w-5 h-5 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-gray-400" />
          )}
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700 rounded-[1.5rem] focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all font-bold text-sm"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
