"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Plus } from "lucide-react";
import { cn, formatPrice, getImageUrl } from "@/lib/utils";
import { ROUTES } from "@/lib/constants";
import type { Flower } from "@/types";

interface FlowerCardProps {
  flower: Flower;
  isInWishlist?: boolean;
  onToggleWishlist?: (flowerId: string) => void;
  priority?: boolean;
}

export function FlowerCard({
  flower,
  isInWishlist = false,
  onToggleWishlist,
  priority = false,
}: FlowerCardProps) {
  const [isImgLoaded, setIsImgLoaded] = useState(false);

  const hasDiscount = flower.oldPrice && flower.oldPrice > flower.price;
  const discountPercent = hasDiscount
    ? Math.round(((flower.oldPrice! - flower.price) / flower.oldPrice!) * 100)
    : 0;

  const priceFormatted = formatPrice(flower.price);

  return (
    <div
      className={cn(
        "group relative overflow-hidden",
        "bg-[#1B1717] rounded-[28px]",
        "shadow-[0_8px_30px_rgba(0,0,0,0.35)]",
        "hover:shadow-[0_16px_48px_rgba(0,0,0,0.5)]",
        "hover:-translate-y-1.5",
        "transition-all duration-500 ease-out",
        "will-change-transform"
      )}
    >
      {/* ── Image Section ── */}
      <Link
        href={ROUTES.CATALOG_DETAIL(flower.id)}
        className="block"
        aria-label={flower.name}
      >
        <div className="relative aspect-[3/4]">
          {flower.images[0] && (
            <>
              {!isImgLoaded && (
                <div className="absolute inset-0 bg-[#2A2522] animate-pulse" />
              )}
              <img
                src={getImageUrl(flower.images[0])}
                alt={flower.name}
                className={cn(
                  "h-full w-full object-cover",
                  "transition-all duration-700 ease-out",
                  "group-hover:scale-105",
                  isImgLoaded ? "opacity-100" : "opacity-0"
                )}
                loading={priority ? "eager" : "lazy"}
                onLoad={() => setIsImgLoaded(true)}
              />
            </>
          )}

          {/* Bottom-to-top gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Discount badge */}
          {hasDiscount && (
            <div
              className={cn(
                "absolute top-4 left-4",
                "px-3 py-1 rounded-full",
                "bg-rose/90 backdrop-blur-md",
                "text-white text-[11px] font-semibold tracking-wide",
                "shadow-lg"
              )}
            >
              -{discountPercent}%
            </div>
          )}
        </div>
      </Link>

      {/* ── Favorite Button ── */}
      {onToggleWishlist && (
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            onToggleWishlist(flower.id);
          }}
          className={cn(
            "absolute top-4 right-4 z-10",
            "w-10 h-10 rounded-full",
            "bg-black/40 backdrop-blur-md",
            "border border-white/15",
            "flex items-center justify-center",
            "transition-all duration-300 ease-out",
            "hover:scale-110 hover:bg-black/60",
            "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2",
            isInWishlist && "bg-rose/30 border-rose/40"
          )}
          aria-label={
            isInWishlist ? "Sevimlilardan olib tashlash" : "Sevimlilarga qo'shish"
          }
        >
          <Heart
            size={18}
            className={cn(
              "transition-all duration-300",
              isInWishlist
                ? "text-rose fill-rose"
                : "text-white/80 group-hover:text-white"
            )}
            strokeWidth={1.8}
          />
        </button>
      )}

      {/* ── Bottom Content Section (overlay on image) ── */}
      <div className="absolute bottom-0 left-0 right-0 px-5 pb-5 pt-8 bg-gradient-to-t from-black/80 via-black/50 to-transparent backdrop-blur-sm">
        {/* Product Name */}
        <h3 className="font-serif text-white text-base sm:text-lg font-medium leading-tight truncate pr-14">
          {flower.name}
        </h3>

        {/* Price */}
        <div className="mt-2">
          <span className="text-gold font-bold text-base sm:text-lg tracking-wide">
            {priceFormatted}
          </span>
          {hasDiscount && (
            <span className="block text-xs text-white/40 line-through mt-0.5">
              {formatPrice(flower.oldPrice!)}
            </span>
          )}
        </div>

        {/* ── Add to Cart Button ── */}
        <button
          type="button"
          className={cn(
            "absolute bottom-5 right-5 z-10",
            "w-12 h-12 rounded-full",
            "bg-white/10 backdrop-blur-md",
            "border border-white/10",
            "flex items-center justify-center",
            "shadow-lg",
            "transition-all duration-300 ease-out",
            "hover:scale-110 hover:bg-white/15",
            "group/btn",
            "focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
          )}
          aria-label="Savatga qo'shish"
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <Plus
            size={22}
            className="text-gold transition-all duration-300 group-hover/btn:text-gold-light group-hover/btn:rotate-90"
            strokeWidth={2}
          />
        </button>
      </div>
    </div>
  );
}
