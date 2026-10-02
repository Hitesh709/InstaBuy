"use client";

import { useMemo, useState } from "react";
import { formatMinorInr } from "../../lib/payments-financial";
import "./finance.css";

const transactions = [
  { id: "IB-10482", merchant: "Green Basket", method: "ONLINE", status: "CAPTURED", gross: 129900, discount: 18000, commission: 3248, settlement: 106652 },
  { id: "IB-10481", merchant: "Daily Needs", method: "COD", status: "PENDING", gross: 61900, discount: 7000, commission: 1548, settlement: 53352 },
  { id: "IB-10480", merchant: "WellCare", method: "ONLINE", status: "PARTIALLY_REFUNDED", gross: 28900, discount: 6000, commission: 722, settlement: 22178 },
  { id: "IB-10479", merchant: "Corner Mart", method: "ONLINE", status: "CAPTURED", gross: 6990, discount: 1510, commission: 175, settlement: 5305 },
];

const reports = [
  ["Gross merchandise value", "₹18.42L", "+12.8%"],
  ["Customer savings", "₹2.31L", "+18.4%"],
  ["InstaBuy commission", "₹46.2K", "+10.1%"],
  ["Merchant settlement due", "₹15.08L", "18 merchants"],
];

export default function FinancePage() {
  const [filter, setFilter] = useState("ALL");
  const filtered = useMemo(() => filter === "ALL" ? transactions : transactions.filter((item) => item.status === filter), [filter]);

  return (
    <main className="finance-shell">
      <header className="finance-header">
        <div>
          <span className="eyebrow">INSTABUY FINANCE</span>
          <h1>Payments & financial command center</h1>
          <p>One operational view for payments, savings, commission, settlements and reconciliation.</p>
        </div>
        <div className="finance-actions"><button className="secondary">Export report</button><button className="primary">Run reconciliation</button></div>
      </header>

      <section className="metric-grid">
        {reports.map(([label, value, detail]) => <article className="metric-card" key={label}><span>{label}</span><strong>{value}</strong><small>{detail}</small></article>)}
      </section>

      <section className="finance-grid">
        <article className="panel ledger-panel">
          <div className="panel-heading"><div><span className="eyebrow">LIVE LEDGER</span><h2>Recent transactions</h2></div><select value={filter} onChange={(event) => setFilter(event.target.value)}><option>ALL</option><option>CAPTURED</option><option>PENDING</option><option>PARTIALLY_REFUNDED</option></select></div>
          <div className="table-wrap"><table><thead><tr><th>Order</th><th>Merchant</th><th>Payment</th><th>Gross</th><th>Saving</th><th>Commission</th><th>Settlement</th></tr></thead><tbody>{filtered.map((item) => <tr key={item.id}><td><strong>{item.id}</strong></td><td>{item.merchant}</td><td><span className={`status ${item.status.toLowerCase()}`}>{item.method} · {item.status}</span></td><td>{formatMinorInr(item.gross)}</td><td>{formatMinorInr(item.discount)}</td><td>{formatMinorInr(item.commission)}</td><td><strong>{formatMinorInr(item.settlement)}</strong></td></tr>)}</tbody></table></div>
        </article>

        <aside className="panel reconciliation-panel">
          <span className="eyebrow">CONTROL CENTER</span><h2>Reconciliation</h2><div className="recon-score"><strong>99.7%</strong><span>matched</span></div>
          <div className="recon-row"><span>Orders vs payments</span><b>1,248 / 1,248</b></div>
          <div className="recon-row"><span>Ledger entries</span><b>3,744</b></div>
          <div className="recon-row"><span>Exceptions</span><b className="warning">4 pending</b></div>
          <button className="wide-button">Review exceptions</button>
        </aside>
      </section>

      <section className="finance-grid lower-grid">
        <article className="panel breakdown-panel"><span className="eyebrow">MONEY FLOW</span><h2>Today's financial split</h2><div className="flow"><div><span>Customer paid</span><strong>₹1,84,220</strong></div><div><span>Member savings</span><strong>₹23,100</strong></div><div><span>Commission</span><strong>₹4,620</strong></div><div><span>Merchant payable</span><strong>₹1,50,800</strong></div></div></article>
        <article className="panel settlement-panel"><span className="eyebrow">SETTLEMENTS</span><h2>Merchant payout queue</h2><div className="settlement-line"><span>Ready to settle</span><strong>12</strong></div><div className="settlement-line"><span>Processing</span><strong>4</strong></div><div className="settlement-line"><span>On hold</span><strong>2</strong></div><button className="wide-button">Open settlement ledger</button></article>
      </section>
    </main>
  );
}
