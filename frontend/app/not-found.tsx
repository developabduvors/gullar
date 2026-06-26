import Link from "next/link";
import { Flower2 } from "lucide-react";
import { ROUTES } from "@/lib/constants";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-dark">
      <div className="text-center space-y-6 px-4">
        <Flower2 size={80} className="text-[#FDFBF7]/10 mx-auto mb-6" />
        <h1 className="heading-serif text-5xl text-cream">404</h1>
        <p className="text-cream/50 text-lg max-w-md mx-auto">
          Sahifa topilmadi. Balki guldastani kimdir olib ketgan?
        </p>
        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gold text-dark font-semibold hover:bg-gold-light transition-colors"
        >
          Bosh sahifaga
        </Link>
      </div>
    </div>
  );
}
