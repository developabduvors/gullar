"use client";

import { Package } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";
import { useLanguage } from "@/hooks/useLanguage";

export default function OrdersPage() {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-serif text-2xl text-foreground">{t("account.orders_list")}</h1>
        <p className="text-muted text-sm mt-1">{t("account.orders")}</p>
      </div>

      <div className="text-center py-16 animate-fade-in">
        <div className="glass-gold inline-flex rounded-full p-6 mb-6">
          <Package size={48} className="text-gold" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          {t("account.no_orders")}
        </h3>
        <p className="text-muted text-sm mb-6">
          Birinchi buyurtmangizni bering
        </p>
        <Link href={ROUTES.CATALOG}>
          <Button variant="primary">
            <Package size={16} className="w-4 h-4" />
            {t("cart.go_catalog")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
