import { Clock } from "lucide-react";

interface ProfileOrderCardProps {
  order: any;
}

export default function ProfileOrderCard({ order }: ProfileOrderCardProps) {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400";
      case "processing":
        return "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400";
      case "shipped":
        return "bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400";
      case "delivered":
        return "bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400";
      case "cancelled":
        return "bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400";
      default:
        return "";
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm space-y-4 hover:border-green-100 dark:hover:border-green-900/30 transition-colors">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500 font-mono">
            #{order._id.slice(-6).toUpperCase()}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center mt-1">
            <Clock className="w-3 h-3 mr-1" />
            {new Date(order.createdAt).toLocaleDateString("bn-BD")}
          </p>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusStyle(order.status)}`}
        >
          {order.status}
        </span>
      </div>

      <div className="border-t border-gray-50 dark:border-gray-800 pt-4 flex justify-between items-center">
        <div className="text-sm text-gray-600 dark:text-gray-400">
          {order.items.length} টি প্রোডাক্ট
        </div>
        <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
          ৳ {order.total}
        </div>
      </div>
    </div>
  );
}
