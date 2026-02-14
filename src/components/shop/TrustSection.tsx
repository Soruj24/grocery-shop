"use client";

import { ShieldCheck, Truck, Clock } from "lucide-react";
import TrustItem from "./TrustSection/TrustItem";

export default function TrustSection() {
  return (
    <section className="relative overflow-hidden bg-gray-900 rounded-[60px] p-12 md:p-24 text-center">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20" />
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-green-500/10 to-transparent" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">
          কেন আমাদের পছন্দ করবেন?
        </h2>
        <p className="text-gray-400 text-lg md:text-xl mb-16 leading-relaxed font-medium">
          আমরা বিশ্বাস করি কোয়ালিটি এবং কাস্টমার সন্তুষ্টিতে। সরাসরি সোর্স থেকে
          পণ্য সংগ্রহ করে আমরা নিশ্চিত করি আপনার পরিবারের স্বাস্থ্য।
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12">
          <TrustItem 
            icon={ShieldCheck}
            title="১০০% অর্গানিক"
            desc="কোনো ভেজাল ছাড়াই বিশুদ্ধ পণ্য"
            color="green"
          />

          <TrustItem 
            icon={Truck}
            title="ফ্রি ডেলিভারি"
            desc="নির্দিষ্ট অর্ডারে পাচ্ছেন ফ্রি ডেলিভারি"
            color="blue"
          />

          <TrustItem 
            icon={Clock}
            title="২৪/৭ সাপোর্ট"
            desc="যেকোনো প্রয়োজনে আমরা আছি আপনার পাশে"
            color="orange"
          />
        </div>
      </div>
    </section>
  );
}
