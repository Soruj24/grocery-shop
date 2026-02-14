import {
  Package,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  ShoppingBag,
  MapPin,
  Phone,
  Calendar,
  CreditCard,
} from "lucide-react";
import { AdminOrder as Order } from "@/types/admin";

interface OrderCardProps {
  order: Order;
}

export default function OrderCard({ order }: OrderCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-800/50";
      case "confirmed":
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-800/50";
      case "delivered":
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800/50";
      case "cancelled":
        return "bg-red-100 text-red-700 border-red-200 dark:bg-red-900/20 dark:text-red-400 dark:border-red-800/50";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-700";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending":
        return "পেন্ডিং";
      case "confirmed":
        return "নিশ্চিত করা হয়েছে";
      case "delivered":
        return "ডেলিভারি হয়েছে";
      case "cancelled":
        return "বাতিল করা হয়েছে";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "confirmed":
        return <CheckCircle2 className="w-4 h-4" />;
      case "delivered":
        return <CheckCircle2 className="w-4 h-4" />;
      case "cancelled":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 transition-all duration-500 overflow-hidden group">
      {/* Header */}
      <div className="p-6 sm:p-8 border-b border-gray-50 dark:border-gray-800 flex flex-wrap items-center justify-between gap-4 bg-gray-50/30 dark:bg-gray-800/30">
        <div className="flex items-center gap-4">
          <div className="bg-white dark:bg-gray-900 p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <Package className="w-6 h-6 text-green-600 dark:text-green-500" />
          </div>
          <div>
            <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
              অর্ডার আইডি
            </p>
            <p className="text-sm font-black text-gray-800 dark:text-gray-100">
              #{order._id.slice(-8).toUpperCase()}
            </p>
          </div>
        </div>
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-black text-xs ${getStatusColor(
            order.status
          )}`}
        >
          {getStatusIcon(order.status)}
          {getStatusLabel(order.status)}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8 space-y-8">
        {/* Items List */}
        <div className="space-y-4">
          {order.items.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 group/item">
              <div className="w-16 h-16 bg-gray-50 dark:bg-gray-800 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex-shrink-0 flex items-center justify-center">
                {item.product?.image ? (
                  <img
                    src={item.product.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ShoppingBag className="w-6 h-6 text-gray-300 dark:text-gray-600" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-black text-gray-800 dark:text-gray-100 truncate group-hover/item:text-green-600 dark:group-hover/item:text-green-500 transition-colors">
                  {item.name}
                </p>
                <p className="text-xs font-bold text-gray-400 dark:text-gray-500">
                  {item.quantity} x ৳{item.price}
                </p>
              </div>
              <div className="text-right">
                <p className="font-black text-gray-800 dark:text-gray-100">
                  ৳{item.quantity * item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Order Info Grid */}
        <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-gray-50 dark:border-gray-800">
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5" />
              <div>
                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  ডেলিভারি ঠিকানা
                </p>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300 leading-relaxed">
                  {order.address}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <div>
                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  ফোন নম্বর
                </p>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  {order.phone}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5" />
              <div>
                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  পেমেন্ট মেথড
                </p>
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                    {order.paymentMethod === "cod"
                      ? "ক্যাশ অন ডেলিভারি"
                      : order.paymentMethod === "bkash"
                      ? "বিকাশ"
                      : order.paymentMethod === "nagad"
                      ? "নগদ"
                      : "ক্যাশ অন ডেলিভারি"}
                  </p>
                  {order.transactionId && (
                    <p className="text-[10px] font-mono text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded w-fit border border-gray-200 dark:border-gray-700">
                      ID: {order.transactionId}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-400 dark:text-gray-500" />
              <div>
                <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
                  অর্ডারের তারিখ
                </p>
                <p className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  {new Date(order.createdAt).toLocaleDateString("bn-BD", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between bg-green-50 dark:bg-green-900/10 p-4 rounded-2xl border border-green-100 dark:border-green-800/50">
              <span className="text-sm font-black text-green-800 dark:text-green-400">
                সর্বমোট (ডেলিভারি সহ)
              </span>
              <span className="text-xl font-black text-green-600 dark:text-green-500">
                ৳{order.total}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50/50 dark:bg-gray-800/50 border-t border-gray-50 dark:border-gray-800 flex justify-end">
        <button className="flex items-center gap-2 text-xs font-black text-green-600 dark:text-green-500 hover:text-green-700 dark:hover:text-green-400 transition-colors uppercase tracking-widest">
          ডিটেইলস দেখুন
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
