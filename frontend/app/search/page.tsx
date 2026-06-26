"use client";

import { Suspense } from "react";
import { Search } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/molecules/Footer";
import { SearchBar } from "@/components/molecules/SearchBar";
import { Skeleton } from "@/components/ui/Skeleton";
import { useLanguage } from "@/hooks/useLanguage";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";

function SearchContent() {
  const { t } = useLanguage();
  const cart = useCart();
  const favorites = useFavorites();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-2xl mx-auto mb-10">
        <h1 className="heading-serif text-3xl text-center text-foreground mb-6">
          <em className="text-gold-gradient">{t("search.title")}</em>
        </h1>
        <SearchBar variant="full" className="w-full" />
      </div>

      <div className="text-center text-muted py-20 animate-fade-in">
        <div className="glass-gold inline-flex rounded-full p-6 mb-6">
          <Search size={48} className="text-gold" />
        </div>
        <p className="text-lg text-foreground/70">{t("search.start_typing")}</p>
        <p className="text-sm mt-2 text-muted">{t("search.hint")}</p>
      </div>
    </div>
  );
}

export default function SearchPage() {
  const cart = useCart();
  const favorites = useFavorites();

  return (
    <>
      <Header
        cartItemsCount={cart.totalItems}
        favoritesCount={favorites.favoritesCount}
      />
      <main className="flex-1">
        <Suspense fallback={<div className="p-8"><Skeleton className="h-10 w-64 mx-auto" /></div>}>
          <SearchContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
