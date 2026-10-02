# InstaBuy — Phase 8 Cart & Ordering

## Scope
Tasks 71–80 establish the transaction journey from selected member deals to an order record.

### 71 Cart
A customer cart groups selected store items and preserves the authoritative product/store references required for pricing.

### 72 Quantity management
Quantity changes are bounded by inventory and must be revalidated before order placement.

### 73 Automatic discounts
Cart pricing is recalculated through the Phase 6 deal engine; the browser never becomes the authority for final price.

### 74 Coupon/deal validation
Deals are validated against customer eligibility, store, SKU, minimum order, schedule and discount limits.

### 75 Delivery-fee calculation
Delivery fee is calculated from fulfillment context, store/delivery zone and cart value. The UI exposes the calculation but cannot override it.

### 76 Checkout
Checkout validates address, contact information, inventory, pricing and order totals before creating an order.

### 77 Order confirmation
A successful order receives a stable order number and an immutable pricing snapshot.

### 78 Order tracking
Customers can see order status and fulfillment progress.

### 79 Cancellation
Cancellation is state-aware and must be rejected when the order has passed the configured cancellation boundary.

### 80 Order history
Customers can review active and historical orders with totals, savings, merchant and status.

## Order lifecycle
`CART → CHECKOUT → CONFIRMED → ACCEPTED → PREPARING → OUT_FOR_DELIVERY → DELIVERED`

Cancellation may transition eligible states to `CANCELLED`.

## Financial rule
The order stores an authoritative snapshot:
`subtotal + delivery fee + discounts + final total + member savings`

## Production rules
- Reprice on checkout; never trust cart totals from the client.
- Reserve inventory transactionally during order creation.
- Idempotency key required for order creation.
- Payment state is separated from order state.
- Cancellation and refund policy are explicit state transitions.
- Order history is account-scoped and server-authorized.
