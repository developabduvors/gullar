"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ShoppingBag, Heart, CalendarDays } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/molecules/Footer";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useLanguage } from "@/hooks/useLanguage";

const SIDEBAR_LINKS = [
  {
    href: ROUTES.ACCOUNT,
    labelKey: "account.profile",
    icon: <User size={18} />,
  },
  {
    href: ROUTES.ACCOUNT_ORDERS,
    labelKey: "account.orders",
    icon: <ShoppingBag size={18} />,
  },
  {
    href: ROUTES.ACCOUNT_FAVORITES,
    labelKey: "account.favorites",
    icon: <Heart size={18} />,
  },
  {
    href: ROUTES.ACCOUNT_EVENTS,
    labelKey: "account.events",
    icon: <CalendarDays size={18} />,
  },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const cart = useCart();
  const favorites = useFavorites();
  const { t } = useLanguage();

  return (
    <>
      <Header
        cartItemsCount={cart.totalItems}
        favoritesCount={favorites.favoritesCount}
      />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar with glassmorphism */}
            <aside className="lg:w-56 flex-shrink-0">
              <nav className="space-y-1 glass rounded-2xl p-2 border border-white/5">
                {SIDEBAR_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                      pathname === link.href
                        ? "bg-gold/15 text-gold"
                        : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                    )}
                  >
                    {link.icon}
                    {t(link.labelKey)}
                  </Link>
                ))}
              </nav>
            </aside>

            {/* Content */}
            <div className="flex-1 min-w-0">{children}</div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
