# InstaBuy — Phase 7 Customer Shopping

## Scope
Tasks 61–70 create the customer discovery layer on top of the Phase 5 catalog and Phase 6 deal engine.

### 61 Product discovery
Customers can browse member-relevant products and nearby partner inventory without needing to know a merchant first.

### 62 Search
Search supports product name, brand, SKU and keywords. Search results should be ranked by relevance, availability, proximity and member value.

### 63 Categories
Categories and subcategories provide predictable browsing paths and reusable navigation filters.

### 64 Nearby stores
Store discovery is location-aware at the application layer. The production implementation should use customer-approved location/address and server-side store delivery zones; no browser-only distance claim is trusted for fulfillment.

### 65 Product detail
Product detail exposes images, description, variants, availability, merchant/store context and the authenticated customer's member price.

### 66 Member price display
Eligible customers see member price alongside the standard/store price. Ineligible customers receive a neutral eligibility message rather than an untrusted discounted price.

### 67 Original vs discounted price
Savings are shown as an explicit difference between authoritative original/store price and the pricing quote returned by the deal engine.

### 68 Savings calculation
Savings are derived from the same pricing engine used by cart and checkout, preventing UI-only discount calculations.

### 69 Wishlist
Customers can save products for later discovery. Wishlist state is account-scoped and should be persisted server-side in production.

### 70 Flash-deal discovery
Time-bound active deals are surfaced with remaining-window messaging and merchant attribution. Expired deals must not be presented as purchasable.

## Discovery architecture
`Customer Context → Search/Category/Store Discovery → Catalog → Eligibility → Deal Engine → Member Price`

## Production rules
- Search and filters never authorize a price.
- Product availability is derived from store inventory.
- Member price is a server-authoritative quote.
- Wishlist belongs to the authenticated customer.
- Location is used only with appropriate consent and privacy controls.
- Flash deals are validated against server time.
- Product/store references must come from the catalog and merchant domains.
