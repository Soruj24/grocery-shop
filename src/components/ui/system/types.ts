import { cn } from "@/utils/utils";

export type Size = "xs" | "sm" | "md" | "lg" | "xl";
export type Variant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "danger"
  | "success"
  | "warning"
  | "info";
export type Tone =
  | "primary"
  | "neutral"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "accent";

/** Standard radius tokens re-exported for inline use. */
export const radius = {
  xs: "var(--radius-xs)",
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
  "2xl": "var(--radius-2xl)",
  full: "var(--radius-full)",
} as const;

/** Standard shadow tokens re-exported for inline use. */
export const shadow = {
  xs: "var(--shadow-xs)",
  sm: "var(--shadow-sm)",
  md: "var(--shadow-md)",
  lg: "var(--shadow-lg)",
  xl: "var(--shadow-xl)",
  "2xl": "var(--shadow-2xl)",
  primary: "var(--shadow-primary)",
} as const;

/** Shared size → height/scale map used across interactive primitives. */
export const controlHeight: Record<Size, string> = {
  xs: "h-8 text-xs px-3 gap-1.5",
  sm: "h-9 text-sm px-3.5 gap-2",
  md: "h-11 text-sm px-4 gap-2",
  lg: "h-12 text-base px-5 gap-2.5",
  xl: "h-14 text-base px-6 gap-3",
};

/**
 * Disables pointer events + applies aria-disabled styling when `disabled`.
 * Replaces the previous `disabled:opacity-50` scatter with one contract.
 */
export function disabledState(disabled?: boolean) {
  return disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none select-none"
    : "";
}

export { cn };
