"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Truck,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ShippingCalculatorProps {
  onShippingCalculated?: (fee: number) => void;
}

export default function ShippingCalculator({
  onShippingCalculated,
}: ShippingCalculatorProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [city, setCity] = useState("");
  const [estimatedFee, setEstimatedFee] =
    useState<number | null>(null);

  const cities = [
    "Dhaka",
    "Chattogram",
    "Khulna",
    "Rajshahi",
    "Sylhet",
    "Barishal",
    "Rangpur",
    "Mymensingh",
  ];

  const handleCalculate = () => {
    const fee = city === "Dhaka" ? 30 : 60;
    setEstimatedFee(fee);
  };

  return (
    <div className="space-y-2.5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-[10px] font-semibold text-muted-foreground/50 uppercase tracking-wider hover:text-foreground transition-colors"
      >
        <Truck className="w-3.5 h-3.5" />
        Shipping Calculator
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-2.5 p-3.5 bg-black/[0.02] dark:bg-white/[0.02] rounded-lg border border-black/[0.04] dark:border-white/[0.04]"
        >
          <select
            value={city}
            onChange={(e) =>
              setCity(e.target.value)
            }
            className="w-full bg-white dark:bg-[#09090b] border border-black/[0.04] dark:border-white/[0.04] rounded-lg px-3.5 py-2.5 text-xs font-medium text-foreground focus:ring-1 focus:ring-foreground/20 transition-all"
          >
            <option value="">
              Select your city
            </option>
            {cities.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <button
            onClick={handleCalculate}
            disabled={!city}
            className="w-full bg-foreground text-background py-2.5 rounded-lg font-semibold text-xs hover:opacity-90 transition-all disabled:opacity-40"
          >
            Calculate Shipping
          </button>
          {estimatedFee !== null && (
            <motion.div
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between bg-foreground/[0.03] dark:bg-white/[0.04] px-3.5 py-2.5 rounded-lg"
            >
              <span className="text-xs font-medium text-muted-foreground/60">
                Estimated Fee
              </span>
              <span className="text-sm font-bold text-foreground">
                {t("currency_symbol")}
                {estimatedFee.toLocaleString(
                  "bn-BD"
                )}
              </span>
            </motion.div>
          )}
        </motion.div>
      )}
    </div>
  );
}
