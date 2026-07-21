import type { Variants, Transition } from "framer-motion";

/** Snappy spring for micro-interactions (buttons, toggles, ripples). */
export const springSnappy: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.8,
};

/** Gentle spring for page-level transitions. */
export const springGentle: Transition = {
  type: "spring",
  stiffness: 300,
  damping: 30,
  mass: 1,
};

/** Quick ease-out for tooltips, dropdowns. */
export const easeOut: Transition = {
  duration: 0.15,
  ease: [0, 0, 0.2, 1],
};

/** Standard duration for overlays. */
export const overlayTransition: Transition = {
  duration: 0.2,
  ease: "easeOut",
};

/* ── Reusable Variants ────────────────────────────────────────────── */

/** Fade in / out. */
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

/** Fade + slide up (toasts, dropdowns). */
export const slideUpVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, y: -8, scale: 0.97 },
};

/** Fade + slide down (alerts, banners). */
export const slideDownVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

/** Scale in from center (modals). */
export const scaleInVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.95 },
};

/** Slide in from right (drawer). */
export const slideRightVariants: Variants = {
  hidden: { x: "100%", opacity: 0.5 },
  visible: { x: 0, opacity: 1 },
  exit: { x: "100%", opacity: 0 },
};

/** Slide in from left (drawer). */
export const slideLeftVariants: Variants = {
  hidden: { x: "-100%", opacity: 0.5 },
  visible: { x: 0, opacity: 1 },
  exit: { x: "-100%", opacity: 0 },
};

/** Pop (wishlist heart, add-to-cart badge). */
export const popVariants: Variants = {
  hidden: { scale: 0 },
  visible: { scale: 1 },
  exit: { scale: 0 },
};
