import * as React from "react";
import { cn, type Size, type Tone } from "./types";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  size?: Size;
  dot?: boolean;
  soft?: boolean;
}

const toneSoft: Record<Tone, string> = {
  primary: "bg-primary-subtle text-primary-subtle-foreground",
  neutral: "bg-muted text-muted-foreground",
  success: "bg-success-subtle text-success-subtle-foreground",
  warning: "bg-warning-subtle text-warning-subtle-foreground",
  danger: "bg-danger-subtle text-danger-subtle-foreground",
  info: "bg-info-subtle text-info-subtle-foreground",
  accent: "bg-accent-subtle text-accent-subtle-foreground",
};

const toneSolid: Record<Tone, string> = {
  primary: "bg-primary text-primary-foreground",
  neutral: "bg-foreground text-background",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  danger: "bg-danger text-danger-foreground",
  info: "bg-info text-info-foreground",
  accent: "bg-accent text-accent-foreground",
};

const sizeMap: Record<Size, string> = {
  xs: "text-[10px] px-2 py-0.5 gap-1",
  sm: "text-xs px-2.5 py-1 gap-1",
  md: "text-xs px-3 py-1.5 gap-1.5",
  lg: "text-sm px-3.5 py-2 gap-1.5",
  xl: "text-sm px-4 py-2.5 gap-2",
};

const dotColor: Record<Tone, string> = {
  primary: "bg-primary",
  neutral: "bg-muted-foreground",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
  accent: "bg-accent",
};

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ tone = "neutral", size = "sm", dot, soft = true, className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center rounded-full font-bold tracking-wide whitespace-nowrap",
          soft ? toneSoft[tone] : toneSolid[tone],
          sizeMap[size],
          className,
        )}
        {...props}
      >
        {dot && (
          <span className={cn("h-1.5 w-1.5 rounded-full", dotColor[tone])} aria-hidden />
        )}
        {children}
      </span>
    );
  },
);
Badge.displayName = "Badge";
