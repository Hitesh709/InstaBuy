export type CustomerEligibilityStatus = "PENDING" | "VERIFIED" | "SUSPENDED" | "EXPIRED";

export type MembershipStatus = "ACTIVE" | "INACTIVE" | "EXPIRED" | "SUSPENDED";

export type NotificationChannel = "push" | "sms" | "whatsapp" | "email";
export type NotificationCategory = "transactional" | "promotional";

export interface CustomerProfile {
  id: string;
  mobile: string;
  name: string;
  email?: string;
  eligibilityStatus: CustomerEligibilityStatus;
  membershipStatus: MembershipStatus;
  membershipStartsAt?: string;
  membershipEndsAt?: string;
}

export interface CustomerAddress {
  id: string;
  label: "home" | "work" | "other";
  recipientName: string;
  phone: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  deliveryInstructions?: string;
  isDefault: boolean;
}

export interface NotificationPreference {
  channel: NotificationChannel;
  category: NotificationCategory;
  enabled: boolean;
}

export interface CustomerBenefitSummary {
  activeDeals: number;
  savingsToDate: number;
  activeBenefits: number;
  recentRedemptions: number;
}

export function canReceiveMemberPricing(status: CustomerEligibilityStatus, membership: MembershipStatus) {
  return status === "VERIFIED" && membership === "ACTIVE";
}
