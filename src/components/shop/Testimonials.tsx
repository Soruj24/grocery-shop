"use client";

import MainTestimonial from "./Testimonials/MainTestimonial";
import HighlightTestimonial from "./Testimonials/HighlightTestimonial";
import SmallTestimonial from "./Testimonials/SmallTestimonial";

export default function Testimonials() {
  return (
    <section className="relative">
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-3 bg-rose-50 dark:bg-rose-900/30 px-4 py-2 rounded-2xl mb-4">
          <span className="w-2 h-2 bg-rose-600 rounded-full" />
          <span className="text-rose-600 dark:text-rose-400 font-black text-xs uppercase tracking-[0.2em]">
            কাস্টমার ফিডব্যাক
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-gray-800 dark:text-gray-100 tracking-tight">
          আমাদের প্রিয় কাস্টমাররা যা বলেন
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-full md:h-[600px]">
        <MainTestimonial 
          quote="আমি গত ৩ মাস ধরে এই দোকান থেকে বাজার করছি। পণ্যের মান সবসময়ই সেরা থাকে। বিশেষ করে তাদের দ্রুত ডেলিভারি সার্ভিস আমাকে মুগ্ধ করেছে।"
          author="সাকিব আহমেদ"
          initial="S"
        />

        <HighlightTestimonial 
          quote="অর্গানিক ফলের খোঁজে অনেক ঘুরেছি, শেষ পর্যন্ত এখানেই ভরসা পেলাম। ফ্রেশ এবং সুস্বাদু!"
          author="মারুফ হাসান"
          initial="M"
        />

        <SmallTestimonial 
          quote="প্যাকিং কোয়ালিটি খুবই উন্নত। কোনো পণ্যই নষ্ট হওয়ার ভয় থাকে না।"
          author="রাহুল দাশ"
          initial="R"
          variant="orange"
        />

        <SmallTestimonial 
          quote="কাস্টমার সাপোর্ট অনেক হেল্পফুল। যেকোনো সমস্যার দ্রুত সমাধান দেন তারা।"
          author="আনিসা রহমান"
          initial="A"
          variant="blue"
        />
      </div>
    </section>
  );
}
