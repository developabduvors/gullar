"use client";

import Link from "next/link";
import { ShoppingCart, Trash2, Minus, Plus, ArrowLeft } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/molecules/Footer";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ROUTES } from "@/lib/constants";
import { formatPrice, getImageUrl, cn } from "@/lib/utils";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { useLanguage } from "@/hooks/useLanguage";

export default function CartPage() {
  const cart = useCart();
  const favorites = useFavorites();
  const { t } = useLanguage();
  const isEmpty = cart.items.length === 0;

  return (
    <>
      <Header
        cartItemsCount={cart.totalItems}
        favoritesCount={favorites.favoritesCount}
      />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="heading-serif text-3xl text-foreground">
              {t("cart.title")}
            </h1>
            {!isEmpty && (
              <span className="text-sm text-muted">
                {cart.totalItems} {t("cart.items")}
              </span>
            )}
          </div>

          {isEmpty ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="glass-gold inline-flex rounded-full p-6 mb-6">
                <ShoppingCart size={48} className="text-gold" />
              </div>
              <h2 className="heading-serif text-2xl text-foreground mb-2">
                {t("cart.empty")}
              </h2>
              <p className="text-muted text-sm mb-8 max-w-sm mx-auto">
                {t("cart.empty_desc")}
              </p>
              <Link href={ROUTES.CATALOG}>
                <Button variant="primary" size="lg">
                  {t("cart.go_catalog")}
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="glass rounded-2xl p-4 flex gap-4 animate-fade-in"
                  >
                    {/* Image */}
                    <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-[#1A1A1A] shrink-0">
                      <img
                        src={getImageUrl(item.flower.images[0])}
                        alt={item.flower.name}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <Link
                        href={ROUTES.CATALOG_DETAIL(item.flower.id)}
                        className="font-semibold text-foreground text-sm sm:text-base hover:text-gold transition-colors line-clamp-1"
                      >
                        {item.flower.name}
                      </Link>
                      <p className="text-xs text-muted mt-0.5 line-clamp-1">
                        {item.flower.shortDescription}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <span className="font-bold text-foreground text-base">
                          {formatPrice(item.price * item.quantity)}
                        </span>

                        {/* Quantity controls */}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() =>
                              cart.updateQuantity(item.id, item.quantity - 1)
                            }
                            className="p-1.5 rounded-lg bg-white/5 text-foreground/60 hover:text-gold hover:bg-gold/10 transition-all cursor-pointer"
                            aria-label="Kamaytirish"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-8 text-center text-sm font-medium text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              cart.updateQuantity(item.id, item.quantity + 1)
                            }
                            className="p-1.5 rounded-lg bg-white/5 text-foreground/60 hover:text-gold hover:bg-gold/10 transition-all cursor-pointer"
                            aria-label="Ko‘paytirish"
                          >
                            <Plus size={14} />
                          </button>
                          <button
                            onClick={() => cart.removeItem(item.id)}
                            className="p-1.5 rounded-lg bg-white/5 text-rose/60 hover:text-rose hover:bg-rose/10 transition-all ml-2 cursor-pointer"
                            aria-label={t("cart.remove")}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Continue shopping */}
                <Link href={ROUTES.CATALOG}>
                  <Button variant="ghost" size="sm">
                    <ArrowLeft size={16} className="w-4 h-4" />
                    {t("cart.continue")}
                  </Button>
                </Link>
              </div>

              {/* Order summary */}
              <div>
                <Card variant="glass-dark" padding="lg">
                  <h3 className="font-semibold text-foreground text-lg mb-6">
                    {t("cart.total")}
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex justify-between text-muted">
                      <span>
                        {t("cart.items")} ({cart.totalItems})
                      </span>
                      <span>{formatPrice(cart.totalPrice)}</span>
                    </div>
                    <div className="flex justify-between text-muted">
                      <span>{t("cart.delivery")}</span>
                      <Badge variant="gold" size="sm">
                        {t("cart.free")}
                      </Badge>
                    </div>
                    <div className="border-t border-white/10 pt-4 flex justify-between items-center">
                      <span className="font-semibold text-foreground">
                        {t("cart.to_pay")}
                      </span>
                      <span className="text-xl font-bold text-gold">
                        {formatPrice(cart.totalPrice)}
                      </span>
                    </div>
                  </div>
                  <Link href={ROUTES.CHECKOUT}>
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      className="mt-6"
                    >
                      {t("cart.checkout")}
                    </Button>
                  </Link>
                </Card>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
