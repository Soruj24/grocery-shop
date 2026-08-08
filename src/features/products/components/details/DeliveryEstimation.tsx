"use client";

import { useState, useEffect } from "react";
import { Truck } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function DeliveryEstimation() {
  const { t } = useLanguage();
  const [estimatedDate, setEstimatedDate] =
    useState("");

  useEffect(() => {
    const today = new Date();
    const deliveryDate = new Date(today);
    deliveryDate.setDate(
      deliveryDate.getDate() + 2
    );
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    setEstimatedDate(
      deliveryDate.toLocaleDateString(
        "en-US",
        options
      )
    );
  }, []);

  if (!estimatedDate) return null;

  return (
    <div className="bg-primary/[0.04] dark:bg-primary/[0.06] border border-primary/[0.1] rounded-xl p-4 space-y-2">
      <div className="flex items-center gap-2">
        <Truck className="w-4 h-4 text-primary" />
        <span className="text-[11px] font-semibold text-primary uppercase tracking-wider">
          Estimated Delivery
        </span>
      </div>
      <p className="text-sm font-medium text-foreground">
        Order within the next{" "}
        <span className="text-primary font-semibold">
          2 hours 30 minutes
        </span>{" "}
        to get it by
      </p>
      <p className="text-lg font-bold text-primary">
        {estimatedDate}
      </p>
    </div>
  );
}
