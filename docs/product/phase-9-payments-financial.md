# Phase 9 — Payments & Financial

## Goal

Create a finance-ready architecture for customer payments, COD, refunds, merchant settlement, InstaBuy commission, discount funding, customer savings, reconciliation and financial reporting.

## Tasks

81. Payment gateway — payment intent and provider-reference architecture.
82. COD — cash-on-delivery payment state and collection tracking.
83. Payment verification — server-authoritative verification before order fulfillment.
84. Refunds — full and partial refund lifecycle with immutable financial reversals.
85. Merchant settlement ledger — gross sales, funding, commission, refunds and net payable.
86. InstaBuy commission ledger — commission calculated from explicit basis points.
87. Discount funding ledger — records who funds every customer discount.
88. Customer savings ledger — records the benefit delivered to the customer without treating savings as cash liability.
89. Settlement reconciliation — compare order, payment and ledger totals before payout.
90. Financial reports — payment, GMV, savings, commission, settlement, refund and reconciliation reporting.

## Financial principles

- All monetary values use integer INR minor units (paise).
- Percentage rates use basis points (10,000 bps = 100%).
- Payment state is separate from order state.
- Ledger entries are immutable; corrections are reversal entries rather than edits.
- Refunds reverse the relevant economic entries and never silently mutate historical totals.
- Customer savings is an informational/value ledger, distinct from cash payable.
- Merchant settlement is calculated from authoritative order and ledger records.
- Payment verification and refund authorization are server-side operations.
- Every payment, refund and settlement operation should support idempotency keys in production.

## Production flow

Customer Checkout → Reprice & Eligibility Validation → Payment Intent/COD → Server Verification → Order Confirmation → Fulfillment → Capture/Collection → Ledger Posting → Reconciliation → Merchant Settlement.

## Financial formula

Customer payable = gross merchandise value − member discount + delivery fee.

Merchant settlement = gross merchandise value − merchant-funded discount − InstaBuy commission − applicable refunds/adjustments.

Commission = commission base × commission rate in basis points / 10,000.

The exact commission base and discount-funding responsibility must be explicit in each commercial agreement; they must not be inferred from UI values.

## API direction

- `POST /api/payments/intents`
- `POST /api/payments/verify`
- `POST /api/payments/cod`
- `POST /api/refunds`
- `GET /api/merchant/settlements`
- `GET /api/finance/ledger`
- `GET /api/finance/reconciliation`
- `GET /api/finance/reports`

## Completion gate

Phase 9 is complete when tasks 81–90 have domain contracts, finance-console UI, reconciliation/reporting surfaces and clear server-authoritative production boundaries. A real payment gateway is not considered integrated until provider credentials and a verified server-side adapter are connected.
