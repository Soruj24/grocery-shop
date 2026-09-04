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
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
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
