

import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface ChartCardProps {
  icon: LucideIcon;
  iconColor: string;
  iconBg: string;
  title: string;
  subtitle: string;
  children: ReactNode;
}

export default function ChartCard({
  icon: Icon,
  iconColor,
  iconBg,
  title,
  subtitle,
  children,
}: ChartCardProps) {
  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-[2.5rem] shadow-sm border border-gray-100 dark:border-gray-800">
      <div className="flex items-center gap-3 mb-8">
        <div className={`p-3 ${iconBg} rounded-2xl ${iconColor}`}>
          <Icon size={20} />
        </div>
        <div>
          <h3 className="font-black text-gray-900 dark:text-white">{title}</h3>
          <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
            {subtitle}
          </p>
        </div>
      </div>
      {children}
    </div>
  );
}
