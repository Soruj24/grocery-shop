"use client";

import FormField from "./FormField";
import type { SettingsData } from "@/types/settings";

interface BusinessTabProps {
  formData: SettingsData;
  onChange: (data: SettingsData) => void;
}

export default function BusinessTab({ formData, onChange }: BusinessTabProps) {
  const update = (field: keyof SettingsData, value: unknown) =>
    onChange({ ...formData, [field]: value });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          label="ডেলিভারি চার্জ (৳)"
          value={formData.deliveryCharge}
          onChange={(v) => update("deliveryCharge", Number(v))}
          type="number"
        />
        <FormField
          label="ফ্রি ডেলিভারি হবে (টাকার উপরে)"
          value={formData.freeDeliveryThreshold}
          onChange={(v) => update("freeDeliveryThreshold", Number(v))}
          type="number"
          hint="০ দিলে এই ফিচার বন্ধ থাকবে"
        />
      </div>

      <div className="flex items-center justify-between p-6 bg-gray-50 dark:bg-gray-800/50 rounded-[2rem] border border-gray-100 dark:border-gray-800 group hover:border-emerald-500/20 transition-all duration-300">
        <div>
          <p className="font-black text-gray-800 dark:text-white text-lg tracking-tight">
            দোকান খোলা/বন্ধ
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 font-bold mt-1">
            দোকান বন্ধ থাকলে কাস্টমার অর্ডার করতে পারবে না
          </p>
        </div>
        <button
          type="button"
          onClick={() => update("shopStatus", !formData.shopStatus)}
          className={`relative inline-flex h-8 w-14 items-center rounded-full transition-all duration-500 focus:outline-none ring-4 ring-transparent group-hover:ring-emerald-500/5 ${
            formData.shopStatus ? "bg-emerald-500" : "bg-gray-300 dark:bg-gray-700"
          }`}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-lg transition-transform duration-500 ${
              formData.shopStatus ? "translate-x-7" : "translate-x-1"
            }`}
          />
        </button>
      </div>
    </div>
  );
}
