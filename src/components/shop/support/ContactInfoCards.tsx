"use client";

import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactInfoCards() {
  return (
    <div className="lg:col-span-1 space-y-6">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-32px border border-gray-100 dark:border-gray-800 shadow-xl">
        <h3 className="text-xl font-black mb-6 flex items-center gap-3"><Phone className="text-green-600" /> সরাসরি যোগাযোগ</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-green-600" /></div>
            <div><p className="text-sm text-gray-400 font-bold uppercase tracking-wider">কল করুন</p><p className="text-lg font-black">+৮৮০ ১৭১২-৩৪৫৬৭৮</p></div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-blue-600" /></div>
            <div><p className="text-sm text-gray-400 font-bold uppercase tracking-wider">ইমেইল করুন</p><p className="text-lg font-black">support@emranshop.com</p></div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-rose-600" /></div>
            <div><p className="text-sm text-gray-400 font-bold uppercase tracking-wider">অফিস ঠিকানা</p><p className="text-lg font-black">মিরপুর-১০, ঢাকা-১২১৬, বাংলাদেশ</p></div>
          </div>
        </div>
      </div>
      <div className="bg-green-600 p-8 rounded-32px text-white shadow-xl shadow-green-600/20">
        <h3 className="text-xl font-black mb-4 flex items-center gap-3"><Clock className="w-6 h-6" /> কাজের সময়</h3>
        <p className="font-bold mb-4 opacity-90">আমরা সপ্তাহের ৭ দিনই আপনার সেবায় নিয়োজিত আছি।</p>
        <div className="space-y-2 text-sm font-black">
          <div className="flex justify-between border-b border-white/20 pb-2">
            <span>শনিবার - বৃহস্পতিবার</span>
            <span>সকাল ৯টা - রাত ১০টা</span>
          </div>
          <div className="flex justify-between pt-2">
            <span>শুক্রবার</span>
            <span>সকাল ১০টা - রাত ৮টা</span>
          </div>
        </div>
      </div>
    </div>
  );
}
