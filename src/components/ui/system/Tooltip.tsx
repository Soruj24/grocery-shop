"use client";

import * as React from "react";
import { cn } from "./types";

export interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactElement;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  delay?: number;
  className?: string;
}

export function Tooltip({
  content,
  children,
  side = "top",
  align = "center",
  delay = 400,
  className,
}: TooltipProps) {
  const [open, setOpen] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout>();

  const show = () => {
    timeoutRef.current = setTimeout(() => setOpen(true), delay);
  };

  const hide = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setOpen(false);
  };

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const positionClasses = {
    top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left: "right-full top-1/2 -translate-y-1/2 mr-2",
    right: "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  const alignClasses = {
    start: side === "top" || side === "bottom" ? "left-0 translate-x-0" : "",
    center: "",
    end: side === "top" || side === "bottom" ? "right-0 left-auto translate-x-0" : "",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {open && (
        <div
          role="tooltip"
          className={cn(
            "absolute z-[150] pointer-events-none",
            "px-3 py-1.5 rounded-lg text-xs font-medium",
            "bg-foreground text-background shadow-lg",
            "whitespace-nowrap",
            "animate-in fade-in-0 zoom-in-95",
            positionClasses[side],
            alignClasses[align],
            className,
          )}
        >
          {content}
        </div>
      )}
    </div>
  );
}
Tooltip.displayName = "Tooltip";
