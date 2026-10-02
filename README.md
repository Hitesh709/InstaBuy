# InstaBuy

**Member-first local commerce for partner businesses and their eligible customers.**

InstaBuy is designed around a two-sided collaboration model:

- **Partner shop owners** are businesses in the network and can publish percentage-based flash deals.
- **Eligible customers** receive special member pricing automatically when shopping through InstaBuy.
- **The commerce layer** connects the shop's promotion with the customer's eligibility, turning existing customer relationships into a repeat-purchase network.

## MVP currently included

- Premium responsive customer dashboard
- Member-only product pricing and visible savings
- Partner-store and delivery-time presentation
- Category filtering and product search
- Functional cart with savings calculation
- Customer / shop-owner mode switch
- Merchant flash-deal creation modal
- Partner-store metrics placeholder
- Mobile responsive layout

## Product architecture direction

The next implementation layers should separate the current demo UI into:

1. Identity & eligibility — customer identity, membership/loan-customer eligibility, consent and status.
2. Merchant onboarding — store profile, locations, catalog, operating hours and offer permissions.
3. Deals engine — percentage/flat discounts, SKU/category scope, minimum order, caps, schedules and redemption limits.
4. Catalog & inventory — products, prices, stock, store-level availability.
5. Orders — cart, checkout, payment, fulfillment and order state machine.
6. Benefits ledger — discount granted, merchant-funded amount, platform-funded amount and customer savings.
7. Merchant analytics — impressions, eligible reach, redemptions, GMV and repeat purchases.
8. Admin / risk — approval workflow, abuse controls, offer auditing and settlement reconciliation.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

> The repository currently contains the front-end MVP. Production authentication, payments, inventory, eligibility integrations and settlement should be implemented before live commerce use.
