# InstaBuy Domain Model

## System boundary

```text
                         ┌──────────────────────┐
                         │      InstaBuy        │
                         │ Member Commerce Core │
                         └──────────┬───────────┘
                                    │
              ┌─────────────────────┼─────────────────────┐
              │                     │                     │
        ┌─────▼─────┐         ┌─────▼─────┐         ┌─────▼─────┐
        │ Customers │         │ Merchants │         │   Admin   │
        └─────┬─────┘         └─────┬─────┘         └─────┬─────┘
              │                     │                     │
              └──────────────┬──────┴──────────────┬──────┘
                             │                     │
                       ┌─────▼─────┐         ┌─────▼─────┐
                       │ Eligibility│         │ Deal Engine│
                       └─────┬─────┘         └─────┬─────┘
                             └──────────┬──────────┘
                                        │
                                  ┌─────▼─────┐
                                  │  Pricing  │
                                  └─────┬─────┘
                                        │
                                  ┌─────▼─────┐
                                  │   Order   │
                                  └─────┬─────┘
                                        │
                         ┌──────────────┼──────────────┐
                         │              │              │
                   ┌─────▼─────┐  ┌─────▼─────┐  ┌─────▼─────┐
                   │ Payments  │  │ Fulfilment│  │ Benefits  │
                   └─────┬─────┘  └───────────┘  │  Ledger   │
                         │                        └─────┬─────┘
                         └──────────────────────────────┤
                                                        │
                                                  ┌─────▼─────┐
                                                  │Settlement │
                                                  └───────────┘
```

## Core entities

### Identity

- `User`
- `CustomerProfile`
- `MerchantAccount`
- `MerchantStaff`
- `AdminUser`

### Merchant

- `Merchant`
- `Store`
- `StoreHours`
- `StoreLocation`
- `MerchantVerification`

### Catalog

- `Category`
- `Product`
- `ProductVariant`
- `StoreProduct`
- `InventorySnapshot`

### Benefits

- `EligibilityRecord`
- `Deal`
- `DealScope`
- `DealRule`
- `DealRedemption`
- `BenefitLedgerEntry`

### Commerce

- `Cart`
- `CartLine`
- `Order`
- `OrderLine`
- `Payment`
- `Refund`
- `Fulfilment`

### Finance

- `MerchantSettlement`
- `SettlementLine`
- `PlatformFee`
- `DiscountFundingEntry`
- `ReconciliationRecord`

## Relationship rules

1. A merchant can operate one or more stores.
2. A store can sell many products; a product can exist in many stores.
3. Store-level price and inventory are separate from the global product definition.
4. A deal belongs to a merchant/store and has explicit scope and validity.
5. An eligibility record belongs to a customer and represents a time-bounded policy result.
6. Pricing combines product/store data, eligibility and applicable deals.
7. An order stores the pricing result used at checkout so later catalog changes do not rewrite historical orders.
8. Benefit ledger entries preserve the financial effect of discounts independently from display totals.
9. Settlement is derived from recorded financial entries, not from recalculating the current catalog.

## State ownership

| Domain | Source of truth |
|---|---|
| Identity | Auth/identity service |
| Eligibility | Eligibility service/policy engine |
| Product | Catalog service |
| Inventory | Inventory service/store integration |
| Deal rules | Deal service |
| Member price | Pricing service |
| Order | Order service |
| Payment | Payment provider + payment service |
| Savings | Benefit ledger |
| Merchant payable | Settlement ledger |

## Security boundary

The browser may request and display state, but must not be trusted to determine:

- customer eligibility;
- final discount amount;
- payable amount;
- payment success;
- inventory availability at confirmation;
- refund amount;
- merchant settlement amount.

Those decisions belong to server-side services and must be logged with actor, timestamp and rule/version metadata.
