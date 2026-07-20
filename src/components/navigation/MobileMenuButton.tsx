"use client";

import { Menu } from "lucide-react";

interface MobileMenuButtonProps {
  onClick: () => void;
}

export default function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
  return (
    <button
      onClick={onClick}
      className="p-2.5 lg:hidden text-muted-foreground hover:bg-muted rounded-2xl transition-all"
    >
      <Menu className="w-6 h-6" />
    </button>
  );
}
