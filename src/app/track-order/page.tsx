"use client";

import { useState } from "react";
import { Search, Package, CheckCircle2, Clock, Truck, XCircle, MapPin, Phone } from "lucide-react";
import Link from "next/link";
import { format } from "date-fns";
import { bn } from "date-fns/locale";

type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

interface OrderDetails {
  _id: string;
  status: OrderStatus;
  createdAt: string;
  total: number;
  items: Array<{ name: string; quantity: number; price: number }>;
  paymentMethod: string;
  paymentStatus: string;
  address: string;
}

const steps = [
  { id: 'pending', label: 'অর্ডার প্লেসড', icon: Clock },
  { id: 'confirmed', label: 'কনফার্ম হয়েছে', icon: CheckCircle2 },
  { id: 'processing', label: 'প্রসেসিং', icon: Package },
  { id: 'shipped', label: 'শিপড', icon: Truck },
  { id: 'delivered', label: 'ডেলিভার্ড', icon: MapPin },
];

export default function TrackOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [order, setOrder] = useState<OrderDetails | null>(null);

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch("/api/track-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId: orderId.trim(), phone: phone.trim() }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setOrder(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStepStatus = (stepId: string, currentStatus: OrderStatus) => {
    if (currentStatus === 'cancelled') return 'cancelled';
    
    const statusOrder = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];
    const currentIndex = statusOrder.indexOf(currentStatus);
    const stepIndex = statusOrder.indexOf(stepId);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-black text-gray-900 dark:text-white tracking-tight">
            অর্ডার ট্র্যাকিং
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            আপনার অর্ডার আইডি এবং ফোন নম্বর দিয়ে অর্ডারের বর্তমান অবস্থা জানুন
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-10 border border-gray-100 dark:border-gray-700">
          <form onSubmit={handleTrack} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="orderId" className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                  অর্ডার আইডি
                </label>
                <input
                  id="orderId"
                  type="text"
                  required
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                  placeholder="যেমন: 65a1b2..."
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="phone" className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">
                  ফোন নম্বর
                </label>
                <input
                  id="phone"
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-5 py-3 rounded-xl border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700/50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all outline-none"
                  placeholder="যে নম্বর দিয়ে অর্ডার করেছেন"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/20"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Search className="w-5 h-5" />
                  ট্র্যাক করুন
                </>
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 p-4 rounded-xl bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
              <XCircle className="w-5 h-5 flex-shrink-0" />
              <p className="font-medium text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Results */}
        {order && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Status Timeline */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 sm:p-10 border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="flex items-center justify-between mb-8 border-b border-gray-100 dark:border-gray-700 pb-6">
                 <div>
                    <h3 className="text-lg font-black text-gray-900 dark:text-white">অর্ডার স্ট্যাটাস</h3>
                    <p className="text-sm text-gray-500 mt-1">Order #{order._id.slice(-6).toUpperCase()}</p>
                 </div>
                 <span className={`px-4 py-1.5 rounded-full text-sm font-bold capitalize ${
                    order.status === 'cancelled' 
                        ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/30 dark:text-emerald-400'
                 }`}>
                    {order.status}
                 </span>
              </div>

              {order.status === 'cancelled' ? (
                <div className="text-center py-8">
                    <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <XCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">অর্ডারটি বাতিল করা হয়েছে</h3>
                    <p className="text-gray-500 mt-2">যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন</p>
                </div>
              ) : (
                <div className="relative">
                    <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-gray-700 -translate-y-1/2 hidden sm:block" />
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-8 sm:gap-0 relative z-10">
                        {steps.map((step, idx) => {
                            const status = getStepStatus(step.id, order.status);
                            const Icon = step.icon;
                            
                            return (
                                <div key={step.id} className="flex flex-row sm:flex-col items-center gap-4 sm:gap-4 sm:text-center">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-4 transition-all duration-500 ${
                                        status === 'completed' || status === 'current'
                                            ? 'bg-emerald-500 border-emerald-200 dark:border-emerald-900 text-white shadow-lg shadow-emerald-500/30 scale-110'
                                            : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-600 text-gray-400'
                                    }`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className={`text-sm font-bold ${
                                            status === 'completed' || status === 'current'
                                                ? 'text-emerald-600 dark:text-emerald-400'
                                                : 'text-gray-500 dark:text-gray-400'
                                        }`}>{step.label}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
              )}
            </div>

            {/* Order Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                    <h3 className="font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <Package className="w-5 h-5 text-emerald-500" />
                        অর্ডারের বিবরণ
                    </h3>
                    <div className="space-y-4">
                        {order.items.map((item, i) => (
                            <div key={i} className="flex justify-between items-center py-2 border-b border-gray-50 dark:border-gray-700/50 last:border-0">
                                <div className="flex items-center gap-3">
                                    <span className="w-6 h-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-xs font-bold text-gray-600 dark:text-gray-300">
                                        {item.quantity.toLocaleString('bn-BD')}x
                                    </span>
                                    <span className="text-gray-700 dark:text-gray-300 font-medium">{item.name}</span>
                                </div>
                                {/* <span className="font-bold text-gray-900 dark:text-white">৳{item.price * item.quantity}</span> */}
                            </div>
                        ))}
                        <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center">
                            <span className="font-bold text-gray-500">মোট টাকা</span>
                            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">৳{order.total.toLocaleString('bn-BD')}</span>
                        </div>
                    </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-gray-700">
                    <h3 className="font-black text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                        <MapPin className="w-5 h-5 text-emerald-500" />
                        ডেলিভারি তথ্য
                    </h3>
                    <div className="space-y-4 text-sm">
                        <div>
                            <p className="text-gray-500 font-bold mb-1">তারিখ</p>
                            <p className="text-gray-900 dark:text-white font-medium">
                                {format(new Date(order.createdAt), "dd MMM yyyy, h:mm a", { locale: bn })}
                            </p>
                        </div>
                        <div>
                            <p className="text-gray-500 font-bold mb-1">ঠিকানা</p>
                            <p className="text-gray-900 dark:text-white font-medium">{order.address}</p>
                        </div>
                        <div>
                            <p className="text-gray-500 font-bold mb-1">পেমেন্ট মেথড</p>
                            <p className="text-gray-900 dark:text-white font-medium uppercase">{order.paymentMethod} ({order.paymentStatus})</p>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
