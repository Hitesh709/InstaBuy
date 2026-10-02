# InstaBuy Production Launch Checklist

## Application
- [ ] All customer, merchant, admin and finance mutations are server-authorized.
- [ ] Demo-only data is removed or clearly isolated from production.
- [ ] Cart and order state persist in the production database.
- [ ] Payment gateway adapter is connected and verified.
- [ ] Notification providers are connected and verified.

## Security
- [ ] Secrets exist only in deployment secret storage.
- [ ] Authentication, authorization and session expiry are tested.
- [ ] Rate limits cover OTP, login, checkout, offers and support.
- [ ] Sensitive customer fields are masked in operational interfaces.
- [ ] Audit logs cover financial and administrative mutations.
- [ ] Dependency and supply-chain checks pass.

## Reliability
- [ ] Database backup is configured.
- [ ] Restore procedure has been tested.
- [ ] Health/readiness checks exist.
- [ ] Structured application logging is enabled.
- [ ] Error monitoring and alerting are enabled.
- [ ] Rollback procedure is documented and tested.

## Quality
- [ ] Typecheck passes.
- [ ] Lint passes.
- [ ] Unit tests pass.
- [ ] Integration tests pass.
- [ ] Checkout/payment/refund smoke tests pass.
- [ ] Responsive and accessibility smoke tests pass.

## Operations
- [ ] Merchant order console is staffed.
- [ ] Support escalation process is documented.
- [ ] Fraud/risk review process is documented.
- [ ] Finance reconciliation and settlement ownership is documented.
- [ ] Incident response contacts are assigned.

## Launch decision

Production launch should occur only after all critical-path checks are green. The checklist is a gate, not a claim that the current repository has already satisfied every production requirement.
