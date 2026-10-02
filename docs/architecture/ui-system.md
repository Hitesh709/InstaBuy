# InstaBuy UI System — Phase 2

**Status:** Implemented foundation  
**Phase:** 2 — UX/UI  
**Scope:** Tasks 11–20

## Design direction

InstaBuy uses a premium financial-commerce visual language: calm surfaces, high information density, strong hierarchy, and a distinctive member-value accent. The interface should feel more like a trusted financial product than a generic quick-commerce clone.

The UI communicates one primary loop:

`Eligibility → Member Deal → Member Price → Order → Savings`

## 1. Design principles

1. **Value is visible:** base price, member price and savings are separate pieces of information.
2. **Trust before decoration:** financial and eligibility states use explicit labels, status indicators and audit-friendly wording.
3. **One primary action:** each surface should have one visually dominant next step.
4. **Progressive disclosure:** advanced merchant/admin controls stay out of the customer buying path.
5. **Consistent density:** cards, tables and dashboards share predictable spacing and alignment.
6. **Responsive by construction:** desktop three-column layouts collapse into mobile-first flows rather than shrinking desktop UI.
7. **Accessible interaction:** keyboard focus, readable contrast, reduced motion and semantic controls are mandatory.
8. **No business logic in presentation:** UI components consume domain results; they do not determine eligibility, discount validity or settlement totals.

## 2. Brand tokens

The canonical token layer is `app/tokens.css`.

### Brand

- Deep forest: `--ib-brand-900`
- Dark forest: `--ib-brand-950`
- Member lime: `--ib-accent-400`
- Supporting green: `--ib-brand-600`

### Surfaces

- White: `--ib-surface-0`
- Application background: `--ib-surface-100`
- Subtle surface: `--ib-surface-150`
- Borders: `--ib-border`

### Semantic states

- Success: `--ib-success`
- Warning: `--ib-warning`
- Danger: `--ib-danger`
- Information: `--ib-info`

## 3. Typography

Use the system sans stack for the first production milestone. Typography hierarchy:

| Level | Usage | Target |
|---|---|---|
| Display | Hero/value proposition | 40–56px, tight tracking |
| H1 | Page title | 28–36px |
| H2 | Section title | 20–26px |
| H3 | Card/product title | 14–18px |
| Body | Explanatory copy | 13–15px |
| Meta | Store/status/context | 10–12px |
| Label | Navigation/badges | 9–11px, strong weight |

## 4. Layout architecture

### Customer shell

`Topbar → Sidebar → Main content → Basket/utility rail`

Desktop target:
- 245px navigation
- flexible content column
- 285px basket/utility rail
- maximum shell width 1600px

Tablet:
- compact navigation
- utility rail collapses
- two-column product grid

Mobile:
- topbar remains visible
- navigation becomes bottom/mobile navigation in the application milestone
- content becomes single-column
- checkout becomes a dedicated flow rather than a desktop rail

### Merchant shell

`Topbar → Merchant navigation → Workspace`

Primary workspace sections:
- Overview
- Orders
- Catalog
- Inventory
- Deals
- Customers/reach
- Analytics
- Settlement
- Store settings

### Admin shell

`Global navigation → Operational workspace`

Primary sections:
- Command center
- Customers/eligibility
- Merchants/stores
- Deals/policy
- Orders/disputes
- Risk
- Settlement
- Reports
- Audit log

## 5. Component hierarchy

### Primitives

Button, IconButton, Input, Select, Badge, Avatar, Divider, Skeleton, Tooltip.

### Surfaces

Card, StatCard, Panel, Drawer, Modal, EmptyState, Alert.

### Commerce

ProductCard, PriceBlock, DealBadge, StoreCard, CartLine, SavingsSummary, OrderStatus.

### Operations

DataTable, FilterBar, StatusPill, Timeline, KPIGrid, AuditEvent.

## 6. State rules

Every interactive surface should define:

- default
- hover
- focus
- pressed
- disabled
- loading
- empty
- error
- success where applicable

For financial values, also define:

- normal price
- member price
- discount/savings
- unavailable
- eligibility pending

## 7. Responsive rules

Never solve overflow by allowing critical controls to become horizontally inaccessible.

At small widths:
- hide secondary copy before hiding primary actions;
- collapse rails into drawers/stacked sections;
- keep price and savings visible;
- preserve 44px minimum interactive target sizing where practical;
- prevent tables from silently clipping important financial columns.

## 8. Dashboard information hierarchy

### Customer

1. Eligibility/member status
2. Active deals
3. Search/discovery
4. Product pricing
5. Basket savings
6. Orders and benefits

### Merchant

1. Today's orders
2. Sales/GMV
3. Active deals
4. Eligible customer reach
5. Inventory exceptions
6. Settlement status

### Admin

1. Platform health
2. Orders requiring action
3. Eligibility exceptions
4. Merchant/deal approvals
5. Risk and disputes
6. Settlement exceptions

## 9. Accessibility baseline

- Visible keyboard focus
- Semantic buttons and links
- Labels for form controls
- Status messages that are not color-only
- Reduced-motion support
- Adequate text/background contrast
- Responsive zoom support

## 10. Security/UI boundary

The UI may display a calculated member price, but it must never be the authority for:

- eligibility
- discount authorization
- redemption limits
- payment status
- refunds
- settlement

Those decisions belong to trusted application services as defined by the PRD.

## 11. Phase 2 acceptance criteria

- [x] Canonical design tokens created.
- [x] Brand, semantic and spacing scales defined.
- [x] Desktop/tablet/mobile layout rules documented.
- [x] Customer, merchant and admin information hierarchies defined.
- [x] Reusable component taxonomy defined.
- [x] Accessibility baseline defined.
- [x] UI/business-logic boundary documented.

The existing MVP remains visually compatible with the system while later phases migrate individual screens to reusable primitives instead of performing a risky all-at-once rewrite.
