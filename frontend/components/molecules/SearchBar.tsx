"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { useSearch } from "@/hooks/useSearch";
import { ROUTES } from "@/lib/constants";
import { cn, formatPrice, getImageUrl } from "@/lib/utils";
import { SearchSkeleton } from "@/components/ui/Skeleton";

interface SearchBarProps {
  variant?: "navbar" | "full";
  className?: string;
}

export function SearchBar({ variant = "full", className }: SearchBarProps) {
  const { query, results, isSearching, isOpen, setQuery, closeSearch } = useSearch();
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        closeSearch();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [closeSearch]);

  return (
    <div ref={dropdownRef} className={cn("relative", className)}>
      <div className="relative">
        <Search
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
          size={18}
        />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск букетов..."
          className={cn(
            "w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5",
            "text-foreground placeholder:text-muted/50",
            "transition-all duration-200",
            "focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold",
            variant === "navbar" && "h-9 text-sm rounded-lg",
            isOpen && "rounded-b-none border-b-0"
          )}
          aria-label="Search flowers"
          aria-expanded={isOpen}
          aria-controls="search-dropdown"
        />
      </div>

      {/* Dropdown */}
      {isOpen && query.length >= 2 && (
        <div
          id="search-dropdown"
          className={cn(
            "absolute top-full left-0 right-0 z-dropdown",
            "bg-card border border-t-0 border-border rounded-b-xl",
            "shadow-xl animate-scale-in overflow-hidden"
          )}
        >
          {isSearching ? (
            <SearchSkeleton />
          ) : results.length > 0 ? (
            <div className="py-2">
              {results.map((flower) => (
                <Link
                  key={flower.id}
                  href={`${ROUTES.CATALOG}/${flower.id}`}
                  onClick={closeSearch}
                  className="flex items-center gap-3 px-4 py-2.5 hover:bg-foreground/5 transition-colors"
                >
                  <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    {flower.images[0] && (
                      <img
                        src={getImageUrl(flower.images[0])}
                        alt={flower.name}
                        className="h-full w-full object-cover"
                        loading="lazy"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {flower.name}
                    </p>
                    <p className="text-xs text-muted">
                      {formatPrice(flower.price)}
                    </p>
                  </div>
                </Link>
              ))}
              <Link
                href={`${ROUTES.SEARCH}?q=${encodeURIComponent(query)}`}
                onClick={closeSearch}
                className="block px-4 py-3 text-center text-sm text-gold border-t border-border hover:bg-gold/5 transition-colors font-medium"
              >
                Все результаты ({results.length})
              </Link>
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-sm text-muted">
              Ничего не найдено
            </div>
          )}
        </div>
      )}
    </div>
  );
}
