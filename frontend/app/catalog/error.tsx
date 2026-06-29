"use client";

import { useEffect } from "react";
import { Flower2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/molecules/Footer";

export default function CatalogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Catalog error:", error);
  }, [error]);

  return (
    <>
      <Header />
      <main className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4 px-4">
          <Flower2 size={48} className="text-foreground/30 mx-auto" />
          <h2 className="heading-serif text-2xl text-foreground">
            Ошибка загрузки каталога
          </h2>
          <p className="text-muted text-sm max-w-sm">
            Не удалось загрузить букеты. Пожалуйста, попробуйте снова.
          </p>
          <Button onClick={reset} variant="primary" size="lg">
            Обновить
          </Button>
        </div>
      </main>
      <Footer />
    </>
  );
}
