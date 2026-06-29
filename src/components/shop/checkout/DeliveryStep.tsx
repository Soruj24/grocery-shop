"use client";

import { Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/providers/LanguageContext";

interface DeliveryStepProps {
  deliverySlot: string;
  onSlotChange: (slot: string) => void;
  onNext: () => void;
  onPrev: () => void;
}

export default function DeliveryStep({
  deliverySlot,
  onSlotChange,
  onNext,
  onPrev,
}: DeliveryStepProps) {
  const { t } = useLanguage();

  const timeSlots = [
    t("delivery_slot_morning"),
    t("delivery_slot_afternoon"),
    t("delivery_slot_evening"),
    t("delivery_slot_night"),
  ];

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-[40px] shadow-sm border border-gray-100 dark:border-gray-800 space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600">
          <Clock className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black text-gray-900 dark:text-white">
          {t("delivery_time_label")}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            type="button"
            onClick={() => onSlotChange(slot)}
            className={`p-6 rounded-[32px] border-2 transition-all flex flex-col items-center gap-4 text-center ${
              deliverySlot === slot
                ? "border-green-600 bg-green-50 dark:bg-green-900/20"
                : "border-gray-50 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50 hover:border-gray-200"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                deliverySlot === slot
                  ? "bg-green-600 text-white"
                  : "bg-white dark:bg-gray-900 text-gray-300"
              }`}
            >
              <Clock className="w-6 h-6" />
            </div>
            <span className="font-black text-sm">{slot}</span>
          </button>
        ))}
      </div>

      <div className="flex gap-4">
        <button
          onClick={onPrev}
          className="flex-1 bg-gray-100 dark:bg-gray-800 text-gray-600 py-6 rounded-[32px] font-black transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-6 h-6" />
          {t("back_to_prev")}
        </button>
        <button
          onClick={onNext}
          className="flex-[2] bg-green-600 hover:bg-green-700 text-white py-6 rounded-[32px] font-black text-xl transition-all flex items-center justify-center gap-4 shadow-xl shadow-green-600/20"
        >
          {t("next_step")}
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
