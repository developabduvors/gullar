/* ── Brand ── */
export const BRAND = {
  name: "Prestige Gallery",
  tagline: "Byudjetingizga mos guldasta tayyorlab beramiz",
  description: "Har qanday did va byudjetga mos guldastalar",
  phone: "77 292 22 22",
  email: "info@prestigegallery.uz",
  address: "Шота Руставели 36",
  social: {
    instagram: "https://instagram.com/prestigegallery_uz",
    telegram: "https://t.me/prestigegallery_uz",
    facebook: "https://facebook.com/prestigegallery_uz",
  },
  workingHours: "Har kuni: 9:00 – 21:00",
  orderLink: "@prestigegallery_uz",
} as const;

/* ── Routes ── */
export const ROUTES = {
  HOME: "/",
  CATALOG: "/catalog",
  CATALOG_DETAIL: (id: string) => `/catalog/${id}`,
  SEARCH: "/search",
  LOGIN: "/login",
  VERIFY: "/verify",
  ACCOUNT: "/account",
  ACCOUNT_FAVORITES: "/account/favorites",
  ACCOUNT_ORDERS: "/account/orders",
  ACCOUNT_EVENTS: "/account/events",
  CART: "/cart",
  CHECKOUT: "/checkout",
} as const;

/* ── API ── */
export const API = {
  BASE_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  TIMEOUT: 15000,
  ENDPOINTS: {
    AUTH: {
      SEND_OTP: "/auth/send-otp",
      VERIFY_OTP: "/auth/verify-otp",
      ME: "/auth/me",
    },
    FLOWERS: {
      LIST: "/flowers",
      DETAIL: (id: string) => `/flowers/${id}`,
      POPULAR: "/flowers/popular",
      NEW: "/flowers/new",
    },
    CATEGORIES: "/categories",
    TAGS: "/tags",
    SEARCH: "/search",
    CART: "/cart",
    ORDER: "/orders",
    REVIEWS: "/reviews",
    FAVORITES: "/favorites",
    EVENTS: "/events",
    SUBSCRIPTIONS: "/subscriptions",
    WALLET: "/wallet",
  },
} as const;

/* ── UI ── */
export const UI = {
  DEBOUNCE_MS: 300,
  SEARCH_MIN_CHARS: 2,
  PAGE_SIZE: 12,
  OTP_LENGTH: 4,
  MAX_RATING: 5,
  TOAST_DURATION: 4000,
} as const;

/* ── Colors ── */
export const COLORS = {
  black: "#0D0D0D",
  card: "#1A1A1A",
  gold: "#D4AF37",
  goldLight: "#E0C040",
  goldDark: "#B8962E",
  champagne: "#F3E5AB",
  champagneLight: "#F8F0C6",
  green: "#132E22",
  greenLight: "#1E4A35",
  rose: "#7E0006",
  roseLight: "#A30008",
  white: "#F5F5F7",
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
