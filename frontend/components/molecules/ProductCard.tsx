"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { cn, formatPrice, getImageUrl } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import { Badge } from "@/components/ui/Badge";
import { useLanguage } from "@/hooks/useLanguage";
import type { Flower } from "@/types";

interface ProductCardProps {
  flower: Flower;
  isInWishlist?: boolean;
  onToggleWishlist?: (flowerId: string) => void;
  priority?: boolean;
}

export function ProductCard({
  flower,
  isInWishlist = false,
  onToggleWishlist,
  priority = false,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlistAnimating, setIsWishlistAnimating] = useState(false);
  const { t } = useLanguage();

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlistAnimating(true);
    onToggleWishlist?.(flower.id);
    setTimeout(() => setIsWishlistAnimating(false), 400);
  };

  const hasDiscount = flower.oldPrice && flower.oldPrice > flower.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((flower.oldPrice! - flower.price) / flower.oldPrice!) * 100
      )
    : 0;

  return (
    <Link
      href={ROUTES.CATALOG_DETAIL(flower.id)}
      className="group block overflow-hidden bg-card border border-white/5 hover:border-white/10 transition-all duration-500"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-[#1A1A1A]">
        {flower.images[0] && (
          <img
            src={getImageUrl(flower.images[0])}
            alt={flower.name}
            className={cn(
              "h-full w-full object-cover transition-all duration-700 ease-out",
              isHovered && "scale-105"
            )}
            loading={priority ? "eager" : "lazy"}
          />
        )}

        {/* Subtle gradient overlay on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent",
            "transition-opacity duration-500",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {flower.isNew && <Badge variant="new" size="sm">{t("product.new")}</Badge>}
          {hasDiscount && (
            <Badge variant="sale" size="sm">
              -{discountPercent}%
            </Badge>
          )}
        </div>

        {/* Wishlist button */}
        <button
          onClick={handleWishlistClick}
          className={cn(
            "absolute top-3 right-3 p-2 rounded-full",
            "transition-all duration-300 cursor-pointer z-10",
            "hover:bg-zinc-100",
            isInWishlist ? "text-red-500" : "text-white/60",
            isWishlistAnimating && "scale-125"
          )}
          aria-label={
            isInWishlist
              ? t("product.remove_from_wishlist")
              : t("product.add_to_wishlist")
          }
        >
          <Heart
            size={20}
            className={cn(
              "transition-all duration-300 w-5 h-5",
              isWishlistAnimating && "scale-125"
            )}
            fill={isInWishlist ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth={1.5}
          />
        </button>
      </div>

      {/* Info */}
      <div className="p-4 sm:p-5 space-y-1.5">
        <h3 className="font-medium text-foreground text-sm leading-tight line-clamp-1">
          {flower.name}
        </h3>

        <div className="pt-1 flex items-center justify-between">
          <span className="font-medium text-foreground text-sm tracking-wide">
            {formatPrice(flower.price)}
          </span>
          {hasDiscount && (
            <span className="text-xs text-muted/50 line-through">
              {formatPrice(flower.oldPrice!)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
