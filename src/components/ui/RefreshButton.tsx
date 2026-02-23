"use client";

import { ReactNode } from "react";

export default function RefreshButton({ className, children }: { className?: string, children: ReactNode }) {
  return (
    <button 
      onClick={() => window.location.reload()} 
      className={className}
    >
      {children}
    </button>
  );
}
