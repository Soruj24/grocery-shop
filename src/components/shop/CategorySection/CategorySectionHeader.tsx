"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, LayoutGrid, Filter } from "lucide-react";
import { useState } from "react";

export default function CategorySectionHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-xl md:text-2xl font-black text-gray-800 dark:text-gray-100">
          ক্যাটাগরি
        </h2>
        <p className="text-xs text-gray-500 font-medium">আপনার পছন্দের পণ্যটি খুঁজে নিন</p>
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
