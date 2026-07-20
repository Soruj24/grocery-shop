"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "./types";

export interface AccordionProps {
  items: {
    value: string;
    title: React.ReactNode;
    content: React.ReactNode;
    disabled?: boolean;
  }[];
  type?: "single" | "multiple";
  defaultValue?: string[];
  className?: string;
}

export function Accordion({
  items,
  type = "single",
  defaultValue = [],
  className,
}: AccordionProps) {
  const [open, setOpen] = React.useState<string[]>(defaultValue);

  const toggle = (v: string) => {
    setOpen((prev) => {
      const isOpen = prev.includes(v);
      if (type === "single") return isOpen ? [] : [v];
      return isOpen ? prev.filter((x) => x !== v) : [...prev, v];
    });
  };

  return (
    <div className={cn("divide-y divide-border rounded-lg border border-border bg-card", className)}>
      {items.map((it) => {
        const isOpen = open.includes(it.value);
        return (
          <div key={it.value} className={cn(it.disabled && "opacity-50")}>
            <button
              type="button"
              disabled={it.disabled}
              aria-expanded={isOpen}
              onClick={() => !it.disabled && toggle(it.value)}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left font-semibold text-foreground hover:bg-muted transition-colors"
            >
              <span>{it.title}</span>
              <ChevronDown
                className={cn(
                  "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                  isOpen && "rotate-180",
                )}
                aria-hidden
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-out",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
              aria-hidden={!isOpen}
            >
              <div className="overflow-hidden">
                <div className="px-5 pb-5 text-body-sm text-muted-foreground">
                  {it.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
Accordion.displayName = "Accordion";
