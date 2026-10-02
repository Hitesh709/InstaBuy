"use client";

import { useEffect, useMemo, useState } from "react";
import { formatInr, type Money } from "../../lib/product-catalog";
import { memberSavingsPercent, matchesShoppingFilters, savingsMinor, type ShoppingProduct } from "../../lib/customer-shopping";
import { addCartItem, loadCart } from "../../lib/client-store";
import type { CartItem } from "../../lib/cart-ordering";
import "./shop.css";

const products: ShoppingProduct[] = [
  { id: "P001", name: "Farm Fresh Milk", brand: "Green Basket", category: "Dairy", categoryId: "dairy", storeId: "S001", storeName: "Green Basket", city: "Rajkot", unit: "500 ml", image: "🥛", originalPriceMinor: 3200, memberPriceMinor: 2790, availableQuantity: 24, etaMinutes: 18, tags: ["fresh", "milk", "breakfast"], flashDeal: { label: "Morning deal", endsAt: "2026-10-02T18:00:00+05:30" } },
  { id: "P002", name: "Basmati Rice", brand: "Daily Needs", category: "Groceries", categoryId: "groceries", storeId: "S002", storeName: "Daily Needs", city: "Rajkot", unit: "5 kg", image: "🍚", originalPriceMinor: 68900, memberPriceMinor: 61900, availableQuantity: 12, etaMinutes: 26, tags: ["rice", "staples", "basmati"] },
  { id: "P003", name: "Cold Coffee", brand: "Corner Mart", category: "Beverages", categoryId: "beverages", storeId: "S003", storeName: "Corner Mart", city: "Rajkot", unit: "300 ml", image: "☕", originalPriceMinor: 8500, memberPriceMinor: 6800, availableQuantity: 31, etaMinutes: 15, tags: ["coffee", "drink", "cold"], flashDeal: { label: "Flash deal", endsAt: "2026-10-02T20:30:00+05:30" } },
  { id: "P004", name: "Vitamin C Face Wash", brand: "WellCare", category: "Personal Care", categoryId: "personal-care", storeId: "S004", storeName: "WellCare", city: "Rajkot", unit: "100 ml", image: "🧴", originalPriceMinor: 34900, memberPriceMinor: 28900, availableQuantity: 8, etaMinutes: 32, tags: ["skincare", "face wash", "vitamin c"] },
  { id: "P005", name: "Premium Wheat Flour", brand: "Daily Needs", category: "Groceries", categoryId: "groceries", storeId: "S002", storeName: "Daily Needs", city: "Rajkot", unit: "5 kg", image: "🌾", originalPriceMinor: 29900, memberPriceMinor: 24900, availableQuantity: 18, etaMinutes: 25, tags: ["atta", "flour", "staples"] },
  { id: "P006", name: "Bananas", brand: "Green Basket", category: "Fresh Produce", categoryId: "produce", storeId: "S001", storeName: "Green Basket", city: "Rajkot", unit: "6 pcs", image: "🍌", originalPriceMinor: 4800, memberPriceMinor: 3990, availableQuantity: 40, etaMinutes: 18, tags: ["fruit", "fresh", "banana"] },
];

const money = (minor: number): Money => ({ currency: "INR", minor });
const categories = [{ id: "", label: "All" }, { id: "groceries", label: "Groceries" }, { id: "dairy", label: "Dairy" }, { id: "beverages", label: "Beverages" }, { id: "produce", label: "Fresh Produce" }, { id: "personal-care", label: "Personal Care" }];

export default function ShopPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [flashOnly, setFlashOnly] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(["P004"]);
  const [selected, setSelected] = useState<ShoppingProduct | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => setCartCount(loadCart().reduce((n, item) => n + item.quantity, 0)), []);

  const visible = useMemo(() => products.filter((product) => matchesShoppingFilters(product, { query, category, flashOnly })), [query, category, flashOnly]);

  function addToCart(product: ShoppingProduct) {
    const item: CartItem = { id: `CI-${product.id}`, productId: product.id, name: product.name, storeId: product.storeId, storeName: product.storeName, unitPriceMinor: product.memberPriceMinor, originalPriceMinor: product.originalPriceMinor, quantity: 1, maxQuantity: product.availableQuantity, emoji: product.image };
    const next = addCartItem(item);
    setCartCount(next.reduce((n, i) => n + i.quantity, 0));
    setAddedId(product.id);
    setSelected(null);
    window.setTimeout(() => setAddedId(null), 1200);
  }

  return <main className="shopShell">
    <header className="shopHeader"><a href="/" className="brand">Insta<span>Buy</span></a><div className="location"><small>DELIVER TO</small><strong>Rajkot, Gujarat⌄</strong></div><div className="shopSearch"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, brands or categories" /></div><a className="account" href="/account">Hitesh <span>IB</span></a><a className="account" href="/cart" aria-label="Cart">🛒 {cartCount}</a></header>
    <div className="shopLayout"><aside className="shopSide"><div className="memberCard"><small>MEMBER PRICING</small><strong>You're eligible</strong><p>Exclusive prices are automatically applied.</p><b>₹1,240 saved</b></div><h4>Browse</h4><nav>{categories.map((item) => <button key={item.id} className={category === item.id ? "active" : ""} onClick={() => setCategory(item.id)}>{item.label}</button>)}</nav><button className={flashOnly ? "flash active" : "flash"} onClick={() => setFlashOnly(!flashOnly)}>⚡ Flash deals</button><a href="/deals" className="sideDeals">View all deals →</a></aside>
      <section className="shopMain"><div className="shopTop"><div><p className="eyebrow">MEMBER MARKETPLACE</p><h1>Shop local. <span>Save more.</span></h1><p>{visible.length} products from verified partner stores near you.</p></div><div className="deliveryPill">● <b>Fast delivery</b><small>15–35 min</small></div></div><div className="chipRow">{categories.map((item) => <button key={item.id} className={category === item.id ? "selected" : ""} onClick={() => setCategory(item.id)}>{item.label}</button>)}<button className={flashOnly ? "selected" : ""} onClick={() => setFlashOnly(!flashOnly)}>⚡ Flash deals</button></div>
        <div className="productGrid">{visible.map((product) => { const save = savingsMinor(product); const wish = wishlist.includes(product.id); return <article className="productCard" key={product.id}><div className="productImage"><span>{product.image}</span><button aria-label="wishlist" onClick={() => setWishlist((list) => wish ? list.filter((id) => id !== product.id) : [...list, product.id])}>{wish ? "♥" : "♡"}</button>{product.flashDeal && <label>⚡ FLASH</label>}</div><div className="productBody"><div className="storeLine"><span>{product.storeName}</span><b>• {product.etaMinutes} min</b></div><h2>{product.name}</h2><p>{product.brand} · {product.unit}</p><div className="prices"><strong>{formatInr(money(product.memberPriceMinor))}</strong><del>{formatInr(money(product.originalPriceMinor))}</del><em>Save {memberSavingsPercent(product)}%</em></div><div className="cardFoot"><small>{product.availableQuantity} available · Save {formatInr(money(save))}</small><button onClick={() => addToCart(product)}>{addedId === product.id ? "✓ Added" : "Add to cart"}</button><button onClick={() => setSelected(product)}>View</button></div></div></article>})}</div></section></div>
    {selected && <div className="modalBackdrop" onClick={() => setSelected(null)}><div className="productModal" onClick={(e) => e.stopPropagation()}><button className="close" onClick={() => setSelected(null)}>×</button><div className="modalIcon">{selected.image}</div><p className="eyebrow">{selected.storeName} · {selected.etaMinutes} min</p><h2>{selected.name}</h2><p>{selected.brand} · {selected.unit}</p><div className="modalPrice"><strong>{formatInr(money(selected.memberPriceMinor))}</strong><del>{formatInr(money(selected.originalPriceMinor))}</del><b>Save {formatInr(money(savingsMinor(selected)))}</b></div><div className="modalInfo"><span>✓ Member eligible price</span><span>✓ {selected.availableQuantity} units in stock</span><span>✓ Delivered in {selected.etaMinutes} minutes</span></div><button className="primary" onClick={() => addToCart(selected)}>Add to cart →</button></div></div>}
  </main>;
}
