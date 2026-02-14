import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  desc: string;
}

export default function FeatureCard({ icon: Icon, title, desc }: FeatureCardProps) {
  return (
    <div className="group relative bg-white dark:bg-gray-900 p-8 rounded-[40px] border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-2xl hover:shadow-green-900/5 transition-all duration-500 overflow-hidden">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-green-50 dark:bg-green-900/20 rounded-full opacity-0 group-hover:opacity-100 group-hover:scale-150 transition-all duration-700" />

      <div className="relative z-10">
        <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-[20px] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
          <Icon className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h3 className="text-xl font-black text-gray-800 dark:text-gray-100 mb-2">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 font-medium leading-relaxed">
          {desc}
        </p>
      </div>
    </div>
  );
}
