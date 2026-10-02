# InstaBuy Product Requirements Document

**Version:** 0.1  
**Status:** Foundation  
**Product:** InstaBuy — member-first local commerce

## 1. Product vision

InstaBuy connects partner shops with eligible customers through member-only commerce benefits. A partner can publish a deal, eligible customers see the applicable member price, and InstaBuy records the order, benefit and financial impact.

InstaBuy is not defined by delivery alone. The core product is the **eligibility → deal → price → order → savings → settlement** loop.

## 2. Business model

### Participants

- **Customer:** an eligible member who can discover products and receive qualifying benefits.
- **Partner merchant:** a shop/business that supplies products and publishes approved offers.
- **InstaBuy:** the platform that manages eligibility, discovery, deal rules, checkout, benefit accounting, analytics and operational controls.
- **Admin/operator:** manages approvals, policies, risk, disputes and reconciliation.

### Core transaction

`Partner Merchant → Product/Deal → Eligibility Check → Member Price → Order → Savings/Benefit Ledger → Settlement`

## 3. Customer value proposition

1. Discover products from participating local stores.
2. See normal price and eligible member price clearly.
3. Receive qualifying discounts automatically rather than entering a code.
4. Track savings and order history.
5. Use benefits across participating partner stores.

## 4. Merchant value proposition

1. Reach an existing eligible customer network.
2. Publish controlled offers by product, category or store.
3. Control offer dates, limits and discount rules.
4. Track reach, redemptions, sales and repeat purchasing.
5. Receive transparent settlement and reconciliation records.

## 5. Admin value proposition

1. Verify merchants and stores.
2. Control customer eligibility policies.
3. Review and audit deals.
4. Monitor orders, refunds, fraud signals and disputes.
5. Reconcile merchant/platform/customer financial records.

## 6. Product principles

- **Eligibility first:** benefits are granted only when policy conditions pass.
- **Price transparency:** show base price, member price and saving separately.
- **Server-authoritative rules:** discounts and eligibility must eventually be calculated on trusted backend services, not the browser.
- **Auditable money movement:** every discount, payment, refund and settlement adjustment needs a ledger record.
- **Merchant control:** merchants can define offers within platform policy limits.
- **Operational safety:** no production order should depend on client-side state alone.
- **Mobile-first:** the customer buying flow must remain fast on mobile.

## 7. Roles and permissions

| Role | Primary capabilities |
|---|---|
| Customer | Browse, view eligible prices, cart, checkout, orders, savings |
| Merchant owner | Store profile, catalog, inventory, deals, orders, analytics |
| Merchant staff | Operational store/order actions within assigned permissions |
| Admin | Merchant approval, policy, risk, disputes, reporting, reconciliation |
| Support operator | Customer/order support without unrestricted financial controls |

## 8. Eligibility model

A customer benefit should be represented as a policy result, not as a UI flag.

Minimum future fields:

- customer ID
- eligibility status
- source/program
- effective-from
- effective-until
- verification status
- consent status
- reason/status code
- last evaluated timestamp

Eligibility must be re-evaluated when required by the business policy.

## 9. Deal model

A deal must support:

- percentage discount
- flat discount
- product/SKU scope
- category scope
- store-wide scope
- minimum order value
- maximum discount amount
- start/end time
- redemption limits
- customer eligibility rules
- stacking policy
- merchant funding/platform funding attribution
- active, paused, expired and rejected states

## 10. Pricing rule

For each eligible line item, the future pricing service should calculate:

`memberPrice = max(0, basePrice - applicableDiscount)`

and return a structured explanation containing the applied deal, discount amount and rule version. The browser must display this result but must not be the source of truth.

## 11. Order lifecycle

`DRAFT → PENDING_PAYMENT → CONFIRMED → ACCEPTED → PREPARING → OUT_FOR_DELIVERY → DELIVERED`

Alternative terminal states:

`CANCELLED`, `PAYMENT_FAILED`, `REFUNDED`, `PARTIALLY_REFUNDED`, `REJECTED`

Every state transition should be authorized and auditable.

## 12. Financial model

InstaBuy should eventually maintain separate accounting views for:

- customer payment
- merchant gross sale
- customer discount/savings
- merchant-funded discount
- platform-funded discount
- platform commission/fees
- delivery fees
- refunds
- merchant payable
- settlement adjustments

Do not derive settlement from UI totals.

## 13. Core KPIs

### Customer

- eligible customers
- active customers
- conversion to first order
- repeat order rate
- average order value
- customer savings

### Merchant

- active merchants
- eligible reach
- offer impressions
- redemption rate
- GMV
- repeat customer rate

### Platform

- GMV
- net revenue
- discount funding mix
- order success rate
- cancellation/refund rate
- settlement exceptions

## 14. MVP acceptance criteria

The foundation is ready when:

- the three core actors and permissions are documented;
- eligibility is represented as a first-class domain concept;
- deals have explicit scope, timing and limits;
- customer pricing can be explained as a deterministic rule result;
- order and settlement lifecycles are defined;
- customer savings can be reconciled to an auditable transaction;
- the UI can evolve without coupling business rules to presentation code.

## 15. Non-goals for the current UI milestone

- Real payment processing
- Real lending/eligibility provider integration
- Production inventory synchronization
- Real delivery dispatch
- Production settlement rails
- KYC/AML implementation

These require backend services, credentials, compliance decisions and production testing before activation.
