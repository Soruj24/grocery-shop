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
      className="flex items-center gap-6 bg-card backdrop-blur-xl p-8 rounded-2xl border border-border shadow-sm mx-auto lg:mx-0">
      <div className="bg-warning-subtle p-4 rounded-full">
        <Timer className="w-10 h-10 text-warning animate-pulse" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-black text-muted-foreground uppercase tracking-widest mb-3">Offer Ends In</span>
        <div className="flex items-center gap-3">
          {units.map((unit, i) => (
            <div key={i} className="flex items-end gap-2">
              <div className="bg-foreground text-background rounded-2xl w-16 h-16 flex items-center justify-center text-3xl font-black tabular-nums shadow-sm border border-border relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                {unit.value.toString().padStart(2, "0")}
              </div>
              <span className="text-[10px] font-black text-muted-foreground mb-2 uppercase tracking-wider">{unit.label}</span>
              {i < 2 && <span className="text-3xl font-black text-border-strong mx-1 mb-4">:</span>}
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
