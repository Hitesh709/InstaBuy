import { formatInr, type Money } from "../../lib/product-catalog";
import { resolveBestDeal, type DealRule } from "../../lib/deal-engine";
import "./deals.css";

const deals: DealRule[] = [
  { id: "D001", merchantId: "M001", storeId: "S001", name: "Fresh Essentials", type: "PERCENTAGE", target: "STORE", targetIds: [], percentage: 15, maximumDiscountMinor: 50000, startsAt: "2026-10-01T00:00:00+05:30", endsAt: "2026-10-09T23:59:59+05:30", timezone: "Asia/Kolkata", exclusive: true, status: "ACTIVE" },
  { id: "D002", merchantId: "M002", storeId: "S002", name: "Rice Member Price", type: "FLAT", target: "PRODUCT", targetIds: ["V002"], valueMinor: 7000, minimumOrderMinor: 30000, startsAt: "2026-10-01T00:00:00+05:30", endsAt: "2026-10-15T23:59:59+05:30", timezone: "Asia/Kolkata", exclusive: true, status: "ACTIVE" },
  { id: "D003", merchantId: "M003", storeId: "S003", name: "Beverage Hour", type: "PERCENTAGE", target: "CATEGORY", targetIds: ["beverages"], percentage: 20, maximumDiscountMinor: 30000, minimumOrderMinor: 10000, startsAt: "2026-10-02T00:00:00+05:30", endsAt: "2026-10-05T23:59:59+05:30", timezone: "Asia/Kolkata", exclusive: false, status: "ACTIVE" },
];

const cards = [
  { deal: deals[0], store: "Green Basket", target: "Store-wide", icon: "⚡", price: 29900, category: "Daily essentials" },
  { deal: deals[1], store: "Daily Needs", target: "Basmati Rice · 5 kg", icon: "🍚", price: 68900, category: "Groceries" },
  { deal: deals[2], store: "Corner Mart", target: "Beverages", icon: "☕", price: 8500, category: "Beverages" },
];

const money = (minor: number): Money => ({ currency: "INR", minor });

export default function DealsPage() {
  const now = new Date("2026-10-02T12:00:00+05:30");
  return <main className="dealsShell">
    <header className="dealsHeader"><a href="/" className="backLink">← InstaBuy</a><span className="accountPill">Member deals</span><div className="avatar">IB</div></header>
    <section className="dealsHero"><div><p className="eyebrow">DEAL ENGINE</p><h1>Exclusive prices,<br /><span>calculated for members.</span></h1><p>Every offer is evaluated against your membership, the store, product, cart conditions and the offer's validity window.</p></div><div className="dealEngineCard"><span>✓</span><strong>Eligibility verified</strong><small>Member pricing is active</small><div><b>₹1,240</b><small>saved to date</small></div></div></section>
    <section className="ruleFlow"><span>Customer eligibility</span><i>→</i><span>Membership</span><i>→</i><span>Store + SKU</span><i>→</i><span>Deal rules</span><i>→</i><strong>Final member price</strong></section>
    <section className="dealGrid">{cards.map(({ deal, store, target, icon, price, category }) => { const result = resolveBestDeal([deal], { customerEligible: true, membershipActive: true, storeId: deal.storeId, variantId: deal.targetIds[0] ?? "V001", categoryId: category.toLowerCase().replace(" ", "-"), cartSubtotalMinor: price, unitPriceMinor: price, now }); return <article className="dealCard" key={deal.id}><div className="dealVisual"><span>{icon}</span><label>{deal.type === "PERCENTAGE" ? `${deal.percentage}% OFF` : `${formatInr(money(deal.valueMinor ?? 0))} OFF`}</label><small>ACTIVE</small></div><div className="dealBody"><div className="dealMeta"><span>{store}</span><b>{target}</b></div><h2>{deal.name}</h2><p>{deal.type === "PERCENTAGE" ? `Save ${deal.percentage}% on eligible purchases.` : `Save ${formatInr(money(deal.valueMinor ?? 0))} on the qualifying item.`}</p><div className="dealPrice"><div><small>Member price</small><strong>{formatInr(money(result.finalMinor))}</strong></div><div><small>You save</small><b>−{formatInr(money(result.discountMinor))}</b></div></div><div className="dealConditions"><span>Min. order {formatInr(money(deal.minimumOrderMinor ?? 0))}</span><span>Until {new Date(deal.endsAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short" })}</span></div></div></article>})}</section>
  </main>;
}
