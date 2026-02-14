import { ArrowRight, ShieldCheck, Truck, Tag } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface CartSummaryProps {
  totalPrice: number;
}

export default function CartSummary({ totalPrice }: CartSummaryProps) {
  const [promoCode, setPromoCode] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const deliveryFee = totalPrice > 500 ? 0 : 50;
  const discount = isApplied ? Math.round(totalPrice * 0.1) : 0;
  const finalTotal = totalPrice + deliveryFee - discount;

  const handleApplyPromo = () => {
    if (promoCode.toUpperCase() === "SAVE10") {
      setIsApplied(true);
    }
  };

  return (
    <div className="lg:col-span-1">
      <div className="bg-white dark:bg-gray-900 p-8 rounded-[40px] shadow-xl border border-gray-100 dark:border-gray-800 space-y-8 sticky top-24">
        <h3 className="text-2xl font-black text-gray-900 dark:text-white">অর্ডার সামারি</h3>

        {/* Promo Code Input */}
        <div className="space-y-3">
          <label className="text-xs font-black text-gray-400 uppercase tracking-widest px-1">ডিসকাউন্ট কোড</label>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="SAVE10"
                className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-green-500 transition-all uppercase"
              />
            </div>
            <button 
              onClick={handleApplyPromo}
              disabled={!promoCode || isApplied}
              className="bg-gray-900 dark:bg-gray-100 text-white dark:text-black px-6 rounded-2xl font-black text-sm hover:opacity-90 transition-all disabled:opacity-50"
            >
              {isApplied ? 'Applied' : 'Apply'}
            </button>
          </div>
          {isApplied && (
            <p className="text-[10px] font-bold text-green-600 px-1">প্রোমো কোড সফলভাবে যুক্ত হয়েছে! (১০% ছাড়)</p>
          )}
        </div>

        <div className="space-y-4 pt-4">
          <div className="flex justify-between items-center text-sm font-bold text-gray-500">
            <span>সাব-টোটাল</span>
            <span className="text-gray-900 dark:text-white">৳{totalPrice}</span>
          </div>
          
          <div className="flex justify-between items-center text-sm font-bold text-gray-500">
            <div className="flex items-center gap-2">
              <span>ডেলিভারি চার্জ</span>
              {totalPrice > 500 && (
                <span className="text-[10px] bg-green-100 text-green-600 px-2 py-0.5 rounded-full">ফ্রি</span>
              )}
            </div>
            <span className="text-gray-900 dark:text-white">
              {deliveryFee === 0 ? '৳০' : `৳${deliveryFee}`}
            </span>
          </div>

          {isApplied && (
            <div className="flex justify-between items-center text-sm font-bold text-green-600">
              <span>ডিসকাউন্ট (১০%)</span>
              <span>-৳{discount}</span>
            </div>
          )}

          <div className="h-px bg-gray-100 dark:bg-gray-800 my-4" />

          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <span className="text-xs font-black uppercase tracking-widest text-gray-400">
                সর্বমোট
              </span>
              <div className="text-4xl font-black text-gray-900 dark:text-white tracking-tight">৳{finalTotal}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <Link
            href="/checkout"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-5 rounded-2xl font-black text-lg transition-all flex items-center justify-center gap-3 shadow-lg shadow-green-600/20 active:scale-95 group"
          >
            চেকআউট করুন
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>

          <div className="flex items-center justify-center gap-2 pt-2">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              ১০০% নিরাপদ চেকআউট
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
