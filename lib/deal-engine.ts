export type DealType = "PERCENTAGE" | "FLAT";
export type DealTarget = "PRODUCT" | "CATEGORY" | "STORE";
export type DealStatus = "DRAFT" | "SCHEDULED" | "ACTIVE" | "EXPIRED" | "DISABLED";

export interface DealRule {
  id: string;
  merchantId: string;
  storeId: string;
  name: string;
  type: DealType;
  target: DealTarget;
  targetIds: string[];
  valueMinor?: number;
  percentage?: number;
  minimumOrderMinor?: number;
  maximumDiscountMinor?: number;
  startsAt: string;
  endsAt: string;
  timezone: string;
  exclusive: boolean;
  status: DealStatus;
}

export interface PricingContext {
  customerEligible: boolean;
  membershipActive: boolean;
  storeId: string;
  variantId: string;
  categoryId: string;
  cartSubtotalMinor: number;
  unitPriceMinor: number;
  now: Date;
}

export interface PriceBreakdown {
  originalMinor: number;
  discountMinor: number;
  finalMinor: number;
  dealId?: string;
  reason: string;
}

export function isDealActive(deal: DealRule, now: Date) {
  return deal.status === "ACTIVE" && now >= new Date(deal.startsAt) && now <= new Date(deal.endsAt);
}

export function matchesTarget(deal: DealRule, context: PricingContext) {
  if (deal.storeId !== context.storeId) return false;
  if (deal.target === "STORE") return true;
  if (deal.target === "PRODUCT") return deal.targetIds.includes(context.variantId);
  return deal.targetIds.includes(context.categoryId);
}

export function calculateDiscount(deal: DealRule, priceMinor: number) {
  const raw = deal.type === "PERCENTAGE"
    ? Math.floor(priceMinor * ((deal.percentage ?? 0) / 100))
    : (deal.valueMinor ?? 0);
  return Math.min(Math.max(0, raw), deal.maximumDiscountMinor ?? Number.MAX_SAFE_INTEGER, priceMinor);
}

export function evaluateDeal(deal: DealRule, context: PricingContext): PriceBreakdown | null {
  if (!context.customerEligible || !context.membershipActive) return null;
  if (!isDealActive(deal, context.now) || !matchesTarget(deal, context)) return null;
  if ((deal.minimumOrderMinor ?? 0) > context.cartSubtotalMinor) return null;

  const discountMinor = calculateDiscount(deal, context.unitPriceMinor);
  if (discountMinor <= 0) return null;

  return {
    originalMinor: context.unitPriceMinor,
    discountMinor,
    finalMinor: context.unitPriceMinor - discountMinor,
    dealId: deal.id,
    reason: deal.type === "PERCENTAGE" ? `${deal.percentage}% member discount` : "Member offer",
  };
}

export function resolveBestDeal(deals: DealRule[], context: PricingContext): PriceBreakdown {
  const candidates = deals
    .map((deal) => evaluateDeal(deal, context))
    .filter((value): value is PriceBreakdown => value !== null)
    .sort((a, b) => b.discountMinor - a.discountMinor);

  return candidates[0] ?? {
    originalMinor: context.unitPriceMinor,
    discountMinor: 0,
    finalMinor: context.unitPriceMinor,
    reason: "No applicable member deal",
  };
}
