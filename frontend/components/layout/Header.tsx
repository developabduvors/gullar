"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  Search,
  ShoppingBag,
  User,
  Menu,
  X,
  Globe,
  ChevronDown,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES, BRAND } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SearchOverlay } from "@/components/molecules/SearchOverlay";
import { useLanguage, type Language } from "@/hooks/useLanguage";
import { useScrollDirection } from "@/hooks/useScrollDirection";

const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "uz", label: "O‘zbek", flag: "🇺🇿" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
];

interface HeaderProps {
  cartItemsCount?: number;
  favoritesCount?: number;
  isAuthenticated?: boolean;
}

export function Header({
  cartItemsCount = 0,
  favoritesCount = 0,
  isAuthenticated = false,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { language, setLanguage, t } = useLanguage();

  const NAV_LINKS = [
    { href: ROUTES.HOME, label: t("nav.home") },
    { href: ROUTES.CATALOG, label: t("nav.catalog") },
    { href: ROUTES.ACCOUNT_EVENTS, label: t("nav.events") },
    {
      href: "https://t.me/prestigegallery_uz",
      label: t("nav.order"),
      external: true,
    },
  ];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langRef.current && !langRef.current.contains(event.target as Node)) {
        setIsLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];
  const scrollDirection = useScrollDirection();
  const isHeaderHidden = scrollDirection === "down";

  return (
    <>
      <header className={cn("fixed top-0 left-0 w-full z-50 bg-[#0A0A0A]/80 backdrop-blur-md border-b border-white/5", "transition-transform duration-[400ms] ease-in-out", isHeaderHidden && "-translate-y-full")}>
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-8 lg:px-12">
          {/* Logo */}
          <Link
            href={ROUTES.HOME}
            className="flex items-center gap-2.5 sm:gap-3 group shrink-0"
          >
            <div className="relative h-8 w-8 sm:h-9 sm:w-9 overflow-hidden rounded-full ring-2 ring-gold/20 group-hover:ring-gold/50 transition-all duration-300">
              <Image
                src="/logo.jpg"
                alt={BRAND.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            <span className="text-xs sm:text-sm font-bold text-foreground tracking-wide group-hover:text-gold transition-colors duration-300 uppercase hidden xs:inline">
              {BRAND.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center">
            <ul className="flex gap-6 lg:gap-8">
              {NAV_LINKS.map((link) =>
                link.external ? (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm uppercase tracking-widest font-light text-gold hover:text-gold/80 transition-all duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "text-sm uppercase tracking-widest font-light transition-all duration-300",
                        pathname === link.href
                          ? "text-gold"
                          : "text-foreground/60 hover:text-gold"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Language Dropdown */}
            <div ref={langRef} className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1.5 px-2.5 py-2 rounded-full text-foreground/50 hover:text-gold hover:bg-gold/5 transition-all duration-200 cursor-pointer"
                aria-label="Tilni tanlash"
              >
                <Globe size={16} />
                <span className="text-xs font-medium hidden sm:inline">
                  {language.toUpperCase()}
                </span>
                <ChevronDown
                  size={12}
                  className={cn(
                    "transition-transform duration-200 hidden sm:block",
                    isLangOpen && "rotate-180"
                  )}
                />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 min-w-[140px] animate-slide-down z-50">
                  <div className="glass-dark rounded-xl border border-white/10 overflow-hidden shadow-xl">
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setIsLangOpen(false);
                        }}
                        className={cn(
                          "w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-all duration-150 cursor-pointer",
                          language === lang.code
                            ? "text-gold bg-gold/10"
                            : "text-foreground/70 hover:text-gold hover:bg-gold/5"
                        )}
                      >
                        <span className="text-base">{lang.flag}</span>
                        <span className="font-medium">{lang.label}</span>
                        {language === lang.code && (
                          <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2.5 rounded-full text-foreground/50 hover:text-gold hover:bg-gold/5 transition-all duration-200 cursor-pointer"
              aria-label={t("nav.search")}
            >
              <Search size={20} />
            </button>

            {/* Favorites */}
            <Link
              href={ROUTES.ACCOUNT_FAVORITES}
              className="relative p-2.5 rounded-full text-foreground/50 hover:text-gold hover:bg-gold/5 transition-all duration-200"
              aria-label={t("nav.favorites")}
            >
              <Heart size={20} />
              {favoritesCount > 0 && (
                <Badge
                  variant="sale"
                  size="sm"
                  className="absolute -top-1 -right-1 min-w-[16px] h-[16px] flex items-center justify-center p-0 text-[9px]"
                >
                  {favoritesCount > 99 ? "99+" : favoritesCount}
                </Badge>
              )}
            </Link>

            {/* Cart */}
            <Link
              href={ROUTES.CART}
              className="relative p-2.5 rounded-full text-foreground/50 hover:text-gold hover:bg-gold/5 transition-all duration-200"
              aria-label={t("nav.cart")}
            >
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && (
                <Badge
                  variant="gold"
                  size="sm"
                  className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center p-0 text-[10px]"
                >
                  {cartItemsCount > 99 ? "99+" : cartItemsCount}
                </Badge>
              )}
            </Link>

            {/* Auth / Profile */}
            {isAuthenticated ? (
              <Link
                href={ROUTES.ACCOUNT}
                className="p-2.5 rounded-full text-foreground/50 hover:text-gold hover:bg-gold/5 transition-all duration-200"
                aria-label={t("nav.profile")}
              >
                <User size={20} />
              </Link>
            ) : (
              <Link
                href={ROUTES.LOGIN}
                className="flex items-center gap-2 px-6 py-2 rounded-sm text-xs uppercase tracking-[0.2em] text-foreground/50 border border-white/10 bg-transparent hover:bg-white/10 hover:text-white transition-all duration-500"
              >
                <User size={16} />
                <span>{t("nav.login")}</span>
              </Link>
            )}

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-full text-foreground/50 hover:text-gold hover:bg-gold/5 transition-all duration-200 cursor-pointer"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="bg-[#0A0A0A]/95 backdrop-blur-md border-t border-white/5 md:hidden animate-slide-down">
            <div className="px-4 sm:px-8 py-6 space-y-2">
              {/* Language selector in mobile */}
              <div className="flex items-center gap-2 px-4 py-3 mb-4 glass rounded-xl">
                <Globe size={16} className="text-gold" />
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setIsMobileMenuOpen(false);
                    }}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-sm transition-all duration-200 cursor-pointer",
                      language === lang.code
                        ? "bg-gold/20 text-gold font-medium"
                        : "text-foreground/50 hover:text-foreground"
                    )}
                  >
                    {lang.flag} {lang.label}
                  </button>
                ))}
              </div>

              {NAV_LINKS.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block px-4 py-3 rounded-xl text-sm uppercase tracking-widest font-light text-gold bg-gold/5"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={cn(
                      "block px-4 py-3 rounded-xl text-sm uppercase tracking-widest font-light transition-all duration-200",
                      pathname === link.href
                        ? "text-gold bg-gold/5"
                        : "text-foreground/60 hover:text-gold hover:bg-gold/5"
                    )}
                  >
                    {link.label}
                  </Link>
                )
              )}
            </div>
          </div>
        )}
      </header>

      {/* Search overlay */}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
