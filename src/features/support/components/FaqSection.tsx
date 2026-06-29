"use client";

import { useState } from "react";
import { HelpCircle, ChevronDown, ChevronUp } from "lucide-react";
import { SUPPORT_FAQS } from "@/features/support/constants/support-constants";

export default function FaqSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div className="mt-24 max-w-4xl mx-auto">
      <div className="text-center space-y-4 mb-12">
        <HelpCircle className="w-12 h-12 text-green-600 mx-auto" />
        <h2 className="text-3xl font-black">সাধারণ কিছু জিজ্ঞাসা (FAQ)</h2>
      </div>
      <div className="space-y-4">
        {SUPPORT_FAQS.map((faq, index) => (
          <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden shadow-sm">
            <button onClick={() => setOpenFaq(openFaq === index ? null : index)}
              className="w-full px-8 py-6 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
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
  );
}
