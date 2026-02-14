"use client";

import { MapPin, Phone, Mail } from "lucide-react";

export default function FooterContact() {
  const contactInfo = [
    {
      icon: MapPin,
      label: "ঠিকানা",
      value: "জানের মোড়, Goyhata, Nagurpur, টাঙ্গাইল",
      color: "green"
    },
    {
      icon: Phone,
      label: "হেল্পলাইন",
      value: "+৮৮০ ১২৩৪-৫৬৭৮৯০",
      color: "blue"
    },
    {
      icon: Mail,
      label: "ইমেইল",
      value: "support@emranshop.com",
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case "green":
        return "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400 group-hover:bg-green-100 dark:group-hover:bg-green-500/20";
      case "blue":
        return "bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-500/20";
      case "orange":
        return "bg-orange-50 dark:bg-orange-500/10 text-orange-600 dark:text-orange-400 group-hover:bg-orange-100 dark:group-hover:bg-orange-500/20";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-8">
      <h4 className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em]">যোগাযোগ করুন</h4>
      <ul className="space-y-6">
        {contactInfo.map((info, idx) => (
          <li key={idx} className="flex items-start gap-5 group">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${getColorClasses(info.color)}`}>
              <info.icon className="w-5 h-5" />
            </div>
            <div>
              <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">{info.label}</p>
              <p className="text-gray-700 dark:text-gray-300 text-sm font-black leading-relaxed">{info.value}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
