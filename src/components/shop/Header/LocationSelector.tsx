"use client";

import { MapPin, ChevronDown } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, setLocation, toggleLocationModal } from "@/redux/store";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const locations = ["ঢাকা", "চট্টগ্রাম", "সিলেট", "রাজশাহী", "খুলনা", "বরিশাল", "রংপুর", "ময়মনসিংহ"];

export default function LocationSelector() {
  const dispatch = useDispatch();
  const currentLocation = useSelector((state: RootState) => state.ui.location);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 text-white/90 hover:text-white transition-colors group"
      >
        <MapPin size={14} className="text-green-400 group-hover:scale-110 transition-transform" />
        <span className="flex items-center gap-1">
          {currentLocation}
          <ChevronDown size={12} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute top-full left-0 mt-3 w-64 bg-white dark:bg-[#0F172A] border border-gray-100 dark:border-white/10 rounded-[24px] shadow-2xl z-50 overflow-hidden backdrop-blur-3xl"
            >
              <div className="p-4 border-b border-gray-50 dark:border-white/5">
                <h3 className="text-sm font-black text-gray-900 dark:text-white">লোকেশন সিলেক্ট করুন</h3>
              </div>
              <div className="p-2 grid grid-cols-1 gap-1">
                {locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      dispatch(setLocation(loc));
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold transition-all ${
                      currentLocation === loc
                        ? "bg-green-50 dark:bg-green-500/10 text-green-600 dark:text-green-400"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5"
                    }`}
                  >
                    {loc}
                    {currentLocation === loc && <div className="w-2 h-2 rounded-full bg-green-500" />}
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
