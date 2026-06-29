"use client";

import { useEffect } from "react";
import { Flower2 } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-6 px-4 max-w-md">
        <Flower2 size={48} className="text-foreground/20 mx-auto mb-4" />
        <h1 className="heading-serif text-3xl text-foreground">
          Nimadir xato ketdi
        </h1>
        <p className="text-muted text-sm">
          Sahifani yuklashda xatolik yuz berdi. Iltimos, qaytadan urinib ko‘ring.
        </p>
        <Button onClick={reset} variant="primary" size="lg">
          Qaytadan urinish
        </Button>
      </div>
    </div>
  );
}
