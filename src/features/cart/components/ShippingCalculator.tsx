"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Truck, MapPin, ChevronDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface ShippingCalculatorProps {
  onShippingCalculated?: (fee: number) => void;
}

export default function ShippingCalculator({ onShippingCalculated }: ShippingCalculatorProps) {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [estimatedFee, setEstimatedFee] = useState<number | null>(null);

  const cities = ["Dhaka", "Chattogram", "Khulna", "Rajshahi", "Sylhet", "Barishal", "Rangpur", "Mymensingh"];

  const handleCalculate = () => {
    const fee = city === "Dhaka" ? 30 : 60;
    setEstimatedFee(fee);
  };

  return (
    <div className="space-y-3">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-xs font-black text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors"
      >
        <Truck className="w-4 h-4" />
        Shipping Calculator
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="space-y-3 p-4 bg-subtle rounded-xl border border-border">
          <select
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="w-full bg-card border border-border rounded-lg px-4 py-3 text-sm font-bold text-foreground focus:ring-2 focus:ring-primary transition-all"
          >
            <option value="">Select your city</option>
            {cities.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <button
            onClick={handleCalculate}
            disabled={!city}
            className="w-full bg-foreground text-background py-3 rounded-lg font-black text-sm hover:opacity-90 transition-all disabled:opacity-50"
          >
            Calculate Shipping
          </button>
          {estimatedFee !== null && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between bg-primary-subtle px-4 py-3 rounded-lg"
            >
              <span className="text-sm font-bold text-primary">Estimated Fee</span>
              <span className="text-lg font-black text-primary">
                {t('currency_symbol')}{estimatedFee.toLocaleString('bn-BD')}
              </span>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
