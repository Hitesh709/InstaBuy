# InstaBuy — Phase 5 Product & Catalog

## Scope
Tasks 41–50 establish the canonical product catalog and store-level inventory/pricing model.

### 41 Product database
A canonical product is identified independently from any merchant store. Product identity contains name, brand, category, description, searchable attributes and lifecycle status.

### 42 Categories
Categories are hierarchical and stable. Products reference category IDs rather than display labels.

### 43 Subcategories
Subcategories provide deeper discovery without coupling product identity to the navigation UI.

### 44 Images
Products support ordered image assets with an explicit primary image. Image URLs are references to an asset service; binary storage should not be embedded in product records.

### 45 Descriptions
Descriptions support concise customer copy plus optional structured attributes such as unit, pack size, ingredients/specifications and searchable keywords.

### 46 Variants
A product can have multiple sellable variants, such as size, weight, pack count or flavor. Each variant has its own SKU and can have store-level price/inventory.

### 47 Pricing
Base pricing is represented separately from store overrides and future deal adjustments. Money is represented as integer minor units to avoid floating-point currency errors.

### 48 Store-level pricing
A merchant store may override the catalog base price. Store price records include effective dates and an active state so future pricing can be scheduled safely.

### 49 Inventory
Inventory is tracked per sellable SKU and store. Quantity, reserved quantity and available quantity are separate concepts.

### 50 Stock availability
Customer availability is derived from store operational state + inventory + product/variant lifecycle. The browser must not be trusted to claim stock.

## Domain relationship
`Category → Product → Variant/SKU → Store Listing → Price + Inventory`

## Important architecture
The catalog is global; commercial availability is local.

A product can exist once in the catalog while being sold by many merchant stores with different prices, inventory levels and availability.

## Money and inventory rules
- Prices use integer minor units (`paise` for INR).
- Never calculate money with JavaScript floating-point values in the domain layer.
- `availableQuantity = max(0, quantity - reservedQuantity)`.
- Negative inventory is rejected by domain validation.
- Price changes are auditable and effective-dated.
- Inventory mutations should be transactional in the eventual database implementation.

## API direction
`GET /api/catalog/categories`
`GET /api/catalog/products`
`POST /api/catalog/products`
`GET /api/catalog/products/:id`
`PATCH /api/catalog/products/:id`
`POST /api/catalog/products/:id/variants`
`PATCH /api/catalog/variants/:id`
`GET /api/stores/:storeId/catalog`
`POST /api/stores/:storeId/catalog`
`PATCH /api/stores/:storeId/catalog/:variantId`
`GET /api/stores/:storeId/inventory`
`PATCH /api/stores/:storeId/inventory/:variantId`

## Completion gate
Phase 5 is complete when product identity, variants, pricing, store listings and inventory are explicit domain concepts and customer availability can be derived without relying on UI-only flags.
