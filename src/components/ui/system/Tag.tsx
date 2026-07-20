import * as React from "react";
import { X } from "lucide-react";
import { cn, type Tone } from "./types";

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: Tone;
  onRemove?: () => void;
  interactive?: boolean;
}

const toneMap: Record<Tone, string> = {
  primary: "bg-primary-subtle text-primary-subtle-foreground border-primary-border",
  neutral: "bg-muted text-foreground border-border",
  success: "bg-success-subtle text-success-subtle-foreground border-success/30",
  warning: "bg-warning-subtle text-warning-subtle-foreground border-warning/30",
  danger: "bg-danger-subtle text-danger-subtle-foreground border-danger/30",
  info: "bg-info-subtle text-info-subtle-foreground border-info/30",
  accent: "bg-accent-subtle text-accent-subtle-foreground border-accent/30",
};

export const Tag = React.forwardRef<HTMLSpanElement, TagProps>(
  ({ tone = "neutral", onRemove, interactive, className, children, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
          toneMap[tone],
          interactive && "cursor-pointer hover:opacity-80 transition-opacity",
          className,
        )}
        {...props}
      >
        {children}
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            aria-label="Remove"
            className="rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </span>
    );
  },
);
Tag.displayName = "Tag";
