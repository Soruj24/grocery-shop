import { Clock, Truck, CheckCircle, XCircle, Package } from "lucide-react";
import StatusBadge from "@/components/admin/StatusBadge";

interface Order {
  _id: string;
  phone: string;
  address: string;
  total: number;
  paymentMethod: string;
  transactionId?: string;
  status: string;
}

interface OrderTableRowProps {
  order: Order;
  onStatusUpdate: (id: string, status: string) => void;
}

export default function OrderTableRow({
  order,
  onStatusUpdate,
}: OrderTableRowProps) {
  return (
    <tr className="group hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-all duration-300">
      <td className="px-8 py-6 font-mono text-xs text-gray-500 dark:text-gray-400">
        #{order._id.slice(-6).toUpperCase()}
      </td>
      <td className="px-8 py-6">
        <p className="font-black text-gray-800 dark:text-white">
          {order.phone}
        </p>
        <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate max-w-[200px] mt-0.5 font-bold">
          {order.address}
        </p>
      </td>
      <td className="px-8 py-6 font-black text-gray-900 dark:text-white">
        ৳ {order.total}
      </td>
      <td className="px-8 py-6">
        <div className="flex flex-col gap-1.5">
          <span
            className={`text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full w-fit border ${
              order.paymentMethod === "cod"
                ? "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700"
                : order.paymentMethod === "bkash"
                  ? "bg-[#D12053]/5 dark:bg-[#D12053]/10 text-[#D12053] dark:text-[#E2136E] border-[#D12053]/20 dark:border-[#E2136E]/30"
                  : "bg-[#F7941D]/5 dark:bg-[#F7941D]/10 text-[#F7941D] dark:text-[#FF9F29] border-[#F7941D]/20 dark:border-[#FF9F29]/30"
            }`}
          >
            {order.paymentMethod === "cod"
              ? "Cash on Delivery"
              : order.paymentMethod === "bkash"
                ? "bKash"
                : "Nagad"}
          </span>
          {order.transactionId && (
            <span className="text-[9px] font-mono font-black text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-800/50 px-2 py-0.5 rounded border border-gray-100 dark:border-gray-800 w-fit">
              TRX: {order.transactionId}
            </span>
          )}
        </div>
      </td>
      <td className="px-8 py-6">
        <StatusBadge
          status={order.status}
          label={
            order.status === "pending"
              ? "পেন্ডিং"
              : order.status === "processing"
                ? "প্রসেসিং"
                : order.status === "shipped"
                  ? "শিপড"
                  : order.status === "delivered"
                    ? "ডেলিভারড"
                    : "ক্যানসেল"
          }
          icon={
            order.status === "pending"
              ? Clock
              : order.status === "processing" || order.status === "shipped"
                ? Truck
                : order.status === "delivered"
                  ? CheckCircle
                  : XCircle
          }
        />
      </td>
      <td className="px-8 py-6 text-right">
        <select
          className="text-[11px] font-black uppercase tracking-wider bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-2xl px-4 py-2.5 outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 dark:focus:border-emerald-500/50 transition-all cursor-pointer appearance-none min-w-[140px] text-center"
          value={order.status}
          onChange={(e) => onStatusUpdate(order._id, e.target.value)}
        >
          <option value="pending" className="dark:bg-gray-900">
            Pending
          </option>
          <option value="processing" className="dark:bg-gray-900">
            Processing
          </option>
          <option value="shipped" className="dark:bg-gray-900">
            Shipped
          </option>
          <option value="delivered" className="dark:bg-gray-900">
            Delivered
          </option>
          <option value="cancelled" className="dark:bg-gray-900">
            Cancelled
          </option>
        </select>
      </td>
    </tr>
  );
}
