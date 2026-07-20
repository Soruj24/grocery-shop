import * as React from "react";
import { cn, type Size } from "./types";

export interface AvatarProps {
  src?: string;
  name?: string;
  size?: Size;
  className?: string;
  ring?: boolean;
}

const sizeMap: Record<Size, string> = {
  xs: "h-7 w-7 text-[10px]",
  sm: "h-9 w-9 text-xs",
  md: "h-11 w-11 text-sm",
  lg: "h-14 w-14 text-base",
  xl: "h-20 w-20 text-xl",
};

function initials(name?: string) {
  if (!name) return "?";
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("");
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  ({ src, name, size = "md", className, ring }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-full bg-muted text-muted-foreground font-bold shrink-0",
          ring && "ring-2 ring-primary ring-offset-2 ring-offset-background",
          sizeMap[size],
          className,
        )}
      >
        {src ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src} alt={name ?? ""} className="h-full w-full object-cover" />
        ) : (
          <span aria-hidden>{initials(name)}</span>
        )}
      </span>
    );
  },
);
Avatar.displayName = "Avatar";
