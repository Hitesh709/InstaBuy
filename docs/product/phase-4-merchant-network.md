# InstaBuy — Phase 4 Merchant Network

## Scope
Tasks 31–40 establish the partner-store network that powers InstaBuy offers.

### 31 Merchant registration
Capture legal/business identity, primary contact, mobile, email and store intent. Registration creates a pending merchant, never an automatically trusted merchant.

### 32 Merchant KYC
Support business verification requirements appropriate to the merchant type. Sensitive verification data must be access-controlled, encrypted where applicable, and auditable.

### 33 Merchant approval
Lifecycle:
`DRAFT → SUBMITTED → UNDER_REVIEW → APPROVED | REJECTED | SUSPENDED`
Only approved merchants can publish customer-facing offers or accept marketplace orders.

### 34 Business profile
Business name, legal name, category, description, logo, contact details, policies and customer-facing profile.

### 35 Store locations
A merchant may operate multiple stores. Each store has its own address, coordinates, operating status, inventory context and delivery configuration.

### 36 Operating hours
Store-level weekly schedule with holiday/temporary closures and open/closed status. Checkout must validate current service availability.

### 37 Delivery radius
Store-level service area with configurable radius or future polygon/geofence support. Serviceability must be evaluated server-side.

### 38 Merchant staff accounts
Role-based access:
- Owner
- Manager
- Operator
- Finance

Staff access is scoped to permitted merchants/stores and should be revocable without deleting the merchant.

### 39 Verification status
Customer-facing and merchant-facing status must distinguish verification, approval and operational availability. Do not expose sensitive KYC details.

### 40 Performance profile
Track operational KPIs such as orders, completed orders, cancellations, offer redemptions, sales and service-level metrics. Metrics are observations, not manually editable profile fields.

## Core domain types
Merchant → Store → Staff → Verification → Operating Schedule → Delivery Zone → Performance Metrics.

## Authorization rules
- Pending/rejected/suspended merchants cannot publish live offers.
- Staff permissions are checked against merchant/store scope.
- Store availability cannot be changed by an unauthorized operator.
- Customer discovery should expose only approved, active stores.

## API direction
`POST /api/merchants`
`GET /api/merchants/me`
`PATCH /api/merchants/me`
`POST /api/merchants/kyc`
`GET /api/merchants/verification`
`POST /api/merchants/submit`
`GET /api/merchant/stores`
`POST /api/merchant/stores`
`PATCH /api/merchant/stores/:id`
`GET /api/merchant/stores/:id/hours`
`PATCH /api/merchant/stores/:id/hours`
`GET /api/merchant/stores/:id/delivery-zone`
`PATCH /api/merchant/stores/:id/delivery-zone`
`GET /api/merchant/staff`
`POST /api/merchant/staff`
`PATCH /api/merchant/staff/:id`
`GET /api/merchant/performance`

## Completion gate
Phase 4 is complete only when merchant trust state, store scope, staff authorization, serviceability and operational metrics are represented as explicit domain concepts rather than UI-only flags.
