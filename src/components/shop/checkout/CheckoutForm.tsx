import { MapPin, User, Phone, CreditCard, ShoppingBag, Smartphone, ArrowRight } from "lucide-react";

interface CheckoutFormProps {
  formData: {
    name: string;
    phone: string;
    address: string;
  };
  setFormData: (data: any) => void;
  paymentMethod: 'cod' | 'bkash' | 'nagad';
  setPaymentMethod: (method: 'cod' | 'bkash' | 'nagad') => void;
  transactionId: string;
  setTransactionId: (id: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  totalPrice: number;
}

export default function CheckoutForm({
  formData,
  setFormData,
  paymentMethod,
  setPaymentMethod,
  transactionId,
  setTransactionId,
  handleSubmit,
  loading,
  totalPrice,
}: CheckoutFormProps) {
  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Delivery Info Section */}
      <div className="bg-white dark:bg-gray-900 p-8 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-800 space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 dark:bg-green-900/30 rounded-2xl flex items-center justify-center text-green-600">
            <MapPin className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">ডেলিভারি তথ্য</h2>
        </div>

        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-1">
              পুরো নাম
            </label>
            <div className="relative group">
              <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-600 transition-colors" />
              <input
                type="text"
                required
                className="w-full pl-16 pr-6 py-5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-[24px] focus:ring-4 focus:ring-green-500/10 focus:border-green-600 dark:focus:border-green-500 outline-none transition-all font-bold text-gray-900 dark:text-gray-100"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-1">
              ফোন নম্বর
            </label>
            <div className="relative group">
              <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-300 group-focus-within:text-green-600 transition-colors" />
              <input
                type="text"
                required
                className="w-full pl-16 pr-6 py-5 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-[24px] focus:ring-4 focus:ring-green-500/10 focus:border-green-600 dark:focus:border-green-500 outline-none transition-all font-bold text-gray-900 dark:text-gray-100"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] ml-1">
              ডেলিভারি ঠিকানা
            </label>
            <div className="relative group">
              <MapPin className="absolute left-6 top-6 w-5 h-5 text-gray-300 group-focus-within:text-green-600 transition-colors" />
              <textarea
                required
                className="w-full pl-16 pr-6 py-6 bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 rounded-[24px] focus:ring-4 focus:ring-green-500/10 focus:border-green-600 dark:focus:border-green-500 outline-none transition-all h-32 font-bold text-gray-900 dark:text-gray-100"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Payment Method Section */}
      <div className="bg-white dark:bg-gray-900 p-8 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-800 space-y-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600">
            <CreditCard className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-black text-gray-900 dark:text-white">পেমেন্ট পদ্ধতি</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { id: "cod", name: "ক্যাশ অন ডেলিভারি", icon: ShoppingBag, color: "green" },
            { id: "bkash", name: "বিকাশ", icon: Smartphone, color: "#D12053" },
            { id: "nagad", name: "নগদ", icon: Smartphone, color: "#F7941D" },
          ].map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => setPaymentMethod(method.id as any)}
              className={`relative p-6 rounded-[32px] border-2 transition-all flex flex-col items-center gap-4 group ${
                paymentMethod === method.id
                  ? "border-green-600 bg-green-50 dark:bg-green-900/20"
                  : "border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 hover:border-gray-200"
              }`}
            >
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all ${
                  paymentMethod === method.id
                    ? "bg-green-600 text-white shadow-lg shadow-green-900/20"
                    : "bg-white dark:bg-gray-900 text-gray-300"
                }`}
              >
                <method.icon className="w-7 h-7" />
              </div>
              <span className="font-black text-sm text-gray-700 dark:text-gray-300">
                {method.name}
              </span>
              {paymentMethod === method.id && (
                <div className="absolute top-4 right-4 w-4 h-4 bg-green-600 rounded-full border-2 border-white dark:border-gray-900" />
              )}
            </button>
          ))}
        </div>

        {paymentMethod !== "cod" && (
          <div className="p-8 bg-gray-900 text-white rounded-[32px] space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="flex items-center gap-4">
              <div
                className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                  paymentMethod === "bkash" ? "bg-[#D12053]" : "bg-[#F7941D]"
                }`}
              >
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest opacity-60">
                  {paymentMethod === "bkash" ? "বিকাশ" : "নগদ"} পেমেন্ট ইনস্ট্রাকশন
                </p>
                <p className="font-black">টাকা পাঠানোর নিয়মাবলি</p>
              </div>
            </div>

            <div className="space-y-4 text-sm font-bold opacity-80 leading-loose">
              <p>
                ১. আমাদের <span className="text-green-400 font-black">01XXXXXXXXX</span> নাম্বারে{" "}
                <span className="text-green-400 font-black">৳{totalPrice + 20}</span> টাকা সেন্ড
                মানি করুন।
              </p>
              <p>
                ২. পেমেন্ট সফল হলে ট্রানজেকশন আইডি (Transaction ID) নিচের বক্সে দিয়ে অর্ডার নিশ্চিত
                করুন।
              </p>
            </div>

            <input
              type="text"
              placeholder="ট্রানজেকশন আইডি দিন (e.g. 8N7A6D5C)"
              required
              className="w-full px-8 py-5 bg-white/10 border border-white/10 rounded-[24px] focus:ring-4 focus:ring-green-500/20 focus:border-green-500 outline-none transition-all font-black text-white placeholder:text-white/20"
              value={transactionId}
              onChange={(e) => setTransactionId(e.target.value)}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-500 text-white py-6 rounded-[32px] font-black text-xl transition-all flex items-center justify-center gap-4 shadow-2xl shadow-green-900/20 disabled:opacity-50 active:scale-95 group"
      >
        {loading ? "অর্ডার সাবমিট হচ্ছে..." : "অর্ডার নিশ্চিত করুন"}
        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
      </button>
    </form>
  );
}
