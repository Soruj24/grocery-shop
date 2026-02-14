"use client";

import { LucideIcon } from "lucide-react";

interface StatCardProps {
  name: string;
  value: string | number;
  icon: LucideIcon;
  color: string;
  shadow: string;
  label: string;
}

export default function StatCard({
  name,
  value,
  icon: Icon,
  color,
  shadow,
  label,
}: StatCardProps) {
  return (
    <div className="group relative bg-white dark:bg-gray-900 p-7 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/50 transition-all duration-500 overflow-hidden">
      <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-gray-50 dark:bg-gray-800 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-700" />

      <div className="relative z-10 flex flex-col gap-6">
        <div
          className={`w-14 h-14 bg-gradient-to-br ${color} rounded-2xl flex items-center justify-center text-white shadow-lg ${shadow} group-hover:scale-110 transition-transform duration-500`}
        >
          <Icon className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <p className="text-[13px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-widest">
            {name}
          </p>
          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-black text-gray-900 dark:text-white">
              {value}
            </p>
            <span className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase">
              {label}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
