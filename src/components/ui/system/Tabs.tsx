"use client";

import * as React from "react";
import { cn } from "./types";

export interface TabsProps {
  items: { value: string; label: React.ReactNode; icon?: React.ReactNode; disabled?: boolean }[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  variant?: "underline" | "pill" | "boxed";
  className?: string;
  children?: React.ReactNode;
}

const listVariant = {
  underline:
    "flex gap-1 border-b border-border overflow-x-auto ds-custom-scrollbar",
  pill: "inline-flex gap-1 rounded-lg bg-muted p-1",
  boxed: "inline-flex gap-1 rounded-md border border-border p-1",
};

export function Tabs({
  items,
  value: controlled,
  defaultValue,
  onValueChange,
  variant = "underline",
  className,
  children,
}: TabsProps) {
  const [uncontrolled, setUncontrolled] = React.useState(defaultValue ?? items[0]?.value);
  const value = controlled ?? uncontrolled;

  const select = (v: string) => {
    if (controlled === undefined) setUncontrolled(v);
    onValueChange?.(v);
  };

  return (
    <div className={className}>
      <div role="tablist" className={cn(listVariant[variant])} aria-orientation="horizontal">
        {items.map((it) => {
          const active = it.value === value;
          return (
            <button
              key={it.value}
              role="tab"
              aria-selected={active}
              disabled={it.disabled}
              onClick={() => !it.disabled && select(it.value)}
              className={cn(
                "inline-flex items-center gap-2 whitespace-nowrap font-semibold transition-all",
                it.disabled && "opacity-40 cursor-not-allowed",
                variant === "underline" &&
                  cn(
                    "px-4 py-3 text-sm border-b-2 -mb-px",
                    active
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground",
                  ),
                variant === "pill" &&
                  cn(
                    "px-4 py-2 text-sm rounded-md",
                    active
                      ? "bg-card text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground",
                  ),
                variant === "boxed" &&
                  cn(
                    "px-4 py-2 text-sm rounded-sm",
                    active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  ),
              )}
            >
              {it.icon}
              {it.label}
            </button>
          );
        })}
      </div>
      {children}
    </div>
  );
}

export function TabPanel({
  value,
  active,
  className,
  ...props
}: { value: string; active: string } & React.HTMLAttributes<HTMLDivElement>) {
  if (value !== active) return null;
  return (
    <div role="tabpanel" className={cn("pt-5 animate-in", className)} {...props} />
  );
}
