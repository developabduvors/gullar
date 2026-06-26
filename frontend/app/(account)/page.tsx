"use client";

import { Package, Heart, CalendarDays, Star } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { ROUTES } from "@/lib/constants";
import { useFavorites } from "@/hooks/useFavorites";
import { useLanguage } from "@/hooks/useLanguage";

export default function AccountPage() {
  const favorites = useFavorites();
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-serif text-2xl text-foreground">{t("account.title")}</h1>
        <p className="text-muted text-sm mt-1">{t("account.subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Link href={ROUTES.ACCOUNT_ORDERS} className="block">
          <Card variant="glass-dark" hover padding="lg">
            <div className="space-y-3">
              <Package size={32} className="text-gold" />
              <h3 className="font-semibold text-foreground">{t("account.active_orders")}</h3>
              <p className="text-2xl font-bold text-gold">0</p>
              <Badge variant="gold" size="sm">{t("account.no_orders")}</Badge>
            </div>
          </Card>
        </Link>

        <Link href={ROUTES.ACCOUNT_FAVORITES} className="block">
          <Card variant="glass-gold" hover padding="lg">
            <div className="space-y-3">
              <Heart size={32} className="text-rose" />
              <h3 className="font-semibold text-foreground">{t("account.favorites")}</h3>
              <p className="text-2xl font-bold text-gold">{favorites.favoritesCount}</p>
              <Badge variant="gold" size="sm">guldasta</Badge>
            </div>
          </Card>
        </Link>

        <Link href={ROUTES.ACCOUNT_EVENTS} className="block">
          <Card variant="glass-dark" hover padding="lg">
            <div className="space-y-3">
              <CalendarDays size={32} className="text-gold" />
              <h3 className="font-semibold text-foreground">{t("account.events")}</h3>
              <p className="text-2xl font-bold text-gold">0</p>
              <Badge variant="gold" size="sm">{t("account.events_list")}</Badge>
            </div>
          </Card>
        </Link>

        <Card variant="glass-dark" padding="lg">
          <div className="space-y-3">
            <Star size={32} className="text-gold" />
            <h3 className="font-semibold text-foreground">{t("account.bonuses")}</h3>
            <p className="text-2xl font-bold text-gold">0</p>
            <Badge variant="gold" size="sm">ball</Badge>
          </div>
        </Card>
      </div>

      <Card variant="glass-dark" padding="lg">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">{t("account.recent_orders")}</h2>
          <Badge variant="gold">{t("account.orders")}</Badge>
        </div>
        <div className="text-center py-8 text-muted text-sm">
          {t("account.no_orders")}
        </div>
      </Card>
    </div>
  );
}
