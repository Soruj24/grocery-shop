"use client";

import OfferBanner from "./SpecialOfferBanners/OfferBanner";

export default function SpecialOfferBanners() {
  return (
    <section className="grid lg:grid-cols-2 gap-10">
      <OfferBanner 
        badge="স্পেশাল অফার"
        title="তাজা ফলমূল ও সবজি"
        desc="সরাসরি বাগান থেকে সংগৃহীত, ১০০% ফরমালিন মুক্ত পণ্য।"
        buttonText="অর্ডার দিন"
        image="https://images.unsplash.com/photo-1610832958506-aa56338406cd?auto=format&fit=crop&q=80&w=600"
        gradient="bg-gradient-to-br from-orange-400 to-rose-500"
        shadow="shadow-orange-500/20"
        textColor="text-white"
        buttonTextColor="text-orange-600"
      />

      <OfferBanner 
        badge="বিকেলের নাস্তা"
        title="বিস্কুট ও স্ন্যাকস আইটেম"
        desc="সেরা ব্র্যান্ডের ফ্রেশ বিস্কুট ও স্ন্যাকস এখন হাতের নাগালে।"
        buttonText="সংগ্রহ করুন"
        image="https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600"
        gradient="bg-gradient-to-br from-blue-500 to-indigo-600"
        shadow="shadow-blue-500/20"
        textColor="text-white"
        buttonTextColor="text-blue-600"
        rotate="rotate-6"
      />
    </section>
  );
}
