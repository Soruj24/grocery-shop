
import { Truck, RotateCcw, ShieldCheck } from "lucide-react";

export default function TrustBadges() {
  return (
    <div className="mt-24 grid md:grid-cols-3 gap-8">
      <div className="text-center space-y-4 p-8 rounded-2xl bg-muted">
        <Truck className="w-12 h-12 text-primary mx-auto" />
        <h4 className="text-xl font-black">দ্রুত ডেলিভারি</h4>
        <p className="text-muted-foreground font-bold">২৪ ঘণ্টার মধ্যে নিশ্চিত ডেলিভারি</p>
      </div>
      <div className="text-center space-y-4 p-8 rounded-2xl bg-muted">
        <RotateCcw className="w-12 h-12 text-accent mx-auto" />
        <h4 className="text-xl font-black">সহজ রিটার্ন</h4>
        <p className="text-muted-foreground font-bold">৭ দিনের মধ্যে সহজ রিটার্ন সুবিধা</p>
      </div>
      <div className="text-center space-y-4 p-8 rounded-2xl bg-muted">
        <ShieldCheck className="w-12 h-12 text-primary mx-auto" />
        <h4 className="text-xl font-black">শতভাগ নিরাপদ</h4>
        <p className="text-muted-foreground font-bold">আপনার পেমেন্ট ও তথ্য আমাদের কাছে সুরক্ষিত</p>
      </div>
    </div>
  );
}
