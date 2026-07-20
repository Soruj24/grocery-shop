"use client";

import * as React from "react";
import { cn } from "./types";

export interface PopoverProps {
  trigger: React.ReactElement;
  children: React.ReactNode;
  align?: "start" | "center" | "end";
  side?: "bottom" | "top";
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function Popover({
  trigger,
  children,
  align = "start",
  side = "bottom",
  className,
  open: controlledOpen,
  onOpenChange,
}: PopoverProps) {
  const [uncontrolled, setUncontrolled] = React.useState(false);
  const open = controlledOpen ?? uncontrolled;
  const setOpen = onOpenChange ?? setUncontrolled;
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open, setOpen]);

  const alignMap = { start: "left-0", center: "left-1/2 -translate-x-1/2", end: "right-0" };
  const sideMap = { bottom: "top-full mt-2", top: "bottom-full mb-2" };

  return (
    <div className="relative inline-block" ref={ref}>
      {React.cloneElement(trigger, {
        onClick: (e: React.MouseEvent) => {
          trigger.props.onClick?.(e);
          setOpen(!open);
        },
        "aria-expanded": open,
      })}
      {open && (
        <div
          role="dialog"
          className={cn(
            "absolute z-[120] min-w-[12rem] rounded-lg border border-border bg-popover text-popover-foreground shadow-lg p-1.5 ds-animate-fade-in",
            alignMap[align],
            sideMap[side],
            className,
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}

export const PopoverItem = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "w-full flex items-center gap-2 rounded-md px-3 py-2 text-left text-sm font-medium text-foreground",
      "hover:bg-muted transition-colors",
      className,
    )}
    {...props}
  />
));
PopoverItem.displayName = "PopoverItem";

export const PopoverSeparator = () => (
  <div className="my-1 h-px bg-border" aria-hidden />
);
