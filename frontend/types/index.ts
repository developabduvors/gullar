/* ── User & Auth ── */
export interface User {
  id: string;
  phone: string;
  name?: string;
  email?: string;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface OTPRequest {
  phone: string;
}

export interface OTPVerify {
  phone: string;
  code: string;
}

/* ── Flower / Product ── */
export interface Flower {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription?: string;
  price: number;
  oldPrice?: number;
  images: string[];
  category: Category;
  tags: Tag[];
  colors: string[];
  size?: string;
  isInStock: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  rating: number;
  reviewCount: number;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon?: string;
  image?: string;
}

export interface Tag {
  id: string;
  name: string;
  slug: string;
}

/* ── Cart ── */
export interface CartItem {
  id: string;
  flower: Flower;
  quantity: number;
  price: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  discount?: number;
}

/* ── Order ── */
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  deliveryAddress: DeliveryAddress;
  deliveryDate: string;
  deliveryTimeSlot: string;
  recipientName: string;
  isAnonymous: boolean;
  greetingMessage?: string;
  courierMedia?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  flowerId: string;
  flowerName: string;
  quantity: number;
  price: number;
  image: string;
}

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "delivering"
  | "delivered"
  | "completed"
  | "cancelled";

export interface DeliveryAddress {
  street: string;
  building?: string;
  apartment?: string;
  city: string;
  district?: string;
  latitude?: number;
  longitude?: number;
  comment?: string;
}

/* ── Review ── */
export interface Review {
  id: string;
  userId: string;
  userName: string;
  flowerId: string;
  rating: number;
  text: string;
  images?: string[];
  status: "pending" | "approved" | "rejected";
  createdAt: string;
}

/* ── Favorite / Wishlist ── */
export interface Favorite {
  id: string;
  userId: string;
  flowerId: string;
  flower: Flower;
  createdAt: string;
}

/* ── Event / Calendar ── */
export interface CalendarEvent {
  id: string;
  userId: string;
  personName: string;
  relationship: string;
  date: string;
  remindBeforeDays?: number;
  notes?: string;
  createdAt: string;
}

/* ── Subscription ── */
export interface Subscription {
  id: string;
  userId: string;
  flowerId: string;
  frequency: "weekly" | "biweekly" | "monthly";
  dayOfWeek?: number;
  dayOfMonth?: number;
  nextDeliveryDate: string;
  isActive: boolean;
  createdAt: string;
}

/* ── Wallet ── */
export interface Wallet {
  userId: string;
  balance: number;
  bonusBalance: number;
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  type: "deposit" | "withdrawal" | "payment" | "cashback" | "bonus";
  amount: number;
  description: string;
  createdAt: string;
}

/* ── Search ── */
export interface SearchFilters {
  query?: string;
  categoryId?: string;
  tags?: string[];
  colors?: string[];
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "price_asc" | "price_desc" | "rating" | "newest" | "popular";
  page?: number;
  limit?: number;
}

export interface SearchResult {
  flowers: Flower[];
  totalCount: number;
  page: number;
  totalPages: number;
  filters: SearchFilters;
}

/* ── API Response ── */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    totalCount: number;
    totalPages: number;
  };
}
