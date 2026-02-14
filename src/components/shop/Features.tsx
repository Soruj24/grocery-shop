"use client";

import { Truck, ShieldCheck, Clock, Star } from "lucide-react";
import FeatureCard from "./Features/FeatureCard";

export default function Features() {
  const features = [
    { icon: Truck, title: "দ্রুত ডেলিভারি", desc: "২৪ ঘন্টার মধ্যে ডেলিভারি" },
    { icon: ShieldCheck, title: "নিরাপদ পেমেন্ট", desc: "১০০% নিরাপদ লেনদেন" },
    { icon: Clock, title: "২৪/৭ সাপোর্ট", desc: "যেকোনো সময় সহায়তা" },
    { icon: Star, title: "সেরা মান", desc: "বাছাইকৃত তাজা পণ্য" },
  ];

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
      {features.map((item, idx) => (
        <FeatureCard 
          key={idx}
          icon={item.icon}
          title={item.title}
          desc={item.desc}
        />
      ))}
    </section>
  );
}
