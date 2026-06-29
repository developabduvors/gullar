"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { useParams, notFound } from "next/navigation";
import {
  Heart,
  Star,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  Truck,
  CreditCard,
  Clock,
  CheckCircle,
  Minus,
  Plus,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/molecules/Footer";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { ROUTES } from "@/lib/constants";
import { getFlowerById } from "@/lib/flowers-data";
import { formatPrice, cn } from "@/lib/utils";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";

export default function FlowerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const flower = getFlowerById(id);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isDirection, setIsDirection] = useState<"left" | "right">("right");
  const imageRef = useRef<HTMLDivElement>(null);

  const { t } = useLanguage();
  const cart = useCart();
  const favorites = useFavorites();

  if (!flower) {
    notFound();
  }

  const totalPrice = flower.price * quantity;

  const handleAddToCart = useCallback(() => {
    setIsAddedToCart(true);
    cart.addItem(flower, quantity);
    setTimeout(() => setIsAddedToCart(false), 1500);
  }, [cart, flower, quantity]);

  const increaseQuantity = useCallback(() => {
    setQuantity((prev) => Math.min(prev + 1, 99));
  }, []);

  const decreaseQuantity = useCallback(() => {
    setQuantity((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleToggleWishlist = useCallback(() => {
    favorites.toggleFavorite(flower.id);
  }, [favorites, flower.id]);

  const hasDiscount = flower.oldPrice && flower.oldPrice > flower.price;
  const discountPercent = hasDiscount
    ? Math.round(
        ((flower.oldPrice! - flower.price) / flower.oldPrice!) * 100
      )
    : 0;

  const images =
    flower.images.length > 0 ? flower.images : ["/images/placeholder.svg"];
  const isInWishlist = favorites.isFavorite(flower.id);

  const goToPrevImage = useCallback(() => {
    setIsDirection("left");
    setActiveImageIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  }, [images.length]);

  const goToNextImage = useCallback(() => {
    setIsDirection("right");
    setActiveImageIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goToPrevImage();
      if (e.key === "ArrowRight") goToNextImage();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevImage, goToNextImage]);

  // Touch/swipe support
  const touchStartX = useRef(0);
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goToNextImage();
      else goToPrevImage();
    }
  };

  return (
    <>
      <Header
        cartItemsCount={cart.totalItems}
        favoritesCount={favorites.favoritesCount}
      />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted mb-8 overflow-x-auto scrollbar-none whitespace-nowrap">
            <Link
              href={ROUTES.HOME}
              className="hover:text-gold transition-colors"
            >
              {t("nav.home")}
            </Link>
            <span className="text-muted/30">/</span>
            <Link
              href={ROUTES.CATALOG}
              className="hover:text-gold transition-colors"
            >
              {t("nav.catalog")}
            </Link>
            <span className="text-muted/30">/</span>
            <span className="text-foreground truncate max-w-[150px]">
              {flower.name}
            </span>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* ── Image gallery swiper with smooth transitions ── */}
            <div className="space-y-4">
              {/* Main image */}
              <div
                ref={imageRef}
                className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-[#1A1A1A] group shadow-xl shadow-black/30"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
              >
                {/* Image with slide transition */}
                <div className="relative w-full h-full overflow-hidden">
                  {images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${flower.name} — rasm ${index + 1}`}
                      className={cn(
                        "absolute inset-0 h-full w-full object-cover",
                        "transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]",
                        index === activeImageIndex
                          ? "opacity-100 scale-100 translate-x-0"
                          : index < activeImageIndex
                            ? "opacity-0 scale-95 -translate-x-8"
                            : "opacity-0 scale-95 translate-x-8"
                      )}
                      style={{
                        transitionDelay:
                          index === activeImageIndex ? "50ms" : "0ms",
                      }}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  ))}
                </div>

                {/* Glass navigation arrows - always visible on mobile */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={goToPrevImage}
                      className="absolute left-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-xl text-white/80 hover:text-white hover:bg-gold transition-all duration-300 cursor-pointer z-10 opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 opacity-100 md:opacity-0 shadow-lg border border-white/10"
                      aria-label="Oldingi rasm"
                    >
                      <ChevronLeft size={20} />
                    </button>
                    <button
                      onClick={goToNextImage}
                      className="absolute right-3 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/40 backdrop-blur-xl text-white/80 hover:text-white hover:bg-gold transition-all duration-300 cursor-pointer z-10 opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 opacity-100 md:opacity-0 shadow-lg border border-white/10"
                      aria-label="Keyingi rasm"
                    >
                      <ChevronRight size={20} />
                    </button>
                  </>
                )}

                {/* Glass image counter */}
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3.5 py-1.5 rounded-full glass backdrop-blur-md text-white text-xs font-medium z-10 border border-white/10">
                    {activeImageIndex + 1} / {images.length}
                  </div>
                )}

                {/* Badges overlay */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                  {flower.isNew && (
                    <Badge variant="new" size="sm" className="backdrop-blur-md">
                      {t("product.new")}
                    </Badge>
                  )}
                  {hasDiscount && (
                    <Badge variant="sale" size="sm" className="backdrop-blur-md">
                      -{discountPercent}%
                    </Badge>
                  )}
                  {flower.isPopular && (
                    <Badge variant="gold" size="sm" className="backdrop-blur-md">
                      {t("product.popular")}
                    </Badge>
                  )}
                </div>

                {/* Wishlist button */}
                <button
                  onClick={handleToggleWishlist}
                  className={cn(
                    "absolute top-3 right-3 p-2 rounded-full",
                    "transition-all duration-300 cursor-pointer z-10",
                    "hover:bg-zinc-100",
                    isInWishlist ? "text-red-500" : "text-white/60"
                  )}
                  aria-label={
                    isInWishlist
                      ? t("product.remove_from_wishlist")
                      : t("product.add_to_wishlist")
                  }
                >
                  <Heart
                    size={20}
                    className="transition-all duration-300 w-5 h-5"
                    fill={isInWishlist ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth={1.5}
                  />
                </button>
              </div>

              {/* Thumbnail strip with glass effect */}
              {images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {images.map((img, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        setIsDirection(
                          index > activeImageIndex ? "right" : "left"
                        );
                        setActiveImageIndex(index);
                      }}
                      className={cn(
                        "flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 cursor-pointer",
                        index === activeImageIndex
                          ? "border-gold ring-2 ring-gold/30 scale-105 shadow-gold"
                          : "border-white/10 opacity-50 hover:opacity-100 hover:border-white/30"
                      )}
                    >
                      <img
                        src={img}
                        alt={`${flower.name} thumbnail ${index + 1}`}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── Info ── */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="heading-serif text-3xl sm:text-4xl text-foreground">
                  {flower.name}
                </h1>
                <p className="text-muted leading-relaxed">
                  {flower.description}
                </p>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-4xl font-bold text-gold-gradient">
                  {formatPrice(flower.price)}
                </span>
                {hasDiscount && (
                  <span className="text-lg text-muted line-through">
                    {formatPrice(flower.oldPrice!)}
                  </span>
                )}
                {hasDiscount && (
                  <Badge variant="sale" size="md">
                    -{discountPercent}%
                  </Badge>
                )}
              </div>

              {/* Rating */}
              {flower.rating > 0 && (
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={cn(
                          i < Math.round(flower.rating)
                            ? "fill-gold text-gold"
                            : "fill-none text-muted/30"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted">
                    {flower.rating} ({flower.reviewCount}{" "}
                    {t("product.reviews")})
                  </span>
                </div>
              )}

              {/* Category & Tags */}
              <div className="flex gap-2 flex-wrap">
                {flower.category && (
                  <Badge variant="cream">{flower.category.name}</Badge>
                )}
                {flower.tags?.map((tag) => (
                  <Badge key={tag.id} variant="default">
                    #{tag.name}
                  </Badge>
                ))}
              </div>

              {/* Quantity & Total */}
              <div className="flex items-center justify-between gap-4 py-2">
                <div className="flex items-center gap-0.5">
                  <button
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-foreground/70 hover:text-gold hover:bg-gold/10 border border-white/10 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Kamaytirish"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="w-8 text-center text-base font-bold text-foreground">
                    {quantity}
                  </span>
                  <button
                    onClick={increaseQuantity}
                    disabled={quantity >= 99}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 text-foreground/70 hover:text-gold hover:bg-gold/10 border border-white/10 transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    aria-label="Ko‘paytirish"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-muted uppercase tracking-wider">{t("cart.total")}</p>
                  <p className="text-lg sm:text-xl font-bold text-gold-gradient">{formatPrice(totalPrice)}</p>
                </div>
              </div>

              {/* Action buttons — unified set */}
              <div className="border-t border-white/10 pt-4">
                <div className="flex flex-row items-center gap-4">
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleAddToCart}
                    isLoading={isAddedToCart}
                    className="flex-1 md:flex-none h-full"
                  >
                    <ShoppingCart size={16} className="w-4 h-4" />
                    {isAddedToCart
                      ? t("product.added")
                      : t("product.add_to_cart")}
                  </Button>
                  <button
                    onClick={handleToggleWishlist}
                    className={cn(
                      "flex items-center justify-center h-full",
                      "border border-zinc-700 p-3 rounded-lg",
                      "hover:bg-zinc-800 transition-all duration-300 cursor-pointer",
                      isInWishlist ? "text-red-500 border-red-500/30" : "text-zinc-400"
                    )}
                    aria-label={
                      isInWishlist
                        ? t("product.remove_from_wishlist")
                        : t("product.add_to_wishlist")
                    }
                  >
                    <Heart
                      size={20}
                      className="transition-all duration-300 w-5 h-5"
                      fill={isInWishlist ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth={1.5}
                    />
                  </button>
                </div>
              </div>

              {/* Delivery info */}
              <div className="glass rounded-2xl p-5 space-y-4">
                <h3 className="font-semibold text-foreground text-sm flex items-center gap-2">
                  <Truck size={16} className="text-gold" />
                  {t("product.delivery_info")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    {
                      icon: (
                        <Clock size={14} className="text-gold shrink-0" />
                      ),
                      text: t("product.delivery_hours"),
                    },
                    {
                      icon: (
                        <CheckCircle
                          size={14}
                          className="text-green shrink-0"
                        />
                      ),
                      text: t("product.delivery_free"),
                    },
                    {
                      icon: (
                        <CreditCard
                          size={14}
                          className="text-gold shrink-0"
                        />
                      ),
                      text: t("product.payment"),
                    },
                  ].map((item) => (
                    <div
                      key={item.text}
                      className="flex items-center gap-2 text-sm text-muted"
                    >
                      {item.icon}
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Share */}
              <div className="flex items-center gap-2 text-xs text-muted">
                <span>Share:</span>
                <button className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-gold/10 hover:text-gold transition-all cursor-pointer">
                  Telegram
                </button>
                <button className="px-2.5 py-1 rounded-lg bg-white/5 hover:bg-gold/10 hover:text-gold transition-all cursor-pointer">
                  Instagram
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
