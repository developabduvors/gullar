"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FLOWERS } from "@/lib/flowers-data";
import { ROUTES } from "@/lib/constants";
import { formatPrice, getImageUrl } from "@/lib/utils";
import type { Flower } from "@/types";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const results = query.trim()
    ? FLOWERS.filter(
        (flower) =>
          flower.name.toLowerCase().includes(query.toLowerCase()) ||
          flower.shortDescription?.toLowerCase().includes(query.toLowerCase())
      )
    : FLOWERS;

  const handleSelect = useCallback(
    (flower: Flower) => {
      onClose();
      router.push(ROUTES.CATALOG_DETAIL(flower.id));
    },
    [onClose, router]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", onKeyDown);
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 150);
    } else {
      setQuery("");
    }

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — keeps focus on search */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Floating glass card — centered below header */}
          <motion.div
            ref={cardRef}
            initial={{ y: -20, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-full max-w-lg mx-auto px-4"
          >
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-xl">
              {/* Input row — same glass aesthetic */}
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
                />
                <input
                  ref={inputRef}
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Gullarni qidirish..."
                  className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-zinc-100 text-sm font-light tracking-wide placeholder:text-zinc-500 focus:outline-none focus:border-white/20 transition-colors"
                />
                <button
                  onClick={onClose}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-zinc-500 hover:text-zinc-300"
                  aria-label="Yopish"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Results list — inside the glass card */}
              <div className="mt-3 max-h-[55vh] overflow-y-auto scrollbar-none -mx-1 px-1">
                {results.length > 0 ? (
                  <div className="space-y-0.5">
                    {results.map((flower) => (
                      <button
                        key={flower.id}
                        onClick={() => handleSelect(flower)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-2xl hover:bg-white/5 transition-colors text-left cursor-pointer group"
                      >
                        {/* Thumbnail */}
                        <div className="relative w-10 h-12 rounded-xl overflow-hidden bg-white/5 shrink-0">
                          <img
                            src={getImageUrl(flower.images[0])}
                            alt={flower.name}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-zinc-200 truncate group-hover:text-white transition-colors">
                            {flower.name}
                          </p>
                          {flower.shortDescription && (
                            <p className="text-xs text-zinc-500 truncate mt-0.5">
                              {flower.shortDescription}
                            </p>
                          )}
                        </div>
                        {/* Price */}
                        <span className="text-sm font-medium text-zinc-400 shrink-0">
                          {formatPrice(flower.price)}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-sm text-zinc-500">Hech narsa topilmadi</p>
                  </div>
                )}

                {/* Count */}
                {results.length > 0 && (
                  <div className="text-center pt-2 pb-0.5">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-600">
                      {results.length} guldasta
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
