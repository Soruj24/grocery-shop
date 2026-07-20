# EMRAN SHOP — Design System

A token-driven, reusable UI architecture for the EMRAN SHOP e-commerce app. Premium SaaS
aesthetic, fully themeable (light/dark), accessible by default, and free of business logic.

---

## Philosophy
- **One source of truth.** All color, radius, shadow, spacing and type tokens live in
  `src/app/globals.css` as CSS variables mapped into Tailwind via `@theme inline`.
- **No ad-hoc values.** Components only use `--radius-*`, `--shadow-*`, `--color-*` tokens.
  The old `48px / 32px / 3rem` drift is gone.
- **Accessible by default.** `:focus-visible` ring on every interactive element, `reduced-motion`
  respected globally, semantic roles (`alert`, `dialog`, `tablist`, `menu`), aria labels.
- **Presentational only.** No fetches, no Redux, no routing side-effects inside components.
  Handlers are passed in (`onAddToCart`, `onRetry`, …).

---

## Tokens (globals.css)

### Color — semantic, theme-aware
`background foreground card popover muted muted-foreground subtle`
`primary (+ -hover -active -subtle -subtle-foreground -border)`
`accent info success warning danger` (each with `-subtle` / `-subtle-foreground`)
`border border-strong input ring`

Usage: `bg-primary text-primary-foreground`, `bg-card`, `border-border`, `text-muted-foreground`.

### Radius scale
`--radius-xs 6 · sm 8 · md 12 · lg 16 · xl 24 · 2xl 32 · full`
Usage: `rounded-md`, `rounded-xl`, `rounded-2xl`, `rounded-full`.

### Shadow scale
`--shadow-xs sm md lg xl 2xl primary focus`
Usage: `shadow-sm`, `shadow-lg`, `shadow-primary`, `shadow-focus`.

### Typography scale
`--text-display 3.5rem · h1 2.25 · h2 1.875 · h3 1.5 · h4 1.25 · h5 1.125 ·
 body-lg 1.0625 · body 0.9375 · body-sm 0.875 · caption 0.8125 · eyebrow 0.6875`
Geist Sans is applied to `body`; `.ds-eyebrow` utility for kicker labels.

### Spacing
8-pt friendly via Tailwind defaults + `--spacing-section 4rem`, `--spacing-block 2rem`.

---

## Component API (all in `src/components/ui/system/*`, re-exported from `src/components/ui`)

| Component | Key props |
|---|---|
| `Button` | `variant` primary/secondary/outline/ghost/danger/success/warning/info, `size` xs–xl, `loading`, `fullWidth`, `leftIcon/rightIcon` |
| `IconButton` | square button, requires `aria-label` |
| `Input` | `size`, `invalid`, `leftIcon`, `rightIcon`, `wrapperClassName` |
| `Textarea` | `invalid` |
| `Select` | `size`, `invalid` (chevron built-in) |
| `Checkbox` / `Radio` | `label`, `description` (custom painted, keyboard + a11y) |
| `Card` / `CardHeader` / `CardTitle` / `CardContent` / `CardFooter` | `padding` none/sm/md/lg, `hoverable`, `interactive` |
| `Badge` | `tone`, `size`, `dot`, `soft` |
| `Tag` | `tone`, `onRemove`, `interactive` |
| `Avatar` | `src`, `name` (initials fallback), `size`, `ring` |
| `Rating` | `value`, `max`, `size`, `showValue`, `count`, `readOnly`, `onChange` |
| `Alert` | `tone`, `title`, `icon`, `onClose` |
| `Toast` / `useToast` | Provider + `success/error/warning/info` helpers, portaled |
| `Skeleton` | `width/height`, `circle`, `shimmer` |
| `Spinner` / `LoadingState` | `size`, `fullScreen`, `label` |
| `EmptyState` | `icon`, `title`, `description`, `action`, `size` |
| `ErrorState` | `title`, `description`, `onRetry`, `compact` |
| `Modal` | `open`, `onClose`, `size`, `footer`, `closeOnOverlay` |
| `Drawer` | `open`, `onClose`, `side`, `footer`, `width` |
| `Popover` | `trigger`, `align`, `side`, `PopoverItem`, `PopoverSeparator` |
| `Tabs` / `TabPanel` | `items`, `variant` underline/pill/boxed, controlled or uncontrolled |
| `Accordion` | `items`, `type` single/multiple |
| `Dropdown` | `trigger`, `items` (label/icon/onSelect/danger/separatorBefore) |
| `Pagination` | `page`, `totalPages`, `onPageChange`, `siblingCount` |
| `Breadcrumb` | `items` (label/href), home icon auto |
| `Table/TableHeader/TableBody/TableRow/TableHead/TableCell` | styled, scrollable wrapper |
| `ReviewCard` | `author`, `rating`, `content`, `verified`, … |
| `ProductCard` | full presentational product tile w/ add-to-cart + qty stepper, `skeleton` |
| `OrderCard` | `orderId`, `status`, `total`, thumbnail/meta/action slots |
| `CartCard` | line-item w/ stepper, remove, unit slot |

---

## Usage

```tsx
import { Button, ProductCard, Badge, useToast } from "@/components/ui";

<Button variant="primary" size="lg" loading={pending}>Add to cart</Button>

<Badge tone="success" dot>Delivered</Badge>

<ProductCard name="Fresh Mango" price={120} compareAtPrice={160} rating={4.5} reviewCount={32}
  onAddToCart={() => {}} badge={{ label: "Offer", tone: "primary" }} />
```

## Migration notes
- Replace `rounded-[48px]`, `rounded-[2rem]`, `rounded-3xl` etc. with the radius scale.
- Replace `bg-gray-*` with `bg-card / bg-muted / bg-subtle` and `text-gray-*` with
  `text-foreground / text-muted-foreground`.
- Replace the orange `.loader` and ad-hoc spinners with `Spinner` / `LoadingState`.
- Wrap the app in `<ToastProvider>` once (e.g. in `Providers.tsx`) to use `useToast`.
