"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Map, ShoppingBag } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/molecules/Footer";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ROUTES } from "@/lib/constants";
import { formatPrice, getImageUrl } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useLanguage } from "@/hooks/useLanguage";

export default function CheckoutPage() {
  const cart = useCart();
  const favorites = useFavorites();
  const { t } = useLanguage();

  const isEmpty = cart.items.length === 0;

  const timeOptions = [
    { value: "9-12", label: "9:00 - 12:00" },
    { value: "12-15", label: "12:00 - 15:00" },
    { value: "15-18", label: "15:00 - 18:00" },
    { value: "18-21", label: "18:00 - 21:00" },
  ];

  return (
    <>
      <Header
        cartItemsCount={cart.totalItems}
        favoritesCount={favorites.favoritesCount}
      />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="heading-serif text-3xl text-foreground mb-8">
            {t("checkout.title")}
          </h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Recipient details */}
              <Card variant="glass-dark">
                <CardHeader>
                  <h2 className="font-semibold text-foreground">{t("checkout.recipient")}</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label={t("checkout.recipient_name")} placeholder={t("checkout.recipient_name")} />
                    <Input label={t("checkout.recipient_phone")} type="tel" placeholder="+998 (__) ___-__-__" />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      className="w-4 h-4 rounded border-border accent-gold"
                    />
                    <label htmlFor="anonymous" className="text-sm text-foreground/80">
                      {t("checkout.anonymous")}
                    </label>
                  </div>
                </CardContent>
              </Card>

              {/* Delivery details */}
              <Card variant="glass-dark">
                <CardHeader>
                  <h2 className="font-semibold text-foreground">{t("checkout.address")}</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input label={t("checkout.street")} placeholder="ул. Амира Темура, 100" />
                  <div className="grid grid-cols-2 gap-4">
                    <Input label={t("checkout.entrance")} placeholder="3 подъезд, 5 этаж" />
                    <Input label={t("checkout.apartment")} placeholder="Кв. 42" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground/80 mb-1.5">
                        {t("checkout.date")}
                      </label>
                      <input
                        type="date"
                        className="w-full rounded-xl border border-border bg-card px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-gold/40"
                      />
                    </div>
                    <Select
                      label={t("checkout.time")}
                      options={timeOptions}
                      placeholder="9:00 - 12:00"
                      fullWidth
                    />
                  </div>

                  {/* Map placeholder */}
                  <div className="rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 h-48 flex items-center justify-center glass border border-white/5">
                    <div className="text-center">
                      <Map size={36} className="text-muted/40 mx-auto mb-2" />
                      <p className="text-sm text-muted">{t("checkout.address")}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Greeting */}
              <Card variant="glass-dark">
                <CardHeader>
                  <h2 className="font-semibold text-foreground">{t("checkout.greeting")}</h2>
                </CardHeader>
                <CardContent>
                  <textarea
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-foreground text-sm placeholder:text-muted/50 focus:outline-none focus:ring-2 focus:ring-gold/40 min-h-[100px] resize-none"
                    placeholder={t("checkout.greeting_placeholder")}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Order summary */}
            <div>
              <Card variant="glass-dark" padding="lg">
                <CardHeader>
                  <h2 className="font-semibold text-foreground">{t("checkout.your_order")}</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEmpty ? (
                    <div className="text-center py-6 text-muted text-sm">
                      <ShoppingBag size={32} className="mx-auto mb-3 text-white/10" />
                      <p>{t("checkout.empty_cart")}</p>
                      <Link href={ROUTES.CATALOG}>
                        <Button variant="outline" size="sm" className="mt-3">
                          <ShoppingBag size={16} className="w-4 h-4" />
                          {t("cart.go_catalog")}
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <>
                      <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-none">
                        {cart.items.map((item) => (
                          <div
                            key={item.id}
                            className="flex items-center gap-3 p-2 rounded-xl bg-white/5"
                          >
                            <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-[#1A1A1A] shrink-0">
                              <img
                                src={getImageUrl(item.flower.images[0])}
                                alt={item.flower.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm text-foreground font-medium truncate">
                                {item.flower.name}
                              </p>
                              <p className="text-xs text-muted">
                                {item.quantity} x {formatPrice(item.price)}
                              </p>
                            </div>
                            <span className="text-sm font-medium text-foreground">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="border-t border-white/10 pt-4 space-y-2">
                        <div className="flex justify-between text-sm text-muted">
                          <span>{t("cart.items")} ({cart.totalItems})</span>
                          <span>{formatPrice(cart.totalPrice)}</span>
                        </div>
                        <div className="flex justify-between text-sm text-muted">
                          <span>{t("cart.delivery")}</span>
                          <Badge variant="gold" size="sm">{t("cart.free")}</Badge>
                        </div>
                        <div className="flex justify-between text-base font-bold text-foreground pt-2 border-t border-white/10">
                          <span>{t("cart.to_pay")}</span>
                          <span className="text-gold">{formatPrice(cart.totalPrice)}</span>
                        </div>
                      </div>

                      <Button variant="primary" size="lg" fullWidth className="mt-4">
                        {t("checkout.submit")}
                      </Button>
                    </>
                  )}
                  <p className="text-xs text-center text-muted mt-4">
                    {t("checkout.agree")}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
