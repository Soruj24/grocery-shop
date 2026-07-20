"use client";

import * as React from "react";
import { cn } from "./types";

export interface DropdownProps {
  trigger: React.ReactElement;
  items: {
    label: React.ReactNode;
    icon?: React.ReactNode;
    onSelect?: () => void;
    danger?: boolean;
    disabled?: boolean;
    separatorBefore?: boolean;
  }[];
  align?: "start" | "end";
  className?: string;
}

export function Dropdown({ trigger, items, align = "end", className }: DropdownProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  const alignMap = { start: "left-0", end: "right-0" };

  return (
    <div className="relative inline-block" ref={ref}>
      {React.cloneElement(trigger, {
        onClick: (e: React.MouseEvent) => {
          trigger.props.onClick?.(e);
          setOpen((o) => !o);
        },
        "aria-haspopup": true,
        "aria-expanded": open,
      })}
      {open && (
        <div
          role="menu"
          className={cn(
            "absolute z-[120] mt-2 min-w-[12rem] rounded-lg border border-border bg-popover text-popover-foreground shadow-lg p-1.5 ds-animate-fade-in",
            alignMap[align],
            className,
          )}
        >
          {items.map((it, i) => (
            <React.Fragment key={i}>
              {it.separatorBefore && <div className="my-1 h-px bg-border" aria-hidden />}
              <button
                role="menuitem"
                disabled={it.disabled}
                onClick={() => {
                  if (it.disabled) return;
                  it.onSelect?.();
                  setOpen(false);
                }}
                className={cn(
                  "w-full flex items-center gap-2.5 rounded-md px-3 py-2 text-left text-sm font-medium transition-colors",
                  "disabled:opacity-40 disabled:cursor-not-allowed",
                  it.danger
                    ? "text-danger hover:bg-danger-subtle"
                    : "text-foreground hover:bg-muted",
                )}
              >
                {it.icon}
                {it.label}
              </button>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
Dropdown.displayName = "Dropdown";
