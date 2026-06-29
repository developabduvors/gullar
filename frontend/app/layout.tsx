import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/hooks/useLanguage";

/* ── Serif font for headings — mix of italic & bold for signature style ── */
const playfair = Playfair_Display({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

/* ── Sans font for body ── */
const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

/* ── Metadata ── */
export const metadata: Metadata = {
  title: {
    default: "Prestige Gallery — Соберём букет на комфортный бюджет",
    template: "%s | Prestige Gallery",
  },
  description:
    "Prestige Gallery — букеты на любой вкус и бюджет. Шота Руставели 36. Заказ через @prestigegallery_uz.",
  keywords: [
    "букеты",
    "цветы",
    "prestige gallery",
    "престиж галерея",
    "Ташкент",
    "букет на заказ",
    "цветы с доставкой",
  ],
  authors: [{ name: "Prestige Gallery" }],
  creator: "Prestige Gallery",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "ru_UZ",
    siteName: "Prestige Gallery",
    title: "Prestige Gallery — Соберём букет на комфортный бюджет",
    description:
      "Букеты на любой вкус и бюджет. Заказ через @prestigegallery_uz.",
    images: [
      {
        url: "/logo.jpg",
        width: 800,
        height: 800,
        alt: "Prestige Gallery",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prestige Gallery — Соберём букет на комфортный бюджет",
    description:
      "Букеты на любой вкус и бюджет. Заказ через @prestigegallery_uz.",
  },
  icons: {
    icon: "/logo.jpg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0D0D0D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

/* ── Root Layout ── */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${playfair.variable} ${inter.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-dvh flex flex-col font-sans antialiased pt-20">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
