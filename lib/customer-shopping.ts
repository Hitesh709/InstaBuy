export interface ShoppingProduct {
  id: string;
  name: string;
  brand?: string;
  category: string;
  categoryId: string;
  storeId: string;
  storeName: string;
  city: string;
  unit: string;
  image: string;
  originalPriceMinor: number;
  memberPriceMinor: number;
  availableQuantity: number;
  etaMinutes: number;
  tags: string[];
  flashDeal?: { label: string; endsAt: string };
}

export interface ShoppingFilters {
  query?: string;
  category?: string;
  storeId?: string;
  flashOnly?: boolean;
}

export function matchesShoppingFilters(product: ShoppingProduct, filters: ShoppingFilters) {
  const query = filters.query?.trim().toLowerCase();
  const matchesQuery = !query || [product.name, product.brand, product.category, ...product.tags]
    .filter(Boolean)
    .some((value) => value!.toLowerCase().includes(query));
  const matchesCategory = !filters.category || product.categoryId === filters.category;
  const matchesStore = !filters.storeId || product.storeId === filters.storeId;
  const matchesFlash = !filters.flashOnly || Boolean(product.flashDeal);
  return matchesQuery && matchesCategory && matchesStore && matchesFlash;
}

export function savingsMinor(product: ShoppingProduct) {
  return Math.max(0, product.originalPriceMinor - product.memberPriceMinor);
}

export function memberSavingsPercent(product: ShoppingProduct) {
  if (product.originalPriceMinor <= 0) return 0;
  return Math.round((savingsMinor(product) / product.originalPriceMinor) * 100);
}
