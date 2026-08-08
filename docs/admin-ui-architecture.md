# Admin Panel UI Architecture

## 1. Design Foundation

### 1.1 Color System (CSS Custom Properties)
Already defined in `globals.css`. Key tokens:
- `--background`, `--foreground` — page bg/text
- `--card`, `--card-foreground` — card surfaces
- `--muted`, `--muted-foreground` — subtle backgrounds, secondary text
- `--border` — all borders
- `--ring` — focus rings
- `--primary`, `--primary-foreground` — CTA buttons, active states
- `--success`, `--warning`, `--danger`, `--info` — semantic colors
- `--accent` — accent/brand highlights

### 1.2 Typography Scale
| Token | Size | Weight | Use |
|-------|------|--------|-----|
| `text-display` | 30px | 700 | Page titles (rare) |
| `text-title-lg` | 24px | 700 | Section headers |
| `text-title` | 20px | 600 | Card titles, modal titles |
| `text-title-sm` | 16px | 600 | Subsection headers |
| `text-body` | 14px | 400 | Body text, table cells |
| `text-body-sm` | 13px | 400 | Secondary body text |
| `text-caption` | 12px | 400 | Labels, captions, metadata |
| `text-eyebrow` | 11px | 600 | Section labels, eyebrow text (uppercase) |

### 1.3 Spacing Scale
Use Tailwind's default scale consistently:
- `p-4` / `p-5` / `p-6` — card padding
- `gap-4` / `gap-5` / `gap-6` — grid/flex gaps
- `mb-6` / `mb-8` — section spacing
- `py-3` / `py-3.5` — table row padding
- `px-4` / `px-5` — table cell padding

### 1.4 Border & Radius
- All borders: `border-border` (semantic token)
- Cards: `rounded-xl`
- Buttons: `rounded-lg`
- Badges: `rounded-full` or `rounded-lg`
- Modals: `rounded-xl`
- Inputs: `rounded-lg`

### 1.5 Shadows
- Cards: `shadow-sm` (default), `shadow-md` (hover)
- Dropdowns/modals: `shadow-lg` / `shadow-xl`
- Avoid heavy shadows — use borders instead

---

## 2. Component Architecture

### 2.1 Component Hierarchy
```
src/
├── components/
│   └── ui/
│       └── system/              # Shared primitives (Button, Input, Modal, etc.)
├── features/
│   └── admin/
│       ├── layout/              # Sidebar, Header, AdminLayout
│       ├── shared/              # DataTable, StatCard, StatusBadge, etc.
│       ├── dashboard/           # Dashboard-specific components
│       ├── products/            # Product CRUD components
│       ├── categories/          # Category CRUD components
│       ├── orders/              # Order management components
│       ├── coupons/             # Coupon CRUD components
│       ├── combos/              # Combo CRUD components
│       ├── brands/              # Brand CRUD components
│       ├── customers/           # Customer list components
│       ├── reviews/             # Review moderation components
│       ├── returns/             # Return management components
│       ├── support/             # Support ticket components
│       ├── settings/            # Settings form components
│       ├── sections/            # Homepage section editor
│       ├── notifications/       # Notification components
│       └── activity-logs/       # Activity log components
└── app/
    └── admin/
        └── [route]/
            └── page.tsx         # Thin page wrapper (data fetching only)
```

### 2.2 Page Component Pattern
Every admin page follows this pattern:
```
page.tsx (thin wrapper)
  └── [Feature]Page.tsx (layout + composition)
        ├── AdminPageHeader (title, description, actions)
        ├── [FilterBar] (optional: status filters, search)
        ├── DataTable (data display)
        └── [Modal] (create/edit form)
```

**Rule:** `page.tsx` files should be < 50 lines. All UI logic lives in feature components.

---

## 3. Shared Component Library

### 3.1 Layout Components
| Component | Location | Purpose |
|-----------|----------|---------|
| `AdminLayout` | `app/admin/layout.tsx` | Root layout with sidebar + header + content |
| `AdminSidebar` | `features/admin/components/AdminSidebar.tsx` | Left sidebar navigation |
| `AdminHeader` | `features/admin/shared/AdminPageHeader.tsx` | Page header with title, description, actions |
| `CommandPalette` | `features/admin/shared/CommandPalette.tsx` | Cmd+K navigation |

### 3.2 Data Display Components
| Component | Location | Purpose |
|-----------|----------|---------|
| `DataTable` | `features/admin/shared/DataTable.tsx` | Generic table with search, sort, pagination |
| `StatCard` | `features/admin/shared/StatCard.tsx` | Metric card with icon, value, trend |
| `StatusBadge` | `features/admin/components/StatusBadge.tsx` | Colored status indicator |

### 3.3 Form Components
| Component | Location | Purpose |
|-----------|----------|---------|
| `Modal` | `components/ui/system/Modal.tsx` | Accessible dialog with focus trap |
| `ConfirmDialog` | `components/ui/system/ConfirmDialog.tsx` | Destructive action confirmation |
| `ProductFormField` | `features/admin/components/ProductFormField.tsx` | Reusable form field (text/number/select/textarea) |

### 3.4 Feedback Components
| Component | Location | Purpose |
|-----------|----------|---------|
| `Toast` / `useToast` | `components/ui/system/Toast.tsx` | Toast notifications |

---

## 4. Page-by-Page Architecture

### 4.1 Dashboard (`/admin/dashboard`)
```
AdminDashboard
├── StatCard × 4 (Revenue, Orders, Customers, Products)
├── ChartCard: Daily Sales (AreaChart)
├── ChartCard: Order Status (PieChart)
└── RecentOrdersCard
    └── RecentOrderRow × 5
```
**Data:** `useGetDashboardStatsQuery`, `useGetDashboardAnalyticsQuery`

### 4.2 Analytics (`/admin/analytics`)
```
AdminAnalytics
├── ChartCard: Daily Sales (AreaChart)
├── ChartCard: Top Products (list with bars)
├── ChartCard: Order Status (PieChart)
└── ChartCard: User Growth (BarChart)
```
**Data:** `useGetDashboardAnalyticsQuery`

### 4.3 Products (`/admin/products`)
```
AdminProductsPage
├── AdminPageHeader (title + Add button)
├── DataTable
│   ├── Column: Product (image + name + category)
│   ├── Column: Price
│   ├── Column: Stock (StatusBadge)
│   ├── Column: Status (StatusBadge)
│   └── Column: Actions (Edit/Delete)
└── ProductModalWrapper → ProductModal
    ├── ProductFormField × N
    ├── ProductImageField
    └── ProductTagsField
```
**Data:** `useGetAdminProductsQuery`, `useGetAdminCategoriesQuery`
**Mutations:** create, update, delete product

### 4.4 Categories (`/admin/categories`)
```
AdminCategoriesPage
├── AdminPageHeader (title + Add button)
├── DataTable
│   ├── Column: Category (icon + name + type)
│   ├── Column: Status (StatusBadge)
│   └── Column: Actions (Edit/Delete)
└── CategoryModalWrapper → CategoryModal
    ├── Input: Name
    ├── Select: Parent Category
    ├── Input: Image URL
    └── Checkbox: Active
```
**Data:** `useGetAdminCategoriesQuery`
**Mutations:** create, update, delete category

### 4.5 Orders (`/admin/orders`)
```
AdminOrdersPage
├── AdminPageHeader (title)
├── FilterBar (status pills: All, Pending, Confirmed, etc.)
├── DataTable
│   ├── Column: Order ID + Date
│   ├── Column: Customer
│   ├── Column: Total
│   ├── Column: Status (inline select)
│   └── Column: Payment Method
```
**Data:** `useGetAdminOrdersQuery`
**Mutations:** update order status

### 4.6 Coupons (`/admin/coupons`)
```
AdminCouponsPage
├── AdminPageHeader (title + Add button)
├── DataTable
│   ├── Column: Code
│   ├── Column: Discount
│   ├── Column: Min Order
│   ├── Column: Expiry
│   ├── Column: Usage (used/limit)
│   ├── Column: Status (StatusBadge)
│   └── Column: Actions (Edit/Delete)
└── CouponFormModal
```
**Data:** `useGetAdminCouponsQuery`
**Mutations:** create, update, delete coupon

### 4.7 Brands (`/admin/brands`)
```
AdminBrandsPage
├── AdminPageHeader (title + Add button)
├── InlineForm (name + slug inputs + buttons)
├── DataTable
│   ├── Column: Brand (name + slug)
│   ├── Column: Product Count
│   ├── Column: Status (StatusBadge)
│   └── Column: Actions (Edit/Delete)
```
**Data:** `useGetAdminBrandsQuery`
**Mutations:** create, update, delete brand

### 4.8 Combos (`/admin/combos`)
```
AdminCombosPage
├── AdminPageHeader (title + Add button)
├── DataTable
│   ├── Column: Combo Name
│   ├── Column: Price
│   ├── Column: Save Amount
│   ├── Column: Tag
│   ├── Column: Status (StatusBadge)
│   └── Column: Actions (Edit/Delete)
```
**Data:** `useGetAdminCombosQuery`
**Mutations:** delete combo (create/edit navigates away)

### 4.9 Customers (`/admin/customers`)
```
AdminCustomersPage
├── AdminPageHeader (title)
├── DataTable
│   ├── Column: Customer (avatar + name + email)
│   ├── Column: Phone
│   ├── Column: Orders
│   ├── Column: Total Spent
│   └── Column: Joined
```
**Data:** `useGetAdminCustomersQuery`
**Mutations:** none

### 4.10 Reviews (`/admin/reviews`)
```
AdminReviewsPage
├── AdminPageHeader (title)
├── DataTable
│   ├── Column: Customer + Product
│   ├── Column: Rating (stars)
│   ├── Column: Comment
│   ├── Column: Status (StatusBadge)
│   └── Column: Actions (Approve/Reject)
```
**Data:** `useGetAdminReviewsQuery`
**Mutations:** update review status

### 4.11 Returns (`/admin/returns`)
```
AdminReturnsPage
├── AdminPageHeader (title)
├── DataTable
│   ├── Column: Return ID
│   ├── Column: Customer
│   ├── Column: Product
│   ├── Column: Reason
│   ├── Column: Refund Amount
│   ├── Column: Status (StatusBadge)
│   └── Column: Actions (Approve/Reject)
```
**Data:** `useGetAdminReturnsQuery`
**Mutations:** update return status

### 4.12 Support (`/admin/support`)
```
AdminSupportPage
├── AdminPageHeader (title)
├── DataTable
│   ├── Column: Ticket ID
│   ├── Column: Customer
│   ├── Column: Subject
│   ├── Column: Priority (StatusBadge)
│   ├── Column: Status (inline select)
│   └── Column: Actions (Reply)
└── ReplyModal (textarea + send)
```
**Data:** `useGetAdminTicketsQuery`
**Mutations:** update ticket, send reply

### 4.13 Marketing (`/admin/marketing`)
```
AdminMarketingPage
├── AdminPageHeader (title)
├── DataTable
│   ├── Column: Campaign Name
│   ├── Column: Type
│   ├── Column: Status (StatusBadge)
│   ├── Column: Sent Count
│   └── Column: Created Date
```
**Data:** `useGetAdminCampaignsQuery`
**Mutations:** none

### 4.14 Reports (`/admin/reports`)
```
AdminReportsPage
├── AdminPageHeader (title)
├── FilterBar (period pills: Weekly, Monthly, Yearly)
├── StatCard × 4 (Revenue, Orders, Products, Avg Order Value)
├── ChartCard: Revenue Over Time (AreaChart)
├── ChartCard: Orders Over Time (BarChart)
└── TopSellingProducts (table)
```
**Data:** `useGetSalesReportQuery`

### 4.15 Inventory (`/admin/inventory`)
```
AdminInventoryPage
├── AdminPageHeader (title)
├── AlertBanner (low stock warning)
├── DataTable
│   ├── Column: Product (name + category)
│   ├── Column: Stock (color-coded)
│   ├── Column: Price
│   └── Column: Status (StatusBadge)
```
**Data:** `useGetInventoryAlertsQuery`
**Mutations:** none

### 4.16 Users (`/admin/users`)
```
AdminUsersPage
├── AdminPageHeader (title)
├── DataTable
│   ├── Column: User (avatar + name + email)
│   ├── Column: Role (inline select)
│   ├── Column: Status (StatusBadge)
│   ├── Column: Last Login
│   └── Column: Actions (Delete)
```
**Data:** `useGetAdminUsersQuery`
**Mutations:** update user role, delete user

### 4.17 Permissions (`/admin/permissions`)
```
AdminPermissionsPage
├── AdminPageHeader (title)
└── RoleCardGrid
    └── RoleCard × N
        ├── Icon (Shield)
        ├── Role Name
        ├── Description
        ├── Status Badge
        └── Permission Checklist
```
**Data:** `useGetAdminRolesQuery`
**Mutations:** update role

### 4.18 Activity Logs (`/admin/activity-logs`)
```
AdminActivityLogsPage
├── AdminPageHeader (title)
├── FilterBar (type pills: All, Order, User, Product, etc.)
└── AnimatedLogList
    └── LogItem × N
        ├── Type Icon (colored)
        ├── Action Text
        ├── User
        └── Timestamp
```
**Data:** `useGetActivityLogsQuery`
**Mutations:** none

### 4.19 Notifications (`/admin/notifications`)
```
AdminNotificationsPage
├── AdminPageHeader (title + Mark All Read button)
├── FilterTabs (All, Unread with count)
└── AnimatedNotificationList
    └── NotificationItem × N
        ├── Type Icon (colored)
        ├── Title + Message
        ├── Timestamp
        └── Mark Read Button
```
**Data:** `useGetAdminNotificationsQuery`
**Mutations:** mark read, mark all read

### 4.20 Settings (`/admin/settings`)
```
AdminSettingsPage
├── AdminPageHeader (title + Save button)
└── SettingsForm
    ├── Input: Store Name
    ├── Input: Store Email
    ├── Input: Store Phone
    ├── Input: Store Address
    ├── Input: Delivery Fee
    ├── Input: Free Delivery Min Order
    ├── Input: Currency
    └── Input: Tax Rate
```
**Data:** `useGetAdminSettingsQuery`
**Mutations:** update settings

### 4.21 Sections (`/admin/sections`)
```
AdminSectionsPage
├── AdminHeader (Bengali title)
└── SectionList
    └── SectionListItem × N
        ├── Reorder Arrows (up/down)
        ├── Toggle (active/inactive)
        ├── Section Label
        └── Edit Button → SectionEditor (fullscreen modal)
            └── Dynamic FormFields (from sectionConfigs)
```
**Data:** `useGetAdminSectionsQuery` (via useAdminSections hook)
**Mutations:** toggle active, reorder, save props

---

## 5. Dark Mode Strategy

### 5.1 Implementation
- Use Tailwind's `dark:` variant with CSS custom properties
- `globals.css` already has `.dark` token definitions
- Add a `ThemeToggle` component in the admin header
- Store preference in `localStorage`

### 5.2 Component Updates
Every component must use semantic tokens that automatically switch in dark mode:
- `bg-card` instead of `bg-white`
- `text-foreground` instead of `text-gray-900`
- `text-muted-foreground` instead of `text-gray-500`
- `border-border` instead of `border-gray-200`
- `bg-muted` instead of `bg-gray-100`

---

## 6. Accessibility Requirements

### 6.1 Mandatory Patterns
- All modals: `role="dialog"`, `aria-modal="true"`, focus trap, Escape key
- All buttons: `aria-label` when icon-only
- All form inputs: associated `<label>` with `htmlFor`/`id`
- All tables: `<th scope="col">`, `aria-sort` on sortable columns
- All navigation: `aria-current="page"` on active links
- All loading states: `aria-busy="true"`, `role="status"`
- All status badges: `role="status"`

### 6.2 Keyboard Navigation
- Tab through all interactive elements
- Enter/Space to activate buttons
- Escape to close modals/dropdowns
- Arrow keys for table navigation (optional enhancement)

---

## 7. Mobile-First Responsive Strategy

### 7.1 Breakpoints
- `< 640px` — Mobile: stacked layouts, full-width cards
- `640px - 1023px` — Tablet: 2-column grids
- `≥ 1024px` — Desktop: sidebar + content, 3-4 column grids

### 7.2 Mobile Adaptations
- Sidebar → slide-out drawer with hamburger trigger
- Tables → horizontal scroll with sticky first column
- Stat cards → 2-column grid on mobile, 4-column on desktop
- Filter bars → horizontal scroll with `flex-wrap`
- Modals → full-width on mobile, centered on desktop

---

## 8. Performance Guidelines

### 8.1 Component Optimization
- Use `"use client"` only where needed
- Memoize expensive computations with `useMemo`
- Use `React.lazy()` for heavy page components (charts)
- Avoid re-creating functions in render (use `useCallback`)

### 8.2 Data Optimization
- RTK Query handles caching automatically
- Use `selectFromResult` for derived data
- Paginate large datasets (already implemented)
- Avoid fetching unnecessary data

### 8.3 Bundle Optimization
- Import only used Lucide icons (tree-shaking)
- Import only used recharts components
- Avoid importing entire libraries when only a few exports are needed

---

## 9. Implementation Priority

### Phase 1: Foundation (Do First)
1. Fix Modal accessibility (focus trap, Escape, ARIA)
2. Add ConfirmDialog for destructive actions
3. Add Toast notifications for CRUD feedback
4. Fix StatCard color prop bug
5. Add aria-labels to all interactive elements

### Phase 2: Component Polish (Do Second)
1. Standardize DataTable padding and typography
2. Make StatusBadge the single source of truth
3. Add loading states to all action buttons
4. Add flex-wrap to filter bars
5. Improve empty states with illustrations

### Phase 3: Dark Mode (Do Third)
1. Add ThemeToggle component
2. Verify all components use semantic tokens
3. Test dark mode across all pages
4. Fix any contrast issues

### Phase 4: Advanced UX (Do Last)
1. Add skeleton loading for full pages
2. Add keyboard shortcuts (Ctrl+S to save)
3. Add URL sync for filters/pagination
4. Add export functionality for tables
5. Add bulk actions for products/orders

---

## 10. Files to Modify (Complete List)

### Layout
- `src/app/admin/layout.tsx` — Add ToastProvider, ThemeToggle

### Shared Components
- `src/features/admin/shared/StatCard.tsx` — Fix color prop, improve spacing
- `src/features/admin/shared/DataTable.tsx` — Accessibility, spacing, typography
- `src/features/admin/shared/AdminPageHeader.tsx` — Consistent spacing
- `src/features/admin/shared/CommandPalette.tsx` — Accessibility

### Feature Components
- `src/features/admin/components/AdminSidebar.tsx` — ARIA, aria-current
- `src/features/admin/components/StatusBadge.tsx` — Use everywhere
- `src/features/admin/components/ProductModal.tsx` — Accessible Modal
- `src/features/admin/components/CategoryModal.tsx` — Accessible Modal
- `src/features/admin/components/ComboModal.tsx` — Accessible Modal
- `src/features/admin/components/ProductFormField.tsx` — htmlFor associations
- `src/features/admin/components/Pagination.tsx` — Accessibility

### Pages (22 files)
All pages under `src/app/admin/` — Design token fixes, StatusBadge usage, toast feedback

### New Components to Create
- `src/components/ui/system/ConfirmDialog.tsx` — Done
- `src/components/ui/system/Toast.tsx` — Done
- `src/components/ui/system/Modal.tsx` — Done (accessible)
- `src/components/ui/system/ThemeToggle.tsx` — Dark mode toggle
