"use client";

import { Menu } from "lucide-react";

interface MobileMenuButtonProps {
  onClick: () => void;
}

export default function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2.5 lg:hidden text-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 rounded-2xl transition-all"
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}
