"use client";

import { useMemo, useState } from "react";
import { catalogCategoryCount, catalogProductCount, instamartCatalog } from "../../lib/instamart-catalog";
import "./catalog.css";

export default function CatalogPage() {
  const [selected, setSelected] = useState("all");
  const [query, setQuery] = useState("");
  const categories = useMemo(() => [{ id: "all", name: "All Products", count: catalogProductCount }, ...instamartCatalog.map(category => ({ id: category.id, name: category.name, count: category.products.length }))], []);
  const activeCategory = selected === "all" ? undefined : instamartCatalog.find(category => category.id === selected);
  const visible = useMemo(() => {
    const source = activeCategory ? [activeCategory] : instamartCatalog;
    const q = query.trim().toLowerCase();
    return source.map(category => ({ ...category, products: category.products.filter(product => !q || product.toLowerCase().includes(q) || category.name.toLowerCase().includes(q)) })).filter(category => category.products.length > 0);
  }, [activeCategory, query]);

  return (
    <main className="catalogShell">
      <header className="catalogHeader"><a href="/" className="backLink">← InstaBuy</a><span className="accountPill">Master Catalog</span><div className="avatar">IB</div></header>
      <section className="catalogHero"><div><p className="eyebrow">INSTANT COMMERCE CATALOG</p><h1>Everyday essentials.<br /><span>Category by category.</span></h1><p>InstaBuy now has a broad quick-commerce taxonomy covering fresh food, grocery, household, beauty, baby, pets, electronics, toys, fashion and seasonal shopping.</p></div><div className="catalogStats"><div><strong>{catalogProductCount}</strong><small>Seed products</small></div><div><strong>{catalogCategoryCount}</strong><small>Categories</small></div><div><strong>50+</strong><small>Category breadth target</small></div></div></section>
      <section className="catalogToolbar"><div className="catalogSearch">⌕ <input value={query} onChange={event => setQuery(event.target.value)} placeholder="Search products or categories" /></div><div className="catalogSearchMeta">{visible.reduce((total, category) => total + category.products.length, 0)} products shown</div></section>
      <section className="catalogWorkspace">
        <aside className="catalogSidebar"><div className="sidebarTitle">Categories</div>{categories.map(category => <button key={category.id} className={selected === category.id ? "activeCat" : "cat"} onClick={() => setSelected(category.id)}><span>{category.name}</span><b>{category.count}</b></button>)}</aside>
        <div className="catalogContent">
          {visible.map(category => <section className="categorySection" key={category.id}><div className="categoryHeading"><div><p className="eyebrow">CATEGORY</p><h2>{category.name}</h2></div><span>{category.products.length} products</span></div><div className="subcategoryRow">{category.subcategories.map(subcategory => <span key={subcategory}>{subcategory}</span>)}</div><div className="productNameGrid">{category.products.map((product, index) => <article className="catalogNameCard" key={`${category.id}-${product}`}><div className="catalogProductIcon">{category.id.includes("fruit") ? "🍎" : category.id.includes("vegetable") ? "🥦" : category.id.includes("dairy") ? "🥛" : category.id.includes("beauty") ? "✨" : category.id.includes("electronics") ? "🔌" : category.id.includes("baby") ? "🧸" : category.id.includes("pet") ? "🐾" : category.id.includes("toy") ? "🎲" : category.id.includes("home") ? "🏠" : "🛒"}</div><div><strong>{product}</strong><small>{category.name} · SKU seed {String(index + 1).padStart(3, "0")}</small></div></article>)}</div></section>)}
          {visible.length === 0 && <div className="emptyCatalog"><strong>No products found</strong><p>Try another product name or select All Products.</p></div>}
        </div>
      </section>
    </main>
  );
}
