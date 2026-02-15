"use client";

import { motion } from "framer-motion";
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageCircle, 
  Clock, 
  Send,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Truck,
  RotateCcw,
  ShieldCheck
} from "lucide-react";
import { useState } from "react";

const FAQS = [
  {
    question: "ডেলিভারি কত সময় লাগে?",
    answer: "ঢাকার ভেতরে আমরা সাধারণত ২৪ ঘণ্টার মধ্যে ডেলিভারি দিয়ে থাকি। ঢাকার বাইরে ২-৩ কার্যদিবস সময় লাগতে পারে।"
  },
  {
    question: "পণ্য ফেরত দেওয়ার নিয়ম কি?",
    answer: "যদি পণ্যে কোনো সমস্যা থাকে, তবে ডেলিভারি পাওয়ার ২৪ ঘণ্টার মধ্যে আমাদের জানালে আমরা তা পরিবর্তন বা রিটার্ন গ্রহণ করি।"
  },
  {
    question: "পেমেন্ট কিভাবে করব?",
    answer: "আমরা ক্যাশ অন ডেলিভারি, বিকাশ, নগদ এবং কার্ড পেমেন্ট গ্রহণ করি।"
  },
  {
    question: "অর্ডার ট্র্যাকিং করব কিভাবে?",
    answer: "আপনার প্রোফাইল সেকশন থেকে 'My Orders' এ গিয়ে আপনার অর্ডারের বর্তমান অবস্থা দেখতে পারবেন।"
  }
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <div className="text-center space-y-4 mb-16">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white"
        >
          আমরা কিভাবে <span className="text-green-600">আপনাকে সাহায্য</span> করতে পারি?
        </motion.h1>
        <p className="text-gray-500 font-bold text-lg max-w-2xl mx-auto">
          আপনার যেকোনো জিজ্ঞাসা বা সমস্যার জন্য আমাদের সাথে যোগাযোগ করুন। আমরা ২৪/৭ আপনার সেবায় নিয়োজিত।
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Contact Info Cards */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white dark:bg-gray-900 p-8 rounded-32px border border-gray-100 dark:border-gray-800 shadow-xl">
            <h3 className="text-xl font-black mb-6 flex items-center gap-3">
              <Phone className="text-green-600" />
              সরাসরি যোগাযোগ
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">কল করুন</p>
                  <p className="text-lg font-black">+৮৮০ ১৭১২-৩৪৫৬৭৮</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">ইমেইল করুন</p>
                  <p className="text-lg font-black">support@emranshop.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 font-bold uppercase tracking-wider">অফিস ঠিকানা</p>
                  <p className="text-lg font-black">মিরপুর-১০, ঢাকা-১২১৬, বাংলাদেশ</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-green-600 p-8 rounded-32px text-white shadow-xl shadow-green-600/20">
            <h3 className="text-xl font-black mb-4 flex items-center gap-3">
              <Clock className="w-6 h-6" />
              কাজের সময়
            </h3>
            <p className="font-bold mb-4 opacity-90">
              আমরা সপ্তাহের ৭ দিনই আপনার সেবায় নিয়োজিত আছি।
            </p>
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

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-gray-900 p-8 md:p-12 rounded-32px border border-gray-100 dark:border-gray-800 shadow-xl h-full">
            <h3 className="text-2xl font-black mb-8">আমাদের মেসেজ পাঠান</h3>
            <form className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-500 uppercase tracking-wider">আপনার নাম</label>
                <input 
                  type="text" 
                  placeholder="পুরো নাম লিখুন"
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-green-500 font-bold outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-black text-gray-500 uppercase tracking-wider">মোবাইল নম্বর</label>
                <input 
                  type="text" 
                  placeholder="০১৭xxxxxxxx"
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-green-500 font-bold outline-none"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-black text-gray-500 uppercase tracking-wider">বিষয়</label>
                <select className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-green-500 font-bold outline-none appearance-none">
                  <option>অর্ডার সংক্রান্ত জিজ্ঞাসা</option>
                  <option>পেমেন্ট সমস্যা</option>
                  <option>পণ্য ফেরত বা পরিবর্তন</option>
                  <option>অন্যান্য</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-black text-gray-500 uppercase tracking-wider">আপনার মেসেজ</label>
                <textarea 
                  rows={4}
                  placeholder="বিস্তারিত এখানে লিখুন..."
                  className="w-full px-6 py-4 rounded-2xl bg-gray-50 dark:bg-gray-800 border-none focus:ring-2 focus:ring-green-500 font-bold outline-none resize-none"
                ></textarea>
              </div>
              <div className="md:col-span-2">
                <button className="w-full md:w-auto bg-green-600 hover:bg-green-700 text-white px-12 py-5 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-600/20 active:scale-95">
                  <Send className="w-5 h-5" />
                  মেসেজ পাঠান
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="mt-24 max-w-4xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <HelpCircle className="w-12 h-12 text-green-600 mx-auto" />
          <h2 className="text-3xl font-black">সাধারণ কিছু জিজ্ঞাসা (FAQ)</h2>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm"
            >
              <button 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <span className="text-lg font-black">{faq.question}</span>
                {openFaq === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              {openFaq === index && (
                <div className="px-8 pb-6 text-gray-500 font-bold leading-relaxed border-t border-gray-50 dark:border-gray-800 pt-4">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Trust Badges */}
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
    </div>
  );
}
