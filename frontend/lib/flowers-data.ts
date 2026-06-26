/* ── 5 real flowers with Uzbek names ── */
import type { Flower, Category } from "@/types";

const category: Category = { id: "cat1", name: "Buketlar", slug: "bouquets" };

export const FLOWERS: Flower[] = [
  {
    id: "flower-1",
    name: "Nafis Atirgul",
    slug: "nafis-atirgul",
    description:
      "Qo‘lda terilgan eng sara atirgullardan tuzilgan nafis guldasta. Har bir gul alohida ehtiyotkorlik bilan tanlangan. Ushbu guldasta sevgi va ehtiroming eng go‘zal ifodasidir.",
    shortDescription: "Atirgullar malikasi — 25 ta qirmizi atirgul",
    price: 320000,
    oldPrice: 420000,
    images: ["/images/model_1.jpg", "/images/card_1.jpg"],
    category,
    tags: [{ id: "t1", name: "atirgul", slug: "atirgul" }],
    colors: ["qizil"],
    isInStock: true,
    isPopular: true,
    isNew: false,
    rating: 4.9,
    reviewCount: 36,
    createdAt: new Date().toISOString(),
  },
  {
    id: "flower-2",
    name: "Oppoq Liliya",
    slug: "oppoq-liliya",
    description:
      "Oq liliyalardan iborat bu guldasta poklik va go‘zallik ramzidir. Har bir liliya o‘zining nafis hidi va latofati bilan ajralib turadi. Maxsus sovg‘a sifatida aynan mos keladi.",
    shortDescription: "15 ta oppoq liliya — poklik ramzi",
    price: 420000,
    oldPrice: 550000,
    images: ["/images/model_2.jpg", "/images/card_2.jpg"],
    category,
    tags: [{ id: "t2", name: "liliya", slug: "liliya" }],
    colors: ["oq"],
    isInStock: true,
    isPopular: true,
    isNew: true,
    rating: 4.8,
    reviewCount: 24,
    createdAt: new Date().toISOString(),
  },
  {
    id: "flower-3",
    name: "Shohona Lola",
    slug: "shohona-lola",
    description:
      "Gollandiyadan keltirilgan eng sara lolalardan tayyorlangan shohona guldasta. Yorqin ranglardagi lolalar har qanday kayfiyatni ko‘taradi. Bahor nafasini uyingizga olib kiring.",
    shortDescription: "30 ta rang-barang lolalar",
    price: 250000,
    oldPrice: 340000,
    images: ["/images/model_3.jpg", "/images/card_3.jpg"],
    category,
    tags: [{ id: "t3", name: "lola", slug: "lola" }],
    colors: ["sariq", "qizil", "pushti"],
    isInStock: true,
    isPopular: false,
    isNew: false,
    rating: 4.6,
    reviewCount: 18,
    createdAt: new Date().toISOString(),
  },
  {
    id: "flower-4",
    name: "Gulsapsar",
    slug: "gulsapsar",
    description:
      "Xrizantema va boshqa mayda gullardan tuzilgan bu guldasta o‘zining serhashamligi bilan ajralib turadi. Har bir detalga e'tibor bilan yondashilgan. Uzoq vaqt davomida o‘zining go‘zalligini saqlaydi.",
    shortDescription: "Serhasham xrizantemalar — 20 ta",
    price: 350000,
    oldPrice: 460000,
    images: ["/images/model_4.jpg", "/images/card_4.jpg"],
    category,
    tags: [{ id: "t4", name: "xrizantema", slug: "xrizantema" }],
    colors: ["pushti", "oq"],
    isInStock: true,
    isPopular: false,
    isNew: true,
    rating: 4.7,
    reviewCount: 15,
    createdAt: new Date().toISOString(),
  },
  {
    id: "flower-5",
    name: "Prestige Buket",
    slug: "prestige-buket",
    description:
      "Prestige Gallery‘ning eng hashamatli guldastasi. Turli xil elita gullardan tuzilgan bu kompozitsiya eng muhim tadbirlar va kutilmagan syurprizlar uchun mo‘ljallangan. Har bir gul eng yuqori sifat standartlari asosida tanlangan.",
    shortDescription: "Elita gullar assorti — 35 ta",
    price: 580000,
    oldPrice: 750000,
    images: ["/images/model_5.jpg", "/images/card_5.jpg"],
    category,
    tags: [{ id: "t5", name: "premium", slug: "premium" }],
    colors: ["aralash"],
    isInStock: true,
    isPopular: true,
    isNew: false,
    rating: 5.0,
    reviewCount: 42,
    createdAt: new Date().toISOString(),
  },
];

/* ── Helper to get a flower by ID ── */
export function getFlowerById(id: string): Flower | undefined {
  return FLOWERS.find((f) => f.id === id);
}

/* ── Helper to get flowers by category ── */
export function getFlowersByCategory(categorySlug: string): Flower[] {
  if (!categorySlug || categorySlug === "all") return FLOWERS;
  return FLOWERS.filter((f) => f.category.slug === categorySlug);
}
