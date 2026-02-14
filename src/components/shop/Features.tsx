"use client";

import { motion } from "framer-motion";
import { Truck, ShieldCheck, Clock, CreditCard, Leaf, Headphones } from "lucide-react";

const FEATURES = [
  {
    icon: Truck,
    title: "দ্রুত ডেলিভারি",
    description: "ঢাকার ভেতরে ২৪ ঘণ্টার মধ্যে নিশ্চিত ডেলিভারি।",
    color: "bg-blue-500",
    lightColor: "bg-blue-50 dark:bg-blue-500/10",
    textColor: "text-blue-600 dark:text-blue-400"
  },
  {
    icon: ShieldCheck,
    title: "নিরাপদ পেমেন্ট",
    description: "আপনার পেমেন্ট শতভাগ নিরাপদ এবং সুরক্ষিত।",
    color: "bg-emerald-500",
    lightColor: "bg-emerald-50 dark:bg-emerald-500/10",
    textColor: "text-emerald-600 dark:text-emerald-400"
  },
  {
    icon: Clock,
    title: "২৪/৭ সাপোর্ট",
    description: "যেকোনো সমস্যায় আমরা আছি আপনার পাশে সবসময়।",
    color: "bg-amber-500",
    lightColor: "bg-amber-50 dark:bg-amber-500/10",
    textColor: "text-amber-600 dark:text-amber-400"
  },
  {
    icon: CreditCard,
    title: "ক্যাশ অন ডেলিভারি",
    description: "পণ্য হাতে পেয়ে টাকা পরিশোধ করার সুবিধা।",
    color: "bg-purple-500",
    lightColor: "bg-purple-50 dark:bg-purple-500/10",
    textColor: "text-purple-600 dark:text-purple-400"
  },
  {
    icon: Leaf,
    title: "সতেজ পণ্য",
    description: "সরাসরি খামার থেকে সংগৃহীত বিষমুক্ত সতেজ সবজি।",
    color: "bg-green-500",
    lightColor: "bg-green-50 dark:bg-green-500/10",
    textColor: "text-green-600 dark:text-green-400"
  },
  {
    icon: Headphones,
    title: "সহজ রিটার্ন",
    description: "পণ্য পছন্দ না হলে ৭ দিনের মধ্যে সহজ রিটার্ন সুবিধা।",
    color: "bg-rose-500",
    lightColor: "bg-rose-50 dark:bg-rose-500/10",
    textColor: "text-rose-600 dark:text-rose-400"
  }
];

export default function Features() {
  return (
    <section className="py-24 px-4 bg-white dark:bg-black/20 overflow-hidden relative">
      {/* Decorative Circles */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-green-500/5 blur-[120px] rounded-full -ml-48 pointer-events-none" />
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -mr-48 pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center space-y-4 mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white tracking-tight"
          >
            কেন আমাদের <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">পছন্দ করবেন?</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto text-lg"
          >
            সেরা মান, সাশ্রয়ী দাম এবং দ্রুত ডেলিভারির মাধ্যমে আমরা নিশ্চিত করি আপনার সেরা শপিং অভিজ্ঞতা।
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -10 }}
              className="group p-10 bg-gray-50 dark:bg-white/5 rounded-[48px] border border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-[#0F172A] hover:shadow-2xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 transition-all duration-500"
            >
              <div className={`w-20 h-20 ${feature.lightColor} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500`}>
                <feature.icon className={`w-10 h-10 ${feature.textColor}`} />
              </div>
              <h3 className="text-2xl font-black text-gray-900 dark:text-white mb-4 group-hover:text-green-600 transition-colors">
                {feature.title}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
