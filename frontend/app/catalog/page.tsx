"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Flower2, Sparkles } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/molecules/Footer";
import { FlowerCard } from "@/components/molecules/FlowerCard";
import { Badge } from "@/components/ui/Badge";
import { FLOWERS } from "@/lib/flowers-data";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { cn } from "@/lib/utils";
import type { Flower } from "@/types";

const CATEGORIES = [
  { id: "all", nameKey: "catalog.category.all" },
  { id: "mono", nameKey: "catalog.category.mono" },
  { id: "premium", nameKey: "catalog.category.premium" },
  { id: "gifts", nameKey: "catalog.category.gifts" },
  { id: "seasonal", nameKey: "catalog.category.seasonal" },
];

function getFlowersByCategory(categorySlug: string): Flower[] {
  if (!categorySlug || categorySlug === "all") return FLOWERS;
  return FLOWERS.filter((f) => f.category.slug === categorySlug);
}

export default function CatalogPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const cart = useCart();
  const favorites = useFavorites();

  const activeCategory = searchParams.get("category") || "all";

  const handleCategoryChange = (categoryId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categoryId === "all") {
      params.delete("category");
    } else {
      params.set("category", categoryId);
    }
    router.replace(`/catalog?${params.toString()}`, { scroll: false });
  };

  const filteredFlowers = useMemo(
    () => getFlowersByCategory(activeCategory),
    [activeCategory]
  );

  return (
    <>
      <Header
        cartItemsCount={cart.totalItems}
        favoritesCount={favorites.favoritesCount}
      />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
            <div>
              <h1 className="heading-serif text-3xl sm:text-4xl text-foreground">
                <em className="text-gold-gradient">{t("catalog.title")}</em>
              </h1>
              <p className="text-muted mt-1 text-sm">
                {t("catalog.subtitle")}
              </p>
            </div>
            <Badge variant="gold" size="sm">
              <Sparkles size={12} />
              {filteredFlowers.length} {t("catalog.found")}
            </Badge>
          </div>

          {/* Category pills */}
          <div className="flex items-center justify-center sm:justify-start gap-2 overflow-x-auto pb-6 scrollbar-none -mx-4 sm:mx-0 px-4 sm:px-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                className={cn(
                  "px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 cursor-pointer",
                  activeCategory === cat.id
                    ? "bg-gold text-dark"
                    : "text-foreground/50 hover:text-gold border border-white/10 hover:border-gold/30"
                )}
              >
                {t(cat.nameKey)}
              </button>
            ))}
          </div>

          {/* Products grid */}
          {filteredFlowers.length === 0 ? (
            <div className="text-center py-20 animate-fade-in">
              <div className="glass-gold inline-flex rounded-full p-6 mb-6">
                <Flower2 size={48} className="text-gold" />
              </div>
              <h3 className="heading-serif text-xl text-foreground mb-2">
                {t("catalog.empty")}
              </h3>
              <p className="text-muted text-sm mb-6">
                {t("catalog.empty_desc")}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-10">
              {filteredFlowers.map((flower) => (
                <FlowerCard
                  key={flower.id}
                  flower={flower}
                  isInWishlist={favorites.isFavorite(flower.id)}
                  onToggleWishlist={favorites.toggleFavorite}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
