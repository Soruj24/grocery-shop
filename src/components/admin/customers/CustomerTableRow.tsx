import { User, Phone, Mail, Calendar } from "lucide-react";
import { AdminCustomer } from "@/types/admin";

interface CustomerTableRowProps {
  customer: AdminCustomer;
}

export default function CustomerTableRow({ customer }: CustomerTableRowProps) {
  return (
    <tr className="group hover:bg-emerald-50/30 dark:hover:bg-emerald-900/10 transition-all duration-300">
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center group-hover:bg-white dark:group-hover:bg-emerald-900/50 group-hover:shadow-md transition-all duration-300">
            <User className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="font-black text-gray-800 dark:text-white text-base">
            {customer.name}
          </span>
        </div>
      </td>
      <td className="px-8 py-6">
        <div className="space-y-1.5">
          <p className="text-sm text-gray-800 dark:text-gray-200 flex items-center font-bold">
            <Phone className="w-3.5 h-3.5 mr-2.5 text-emerald-500 dark:text-emerald-400" />
            {customer.phone || "নম্বর নেই"}
          </p>
          {customer.email && (
            <p className="text-xs text-gray-500 dark:text-gray-400 flex items-center font-medium">
              <Mail className="w-3.5 h-3.5 mr-2.5 text-gray-400 dark:text-gray-500" />
              {customer.email}
            </p>
          )}
        </div>
      </td>
      <td className="px-8 py-6">
        <p className="text-sm text-gray-600 dark:text-gray-400 font-bold max-w-[200px] line-clamp-2">
          {customer.address || "ঠিকানা দেওয়া হয়নি"}
        </p>
      </td>
      <td className="px-8 py-6">
        <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500 font-bold text-xs">
          <Calendar className="w-3.5 h-3.5" />
          {new Date(customer.createdAt).toLocaleDateString("bn-BD")}
        </div>
      </td>
    </tr>
  );
}
