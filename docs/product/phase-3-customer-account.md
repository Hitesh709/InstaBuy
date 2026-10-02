# InstaBuy — Phase 3 Customer Account

## Scope
Tasks 21–30 establish the customer identity and membership foundation.

### 21 Registration
- Create customer account using mobile number and consent.
- Capture only fields required for onboarding.
- Prevent duplicate active identities.

### 22 Login / logout
- Mobile-first passwordless session flow.
- Explicit session expiry and logout.
- Server remains the source of authentication truth.

### 23 OTP verification
- OTP request, verification, expiry and retry limits.
- Never expose OTP values in client state or logs.
- Rate-limit repeated requests.

### 24 Profile
- Name, mobile, email and optional profile metadata.
- Profile changes are authenticated and auditable.

### 25–26 Addresses
- Address book with one default address.
- Support create/update/delete and delivery instructions.
- Validate serviceability before checkout.

### 27 Eligibility verification
Eligibility is a first-class domain state:
`PENDING → VERIFIED → SUSPENDED | EXPIRED`

The customer UI may display eligibility, but pricing/order authorization must be checked server-side.

### 28 Membership status
Expose:
- membership state
- effective/expiry dates
- benefit summary
- verification state

### 29 Benefits dashboard
Show:
- available member deals
- savings to date
- active benefits
- eligibility explanation
- recent redemptions

### 30 Notification preferences
Preferences are explicit and channel-specific:
- push
- SMS
- WhatsApp
- email
- transactional vs promotional categories

## UI states
Every account surface supports loading, empty, success, validation error, authorization error and service-unavailable states.

## Security rules
- Authentication and eligibility are server-authoritative.
- Never trust a client-supplied `eligible=true` flag.
- Sensitive account actions require an authenticated session.
- OTP and session data must not be persisted in browser storage.
- Account and eligibility changes should produce audit events.

## API contract direction
`POST /api/auth/request-otp`
`POST /api/auth/verify-otp`
`POST /api/auth/logout`
`GET /api/customer/me`
`PATCH /api/customer/me`
`GET /api/customer/addresses`
`POST /api/customer/addresses`
`PATCH /api/customer/addresses/:id`
`DELETE /api/customer/addresses/:id`
`GET /api/customer/eligibility`
`GET /api/customer/membership`
`GET /api/customer/benefits`
`GET /api/customer/notification-preferences`
`PATCH /api/customer/notification-preferences`

## Completion gate
Phase 3 is complete only when the identity state machine, authorization rules, validation/error states, UI contracts and test strategy are represented in code/documentation. Demo-only profile or eligibility state is not production truth.
