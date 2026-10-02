# Phase 10 — Operations, Intelligence & Production Launch

## Scope

91. Merchant order management
92. Delivery and fulfillment
93. Admin operations console
94. Fraud and abuse detection
95. Customer support
96. Push, SMS, WhatsApp and email notifications
97. Merchant analytics
98. Customer analytics
99. Platform KPI dashboard
100. Production security, testing, deployment and launch

## Operating model

The operations layer connects orders, stores, fulfillment, support, risk, notifications and finance into one command center. Every operational action must be auditable and permission-controlled.

## Core states

Order: CONFIRMED → ACCEPTED → PREPARING → OUT_FOR_DELIVERY → DELIVERED, with CANCELLED where policy permits.

Fulfillment exceptions: STOCKOUT, STORE_CLOSED, DELIVERY_DELAY, CUSTOMER_UNAVAILABLE, ADDRESS_ISSUE, PAYMENT_EXCEPTION.

Support ticket: OPEN → TRIAGED → IN_PROGRESS → RESOLVED → CLOSED.

Risk review: CLEAR → REVIEW → BLOCKED → RELEASED.

## Production principles

- Server-authoritative authorization for every financial, order, discount and fulfillment mutation.
- Role-based access for customer, merchant staff, support, operations, finance and administrators.
- Audit trail for sensitive actions.
- Idempotency for payment, order and fulfillment commands.
- PII minimization and masked customer data in operational views.
- Rate limiting and abuse controls on authentication, checkout, offers and support endpoints.
- No secrets in source control.
- Health checks, structured logs, error tracking and deployment rollback strategy.
- Database backups and restore verification before launch.
- Automated unit, integration, accessibility and end-to-end smoke tests.

## KPI model

Customer: active members, conversion, order frequency, savings per customer, repeat rate.

Merchant: active stores, GMV, orders, fulfillment rate, cancellation rate, offer redemption, settlement value.

Platform: GMV, net revenue, commission, customer savings, order success rate, delivery SLA, refund rate, support SLA, fraud rate.

## Launch gate

Production launch requires all critical paths to have server-side persistence, real payment/notification adapters where applicable, authorization, monitoring, test coverage, rollback procedures and operational ownership. Demo data or client-only state must not be represented as production capability.
