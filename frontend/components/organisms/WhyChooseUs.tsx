"use client";

import { motion } from "framer-motion";
import {
  Coins,
  Leaf,
  Gift,
  Star,
  type LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Coins,
  Leaf,
  Gift,
  Star,
};

interface Feature {
  id: string;
  title: string;
  desc: string;
  iconName: string;
}

const features: Feature[] = [
  {
    id: "budget",
    title: "Har qanday byudjet",
    desc: "Hamyoningizga mos guldastani birgalikda tanlaymiz",
    iconName: "Coins",
  },
  {
    id: "fresh",
    title: "Faqat yangi gullar",
    desc: "To‘g‘ridan-to‘g‘ri plantatsiyadan — sifat kafolati",
    iconName: "Leaf",
  },
  {
    id: "custom",
    title: "Individual yondashuv",
    desc: "Sizning didingizga mos noyob kompozitsiya",
    iconName: "Gift",
  },
  {
    id: "prestige",
    title: "Prestige sifat",
    desc: "Har bir gul eng yuqori standart asosida tanlangan",
    iconName: "Star",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 lg:py-28 bg-[#0A0A0A]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-14 space-y-3">
          <p className="font-serif text-[#C8A050] text-sm uppercase tracking-[0.3em] font-light">
            Why Choose Us
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-light">
            The <span className="italic font-medium">Prestige</span> Difference
          </h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.iconName] || Star;
            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.12, ease: "easeOut" }}
                className="bg-[#141414] border border-white/5 rounded-3xl p-6 relative overflow-hidden transition-all duration-500 hover:border-[#C8A050]/50 hover:shadow-[0_0_30px_rgba(200,160,80,0.1)] group"
              >
                {/* Background watermark icon */}
                <Icon
                  className="absolute -right-4 -bottom-4 opacity-[0.05] size-32 text-[#C8A050] pointer-events-none select-none"
                  strokeWidth={1}
                />

                {/* Content — above watermark */}
                <div className="relative z-10 space-y-4">
                  <Icon
                    size={32}
                    className="text-[#C8A050]"
                    strokeWidth={1}
                  />
                  <div className="space-y-1.5">
                    <h3 className="font-serif text-[#C8A050] text-xl">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400 text-xs tracking-wide leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
