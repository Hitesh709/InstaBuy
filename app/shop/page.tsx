"use client";

import { useEffect, useMemo, useState } from "react";
import { formatInr, type Money } from "../../lib/product-catalog";
import { memberSavingsPercent, matchesShoppingFilters, savingsMinor, type ShoppingProduct } from "../../lib/customer-shopping";
import { addCartItem, loadCart } from "../../lib/client-store";
import type { CartItem } from "../../lib/cart-ordering";
import { instamartCatalog } from "../../lib/instamart-catalog";
import "./shop.css";

const money = (minor: number): Money => ({ currency: "INR", minor });
const storeNames = ["Green Basket", "Daily Needs", "Corner Mart", "WellCare", "Fresh Hub", "Family Store", "Quick Basket", "City Mart"];
const storeIds = ["S001", "S002", "S003", "S004", "S005", "S006", "S007", "S008"];
const categoryIcons: Record<string, string> = {
  "fresh-vegetables": "🥦", "fresh-fruits": "🍎", "dairy-bread-eggs": "🥛", "rice-atta-dals": "🍚", "masalas-dry-fruits": "🌶️", "oils-ghee": "🫙", munchies: "🍿", "sweet-tooth": "🍫", "cold-drinks-juices": "🥤", "biscuits-cakes": "🍪", "instant-frozen": "🍜", "meat-seafood": "🍗", "cereals-breakfast": "🥣", "sauces-spreads": "🥫", "tea-coffee": "☕", "cleaning-essentials": "🧹", "pharma-hygiene": "🧴", "bath-body-hair": "🧼", "home-kitchen": "🍳", "office-stationery": "✏️", "baby-care": "🍼", "pet-supplies": "🐾", "beauty-grooming": "💄", electronics: "🎧", "home-appliances": "⚡", "toys-games": "🧸", "books-reading": "📚", "fashion-accessories": "👕", "paan-corner": "🌿", "festivals-gifting": "🎁"
};

const units = ["1 pc", "250 g", "500 g", "1 kg", "500 ml", "1 L", "pack", "box"];
const products: ShoppingProduct[] = instamartCatalog.flatMap((category, categoryIndex) =>
  category.products.map((name, productIndex) => {
    const storeIndex = (categoryIndex + productIndex) % storeNames.length;
    const originalPriceMinor = 1500 + (((categoryIndex + 3) * 791 + (productIndex + 5) * 613) % 850) * 100;
    const discountPercent = 8 + ((categoryIndex * 3 + productIndex) % 18);
    const memberPriceMinor = Math.max(500, Math.round(originalPriceMinor * (100 - discountPercent) / 100));
    const id = `CAT-${category.id}-${String(productIndex + 1).padStart(3, "0")}`;
    return {
      id,
      name,
      brand: storeNames[storeIndex],
      category: category.name,
      categoryId: category.id,
      storeId: storeIds[storeIndex],
      storeName: storeNames[storeIndex],
      city: "Rajkot",
      unit: units[(categoryIndex + productIndex) % units.length],
      image: categoryIcons[category.id] ?? "🛍️",
      originalPriceMinor,
      memberPriceMinor,
      availableQuantity: 8 + ((categoryIndex * 17 + productIndex * 7) % 72),
      etaMinutes: 15 + ((categoryIndex * 5 + productIndex * 3) % 22),
      tags: [category.name, ...category.subcategories.slice(0, 2), name],
      ...(productIndex % 13 === 0 ? { flashDeal: { label: "Flash deal", endsAt: "2026-10-02T23:59:00+05:30" } } : {})
    };
  })
);

const categories = [{ id: "", label: "All", count: products.length }, ...instamartCatalog.map((item) => ({ id: item.id, label: item.name, count: item.products.length }))];

export default function ShopPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [flashOnly, setFlashOnly] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selected, setSelected] = useState<ShoppingProduct | null>(null);
  const [cartCount, setCartCount] = useState(0);
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => setCartCount(loadCart().reduce((n, item) => n + item.quantity, 0)), []);

  const activeCategory = instamartCatalog.find((item) => item.id === category);
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
    <header className="shopHeader">
      <a href="/" className="brand">Insta<span>Buy</span></a>
      <div className="location"><small>DELIVER TO</small><strong>Rajkot, Gujarat⌄</strong></div>
      <div className="shopSearch"><span>⌕</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search products, brands or categories" /></div>
      <a className="account" href="/account">Hitesh <span>IB</span></a>
      <a className="account" href="/cart" aria-label="Cart">🛒 {cartCount}</a>
    </header>
    <div className="shopLayout">
      <aside className="shopSide">
        <div className="memberCard"><small>MEMBER PRICING</small><strong>You're eligible</strong><p>Exclusive prices are automatically applied.</p><b>₹1,240 saved</b></div>
        <h4>Browse · {products.length} items</h4>
        <nav>{categories.map((item) => <button key={item.id} className={category === item.id ? "active" : ""} onClick={() => setCategory(item.id)}>{item.label}<span>{item.count}</span></button>)}</nav>
        <button className={flashOnly ? "flash active" : "flash"} onClick={() => setFlashOnly(!flashOnly)}>⚡ Flash deals</button>
        <a href="/deals" className="sideDeals">View all deals →</a>
      </aside>
      <section className="shopMain">
        <div className="shopTop">
          <div><p className="eyebrow">MEMBER MARKETPLACE · FULL CATALOG</p><h1>Shop local. <span>Save more.</span></h1><p>{visible.length} items {activeCategory ? `in ${activeCategory.name}` : "across every category"} from verified partner stores.</p></div>
          <div className="deliveryPill">● <b>Fast delivery</b><small>15–35 min</small></div>
        </div>
        <div className="chipRow">{categories.map((item) => <button key={item.id} className={category === item.id ? "selected" : ""} onClick={() => setCategory(item.id)}>{item.label} · {item.count}</button>)}<button className={flashOnly ? "selected" : ""} onClick={() => setFlashOnly(!flashOnly)}>⚡ Flash deals</button></div>
        {activeCategory && <div className="subCategoryRow">{activeCategory.subcategories.map((sub) => <span key={sub}>{sub}</span>)}</div>}
        <div className="catalogNotice"><strong>{products.length}+ products loaded</strong><span>Category-wise assortment · member prices · partner-store availability</span></div>
        <div className="productGrid">{visible.map((product) => { const save = savingsMinor(product); const wish = wishlist.includes(product.id); return <article className="productCard" key={product.id}><div className="productImage"><span>{product.image}</span><button aria-label="wishlist" onClick={() => setWishlist((list) => wish ? list.filter((id) => id !== product.id) : [...list, product.id])}>{wish ? "♥" : "♡"}</button>{product.flashDeal && <label>⚡ FLASH</label>}</div><div className="productBody"><div className="storeLine"><span>{product.storeName}</span><b>• {product.etaMinutes} min</b></div><h2>{product.name}</h2><p>{product.category} · {product.unit}</p><div className="prices"><strong>{formatInr(money(product.memberPriceMinor))}</strong><del>{formatInr(money(product.originalPriceMinor))}</del><em>Save {memberSavingsPercent(product)}%</em></div><div className="cardFoot"><small>{product.availableQuantity} available · Save {formatInr(money(save))}</small><button onClick={() => addToCart(product)}>{addedId === product.id ? "✓ Added" : "Add to cart"}</button><button onClick={() => setSelected(product)}>View</button></div></div></article>})}</div>
        {visible.length === 0 && <div className="emptyState"><strong>No products found</strong><p>Try another product, brand, category or turn off Flash deals.</p></div>}
      </section>
    </div>
    {selected && <div className="modalBackdrop" onClick={() => setSelected(null)}><div className="productModal" onClick={(e) => e.stopPropagation()}><button className="close" onClick={() => setSelected(null)}>×</button><div className="modalIcon">{selected.image}</div><p className="eyebrow">{selected.category} · {selected.storeName} · {selected.etaMinutes} min</p><h2>{selected.name}</h2><p>{selected.brand} · {selected.unit}</p><div className="modalPrice"><strong>{formatInr(money(selected.memberPriceMinor))}</strong><del>{formatInr(money(selected.originalPriceMinor))}</del><b>Save {formatInr(money(savingsMinor(selected)))}</b></div><div className="modalInfo"><span>✓ Member eligible price</span><span>✓ {selected.availableQuantity} units in stock</span><span>✓ Delivered in {selected.etaMinutes} minutes</span></div><button className="primary" onClick={() => addToCart(selected)}>Add to cart →</button></div></div>}
  </main>;
}
