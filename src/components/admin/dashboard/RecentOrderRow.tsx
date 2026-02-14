import { Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import StatusBadge from "@/components/admin/StatusBadge";

interface RecentOrder {
  _id: string;
  phone: string;
  total: number;
  status: string;
  createdAt: string;
}

interface RecentOrderRowProps {
  order: RecentOrder;
  getStatusLabel: (status: string) => string;
}

export default function RecentOrderRow({
  order,
  getStatusLabel,
}: RecentOrderRowProps) {
  return (
    <tr className="group hover:bg-gray-50/50 dark:hover:bg-gray-800/50 transition-all duration-300">
      <td className="px-8 py-6">
        <span className="font-mono text-xs font-black text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800 px-2.5 py-1 rounded-lg group-hover:bg-white dark:group-hover:bg-gray-900 transition-colors border border-transparent group-hover:border-gray-100 dark:group-hover:border-gray-700">
          #{order._id.slice(-6).toUpperCase()}
        </span>
      </td>
      <td className="px-8 py-6">
        <span className="text-[13.5px] font-black text-gray-800 dark:text-gray-200">
          {order.phone}
        </span>
      </td>
      <td className="px-8 py-6">
        <span className="text-[15px] font-black text-gray-900 dark:text-white italic">
          ৳{order.total}
        </span>
      </td>
      <td className="px-8 py-6">
        <StatusBadge
          status={order.status}
          label={getStatusLabel(order.status)}
          type="order"
        />
      </td>
      <td className="px-8 py-6">
        <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-[11px] font-bold uppercase tracking-tighter">
            {new Date(order.createdAt).toLocaleDateString("bn-BD")}
          </span>
        </div>
      </td>
      <td className="px-8 py-6 text-right">
        <Link
          href={`/admin/orders?id=${order._id}`}
          className="p-2 inline-block bg-gray-50 dark:bg-gray-800 text-gray-400 dark:text-gray-500 hover:bg-green-600 hover:text-white dark:hover:bg-green-500 dark:hover:text-white rounded-xl transition-all duration-300"
        >
          <ChevronRight className="w-4 h-4" />
        </Link>
      </td>
    </tr>
  );
}
