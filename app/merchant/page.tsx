"use client";

import { useState } from "react";
import { canPublishLiveOffers, type MerchantLifecycle } from "../../lib/merchant-network";

const stores = [
  { name: "Green Basket — Main Store", location: "Rajkot", status: "OPEN", radius: "5 km", sales: "₹1.82L" },
  { name: "Green Basket — West", location: "Rajkot", status: "OPEN", radius: "4 km", sales: "₹94K" },
];

export default function MerchantPage() {
  const [lifecycle] = useState<MerchantLifecycle>("APPROVED");
  const approved = canPublishLiveOffers(lifecycle);

  return (
    <main className="merchantShell">
      <header className="merchantHeader">
        <a href="/" className="backLink">← InstaBuy</a>
        <span className="accountPill">Partner console</span>
        <div className="merchantHeaderRight"><span className="approvalPill">✓ {lifecycle}</span><div className="avatar">GB</div></div>
      </header>
      <section className="merchantHero">
        <div><p className="eyebrow">PARTNER NETWORK</p><h1>Green Basket</h1><p>Manage stores, customer reach, offers and operational performance from one merchant workspace.</p></div>
        <div className="merchantTrust"><span>✓</span><div><strong>Verified partner</strong><small>KYC approved · 2 active stores</small></div></div>
      </section>
      <section className="merchantKpis"><div><small>Member sales</small><strong>₹2.76L</strong><span>+18.4% this month</span></div><div><small>Orders</small><strong>428</strong><span>96.2% completed</span></div><div><small>Deal redemptions</small><strong>184</strong><span>14.8% redemption rate</span></div><div><small>Nearby members</small><strong>2,840</strong><span>Eligible customer reach</span></div></section>
      <div className="merchantGrid">
        <section className="merchantPanelLarge"><div className="panelHeading"><div><p className="eyebrow">STORES</p><h2>Your locations</h2></div><button className="primary">+ Add store</button></div><div className="storeList">{stores.map((store) => <article className="storeRow" key={store.name}><div className="storeIcon">⌂</div><div className="storeMain"><strong>{store.name}</strong><small>{store.location} · {store.radius} delivery radius</small></div><span className="openPill">● {store.status}</span><div className="storeSales"><small>Member sales</small><b>{store.sales}</b></div><button className="secondary">Manage</button></article>)}</div></section>
        <section className="merchantPanelLarge"><div className="panelHeading"><div><p className="eyebrow">VERIFICATION</p><h2>Partner status</h2></div><span className="verifiedLarge">✓ Verified</span></div><div className="verificationSteps"><div><i>✓</i><span><strong>Business registration</strong><small>Completed</small></span></div><div><i>✓</i><span><strong>KYC verification</strong><small>Verified</small></span></div><div><i>✓</i><span><strong>Store approval</strong><small>2 locations approved</small></span></div></div></section>
        <section className="merchantPanelLarge full"><div className="panelHeading"><div><p className="eyebrow">DEAL ENGINE</p><h2>Reach eligible customers</h2><p className="panelCopy">Publish member-only offers once your partner account is approved.</p></div><button className={approved ? "primary" : "secondary"} disabled={!approved}>{approved ? "+ Create member deal" : "Approval required"}</button></div><div className="dealStrip"><div><span>⚡</span><div><strong>15% member offer</strong><small>Active · All eligible customers · Green Basket</small></div></div><div><span>₹</span><div><strong>₹38,420 member savings</strong><small>Value delivered through current offers</small></div></div><div><span>◷</span><div><strong>7 days remaining</strong><small>Offer expires Sunday</small></div></div></div></section>
      </div>
    </main>
  );
}
