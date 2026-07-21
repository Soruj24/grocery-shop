"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Truck, CalendarDays } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DeliveryEstimation() {
  const { t } = useLanguage();
  const [estimatedDate, setEstimatedDate] = useState("");

  useEffect(() => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(deliveryDate.getDate() + 2);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' };
    setEstimatedDate(deliveryDate.toLocaleDateString('en-US', options));
  }, []);

  if (!estimatedDate) return null;

  return (
    <div className="bg-primary-subtle/50 border border-primary/20 rounded-xl p-4 space-y-2">
      <div className="flex items-center gap-2">
        <Truck className="w-4 h-4 text-primary" />
        <span className="text-xs font-black text-primary uppercase tracking-widest">Estimated Delivery</span>
      </div>
      <p className="text-sm font-bold text-foreground">
        Order within the next <span className="text-primary">2 hours 30 minutes</span> to get it by
      </p>
      <p className="text-lg font-black text-primary">
        {estimatedDate}
      </p>
    </div>
  );
}
