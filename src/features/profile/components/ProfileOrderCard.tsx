"use client";

import { Clock, Package, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { useState } from "react";
import OrderTrackingTimeline from "./OrderTrackingTimeline";
import { motion, AnimatePresence } from "framer-motion";
import { useReorder } from "@/features/orders/hooks/useReorder";
import { Order, OrderItem } from "@/types/order";
import Image from "next/image";
import { getProductFallbackImage } from "@/constants/fallback-images";
import { useLanguage } from "@/contexts/LanguageContext";
import OrderStatusBadge from "./OrderStatusBadge";

interface ProfileOrderCardProps {
  order: Order;
}

export default function ProfileOrderCard({ order }: ProfileOrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { reorder } = useReorder();
  const { t } = useLanguage();

  return (
    <div className="bg-white dark:bg-white/5 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono">
                {t("order_id_label")} #{order._id.slice(-8).toUpperCase()}
              </span>
              <OrderStatusBadge status={order.status} />
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Clock size={14} />
              <span className="text-sm font-medium">
                {new Date(order.createdAt).toLocaleDateString("bn-BD", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
              {t("total_amount")}
            </p>
            <p className="text-2xl font-black text-green-600">
              {t("currency_symbol")} {order.total.toLocaleString("bn-BD")}
            </p>
          </div>
        </div>

        {order.status !== "cancelled" && (
          <div className="bg-gray-50/50 dark:bg-black/20 rounded-2xl">
            <OrderTrackingTimeline status={order.status} />
          </div>
        )}

        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Package size={16} />
            <span className="text-sm font-bold">
              {order.items.length.toLocaleString("bn-BD")}{" "}
              {t("products_count_suffix")}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => reorder(order.items)}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-green-500/10 text-green-600 px-4 py-2 rounded-xl hover:bg-green-500 hover:text-white transition-all"
            >
              <RotateCcw size={14} />
              {t("reorder")}
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm font-bold text-green-600 hover:text-green-700 transition-colors"
            >
              {isExpanded ? (
                <>
                  {t("hide_details")} <ChevronUp size={16} />
                </>
              ) : (
                <>
                  {t("view_details")} <ChevronDown size={16} />
                </>
              )}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-6 border-t border-gray-100 dark:border-white/5 space-y-4">
                {order.items.map((item: OrderItem, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center border border-gray-100 dark:border-white/5 overflow-hidden">
                        <Image
                          src={
                            item.image ||
                            getProductFallbackImage(item.name)
                          }
                          alt={item.name}
                          width={48}
                          height={48}
                          sizes="48px"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">
                          {item.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.quantity.toLocaleString("bn-BD")} x{" "}
                          {t("currency_symbol")}
                          {item.price.toLocaleString("bn-BD")}
                        </p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {t("currency_symbol")}{" "}
                      {(item.quantity * item.price).toLocaleString("bn-BD")}
                    </p>
                  </div>
                ))}

                <div className="p-4 bg-green-500/5 rounded-2xl border border-green-500/10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">
                      {t("delivery_address_label")}:
                    </span>
                    <span className="text-gray-900 dark:text-white font-bold">
                      {order.address}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
