export type PaymentMethod = "ONLINE" | "COD";
export type PaymentStatus = "PENDING" | "AUTHORIZED" | "CAPTURED" | "FAILED" | "REFUNDED" | "PARTIALLY_REFUNDED";
export type RefundStatus = "REQUESTED" | "PROCESSING" | "COMPLETED" | "FAILED";
export type LedgerEntryType = "SALE" | "COMMISSION" | "DISCOUNT_FUNDING" | "CUSTOMER_SAVING" | "REFUND" | "SETTLEMENT";
export type LedgerOwnerType = "MERCHANT" | "INSTABUY" | "CUSTOMER";

export interface Payment {
  id: string;
  orderId: string;
  method: PaymentMethod;
  status: PaymentStatus;
  amountMinor: number;
  currency: "INR";
  providerReference?: string;
  createdAt: string;
  capturedAt?: string;
}

export interface Refund {
  id: string;
  paymentId: string;
  orderId: string;
  amountMinor: number;
  status: RefundStatus;
  reason: string;
  createdAt: string;
  completedAt?: string;
}

export interface FinancialBreakdown {
  grossSalesMinor: number;
  discountMinor: number;
  customerPayableMinor: number;
  deliveryFeeMinor: number;
  commissionMinor: number;
  discountFundingMinor: number;
  merchantSettlementMinor: number;
  customerSavingsMinor: number;
}

export interface LedgerEntry {
  id: string;
  orderId: string;
  ownerType: LedgerOwnerType;
  ownerId: string;
  type: LedgerEntryType;
  amountMinor: number;
  currency: "INR";
  direction: "CREDIT" | "DEBIT";
  referenceId: string;
  createdAt: string;
}

export interface Settlement {
  id: string;
  merchantId: string;
  periodStart: string;
  periodEnd: string;
  grossSalesMinor: number;
  commissionMinor: number;
  discountFundingMinor: number;
  refundsMinor: number;
  netPayableMinor: number;
  status: "PENDING" | "READY" | "PROCESSING" | "PAID" | "ON_HOLD";
  payoutReference?: string;
}

export function calculateFinancialBreakdown(input: {
  grossSalesMinor: number;
  discountMinor: number;
  deliveryFeeMinor: number;
  commissionBps: number;
  discountFundingMinor: number;
  refundsMinor?: number;
}): FinancialBreakdown {
  const commissionMinor = Math.round((input.grossSalesMinor * input.commissionBps) / 10_000);
  const customerPayableMinor = Math.max(0, input.grossSalesMinor - input.discountMinor + input.deliveryFeeMinor);
  const merchantSettlementMinor = Math.max(
    0,
    input.grossSalesMinor - input.discountFundingMinor - commissionMinor - (input.refundsMinor ?? 0),
  );
  return {
    grossSalesMinor: input.grossSalesMinor,
    discountMinor: input.discountMinor,
    customerPayableMinor,
    deliveryFeeMinor: input.deliveryFeeMinor,
    commissionMinor,
    discountFundingMinor: input.discountFundingMinor,
    merchantSettlementMinor,
    customerSavingsMinor: input.discountMinor,
  };
}

export function canCapturePayment(status: PaymentStatus) {
  return status === "PENDING" || status === "AUTHORIZED";
}

export function canRefundPayment(status: PaymentStatus) {
  return status === "CAPTURED" || status === "PARTIALLY_REFUNDED";
}

export function formatMinorInr(amountMinor: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(amountMinor / 100);
}
