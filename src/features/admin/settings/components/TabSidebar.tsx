"use client";

import type { SettingsTab } from "@/types/settings";

interface TabSidebarProps {
  tabs: SettingsTab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export default function TabSidebar({
  tabs,
  activeTab,
  onTabChange,
}: TabSidebarProps) {
  return (
    <div className="space-y-2">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all duration-300 font-bold text-sm ${
              activeTab === tab.id
                ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/20"
                : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"
            }`}
          >
            <Icon size={18} />
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
