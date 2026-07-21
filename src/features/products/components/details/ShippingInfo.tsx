"use client";

import { Truck, MapPin, Clock, Check } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export default function ShippingInfo() {
  const { t } = useLanguage();

  const items = [
    { icon: Truck, label: "Free Delivery", desc: "Orders over ৳500", color: "text-primary" },
    { icon: Clock, label: "Delivery Time", desc: "1-3 business days", color: "text-warning" },
    { icon: MapPin, label: "Coverage", desc: "All over Bangladesh", color: "text-info" },
    { icon: Check, label: "Cash on Delivery", desc: "Pay when you receive", color: "text-success" },
  ];

  return (
    <div className="grid grid-cols-2 gap-3">
      {items.map((item, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.05 }}
          className="flex items-center gap-3 bg-subtle p-3 rounded-xl border border-border"
        >
          <div className={`p-2 rounded-lg ${item.color} bg-opacity-10`}>
            <item.icon className={`w-4 h-4 ${item.color}`} />
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-black text-foreground">{item.label}</span>
            <span className="text-[10px] font-bold text-muted-foreground">{item.desc}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
