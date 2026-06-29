/* ── Class name merger (Tailwind-compatible) ── */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

/* ── Price formatting ──
   Intl currency formatting ICU/CLDR ma'lumotlariga bog'liq bo'lib,
   Node (server) va brauzer (client)da har xil natija beradi → hydration xatosi.
   Shuning uchun probel bilan ajratib, qo'lda deterministik formatlash. */
export function formatPrice(price: number, currency: string = "soʻm"): string {
  const grouped = Math.round(price)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return `${grouped} ${currency}`;
}

/* ── Date formatting ── */
export function formatDate(
  date: string | Date,
  options?: Intl.DateTimeFormatOptions
): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
    ...options,
  };
  return new Intl.DateTimeFormat("ru-UZ", defaultOptions).format(
    typeof date === "string" ? new Date(date) : date
  );
}

export function formatDateShort(date: string | Date): string {
  return new Intl.DateTimeFormat("ru-UZ", {
    day: "numeric",
    month: "short",
  }).format(typeof date === "string" ? new Date(date) : date);
}

/* ── Time remaining (countdown) ── */
export function getTimeRemaining(minutes: number): {
  total: number;
  minutes: number;
  seconds: number;
} {
  const total = minutes * 60;
  const m = Math.floor(total / 60);
  const s = Math.floor(total % 60);
  return { total, minutes: m, seconds: s };
}

export function formatCountdown(minutes: number, seconds: number): string {
  return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

/* ── Phone formatting ── */
export function formatPhone(phone: string): string {
  const cleaned = phone.replace(/\D/g, "");
  if (cleaned.length === 12) {
    return `+${cleaned.slice(0, 3)} (${cleaned.slice(3, 5)}) ${cleaned.slice(5, 8)}-${cleaned.slice(8, 10)}-${cleaned.slice(10, 12)}`;
  }
  return phone;
}

/* ── Slug generation ── */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/* ── Truncate text ── */
export function truncate(text: string, length: number = 100): string {
  if (text.length <= length) return text;
  return text.slice(0, length).trimEnd() + "…";
}

/* ── Get image URL ── */
export function getImageUrl(path: string | null | undefined): string {
  if (!path) return "/images/placeholder.svg";
  if (path.startsWith("http")) return path;
  if (path.startsWith("/")) return path;
  return `${process.env.NEXT_PUBLIC_API_URL || ""}${path}`;
}

/* ── Generate random ID (for optimistic updates) ── */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}

/* ── Delay (for animations) ── */
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/* ── Group array by key ── */
export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  return array.reduce(
    (acc, item) => {
      const groupKey = String(item[key]);
      if (!acc[groupKey]) acc[groupKey] = [];
      acc[groupKey].push(item);
      return acc;
    },
    {} as Record<string, T[]>
  );
}

/* ── Get initials ── */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
