"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { OTPForm } from "@/components/molecules/OTPForm";
import { ROUTES } from "@/lib/constants";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSendOTP = async (phone: string) => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
  };

  const handleVerifyOTP = async (phone: string, code: string) => {
    setIsLoading(true);
    // Simulate verification
    await new Promise((r) => setTimeout(r, 1000));
    setIsLoading(false);
    router.push(ROUTES.ACCOUNT);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dark via-dark-secondary to-dark p-4">
      {/* Decorative elements */}
      <div className="fixed top-1/4 -left-20 w-96 h-96 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-1/4 -right-20 w-80 h-80 bg-gold/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-sm">
        <div className="glass rounded-2xl p-8">
          <OTPForm
            onSendOTP={handleSendOTP}
            onVerifyOTP={handleVerifyOTP}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
