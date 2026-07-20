"use client";

import { Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

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
    <div className="bg-card p-8 rounded-xl shadow-sm border border-border space-y-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-info-subtle rounded-lg flex items-center justify-center text-info">
          <Clock className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-black text-foreground">
          {t("delivery_time_label")}
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {timeSlots.map((slot) => (
          <button
            key={slot}
            type="button"
            onClick={() => onSlotChange(slot)}
            className={`p-6 rounded-xl border-2 transition-all flex flex-col items-center gap-4 text-center ${
              deliverySlot === slot
                ? "border-primary bg-primary-subtle"
                : "border-border bg-muted hover:border-border-strong"
            }`}
          >
            <div
              className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                deliverySlot === slot
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground"
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
          className="flex-1 bg-muted text-muted-foreground py-6 rounded-lg font-black transition-all flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-6 h-6" />
          {t("back_to_prev")}
        </button>
        <button
          onClick={onNext}
          className="flex-[2] bg-primary hover:bg-primary-hover text-primary-foreground py-6 rounded-lg font-black text-xl transition-all flex items-center justify-center gap-4 shadow-primary"
        >
          {t("next_step")}
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
