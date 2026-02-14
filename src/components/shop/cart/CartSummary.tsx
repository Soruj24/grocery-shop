import { ArrowRight, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

interface CartSummaryProps {
  totalPrice: number;
}

export default function CartSummary({ totalPrice }: CartSummaryProps) {
  return (
    <div className="lg:col-span-1">
      <div className="bg-gray-900 dark:bg-white text-white dark:text-black p-10 rounded-[48px] shadow-2xl space-y-8 sticky top-24 overflow-hidden group">
        <div className="absolute top-0 right-0 w-32 h-32 bg-green-500/20 blur-3xl rounded-full -mr-16 -mt-16" />

        <h3 className="text-3xl font-black tracking-tight relative">অর্ডার সামারি</h3>

        <div className="space-y-6 relative">
          <div className="flex justify-between items-center text-lg font-bold opacity-70">
            <span>সাব-টোটাল</span>
            <span>৳{totalPrice}</span>
          </div>
          <div className="flex justify-between items-center text-lg font-bold opacity-70">
            <span>ডেলিভারি চার্জ</span>
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5" />
              <span>৳২০</span>
            </div>
          </div>

          <div className="h-px bg-white/10 dark:bg-black/10" />

          <div className="flex justify-between items-end">
            <div className="space-y-1">
              <span className="text-sm font-black uppercase tracking-widest opacity-60">
                সর্বমোট
              </span>
              <div className="text-5xl font-black">৳{totalPrice + 20}</div>
            </div>
          </div>
        </div>

        <div className="space-y-4 relative">
          <Link
            href="/checkout"
            className="w-full bg-green-600 hover:bg-green-500 text-white py-6 rounded-[28px] font-black text-xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-green-900/40 active:scale-95 group/btn"
          >
            চেকআউট করুন
            <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-2 transition-transform" />
          </Link>

          <div className="flex items-center justify-center gap-3 py-2">
            <ShieldCheck className="w-5 h-5 text-green-500" />
            <span className="text-xs font-black uppercase tracking-widest opacity-60">
              নিরাপদ পেমেন্ট গ্যারান্টি
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
