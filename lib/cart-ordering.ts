export type OrderStatus = "CONFIRMED" | "ACCEPTED" | "PREPARING" | "OUT_FOR_DELIVERY" | "DELIVERED" | "CANCELLED";

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  storeId: string;
  storeName: string;
  unitPriceMinor: number;
  originalPriceMinor: number;
  quantity: number;
  maxQuantity: number;
  emoji: string;
}

export interface CartTotals {
  subtotalMinor: number;
  discountMinor: number;
  deliveryFeeMinor: number;
  totalMinor: number;
  savingsMinor: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  status: OrderStatus;
  items: CartItem[];
  totals: CartTotals;
  addressLabel: string;
  address: string;
  createdAt: string;
}

export function calculateCartTotals(items: CartItem[], deliveryFeeMinor = 0): CartTotals {
  const subtotalMinor = items.reduce((sum, item) => sum + item.unitPriceMinor * item.quantity, 0);
  const originalMinor = items.reduce((sum, item) => sum + item.originalPriceMinor * item.quantity, 0);
  const discountMinor = Math.max(0, originalMinor - subtotalMinor);
  return {
    subtotalMinor,
    discountMinor,
    deliveryFeeMinor,
    totalMinor: subtotalMinor + deliveryFeeMinor,
    savingsMinor: discountMinor,
  };
}

export function canCancelOrder(status: OrderStatus) {
  return status === "CONFIRMED" || status === "ACCEPTED" || status === "PREPARING";
}

export function nextOrderStatus(status: OrderStatus): OrderStatus {
  const next: Record<OrderStatus, OrderStatus> = {
    CONFIRMED: "ACCEPTED",
    ACCEPTED: "PREPARING",
    PREPARING: "OUT_FOR_DELIVERY",
    OUT_FOR_DELIVERY: "DELIVERED",
    DELIVERED: "DELIVERED",
    CANCELLED: "CANCELLED",
  };
  return next[status];
}
