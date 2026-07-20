import * as React from "react";
import { Star } from "lucide-react";
import { cn, type Size } from "./types";

export interface RatingProps {
  value: number;
  max?: number;
  size?: Size;
  showValue?: boolean;
  count?: number;
  className?: string;
  readOnly?: boolean;
  onChange?: (value: number) => void;
}

const starSize: Record<Size, string> = {
  xs: "h-3 w-3",
  sm: "h-4 w-4",
  md: "h-5 w-5",
  lg: "h-6 w-6",
  xl: "h-8 w-8",
};

export const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  (
    { value, max = 5, size = "sm", showValue, count, className, readOnly = true, onChange },
    ref,
  ) => {
    const [hover, setHover] = React.useState<number | null>(null);
    const display = hover ?? value;

    return (
      <div
        ref={ref}
        className={cn("inline-flex items-center gap-1.5", className)}
        role={readOnly ? "img" : "radiogroup"}
        aria-label={`Rating ${value} of ${max}`}
      >
        <div className="inline-flex items-center gap-0.5">
          {Array.from({ length: max }).map((_, i) => {
            const idx = i + 1;
            const filled = idx <= Math.round(display);
            const StarEl = (
              <Star
                className={cn(
                  starSize[size],
                  filled ? "fill-warning text-warning" : "fill-transparent text-border-strong",
                )}
                aria-hidden
              />
            );
            return readOnly ? (
              <span key={i}>{StarEl}</span>
            ) : (
              <button
                key={i}
                type="button"
                className="transition-transform hover:scale-110"
                onMouseEnter={() => setHover(idx)}
                onMouseLeave={() => setHover(null)}
                onClick={() => onChange?.(idx)}
                aria-label={`${idx} star${idx > 1 ? "s" : ""}`}
              >
                {StarEl}
              </button>
            );
          })}
        </div>
        {showValue && (
          <span className="text-sm font-bold text-foreground">{value.toFixed(1)}</span>
        )}
        {count !== undefined && (
          <span className="text-xs text-muted-foreground">({count})</span>
        )}
      </div>
    );
  },
);
Rating.displayName = "Rating";
