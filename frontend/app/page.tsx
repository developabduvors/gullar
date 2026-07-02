"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  MapPin,
  Phone,
  Send,
  Flower2,
  Sparkles,
} from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/molecules/Footer";
import { FlowerCard } from "@/components/molecules/FlowerCard";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { FlowerCardSkeleton } from "@/components/ui/Skeleton";
import { WhyChooseUs } from "@/components/organisms/WhyChooseUs";
import { ROUTES, BRAND } from "@/lib/constants";
import { FLOWERS } from "@/lib/flowers-data";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useLanguage();
  const cart = useCart();
  const favorites = useFavorites();

  return (
    <>
      <Header
        cartItemsCount={cart.totalItems}
        favoritesCount={favorites.favoritesCount}
      />

      <main className="flex-1">
        {/* ── Hero Section — Prestige Gallery Luxury ── */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden -mt-20 pt-20">
          {/* HD floral background */}
          <div className="absolute inset-0">
            <Image
              src="/images/hero.png"
              alt="Prestige Gallery — Artisanal Luxury Florists"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
          </div>

          {/* Soft golden lighting overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/40 backdrop-blur-sm" />

          {/* Centered content — airy, expensive */}
          <div className="relative z-10 mx-auto max-w-5xl px-6 sm:px-8 lg:px-12 py-24 lg:py-32 w-full">
            <div className="flex flex-col items-center text-center gap-10">
              {/* Brand name — elegant serif, lighter weight */}
              <p className="font-serif text-sm sm:text-base tracking-[0.3em] text-white/70 font-light uppercase">
                PRESTIGE GALLERY
              </p>

              {/* Headline — single impactful phrase */}
              <h1 className="font-serif text-5xl sm:text-6xl lg:text-8xl text-white leading-[1.05] font-light">
                ARTISANAL
                <br />
                <span className="italic font-medium">LUXURY</span> FLORISTS
              </h1>

              {/* Divider — thin gold line */}
              <div className="w-16 h-px bg-yellow-600/40" />

              {/* CTA — dark coffee bg for readability */}
              <div className="pt-4 ">
                <Link
                  href={ROUTES.CATALOG}
                  className="inline-block bg-[#3a3842a2] px-12 py-4 text-sm uppercase tracking-widest text-[#ffffff] font-light hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(234,179,8,0.25)] hover:bg-[#311b12] transition-all duration-500 "
                >
                  EXPLORE COLLECTION
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Featured Flowers Grid with glass header ── */}
        <section className="py-16 lg:py-24 bg-background relative">
          {/* Section glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gold/3 blur-3xl rounded-full" />
          
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
            <div className="flex items-end justify-between mb-10">
              <div className="space-y-3">
                <Badge variant="gold" className="glass-gold">
                  <Sparkles size={12} />
                  {t("product.popular")}
                </Badge>
                <h2 className="heading-serif text-3xl sm:text-4xl text-foreground">
                  <em className="text-gold-gradient">{t("product.popular")}</em> guldastalar
                </h2>
                <p className="text-white/40 max-w-md text-sm">
                  Mijozlarimizning eng sevimli kompozitsiyalari
                </p>
              </div>
              <Link
                href={ROUTES.CATALOG}
                className="hidden sm:inline-flex items-center gap-1 text-sm text-gold hover:text-gold-light transition-colors font-medium"
              >
                {t("catalog.show_all")}
                <ArrowRight size={16} />
              </Link>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {Array.from({ length: 5 }).map((_, i) => (
                  <FlowerCardSkeleton key={i} />
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {FLOWERS.map((flower) => (
                  <FlowerCard
                    key={flower.id}
                    flower={flower}
                    priority={flower.id === "flower-1"}
                    isInWishlist={favorites.isFavorite(flower.id)}
                    onToggleWishlist={favorites.toggleFavorite}
                  />
                ))}
              </div>
            )}

            <div className="mt-8 text-center sm:hidden">
              <Link href={ROUTES.CATALOG}>
                <Button variant="outline" size="sm">{t("catalog.all_bouquets")}</Button>
              </Link>
            </div>
          </div>
        </section>

        {/* ── Why Choose Us — Luxury Bento Grid ── */}
        <WhyChooseUs />

        {/* ── Contact CTA with premium glass ── */}
        <section className="py-20 lg:py-28 bg-background relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gold/3 rounded-full blur-3xl" />
          
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center space-y-8 relative">
            <div className="glass-gold inline-flex rounded-full p-5 border border-gold/20 shadow-gold animate-gold-pulse">
              <Flower2 size={40} className="text-gold" />
            </div>
            <h2 className="heading-serif-mix text-3xl sm:text-4xl lg:text-5xl text-foreground">
              <em className="text-gold-gradient">Alohida</em> guldasta kerakmi?
            </h2>
            <p className="text-white/50 text-lg max-w-lg mx-auto">
              Bog‘laning — siz uchun maxsus kompozitsiya tayyorlaymiz
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full">
              <a
                href="https://t.me/prestigegallery_uz"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-fit"
              >
                <Button variant="primary" size="lg" className="w-full">
                  <Send size={16} className="w-4 h-4" />
                  Telegramda yozish
                </Button>
              </a>
              <a href={`tel:${BRAND.phone.replace(/\s/g, "")}`} className="w-full sm:w-fit">
                <Button variant="outline" size="lg" className="w-full">
                  <Phone size={16} className="w-4 h-4" />
                  Qo‘ng‘iroq qilish
                </Button>
              </a>
            </div>
            
            {/* Contact info glass card */}
            <div className="glass inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 rounded-2xl px-6 py-4 mx-auto border border-white/5">
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-gold shrink-0" />
                <span className="text-xs sm:text-sm text-white/60">{BRAND.address}</span>
              </div>
              <div className="w-px h-4 bg-white/10 hidden sm:block" />
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-gold shrink-0" />
                <span className="text-xs sm:text-sm text-white/60">{BRAND.phone}</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );

}

