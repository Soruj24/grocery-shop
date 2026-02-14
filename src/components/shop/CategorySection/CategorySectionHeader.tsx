"use client";

import Link from "next/link";
import { ArrowRight, ChevronDown, LayoutGrid, Filter } from "lucide-react";
import { useState } from "react";

export default function CategorySectionHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSort, setSelectedSort] = useState("সবগুলো (Default)");

  const sortOptions = [
    "সবগুলো (Default)",
    "জনপ্রিয়তা অনুযায়ী",
    "নাম অনুযায়ী (A-Z)",
    "আইটেম সংখ্যা অনুযায়ী"
  ];

  return (
    <div className="relative z-10 flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 mb-16">
      <div className="text-center lg:text-left space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00D26A]/10 border border-[#00D26A]/20 text-[#00D26A] text-xs font-bold uppercase tracking-widest">
          <span className="w-2 h-2 rounded-full bg-[#00D26A] animate-pulse" />
          আমাদের সংগ্রহ
        </div>
        <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight leading-tight">
          পছন্দের ক্যাটাগরি <br className="hidden md:block" />
          <span className="text-[#00D26A]">বেছে নিন</span>
        </h2>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
        {/* Category Filter Dropdown */}
        <div className="relative w-full sm:w-64">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="flex items-center justify-between gap-4 w-full bg-white/5 hover:bg-white/10 text-white border border-white/10 px-6 py-4 rounded-2xl font-bold text-sm transition-all"
          >
            <div className="flex items-center gap-3">
              <Filter size={18} className="text-[#00D26A]" />
              {selectedSort}
            </div>
            <ChevronDown size={18} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
          </button>

          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-3 bg-[#1E293B] border border-white/10 rounded-2xl shadow-2xl z-50 py-2 animate-in fade-in zoom-in slide-in-from-top-2 duration-200">
              {sortOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => {
                    setSelectedSort(option);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left px-6 py-3 text-sm font-bold transition-colors ${
                    selectedSort === option 
                      ? "bg-[#00D26A] text-black" 
                      : "text-white/70 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>

        <Link
          href="/products"
          className="group flex items-center justify-center gap-4 bg-white hover:bg-[#00D26A] text-black border border-transparent px-8 py-4 rounded-2xl font-black transition-all duration-500 w-full sm:w-auto"
        >
          সব ক্যাটাগরি
          <div className="w-8 h-8 rounded-xl bg-black/5 flex items-center justify-center transition-colors">
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
}
