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

export const radius = {
  xs: "var(--radius-xs)",
  sm: "var(--radius-sm)",
  md: "var(--radius-md)",
  lg: "var(--radius-lg)",
  xl: "var(--radius-xl)",
  "2xl": "var(--radius-2xl)",
  full: "var(--radius-full)",
} as const;

export const shadow = {
  xs: "var(--shadow-xs)",
  sm: "var(--shadow-sm)",
  md: "var(--shadow-md)",
  lg: "var(--shadow-lg)",
  xl: "var(--shadow-xl)",
  "2xl": "var(--shadow-2xl)",
  primary: "var(--shadow-primary)",
} as const;

export const controlHeight: Record<Size, string> = {
  xs: "h-8 text-xs px-3 gap-1.5",
  sm: "h-9 text-sm px-3.5 gap-2",
  md: "h-11 text-sm px-4 gap-2",
  lg: "h-12 text-[15px] px-5 gap-2.5",
  xl: "h-14 text-base px-6 gap-3",
};

export function disabledState(disabled?: boolean) {
  return disabled
    ? "opacity-50 cursor-not-allowed pointer-events-none select-none"
    : "";
}

/** Consistent keyboard focus ring for all interactive elements. */
export const focusRing =
  "focus-visible:outline-none focus-visible:shadow-focus";

/** Theme-aware danger focus shadow (works in light + dark mode). */
export const invalidShadow =
  "shadow-[0_0_0_3px_color-mix(in_srgb,var(--danger)_15%,transparent)]";

export { cn };
