"use client";

import { useEffect, useMemo, useState } from "react";
import { addCartItem, loadCart } from "../lib/client-store";

type Category = "All" | "Grocery" | "Fresh" | "Snacks" | "Personal Care";
type Product = {
  id: number;
  productId: string;
  name: string;
  store: string;
  storeId: string;
  category: Exclude<Category, "All">;
  price: number;
  memberPrice: number;
  eta: string;
  emoji: string;
  deal: string;
};

const products: Product[] = [
  { id: 1, productId: "P001", name: "Farm Fresh Milk 1L", store: "Green Basket", storeId: "S001", category: "Fresh", price: 68, memberPrice: 58, eta: "12 min", emoji: "🥛", deal: "15% member deal" },
  { id: 2, productId: "P002", name: "Premium Basmati Rice 5kg", store: "Daily Needs", storeId: "S002", category: "Grocery", price: 499, memberPrice: 424, eta: "18 min", emoji: "🍚", deal: "15% member deal" },
  { id: 3, productId: "P003", name: "Classic Potato Chips", store: "Corner Mart", storeId: "S003", category: "Snacks", price: 40, memberPrice: 34, eta: "9 min", emoji: "🥔", deal: "15% member deal" },
  { id: 4, productId: "P004", name: "Vitamin C Face Wash", store: "WellCare", storeId: "S004", category: "Personal Care", price: 299, memberPrice: 239, eta: "16 min", emoji: "🧴", deal: "20% member deal" },
  { id: 5, productId: "P005", name: "Fresh Bananas 1 Dozen", store: "Green Basket", storeId: "S001", category: "Fresh", price: 72, memberPrice: 61, eta: "12 min", emoji: "🍌", deal: "15% member deal" },
  { id: 6, productId: "P003", name: "Cold Coffee 250ml", store: "Corner Mart", storeId: "S003", category: "Snacks", price: 55, memberPrice: 44, eta: "9 min", emoji: "☕", deal: "20% member deal" },
  { id: 7, productId: "P006", name: "Organic Wheat Flour 5kg", store: "Daily Needs", storeId: "S002", category: "Grocery", price: 310, memberPrice: 279, eta: "18 min", emoji: "🌾", deal: "10% member deal" },
  { id: 8, productId: "P004", name: "Daily Care Shampoo", store: "WellCare", storeId: "S004", category: "Personal Care", price: 249, memberPrice: 199, eta: "16 min", emoji: "🫧", deal: "20% member deal" },
];

const categories: Category[] = ["All", "Grocery", "Fresh", "Snacks", "Personal Care"];

export default function Home() {
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [mode, setMode] = useState<"customer" | "merchant">("customer");
  const [showDeal, setShowDeal] = useState(false);
  const [dealPublished, setDealPublished] = useState(false);

  useEffect(() => {
    setCartCount(loadCart().reduce((total, item) => total + item.quantity, 0));
  }, []);

  const filtered = useMemo(
    () => products.filter((product) => {
      const categoryMatch = category === "All" || product.category === category;
      const queryMatch = `${product.name} ${product.store}`.toLowerCase().includes(query.toLowerCase());
      return categoryMatch && queryMatch;
    }),
    [category, query],
  );

  const savings = filtered.slice(0, 3).reduce((sum, product) => sum + product.price - product.memberPrice, 0);

  function addToCart(product: Product) {
    const items = addCartItem({
      id: `HOME-${product.productId}-${product.id}`,
      productId: product.productId,
      name: product.name,
      storeId: product.storeId,
      storeName: product.store,
      unitPriceMinor: product.memberPrice * 100,
      originalPriceMinor: product.price * 100,
      quantity: 1,
      maxQuantity: 10,
      emoji: product.emoji,
    });
    setCartCount(items.reduce((total, item) => total + item.quantity, 0));
  }

  return (
    <main className="shell">
      <header className="topbar">
        <a className="brand" href="/">
          <span className="brandMark">IB</span>
          <div><strong>InstaBuy</strong><small>Member commerce network</small></div>
        </a>
        <div className="location">⌖ <span>Rajkot</span><b>•</b><span>Delivery in 10–20 min</span></div>
        <div className="topActions">
          <a className="iconBtn" href="/deals">⚡</a>
          <a className="iconBtn cartBtn" href="/cart">🛒<span>{cartCount}</span></a>
          <a className="avatar" href="/account">HK</a>
        </div>
      </header>

      <div className="workspace">
        <aside className="sidebar">
          <div className="memberCard">
            <div className="memberTop"><span>InstaBuy Member</span><span className="verified">✓</span></div>
            <strong>Exclusive prices unlocked</strong>
            <p>Your eligible customer benefits are automatically applied.</p>
            <div className="memberStats">
              <span><b>₹{savings}</b><small>saved today</small></span>
              <span><b>8</b><small>active deals</small></span>
            </div>
          </div>
          <nav>
            <p className="navLabel">SHOP</p>
            <a className="navItem active" href="/">⌂ <span>Discover</span></a>
            <a className="navItem" href="/deals">⚡ <span>Flash Deals</span><em>8</em></a>
            <a className="navItem" href="/shop">♡ <span>Saved & Shop</span></a>
            <a className="navItem" href="/orders">◷ <span>Orders</span></a>
            <p className="navLabel">ACCOUNT</p>
            <a className="navItem" href="/account">♙ <span>My Benefits</span></a>
            <a className="navItem" href="/merchant">▣ <span>Partner Stores</span></a>
            <a className="navItem" href="/account">⚙ <span>Settings</span></a>
          </nav>
          <div className="switcher">
            <span>Viewing as</span>
            <div>
              <button onClick={() => setMode("customer")} className={mode === "customer" ? "selected" : ""}>Customer</button>
              <button onClick={() => setMode("merchant")} className={mode === "merchant" ? "selected" : ""}>Shop owner</button>
            </div>
          </div>
        </aside>

        <section className="content">
          <div className="hero">
            <div>
              <p className="eyebrow">YOUR NETWORK. YOUR DEALS.</p>
              <h1>Buy local.<br /><span>Save more.</span></h1>
              <p>Exclusive prices from partner stores, reserved for eligible InstaBuy members.</p>
              <div className="heroActions">
                <a className="primary" href="/shop">Shop member deals →</a>
                <a className="secondary" href="/deals">How it works</a>
              </div>
            </div>
            <div className="heroArt">
              <div className="orb orb1">%</div><div className="orb orb2">₹</div>
              <div className="phone">
                <div className="phoneHead">InstaBuy <span>•••</span></div>
                <div className="phoneDeal"><small>MEMBER FLASH</small><b>20% OFF</b><span>Across selected stores</span></div>
                <div className="phoneRow"><i>🥛</i><span>Fresh essentials</span><strong>₹58</strong></div>
                <div className="phoneRow"><i>🧴</i><span>Personal care</span><strong>₹199</strong></div>
              </div>
            </div>
          </div>

          {mode === "merchant" ? (
            <div className="merchantPanel">
              <div>
                <p className="eyebrow">PARTNER STORE CONSOLE</p>
                <h2>Turn your shop into a member deal engine.</h2>
                <p>Create a flash offer and publish it to eligible InstaBuy customers around your store.</p>
              </div>
              <button className="primary" onClick={() => setShowDeal(true)}>+ Flash a new deal</button>
              <div className="merchantMetrics">
                <span><b>428</b><small>eligible customers nearby</small></span>
                <span><b>18.4%</b><small>avg. offer redemption</small></span>
                <span><b>₹1.82L</b><small>member sales this month</small></span>
              </div>
              {dealPublished && <p className="eyebrow">✓ Deal published to the merchant workspace</p>}
            </div>
          ) : (
            <>
              <div className="sectionHead">
                <div><p className="eyebrow">PARTNER DEALS</p><h2>Fresh deals near you</h2></div>
                <a className="dealBadge" href="/deals">● LIVE MEMBER OFFERS →</a>
              </div>
              <div className="categories">
                {categories.map((item) => (
                  <button key={item} onClick={() => setCategory(item)} className={category === item ? "cat activeCat" : "cat"}>{item}</button>
                ))}
                <div className="search"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search products or stores" /></div>
              </div>
              <div className="grid" id="products">
                {filtered.map((product) => (
                  <article className="product" key={product.id}>
                    <div className="productVisual"><span>{product.emoji}</span><label>{product.deal}</label><button onClick={() => addToCart(product)}>♡</button></div>
                    <div className="productBody">
                      <div className="productStore">{product.store} <span>• {product.eta}</span></div>
                      <h3>{product.name}</h3>
                      <div className="price"><strong>₹{product.memberPrice}</strong><del>₹{product.price}</del><span>{Math.round((1 - product.memberPrice / product.price) * 100)}% OFF</span></div>
                      <button className="add" onClick={() => addToCart(product)}>Add to cart</button>
                    </div>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>

        <aside className="rightRail">
          <div className="cartCard">
            <div className="railTitle"><span>Your basket</span><b>{cartCount} items</b></div>
            <div className="empty">
              <div>🛍️</div>
              <strong>{cartCount ? `${cartCount} item${cartCount > 1 ? "s" : ""} saved` : "Nothing here yet"}</strong>
              <p>{cartCount ? "Your basket is ready for checkout." : "Add a member deal and your savings will appear here."}</p>
              {cartCount > 0 && <a className="primary checkout" href="/cart">Open cart →</a>}
            </div>
          </div>
          <div className="networkCard"><span className="networkIcon">✦</span><div><strong>Why InstaBuy?</strong><p>Stores you already trust become your source of member-only value.</p></div></div>
        </aside>
      </div>

      {showDeal && (
        <div className="modalBackdrop" onClick={() => setShowDeal(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <button className="close" onClick={() => setShowDeal(false)}>×</button>
            <p className="eyebrow">NEW FLASH DEAL</p>
            <h2>Publish an offer</h2>
            <p>It will be shown to eligible InstaBuy customers near your shop.</p>
            <label>Offer title<input defaultValue="Member Weekend Deal" /></label>
            <label>Discount %<input type="number" defaultValue="15" min="1" max="90" /></label>
            <label>Valid until<input type="datetime-local" /></label>
            <button className="primary" onClick={() => { setDealPublished(true); setShowDeal(false); }}>Publish deal →</button>
          </div>
        </div>
      )}
    </main>
  );
}
