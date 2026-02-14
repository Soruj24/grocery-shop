"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Truck, ShieldCheck } from "lucide-react";

export default function SubscriptionManager() {
  // Mock data
  const subscription = {
    isActive: true,
    plan: "weekly",
    nextDelivery: "2024-02-20",
    items: [
      { id: 1, name: "তাজা গরুর দুধ", qty: "২ লিটার" },
      { id: 2, name: "দেশি মুরগির ডিম", qty: "১ ডজন" },
      { id: 3, name: "মৌসুমি সবজি বক্স", qty: "১টি" },
    ]
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-gray-900 p-8 md:p-12 rounded-[40px] text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full -mr-32 -mt-32" />
        
        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
            <span className="font-black uppercase tracking-widest text-xs text-green-500">অ্যাক্টিভ সাবস্ক্রিপশন</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black">সাপ্তাহিক বাজার</h2>
          <div className="flex items-center gap-6 text-gray-400 font-bold">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>প্রতি মঙ্গলবার</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span>সকাল ৮:০০ - ১০:০০</span>
            </div>
          </div>
        </div>

        <button className="relative z-10 px-8 py-4 bg-white text-gray-900 rounded-[24px] font-black hover:bg-green-500 hover:text-white transition-all">
          ম্যানেজ করুন
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-black text-gray-800 dark:text-white">পরবর্তী ডেলিভারি আইটেম</h3>
          <div className="bg-gray-50 dark:bg-white/5 rounded-[32px] p-8 border border-gray-100 dark:border-white/5 space-y-4">
            {subscription.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2">
                <span className="font-bold text-gray-600 dark:text-gray-400">{item.name}</span>
                <span className="font-black text-gray-800 dark:text-gray-200">{item.qty}</span>
              </div>
            ))}
            <div className="pt-4 border-t border-gray-200 dark:border-white/10 mt-4 flex items-center justify-between">
              <span className="font-black text-gray-800 dark:text-white">মোট আনুমানিক বিল</span>
              <span className="font-black text-green-600 text-xl">৳৮৫০</span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-xl font-black text-gray-800 dark:text-white">সাবস্ক্রিপশন সুবিধা</h3>
          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: Truck, title: "ফ্রি ডেলিভারি", desc: "সব সাবস্ক্রিপশন ডেলিভারি ফ্রি" },
              { icon: ShieldCheck, title: "সেরা মান", desc: "সরাসরি ফার্ম থেকে তাজা পণ্য" },
            ].map((feature, i) => (
              <div key={i} className="flex items-start gap-4 p-6 bg-white dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-white/5">
                <div className="p-3 bg-green-500/10 text-green-600 rounded-2xl">
                  <feature.icon className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-black text-gray-800 dark:text-gray-200">{feature.title}</h4>
                  <p className="text-sm text-gray-500">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
