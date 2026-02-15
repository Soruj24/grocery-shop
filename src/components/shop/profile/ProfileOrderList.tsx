"use client";

import { Package } from "lucide-react";
import ProfileOrderCard from "./ProfileOrderCard";
import { Order } from "@/types/order";
import { useLanguage } from "@/components/LanguageContext";

interface ProfileOrderListProps {
  orders: Order[];
  loading: boolean;
}

export default function ProfileOrderList({ orders, loading }: ProfileOrderListProps) {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 flex items-center">
        <Package className="w-6 h-6 mr-2 text-green-600 dark:text-green-400" />
        {t('my_orders')}
      </h2>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            {t('loading_orders')}
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 p-12 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800 text-center space-y-4">
            <Package className="w-12 h-12 text-gray-300 dark:text-gray-700 mx-auto" />
            <p className="text-gray-500 dark:text-gray-400">{t('no_orders')}</p>
          </div>
        ) : (
          orders.map((order: Order) => (
            <ProfileOrderCard key={order._id} order={order} />
          ))
        )}
      </div>
    </div>
  );
}
