"use client";

import { Share2 } from "lucide-react";
import { Toast } from "@/lib/toast";

export default function ShareButton({ productName }: { productName: string }) {
  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: productName,
          text: `Check out ${productName} on Emran Shop!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        Toast.fire({
          icon: 'success',
          title: 'লিঙ্ক কপি করা হয়েছে',
          background: '#020617',
          color: '#fff',
        });
      }
    } catch (err) {
      console.error("Share failed:", err);
    }
  };

  return (
    <button 
      onClick={handleShare}
      className="flex items-center gap-2 text-sm font-black text-gray-500 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors group"
    >
      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-2xl group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-colors">
        <Share2 className="w-5 h-5" />
      </div>
      শেয়ার করুন
    </button>
  );
}
