# InstaBuy — Phase 6 Deal Engine

## Scope
Tasks 51–60 establish the rules engine that turns merchant-funded or platform-funded offers into deterministic member pricing.

### 51 Merchant-created discounts
Merchants can create offers against approved stores and catalog entities. Draft offers are editable; published offers are immutable in their pricing-critical fields and are superseded by a new version.

### 52 Percentage discounts
Percentage offers support a basis amount, discount percentage, optional maximum discount and validity window.

### 53 Flat discounts
Flat offers reduce the eligible price by a fixed minor-unit amount, subject to minimum-order or product constraints.

### 54 Product-specific offers
An offer can target one or more product variants/SKUs.

### 55 Category-specific offers
An offer can target a category/subcategory and apply to matching eligible SKUs.

### 56 Store-wide offers
An approved merchant can publish an offer for all qualifying products in a store.

### 57 Minimum-order conditions
Rules can require a minimum cart subtotal before an offer becomes applicable.

### 58 Maximum-discount limits
Percentage discounts may have a maximum savings cap. The cap is applied after calculating the percentage amount.

### 59 Deal scheduling
Offers use explicit start/end timestamps and timezone-aware evaluation. Scheduled, active, expired and disabled states are derived rather than trusted from the client.

### 60 Customer eligibility rules
Member pricing is available only when the authenticated customer passes the eligibility + membership gate. Additional offer-level rules can target customer segments without exposing sensitive eligibility logic to the browser.

## Pricing pipeline
`Authenticated Customer → Eligibility → Membership → Store → SKU → Matching Deals → Conditions → Discount → Final Price`

## Deterministic rule priority
1. Validate store and SKU availability.
2. Validate customer eligibility and active membership.
3. Find active matching offers.
4. Evaluate minimum-order and other conditions.
5. Calculate candidate discounts.
6. Apply maximum-discount limits.
7. Resolve stacking/exclusivity rules.
8. Return final price plus an auditable pricing breakdown.

## Anti-abuse principles
- Never trust a client-supplied customer eligibility flag.
- Never trust client-calculated final price.
- Never allow negative line totals.
- Offer evaluation must be idempotent for the same pricing input/version.
- Published offer versions are auditable.
- Redemption/order processing must revalidate the offer server-side.

## API direction
`POST /api/merchant/deals`
`GET /api/merchant/deals`
`GET /api/merchant/deals/:id`
`PATCH /api/merchant/deals/:id`
`POST /api/merchant/deals/:id/publish`
`POST /api/merchant/deals/:id/disable`
`GET /api/deals/eligible`
`POST /api/pricing/quote`

## Completion gate
Phase 6 is complete when the same pricing rules can be evaluated consistently for discovery, product detail, cart and checkout, with a server-authoritative price breakdown.
