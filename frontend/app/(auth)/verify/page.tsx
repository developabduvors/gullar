"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { OTPForm } from "@/components/molecules/OTPForm";
import { ROUTES } from "@/lib/constants";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/molecules/Footer";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";

function VerifyContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const cart = useCart();
  const favorites = useFavorites();

  const handleSendOTP = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
  };

  const handleVerifyOTP = async (_phone: string, _code: string) => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    router.push(ROUTES.ACCOUNT);
  };

  return (
    <main className="flex-1 flex items-center justify-center py-16">
      <div className="fixed top-1/4 -left-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 -right-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-sm px-4">
        <div className="glass rounded-2xl p-8 border border-white/5 shadow-xl">
          <OTPForm
            onSendOTP={handleSendOTP}
            onVerifyOTP={handleVerifyOTP}
            isLoading={isLoading}
          />
        </div>
      </div>
    </main>
  );
}

export default function VerifyPage() {
  const cart = useCart();
  const favorites = useFavorites();

  return (
    <>
      <Header
        cartItemsCount={cart.totalItems}
        favoritesCount={favorites.favoritesCount}
      />
      <Suspense fallback={<div className="flex-1" />}>
        <VerifyContent />
      </Suspense>
      <Footer />
    </>
  );
}
