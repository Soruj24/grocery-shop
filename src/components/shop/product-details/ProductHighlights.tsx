import { ShieldCheck, Truck, Clock } from "lucide-react";

export default function ProductHighlights() {
  const highlights = [
    {
      icon: ShieldCheck,
      title: "১০০% খাঁটি পণ্য",
      desc: "সরাসরি সোর্স থেকে সংগৃহীত",
    },
    {
      icon: Truck,
      title: "দ্রুত ডেলিভারি",
      desc: "২৪ ঘন্টার মধ্যে নিশ্চিত ডেলিভারি",
    },
    { icon: Clock, title: "৭ দিন রিটার্ন", desc: "সহজ রিটার্ন পলিসি" },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-8 border-y border-gray-100 dark:border-gray-800">
      {highlights.map((item, idx) => (
        <div key={idx} className="flex items-center gap-3">
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-2xl text-green-600 dark:text-green-500">
            <item.icon className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-gray-800 dark:text-gray-200">
              {item.title}
            </span>
            <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500">
              {item.desc}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
