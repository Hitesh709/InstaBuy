"use client";

import { useState } from "react";
import "./operations.css";

const orders = [
  ["IB-10482", "Green Basket", "OUT_FOR_DELIVERY", "12 min", "ON TIME"],
  ["IB-10481", "Daily Needs", "PREPARING", "24 min", "ON TIME"],
  ["IB-10480", "WellCare", "DELIVERED", "—", "COMPLETED"],
  ["IB-10479", "Corner Mart", "CONFIRMED", "31 min", "PAYMENT VERIFIED"],
];

const tickets = [
  ["SUP-2041", "Refund request", "HIGH", "OPEN"],
  ["SUP-2038", "Delivery delay", "NORMAL", "IN_PROGRESS"],
  ["SUP-2035", "Address change", "LOW", "TRIAGED"],
];

export default function OperationsPage() {
  const [view, setView] = useState("OPERATIONS");
  return (
    <main className="ops-shell">
      <header className="ops-header">
        <div><span className="eyebrow">INSTABUY OPERATIONS</span><h1>Command center</h1><p>Orders, fulfillment, support, risk and platform health in one operational view.</p></div>
        <div className="ops-switch"><button className={view === "OPERATIONS" ? "active" : ""} onClick={() => setView("OPERATIONS")}>Operations</button><button className={view === "ANALYTICS" ? "active" : ""} onClick={() => setView("ANALYTICS")}>Intelligence</button></div>
      </header>

      <section className="ops-metrics">
        <div><span>Live orders</span><strong>128</strong><small>+8.4% today</small></div><div><span>On-time fulfillment</span><strong>96.8%</strong><small>Target ≥ 95%</small></div><div><span>Support open</span><strong>18</strong><small>4 high priority</small></div><div><span>Risk review</span><strong>7</strong><small>2 urgent signals</small></div><div><span>GMV today</span><strong>₹1.84L</strong><small>+12.8%</small></div>
      </section>

      {view === "OPERATIONS" ? <>
        <section className="ops-grid">
          <article className="ops-panel wide"><div className="panel-head"><div><span className="eyebrow">FULFILLMENT</span><h2>Live order control</h2></div><button>View all</button></div><div className="order-list">{orders.map(([id, merchant, status, eta, health]) => <div className="order-row" key={id}><div><strong>{id}</strong><span>{merchant}</span></div><b>{status.replaceAll("_", " ")}</b><span>{eta}</span><em>{health}</em><button>Open</button></div>)}</div></article>
          <aside className="ops-panel"><span className="eyebrow">RISK ENGINE</span><h2>Risk queue</h2><div className="risk-score"><strong>7</strong><span>signals requiring review</span></div><div className="mini-line"><span>Coupon abuse</span><b>3</b></div><div className="mini-line"><span>Payment pattern</span><b>2</b></div><div className="mini-line"><span>Velocity anomaly</span><b>2</b></div><button className="dark-button">Review queue</button></aside>
        </section>
        <section className="ops-grid lower"><article className="ops-panel"><div className="panel-head"><div><span className="eyebrow">CUSTOMER SUPPORT</span><h2>Priority tickets</h2></div><button>Open inbox</button></div>{tickets.map(([id, category, priority, status]) => <div className="ticket" key={id}><div><strong>{id}</strong><span>{category}</span></div><b className={priority.toLowerCase()}>{priority}</b><span>{status.replaceAll("_", " ")}</span></div>)}</article><article className="ops-panel"><span className="eyebrow">PLATFORM HEALTH</span><h2>Service readiness</h2><div className="health"><span>Orders</span><b>Healthy</b></div><div className="health"><span>Payments</span><b>Healthy</b></div><div className="health"><span>Notifications</span><b>Healthy</b></div><div className="health"><span>Settlement</span><b>Healthy</b></div><button className="dark-button">Open diagnostics</button></article></section>
      </> : <section className="ops-panel analytics"><span className="eyebrow">PLATFORM INTELLIGENCE</span><h2>KPI cockpit</h2><div className="analytics-grid"><div><span>Customer repeat rate</span><strong>42.6%</strong></div><div><span>Merchant active stores</span><strong>286</strong></div><div><span>Average order value</span><strong>₹684</strong></div><div><span>Customer savings / order</span><strong>₹92</strong></div><div><span>Refund rate</span><strong>1.7%</strong></div><div><span>Delivery SLA</span><strong>96.8%</strong></div></div></section>}
    </main>
  );
}
