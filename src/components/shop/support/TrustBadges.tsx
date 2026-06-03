"use client";

import { Truck, RotateCcw, ShieldCheck } from "lucide-react";

export default function TrustBadges() {
  return (
    <div className="mt-24 grid md:grid-cols-3 gap-8">
      <div className="text-center space-y-4 p-8 rounded-32px bg-gray-50 dark:bg-gray-900/50">
        <Truck className="w-12 h-12 text-green-600 mx-auto" />
        <h4 className="text-xl font-black">দ্রুত ডেলিভারি</h4>
        <p className="text-gray-500 font-bold">২৪ ঘণ্টার মধ্যে নিশ্চিত ডেলিভারি</p>
      </div>
      <div className="text-center space-y-4 p-8 rounded-32px bg-gray-50 dark:bg-gray-900/50">
        <RotateCcw className="w-12 h-12 text-blue-600 mx-auto" />
        <h4 className="text-xl font-black">সহজ রিটার্ন</h4>
        <p className="text-gray-500 font-bold">৭ দিনের মধ্যে সহজ রিটার্ন সুবিধা</p>
      </div>
      <div className="text-center space-y-4 p-8 rounded-32px bg-gray-50 dark:bg-gray-900/50">
        <ShieldCheck className="w-12 h-12 text-emerald-600 mx-auto" />
        <h4 className="text-xl font-black">শতভাগ নিরাপদ</h4>
        <p className="text-gray-500 font-bold">আপনার পেমেন্ট ও তথ্য আমাদের কাছে সুরক্ষিত</p>
      </div>
    </div>
  );
}
