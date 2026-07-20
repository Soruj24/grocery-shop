import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn, disabledState, type Size } from "./types";

export interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  size?: Size;
  invalid?: boolean;
}

const selectHeight: Record<Size, string> = {
  xs: "h-8 text-xs",
  sm: "h-9 text-sm",
  md: "h-11 text-sm",
  lg: "h-12 text-base",
  xl: "h-14 text-base",
};

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ size = "md", invalid, className, disabled, children, ...props }, ref) => {
    return (
      <div
        className={cn(
          "relative flex items-center w-full rounded-md border bg-card transition-all duration-200",
          "border-input focus-within:border-primary focus-within:shadow-focus",
          invalid && "border-danger",
          disabledState(disabled),
          selectHeight[size],
        )}
      >
        <select
          ref={ref}
          disabled={disabled}
          className={cn(
            "w-full appearance-none bg-transparent px-3.5 pr-10 outline-none",
            "text-foreground disabled:cursor-not-allowed cursor-pointer",
            className,
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 h-4 w-4 text-muted-foreground"
          aria-hidden
        />
      </div>
    );
  },
);
Select.displayName = "Select";
