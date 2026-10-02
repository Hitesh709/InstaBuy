"use client";

import { useMemo, useState } from "react";

type Category = "All" | "Grocery" | "Fresh" | "Snacks" | "Personal Care";

type Product = {
  id: number;
  name: string;
  store: string;
  category: Exclude<Category, "All">;
  price: number;
  memberPrice: number;
  eta: string;
  emoji: string;
  deal: string;
};

const products: Product[] = [
  { id: 1, name: "Farm Fresh Milk 1L", store: "Green Basket", category: "Fresh", price: 68, memberPrice: 58, eta: "12 min", emoji: "🥛", deal: "15% member deal" },
  { id: 2, name: "Premium Basmati Rice 5kg", store: "Daily Needs", category: "Grocery", price: 499, memberPrice: 424, eta: "18 min", emoji: "🍚", deal: "15% member deal" },
  { id: 3, name: "Classic Potato Chips", store: "Corner Mart", category: "Snacks", price: 40, memberPrice: 34, eta: "9 min", emoji: "🥔", deal: "15% member deal" },
  { id: 4, name: "Vitamin C Face Wash", store: "WellCare", category: "Personal Care", price: 299, memberPrice: 239, eta: "16 min", emoji: "🧴", deal: "20% member deal" },
  { id: 5, name: "Fresh Bananas 1 Dozen", store: "Green Basket", category: "Fresh", price: 72, memberPrice: 61, eta: "12 min", emoji: "🍌", deal: "15% member deal" },
  { id: 6, name: "Cold Coffee 250ml", store: "Corner Mart", category: "Snacks", price: 55, memberPrice: 44, eta: "9 min", emoji: "☕", deal: "20% member deal" },
  { id: 7, name: "Organic Wheat Flour 5kg", store: "Daily Needs", category: "Grocery", price: 310, memberPrice: 279, eta: "18 min", emoji: "🌾", deal: "10% member deal" },
  { id: 8, name: "Daily Care Shampoo", store: "WellCare", category: "Personal Care", price: 249, memberPrice: 199, eta: "16 min", emoji: "🫧", deal: "20% member deal" }
];

const categories: Category[] = ["All", "Grocery", "Fresh", "Snacks", "Personal Care"];

export default function Home() {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState<number[]>([]);
  const [mode, setMode] = useState<"customer" | "merchant">("customer");
  const [showDeal, setShowDeal] = useState(false);

  const filtered = useMemo(() => products.filter((p) => {
    const categoryMatch = category === "All" || p.category === category;
    const queryMatch = `${p.name} ${p.store}`.toLowerCase().includes(query.toLowerCase());
    return categoryMatch && queryMatch;
  }), [category, query]);

  const cartItems = products.filter((p) => cart.includes(p.id));
  const savings = cartItems.reduce((sum, p) => sum + (p.price - p.memberPrice), 0);
  const total = cartItems.reduce((sum, p) => sum + p.memberPrice, 0);

  const addToCart = (id: number) => setCart((current) => current.includes(id) ? current : [...current, id]);

  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand"><span className="brandMark">IB</span><div><strong>InstaBuy</strong><small>Member commerce network</small></div></div>
        <div className="location">⌖ <span>Rajkot</span><b>•</b><span>Delivery in 10–20 min</span></div>
        <div className="topActions"><button className="iconBtn">♡</button><button className="iconBtn cartBtn">🛒<span>{cart.length}</span></button><div className="avatar">HK</div></div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <div className="memberCard"><div className="memberTop"><span>InstaBuy Member</span><span className="verified">✓</span></div><strong>Exclusive prices unlocked</strong><p>Your eligible customer benefits are automatically applied.</p><div className="memberStats"><span><b>₹{savings}</b><small>saved today</small></span><span><b>8</b><small>active deals</small></span></div></div>
          <nav><p className="navLabel">SHOP</p><button className="navItem active">⌂ <span>Discover</span></button><button className="navItem">⚡ <span>Flash Deals</span><em>8</em></button><button className="navItem">♡ <span>Saved</span></button><button className="navItem">◷ <span>Orders</span></button><p className="navLabel">ACCOUNT</p><button className="navItem">♙ <span>My Benefits</span></button><button className="navItem">▣ <span>Partner Stores</span></button><button className="navItem">⚙ <span>Settings</span></button></nav>
          <div className="switcher"><span>Viewing as</span><div><button onClick={() => setMode("customer")} className={mode === "customer" ? "selected" : ""}>Customer</button><button onClick={() => setMode("merchant")} className={mode === "merchant" ? "selected" : ""}>Shop owner</button></div></div>
        </aside>

        <section className="content">
          <div className="hero"><div><p className="eyebrow">YOUR NETWORK. YOUR DEALS.</p><h1>Buy local.<br/><span>Save more.</span></h1><p>Exclusive prices from partner stores, reserved for eligible InstaBuy members.</p><div className="heroActions"><button className="primary" onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}>Shop member deals →</button><button className="secondary">How it works</button></div></div><div className="heroArt"><div className="orb orb1">%</div><div className="orb orb2">₹</div><div className="phone"><div className="phoneHead">InstaBuy <span>•••</span></div><div className="phoneDeal"><small>MEMBER FLASH</small><b>20% OFF</b><span>Across selected stores</span></div><div className="phoneRow"><i>🥛</i><span>Fresh essentials</span><strong>₹58</strong></div><div className="phoneRow"><i>🧴</i><span>Personal care</span><strong>₹199</strong></div></div></div></div>

          {mode === "merchant" ? <div className="merchantPanel"><div><p className="eyebrow">PARTNER STORE CONSOLE</p><h2>Turn your shop into a member deal engine.</h2><p>Create a flash offer and publish it to eligible InstaBuy customers around your store.</p></div><button className="primary" onClick={() => setShowDeal(true)}>+ Flash a new deal</button><div className="merchantMetrics"><span><b>428</b><small>eligible customers nearby</small></span><span><b>18.4%</b><small>avg. offer redemption</small></span><span><b>₹1.82L</b><small>member sales this month</small></span></div></div> : <><div className="sectionHead"><div><p className="eyebrow">PARTNER DEALS</p><h2>Fresh deals near you</h2></div><div className="dealBadge">● LIVE MEMBER OFFERS</div></div><div className="categories">{categories.map((c) => <button key={c} onClick={() => setCategory(c)} className={category === c ? "cat activeCat" : "cat"}>{c}</button>)}<div className="search"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products or stores"/></div></div><div className="grid" id="products">{filtered.map((p) => <article className="product" key={p.id}><div className="productVisual"><span>{p.emoji}</span><label>{p.deal}</label><button>♡</button></div><div className="productBody"><div className="productStore">{p.store} <span>• {p.eta}</span></div><h3>{p.name}</h3><div className="price"><strong>₹{p.memberPrice}</strong><del>₹{p.price}</del><span>{Math.round((1 - p.memberPrice / p.price) * 100)}% OFF</span></div><button className="add" onClick={() => addToCart(p.id)}>{cart.includes(p.id) ? "✓ Added to cart" : "Add to cart"}</button></div></article>)}</div></>}
        </section>

        <aside className="rightRail"><div className="cartCard"><div className="railTitle"><span>Your basket</span><b>{cart.length} items</b></div>{cartItems.length === 0 ? <div className="empty"><div>🛍️</div><strong>Nothing here yet</strong><p>Add a member deal and your savings will appear here.</p></div> : <>{cartItems.map((p) => <div className="miniItem" key={p.id}><span>{p.emoji}</span><div><b>{p.name}</b><small>₹{p.memberPrice}</small></div></div>)}<div className="savingLine"><span>Member savings</span><strong>₹{savings}</strong></div><div className="total"><span>Total</span><b>₹{total}</b></div><button className="primary checkout">Checkout →</button></>}</div><div className="networkCard"><span className="networkIcon">✦</span><div><strong>Why InstaBuy?</strong><p>Stores you already trust become your source of member-only value.</p></div></div></aside>
      </div>

      {showDeal && <div className="modalBackdrop" onClick={() => setShowDeal(false)}><div className="modal" onClick={(e) => e.stopPropagation()}><button className="close" onClick={() => setShowDeal(false)}>×</button><p className="eyebrow">NEW FLASH DEAL</p><h2>Publish an offer</h2><p>It will be shown to eligible InstaBuy customers near your shop.</p><label>Offer title<input defaultValue="Member Weekend Deal"/></label><label>Discount %<input type="number" defaultValue="15" min="1" max="90"/></label><label>Valid until<input type="datetime-local"/></label><button className="primary" onClick={() => setShowDeal(false)}>Publish deal →</button></div></div>}
    </main>
  );
}
