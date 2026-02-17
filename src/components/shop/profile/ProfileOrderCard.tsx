"use client";

import { Clock, Package, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { useState } from "react";
import OrderTrackingTimeline from "./OrderTrackingTimeline";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/components/CartContext";
import { Toast } from "@/lib/toast";
import { Order, OrderItem } from "@/types/order";
import Image from "next/image";
import { useLanguage } from "@/components/LanguageContext";

interface ProfileOrderCardProps {
  order: Order;
}

export default function ProfileOrderCard({ order }: ProfileOrderCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { addToCart } = useCart();
  const { t, language } = useLanguage();

  const handleReorder = () => {
    order.items.forEach((item: OrderItem) => {
      // Mapping order item back to CartItem format
      const cartItem = {
        _id: item.product, // Using product ID as _id
        name: item.name,
        price: item.price,
        image: item.image || getProductFallbackImage(item.name), // Use fallback if image is not in snapshot
      };
      addToCart(cartItem, item.quantity);
    });
    Toast.fire({
      icon: 'success',
      title: t('items_added_to_cart'),
      background: '#020617',
      color: '#fff',
    });
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pending": return t('status_pending');
      case "processing": return t('status_processing');
      case "shipped": return t('status_shipped');
      case "delivered": return t('status_delivered');
      case "cancelled": return t('status_cancelled');
      default: return status;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/10 text-yellow-600 border-yellow-500/20";
      case "processing":
        return "bg-blue-500/10 text-blue-600 border-blue-500/20";
      case "shipped":
        return "bg-purple-500/10 text-purple-600 border-purple-500/20";
      case "delivered":
        return "bg-green-500/10 text-green-600 border-green-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-600 border-red-500/20";
      default:
        return "bg-gray-500/10 text-gray-600 border-gray-500/20";
    }
  };

  return (
    <div className="bg-white dark:bg-white/5 rounded-[32px] border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden transition-all hover:shadow-md">
      <div className="p-6 md:p-8 space-y-6">
        <div className="flex flex-wrap justify-between items-start gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest font-mono">
                {t('order_id_label')} #{order._id.slice(-8).toUpperCase()}
              </span>
              <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusStyle(order.status)}`}>
                {getStatusLabel(order.status)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Clock size={14} />
              <span className="text-sm font-medium">
                {new Date(order.createdAt).toLocaleDateString(language === 'bn' ? "bn-BD" : "en-US", {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
          </div>
          
          <div className="text-right">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('total_amount')}</p>
            <p className="text-2xl font-black text-green-600">{t('currency_symbol')} {order.total.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}</p>
          </div>
        </div>

        {/* Tracking Timeline */}
        {order.status !== 'cancelled' && (
          <div className="bg-gray-50/50 dark:bg-black/20 rounded-2xl">
            <OrderTrackingTimeline status={order.status} />
          </div>
        )}

        <div className="flex justify-between items-center pt-2">
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Package size={16} />
            <span className="text-sm font-bold">{order.items.length.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')} {t('products_count_suffix')}</span>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={handleReorder}
              className="flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-green-500/10 text-green-600 px-4 py-2 rounded-xl hover:bg-green-500 hover:text-white transition-all"
            >
              <RotateCcw size={14} />
              {t('reorder')}
            </button>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-sm font-bold text-green-600 hover:text-green-700 transition-colors"
            >
              {isExpanded ? (
                <>{t('hide_details')} <ChevronUp size={16} /></>
              ) : (
                <>{t('view_details')} <ChevronDown size={16} /></>
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
                  <div key={index} className="flex items-center justify-between gap-4 p-4 bg-gray-50 dark:bg-white/5 rounded-2xl">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center border border-gray-100 dark:border-white/5 overflow-hidden">
                        <Image 
                          src={item.image || getProductFallbackImage(item.name)} 
                          alt={item.name} 
                          width={48} 
                          height={48} 
                          sizes="48px"
                          className="w-full h-full object-cover" 
                        />
                      </div>
                      <div>
                        <p className="font-bold text-gray-900 dark:text-white text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">{item.quantity.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')} x {t('currency_symbol')}{item.price.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900 dark:text-white">{t('currency_symbol')} {(item.quantity * item.price).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}</p>
                  </div>
                ))}
                
                <div className="p-4 bg-green-500/5 rounded-2xl border border-green-500/10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500 font-medium">{t('delivery_address_label')}:</span>
                    <span className="text-gray-900 dark:text-white font-bold">{order.address}</span>
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
