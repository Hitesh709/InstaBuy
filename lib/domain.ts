export type UserRole = "customer" | "merchant_owner" | "merchant_staff" | "admin" | "support";
export type EligibilityStatus = "pending" | "eligible" | "ineligible" | "expired" | "suspended";
export type DealType = "percentage" | "flat";
export type DealScope = "product" | "category" | "store";
export type DealStatus = "draft" | "pending_review" | "active" | "paused" | "expired" | "rejected";
export type OrderStatus = "draft" | "pending_payment" | "confirmed" | "accepted" | "preparing" | "out_for_delivery" | "delivered" | "cancelled" | "payment_failed" | "refunded" | "partially_refunded" | "rejected";

export interface User { id: string; role: UserRole; displayName: string; phone?: string; email?: string; active: boolean; }
export interface EligibilityRecord { id: string; customerId: string; status: EligibilityStatus; program: string; effectiveFrom: string; effectiveUntil?: string; verifiedAt?: string; reasonCode?: string; policyVersion: string; }
export interface DealRule { id: string; merchantId: string; storeId?: string; type: DealType; scope: DealScope; value: number; productIds?: string[]; categoryIds?: string[]; minOrderValue?: number; maxDiscountAmount?: number; startsAt: string; endsAt: string; maxRedemptions?: number; maxRedemptionsPerCustomer?: number; status: DealStatus; stackable: boolean; policyVersion: string; }
export interface PriceResult { basePrice: number; discountAmount: number; memberPrice: number; currency: "INR"; dealId?: string; eligibilityId?: string; pricingVersion: string; }
export interface OrderLine { productId: string; storeId: string; quantity: number; unitBasePrice: number; unitMemberPrice: number; discountAmount: number; dealId?: string; }
export interface BenefitLedgerEntry { id: string; orderId: string; customerId: string; merchantId: string; discountAmount: number; merchantFundedAmount: number; platformFundedAmount: number; currency: "INR"; createdAt: string; }
