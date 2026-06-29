"use client";

import { motion } from "framer-motion";
import { Timer } from "lucide-react";

interface TimeLeft {
  hours: number;
  minutes: number;
  seconds: number;
}

interface CountdownTimerProps {
  timeLeft: TimeLeft;
}

export default function CountdownTimer({ timeLeft }: CountdownTimerProps) {
  const units = [
    { label: "Hrs", value: timeLeft.hours },
    { label: "Mins", value: timeLeft.minutes },
    { label: "Secs", value: timeLeft.seconds },
  ];

  return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
      className="flex items-center gap-6 bg-white dark:bg-gray-900/50 backdrop-blur-xl p-8 rounded-[32px] border border-gray-100 dark:border-white/10 shadow-2xl shadow-orange-500/10 mx-auto lg:mx-0">
      <div className="bg-orange-100 dark:bg-orange-500/20 p-4 rounded-full">
        <Timer className="w-10 h-10 text-orange-600 dark:text-orange-500 animate-pulse" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-black text-gray-400 uppercase tracking-widest mb-3">Offer Ends In</span>
        <div className="flex items-center gap-3">
          {units.map((unit, i) => (
            <div key={i} className="flex items-end gap-2">
              <div className="bg-gray-900 dark:bg-white text-white dark:text-black rounded-2xl w-16 h-16 flex items-center justify-center text-3xl font-black tabular-nums shadow-xl shadow-gray-900/20 dark:shadow-white/10 border border-gray-800 dark:border-gray-100 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {unit.value.toString().padStart(2, "0")}
              </div>
              <span className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-wider">{unit.label}</span>
              {i < 2 && <span className="text-3xl font-black text-gray-300 dark:text-gray-700 mx-1 mb-4">:</span>}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
