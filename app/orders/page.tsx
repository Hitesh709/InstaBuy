"use client";

import { useState } from "react";
import { formatInr, type Money } from "../../lib/product-catalog";
import { canCancelOrder, type OrderStatus } from "../../lib/cart-ordering";
import "./orders.css";

const money = (minor: number): Money => ({ currency: "INR", minor });
const steps: { status: OrderStatus; label: string }[] = [
  { status: "CONFIRMED", label: "Confirmed" },
  { status: "ACCEPTED", label: "Accepted" },
  { status: "PREPARING", label: "Preparing" },
  { status: "OUT_FOR_DELIVERY", label: "On the way" },
  { status: "DELIVERED", label: "Delivered" },
];
const rank: Record<OrderStatus, number> = { CONFIRMED: 0, ACCEPTED: 1, PREPARING: 2, OUT_FOR_DELIVERY: 3, DELIVERED: 4, CANCELLED: -1 };

export default function OrdersPage() {
  const [status, setStatus] = useState<OrderStatus>("OUT_FOR_DELIVERY");
  const cancelled = status === "CANCELLED";
  return <main className="ordersShell"><header className="ordersHeader"><a href="/" className="brand">Insta<span>Buy</span></a><a href="/shop">Shop</a><a href="/account">Account</a></header><section className="ordersPage"><div className="ordersIntro"><div><p className="eyebrow">ORDER CENTRE</p><h1>Your orders, <span>all in one place.</span></h1></div><a href="/shop" className="shopButton">+ Shop member deals</a></div><article className="orderCard"><div className="orderHead"><div><small>ORDER NUMBER</small><h2>#IB-261002-1842</h2><p>Today · Green Basket + Daily Needs + Corner Mart</p></div><strong className={cancelled ? "cancelled" : "live"}>{cancelled ? "CANCELLED" : status.replaceAll("_", " ")}</strong></div>{cancelled ? <div className="cancelBanner">This order was cancelled before delivery.</div> : <div className="timeline">{steps.map((step) => <div className={rank[status] >= rank[step.status] ? "step done" : "step"} key={step.status}><span>{rank[status] >= rank[step.status] ? "✓" : ""}</span><small>{step.label}</small></div>)}</div>}<div className="orderBody"><div><h3>Delivery to Home</h3><p>Hitesh Kansara · Rajkot, Gujarat</p><div className="orderItems"><span>🥛 2 × Farm Fresh Milk</span><span>🍚 1 × Basmati Rice</span><span>☕ 2 × Cold Coffee</span></div></div><div className="orderMoney"><small>Total paid</small><strong>{formatInr(money(72500))}</strong><span>Saved {formatInr(money(14200))}</span></div></div><div className="orderActions">{!cancelled && <button className="track" onClick={() => setStatus((current) => current === "OUT_FOR_DELIVERY" ? "DELIVERED" : current === "CONFIRMED" ? "ACCEPTED" : current === "ACCEPTED" ? "PREPARING" : "OUT_FOR_DELIVERY")}>{status === "OUT_FOR_DELIVERY" ? "Mark delivered" : "Refresh tracking"}</button>}{!cancelled && canCancelOrder(status) && <button onClick={() => setStatus("CANCELLED")}>Cancel order</button>}<button>Get help</button></div></article><section className="history"><div className="historyHead"><h2>Order history</h2><span>Last 30 days</span></div><div className="historyRow"><div className="historyIcon">🛍️</div><div><b>#IB-260930-1077</b><p>Daily Needs · 4 items</p></div><strong>₹1,248</strong><span>Delivered</span></div><div className="historyRow"><div className="historyIcon">🥬</div><div><b>#IB-260927-0882</b><p>Green Basket · 6 items</p></div><strong>₹684</strong><span>Delivered</span></div></section></section></main>;
}
