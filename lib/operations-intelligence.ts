export type FulfillmentException = "STOCKOUT" | "STORE_CLOSED" | "DELIVERY_DELAY" | "CUSTOMER_UNAVAILABLE" | "ADDRESS_ISSUE" | "PAYMENT_EXCEPTION";
export type SupportStatus = "OPEN" | "TRIAGED" | "IN_PROGRESS" | "RESOLVED" | "CLOSED";
export type RiskStatus = "CLEAR" | "REVIEW" | "BLOCKED" | "RELEASED";

export interface OperationalOrder {
  orderId: string;
  merchantId: string;
  storeId: string;
  customerId: string;
  status: string;
  promisedEtaMinutes: number;
  actualEtaMinutes?: number;
  exception?: FulfillmentException;
  lastUpdatedAt: string;
}

export interface SupportTicket {
  id: string;
  customerId: string;
  orderId?: string;
  category: "ORDER" | "PAYMENT" | "REFUND" | "ACCOUNT" | "MERCHANT" | "OTHER";
  status: SupportStatus;
  priority: "LOW" | "NORMAL" | "HIGH" | "URGENT";
  assignedTo?: string;
  createdAt: string;
}

export interface RiskSignal {
  id: string;
  customerId?: string;
  merchantId?: string;
  orderId?: string;
  type: "VELOCITY" | "PAYMENT_PATTERN" | "COUPON_ABUSE" | "ACCOUNT_ANOMALY" | "INVENTORY_ANOMALY";
  score: number;
  status: RiskStatus;
  createdAt: string;
}

export interface PlatformKpis {
  gmvMinor: number;
  netRevenueMinor: number;
  customerSavingsMinor: number;
  orders: number;
  successfulOrders: number;
  cancellationRate: number;
  refundRate: number;
  averageDeliveryMinutes: number;
  supportOpen: number;
  riskReview: number;
}

export function fulfillmentSlaMinutes(order: OperationalOrder) {
  return Math.max(0, (order.actualEtaMinutes ?? order.promisedEtaMinutes) - order.promisedEtaMinutes);
}

export function isSlaBreached(order: OperationalOrder) {
  return fulfillmentSlaMinutes(order) > 0;
}

export function canResolveTicket(status: SupportStatus) {
  return status === "TRIAGED" || status === "IN_PROGRESS";
}

export function riskRequiresReview(score: number) {
  return score >= 70;
}

export function cancellationRate(cancelled: number, total: number) {
  return total <= 0 ? 0 : Number(((cancelled / total) * 100).toFixed(2));
}
