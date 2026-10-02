import type { CartItem, Order, OrderStatus } from "./cart-ordering";

const CART_KEY = "instabuy.cart.v1";
const ORDERS_KEY = "instabuy.orders.v1";

export function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(CART_KEY) ?? "[]") as CartItem[]; } catch { return []; }
}

export function saveCart(items: CartItem[]) {
  if (typeof window !== "undefined") localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addCartItem(item: CartItem) {
  const items = loadCart();
  const existing = items.find((i) => i.productId === item.productId && i.storeId === item.storeId);
  if (existing) existing.quantity = Math.min(existing.maxQuantity, existing.quantity + item.quantity);
  else items.push(item);
  saveCart(items);
  return items;
}

export function loadOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY) ?? "[]") as Order[]; } catch { return []; }
}

export function saveOrders(orders: Order[]) {
  if (typeof window !== "undefined") localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export function createLocalOrder(items: CartItem[], totals: Order["totals"]): Order {
  const order: Order = {
    id: `ORD-${Date.now()}`,
    orderNumber: `#IB-${new Date().toISOString().slice(0,10).replaceAll("-", "")}-${String(Math.floor(Math.random() * 9000) + 1000)}`,
    customerId: "IB-CUST-0001",
    status: "CONFIRMED",
    items,
    totals,
    addressLabel: "Home",
    address: "Rajkot, Gujarat",
    createdAt: new Date().toISOString(),
  };
  saveOrders([order, ...loadOrders()]);
  saveCart([]);
  return order;
}

export function updateLocalOrderStatus(id: string, status: OrderStatus) {
  const orders = loadOrders().map((order) => order.id === id ? { ...order, status } : order);
  saveOrders(orders);
  return orders;
}
