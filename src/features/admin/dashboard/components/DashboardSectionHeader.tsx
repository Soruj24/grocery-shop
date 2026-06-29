import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface DashboardSectionHeaderProps {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  linkHref: string;
  linkText: string;
}

export default function DashboardSectionHeader({
  title,
  subtitle,
  icon: Icon,
  linkHref,
  linkText,
}: DashboardSectionHeaderProps) {
  return (
    <div className="p-8 border-b border-gray-50 dark:border-gray-800 flex justify-between items-center bg-gray-50/30 dark:bg-gray-800/30">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white dark:bg-gray-900 rounded-2xl flex items-center justify-center text-green-600 dark:text-green-500 shadow-sm border border-gray-100 dark:border-gray-800">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-xl font-black text-gray-900 dark:text-white">{title}</h3>
          <p className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
            {subtitle}
          </p>
        </div>
      </div>
      <Link
        href={linkHref}
        className="px-6 py-2.5 bg-white dark:bg-gray-900 text-green-600 dark:text-green-500 text-xs font-black uppercase tracking-widest rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm hover:bg-green-600 hover:text-white dark:hover:bg-green-500 dark:hover:text-white transition-all duration-300"
      >
        {linkText}
      </Link>
    </div>
  );
}
