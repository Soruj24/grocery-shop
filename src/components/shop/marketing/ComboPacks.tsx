"use client";

import { motion } from "framer-motion";
import { Layers, CheckCircle2, ShoppingCart } from "lucide-react";

export default function ComboPacks() {
  const combos = [
    {
      name: "সাপ্তাহিক সবজি বাজার",
      items: ["আলু ২কেজি", "পেঁয়াজ ১কেজি", "রসুন ২৫০ গ্রাম", "আদা ২৫০ গ্রাম", "মরিচ ১০০ গ্রাম"],
      price: "৳৩৫০",
      save: "৳৪০ সাশ্রয়",
      tag: "বেস্ট সেলার"
    },
    {
      name: "রান্নার মসলা প্যাক",
      items: ["হলুদ ১০০ গ্রাম", "মরিচ ১০০ গ্রাম", "ধনিয়া ১০০ গ্রাম", "জিরা ১০০ গ্রাম", "গরম মসলা ৫০ গ্রাম"],
      price: "৳৪২০",
      save: "৳৬০ সাশ্রয়",
      tag: "প্রিমিয়াম"
    }
  ];

  return (
    <section className="py-16">
      <div className="space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">কম্বো প্যাক - <span className="text-green-600">একসাথে সব!</span></h2>
          <p className="text-gray-500 font-bold">আলাদা কেনার চেয়ে কম্বোতে কিনলে সাশ্রয় হয় বেশি।</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {combos.map((combo, i) => (
            <motion.div 
              key={i}
              whileHover={{ scale: 1.02 }}
              className="relative bg-white dark:bg-white/5 rounded-[48px] p-8 md:p-12 border border-gray-100 dark:border-white/5 shadow-2xl shadow-gray-200/50 dark:shadow-none overflow-hidden group"
            >
              {/* Background Icon */}
              <Layers className="absolute -bottom-12 -right-12 w-64 h-64 text-gray-50 dark:text-white/[0.02] -rotate-12 pointer-events-none" />

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-8">
                  <div className="space-y-2">
                    <span className="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      {combo.tag}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">{combo.name}</h3>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-black text-green-600">{combo.price}</div>
                    <div className="text-xs font-bold text-orange-500">{combo.save}</div>
                  </div>
                </div>

                <div className="space-y-4 mb-10 flex-1">
                  {combo.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 text-gray-600 dark:text-gray-400 font-bold">
                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <button className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-[24px] font-black flex items-center justify-center gap-3 transition-all shadow-lg shadow-green-600/20 active:scale-95">
                  <ShoppingCart className="w-5 h-5" />
                  কম্বোটি কিনুন
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
