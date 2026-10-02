export type CatalogStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";
export type ListingStatus = "ACTIVE" | "INACTIVE";

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  sortOrder: number;
  active: boolean;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  sortOrder: number;
  isPrimary: boolean;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand?: string;
  categoryId: string;
  subcategoryId?: string;
  description: string;
  unitLabel?: string;
  keywords: string[];
  images: ProductImage[];
  status: CatalogStatus;
}

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  name: string;
  attributes: Record<string, string>;
  status: CatalogStatus;
}

export interface Money {
  currency: "INR";
  minor: number;
}

export interface StoreListing {
  id: string;
  storeId: string;
  variantId: string;
  status: ListingStatus;
  basePrice: Money;
  storePrice?: Money;
  priceEffectiveFrom?: string;
  priceEffectiveTo?: string;
}

export interface Inventory {
  storeId: string;
  variantId: string;
  quantity: number;
  reservedQuantity: number;
  updatedAt: string;
}

export function availableQuantity(inventory: Inventory) {
  return Math.max(0, inventory.quantity - inventory.reservedQuantity);
}

export function isSellable(listing: StoreListing, inventory: Inventory) {
  return listing.status === "ACTIVE" && availableQuantity(inventory) > 0;
}

export function formatInr(money: Money) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: money.currency,
    maximumFractionDigits: 2,
  }).format(money.minor / 100);
}
