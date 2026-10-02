export type MerchantLifecycle = "DRAFT" | "SUBMITTED" | "UNDER_REVIEW" | "APPROVED" | "REJECTED" | "SUSPENDED";
export type MerchantStaffRole = "OWNER" | "MANAGER" | "OPERATOR" | "FINANCE";
export type StoreOperationalStatus = "OPEN" | "CLOSED" | "TEMPORARILY_UNAVAILABLE";
export type KycStatus = "NOT_STARTED" | "SUBMITTED" | "VERIFIED" | "REJECTED";

export interface Merchant {
  id: string;
  businessName: string;
  legalName?: string;
  lifecycle: MerchantLifecycle;
  kycStatus: KycStatus;
  category: string;
  primaryContactName: string;
  primaryMobile: string;
  primaryEmail?: string;
}

export interface MerchantStore {
  id: string;
  merchantId: string;
  name: string;
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  operationalStatus: StoreOperationalStatus;
  deliveryRadiusKm: number;
  timezone: string;
}

export interface MerchantStaff {
  id: string;
  merchantId: string;
  storeIds: string[];
  name: string;
  mobile: string;
  role: MerchantStaffRole;
  active: boolean;
}

export interface OperatingHours {
  day: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  open: string;
  close: string;
  closed: boolean;
}

export interface MerchantPerformance {
  orders: number;
  completedOrders: number;
  cancelledOrders: number;
  offerRedemptions: number;
  grossSales: number;
}

export function canPublishLiveOffers(lifecycle: MerchantLifecycle) {
  return lifecycle === "APPROVED";
}

export function canOperateStore(lifecycle: MerchantLifecycle, status: StoreOperationalStatus) {
  return lifecycle === "APPROVED" && status === "OPEN";
}
