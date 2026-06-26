"use client";

import Link from "next/link";
import { Heart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { ROUTES } from "@/lib/constants";
import { FLOWERS } from "@/lib/flowers-data";
import { formatPrice, getImageUrl } from "@/lib/utils";
import { useFavorites } from "@/hooks/useFavorites";
import { useLanguage } from "@/hooks/useLanguage";

export default function FavoritesPage() {
  const favorites = useFavorites();
  const { t } = useLanguage();

  const favoriteFlowers = FLOWERS.filter((f) => favorites.isFavorite(f.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="heading-serif text-2xl text-foreground">{t("favorites.title")}</h1>
          <p className="text-muted text-sm mt-1">
            {favorites.favoritesCount > 0
              ? `${favorites.favoritesCount} ta guldasta`
              : t("favorites.empty_desc")}
          </p>
        </div>
        {favoriteFlowers.length > 0 && (
          <Link href={ROUTES.CATALOG}>
            <Button variant="outline" size="sm">
              <Heart size={16} className="w-4 h-4" />
              {t("favorites.go_catalog")}
            </Button>
          </Link>
        )}
      </div>

      {favoriteFlowers.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {favoriteFlowers.map((flower) => (
            <div
              key={flower.id}
              className="group bg-card border border-white/5 rounded-2xl overflow-hidden hover:border-white/10 transition-all duration-300"
            >
              {/* Image */}
              <Link href={ROUTES.CATALOG_DETAIL(flower.id)} className="block relative aspect-[4/5] overflow-hidden bg-[#1A1A1A]">
                <img
                  src={getImageUrl(flower.images[0])}
                  alt={flower.name}
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105"
                />

                {/* Remove button */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    favorites.toggleFavorite(flower.id);
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/40 text-white/60 hover:bg-rose/20 hover:text-rose transition-all duration-200 cursor-pointer"
                  aria-label="O‘chirish"
                >
                  <Trash2 size={14} />
                </button>
              </Link>

              {/* Info */}
              <div className="p-3 space-y-1">
                <h3 className="text-sm font-medium text-foreground truncate">
                  {flower.name}
                </h3>
                <p className="text-xs text-muted font-medium">
                  {formatPrice(flower.price)}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 animate-fade-in">
          <div className="glass-gold inline-flex rounded-full p-6 mb-6">
            <Heart size={48} className="text-gold" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {t("favorites.empty")}
          </h3>
          <p className="text-muted text-sm mb-6 max-w-sm mx-auto">
            {t("favorites.empty_desc")}
          </p>
          <Link href={ROUTES.CATALOG}>
            <Button variant="primary">{t("favorites.go_catalog")}</Button>
          </Link>
        </div>
      )}
    </div>
  );
}
