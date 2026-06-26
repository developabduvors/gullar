import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin, Send } from "lucide-react";

/* Instagram SVG — brand icon removed from lucide-react v1+ */
function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}
import { BRAND, ROUTES } from "@/lib/constants";

const FOOTER_LINKS = {
  catalog: {
    title: "Katalog",
    links: [
      { label: "Barcha guldastalar", href: ROUTES.CATALOG },
      { label: "Mono guldastalar", href: `${ROUTES.CATALOG}?category=mono` },
      { label: "Premium", href: `${ROUTES.CATALOG}?category=premium` },
      { label: "Sovg‘alar", href: `${ROUTES.CATALOG}?category=gifts` },
    ],
  },
  info: {
    title: "Ma'lumot",
    links: [
      { label: "Biz haqimizda", href: "#" },
      { label: "Yetkazib berish", href: "#" },
      { label: "To‘lov", href: "#" },
      { label: "Qaytarish", href: "#" },
    ],
  },
  account: {
    title: "Shaxsiy kabinet",
    links: [
      { label: "Profil", href: ROUTES.ACCOUNT },
      { label: "Sevimlilar", href: ROUTES.ACCOUNT_FAVORITES },
      { label: "Buyurtmalar", href: ROUTES.ACCOUNT_ORDERS },
      { label: "Tadbirlar", href: ROUTES.ACCOUNT_EVENTS },
    ],
  },
};

export function Footer() {
  return (
    <footer className="bg-[#0A0A0A] border-t border-[#FDFBF7]/5 mt-auto">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="lg:col-span-2 space-y-5">
            <Link href={ROUTES.HOME} className="inline-flex items-center gap-2.5 group">
              <div className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-gold/30 group-hover:ring-gold/60 transition-all duration-300">
                <Image
                  src="/logo.jpg"
                  alt={BRAND.name}
                  fill
                  className="object-cover"
                />
              </div>
              <span className="heading-serif text-lg text-[#FDFBF7] group-hover:text-gold transition-colors tracking-wide uppercase">
                {BRAND.name}
              </span>
            </Link>

            <p className="text-[#FDFBF7]/40 text-sm leading-relaxed max-w-sm">
              {BRAND.tagline}. Har kuni soat 9:00 dan 21:00 gacha ishlaymiz. 
              Manzil: {BRAND.address}.
            </p>

            {/* Contact info */}
            <div className="space-y-2 text-sm">
              <a
                href={`tel:${BRAND.phone.replace(/\s/g, "")}`}
                className="flex items-center gap-2 text-[#FDFBF7]/50 hover:text-gold transition-colors"
              >
                <Phone size={16} />
                {BRAND.phone}
              </a>
              <span className="flex items-center gap-2 text-[#FDFBF7]/50">
                <MapPin size={16} />
                {BRAND.address}
              </span>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3">
              <a
                href={BRAND.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#FDFBF7]/5 text-[#FDFBF7]/50 hover:text-gold hover:bg-gold/10 transition-all duration-300"
                aria-label="Telegram"
              >
                <Send size={18} />
              </a>
              <a
                href={BRAND.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-full bg-[#FDFBF7]/5 text-[#FDFBF7]/50 hover:text-gold hover:bg-gold/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <InstagramIcon size={18} />
              </a>
            </div>
          </div>

          {/* Link columns */}
          {Object.values(FOOTER_LINKS).map((section) => (
            <div key={section.title}>
              <h3 className="text-[#FDFBF7]/80 font-semibold text-sm mb-4 uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[#FDFBF7]/40 hover:text-gold text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[#FDFBF7]/20 text-xs">
            &copy; {new Date().getFullYear()} {BRAND.name}. Barcha huquqlar himoyalangan.
          </p>
          <p className="text-[#FDFBF7]/20 text-xs">
            Buyurtma uchun: <a href="https://t.me/prestigegallery_uz" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">@prestigegallery_uz</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
