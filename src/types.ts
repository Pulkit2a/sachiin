export type AppRole = 'customer' | 'hero' | 'admin' | 'flow';

export type DevicePlatform = 'ios' | 'android' | 'web';

export type CustomerTab = 'home' | 'bookings' | 'community' | 'rewards' | 'profile';

export type HeroTab = 'jobs' | 'schedule' | 'earnings' | 'kyc' | 'ratings';

export type AdminTab = 'dashboard' | 'users_heroes' | 'kyc_queue' | 'bookings' | 'commissions' | 'support';

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  popularServicesCount: number;
  badge?: string;
  color: string;
}

export interface HomeService {
  id: string;
  categoryId: string;
  name: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  unit: string;
  duration: string;
  rating: number;
  reviewsCount: number;
  description: string;
  includes: string[];
  aiAddons: {
    id: string;
    title: string;
    price: number;
    recommendedReason: string;
  }[];
  popular?: boolean;
}

export interface HeroProfessional {
  id: string;
  name: string;
  avatar: string;
  category: string;
  rating: number;
  jobsCompleted: number;
  experienceYears: number;
  verified: boolean;
  badgeTitle: string;
  hourlyRate: number;
  distanceKm: number;
  aiMatchScore: number;
  skills: string[];
  bio: string;
  locationName: string;
  coordinates: { lat: number; lng: number };
  phone: string;
}

export type BookingStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  categoryName: string;
  hero: HeroProfessional;
  customerName: string;
  customerPhone: string;
  address: {
    label: string;
    street: string;
    city: string;
    pincode: string;
    landmark?: string;
  };
  dateTime: string;
  status: BookingStatus;
  amount: number;
  paymentMethod: string;
  paymentStatus: 'paid' | 'pending' | 'refunded';
  otp: string;
  heroCurrentLocation?: { lat: number; lng: number; address: string; etaMinutes: number };
  notes?: string;
  createdAt: string;
}

export interface AIWellnessItem {
  id: string;
  category: string;
  title: string;
  status: 'good' | 'warning' | 'urgent';
  score: number;
  recommendation: string;
  serviceIdToBook?: string;
}

export interface AIDiagnosticReport {
  overallScore: number;
  lastScannedDate: string;
  items: AIWellnessItem[];
  detectedIssue?: string;
  estimatedCostRange?: { min: number; max: number };
}

export interface CommunityPost {
  id: string;
  authorName: string;
  authorAvatar: string;
  authorRole: 'Homeowner' | 'Verified Hero' | 'Admin';
  timestamp: string;
  title: string;
  content: string;
  category: 'Tip' | 'Article' | 'Wellness' | 'Neighborhood';
  likesCount: number;
  commentsCount: number;
  image?: string;
  verifiedBadge?: boolean;
}

export interface Coupon {
  code: string;
  title: string;
  discountText: string;
  minOrderValue: number;
  validTill: string;
  category: string;
}

export interface UserProfile {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  savedAddresses: {
    id: string;
    type: 'Home' | 'Work' | 'Other';
    address: string;
    isDefault?: boolean;
  }[];
  rewardPoints: number;
  membershipTier: 'Hero Silver' | 'Hero Gold' | 'Hero Platinum';
  membershipTierProgress: number; // 0 - 100
  referralCode: string;
  totalSavings: number;
}

export interface HeroProviderState {
  isOnline: boolean;
  kycStatus: 'verified' | 'pending' | 'rejected';
  activeJobRequest?: {
    id: string;
    serviceName: string;
    customerName: string;
    customerAddress: string;
    distanceKm: number;
    payout: number;
    timeSlot: string;
    expiresInSeconds: number;
  };
  todayEarnings: number;
  weeklyEarnings: number;
  completedJobsCount: number;
  acceptanceRate: number;
}
