"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  createElement,
  type ReactNode,
} from "react";

export type Language = "uz" | "ru";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  uz: {
    // Nav
    "nav.home": "Bosh sahifa",
    "nav.catalog": "Katalog",
    "nav.events": "Tadbirlar",
    "nav.order": "Buyurtma",
    "nav.login": "Kirish",
    "nav.search": "Qidirish",
    "nav.cart": "Savat",
    "nav.profile": "Profil",
    "nav.favorites": "Sevimlilar",

    // Hero
    "hero.badge": "Byudjetingizga mos guldasta tayyorlab beramiz",
    "hero.title.part1": "Prestige",
    "hero.title.part2": "Gallery",
    "hero.subtitle":
      "Eng yangi gullar eng qulay narxlarda. Har bir guldastaga individual yondashuv.",
    "hero.cta.catalog": "Guldasta tanlash",
    "hero.cta.telegram": "Telegramda buyurtma",
    "hero.contact.address": "Шота Руставели 36",
    "hero.contact.telegram": "@prestigegallery_uz",
    "hero.scroll": "Pastga",

    // Catalog
    "catalog.title": "Guldastalar katalogi",
    "catalog.subtitle": "Har qanday tadbir uchun ideal guldastani tanlang",
    "catalog.filters": "Filtrlash",
    "catalog.filter.price": "Narx",
    "catalog.filter.from": "Dan",
    "catalog.filter.to": "Gacha",
    "catalog.filter.sort": "Saralash",
    "catalog.sort.default": "Standart",
    "catalog.sort.price_asc": "Narx (o‘sish)",
    "catalog.sort.price_desc": "Narx (kamayish)",
    "catalog.sort.rating": "Reyting bo‘yicha",
    "catalog.sort.newest": "Yangi",
    "catalog.sort.popular": "Ommabop",
    "catalog.category.all": "Barchasi",
    "catalog.category.mono": "Mono guldastalar",
    "catalog.category.premium": "Mualliflik",
    "catalog.category.gifts": "Sovg‘alar",
    "catalog.category.seasonal": "Mavsumiy",
    "catalog.show_all": "Hammasini ko‘rish",
    "catalog.all_bouquets": "Barcha guldastalar",
    "catalog.found": "topildi",
    "catalog.empty": "Hech narsa topilmadi",
    "catalog.empty_desc": "Boshqa filtrlarni sinab ko‘ring",

    // Product Card
    "product.add_to_cart": "Savatga",
    "product.added": "Qo‘shildi!",
    "product.in_cart": "Savatda",
    "product.add_to_wishlist": "Sevimlilarga qo‘shish",
    "product.remove_from_wishlist": "Sevimlilardan olib tashlash",
    "product.new": "Yangi",
    "product.popular": "Ommabop",
    "product.discount": "Chegirma",
    "product.reviews": "ta sharh",
    "product.delivery_info": "Yetkazib berish ma'lumotlari",
    "product.delivery_hours": "Yetkazib berish: 9:00 – 21:00",
    "product.delivery_free": "Bepul yetkazib berish",
    "product.payment": "To‘lov: naqd / plastik karta / terminal",

    // Filter colors
    "filter.color": "Rang",
    "filter.color.qizil": "Qizil",
    "filter.color.oq": "Oq",
    "filter.color.pushti": "Pushti",
    "filter.color.sariq": "Sariq",
    "filter.color.aralash": "Aralash",
    "filter.clear": "Tozalash",
    "filter.clear_all": "Filtrlarni tozalash",

    // Cart
    "cart.title": "Savat",
    "cart.empty": "Savat bo‘sh",
    "cart.empty_desc": "Buyurtma berish uchun guldastalarni savatga qo‘shing",
    "cart.go_catalog": "Katalogga o‘tish",
    "cart.total": "Jami",
    "cart.items": "ta mahsulot",
    "cart.delivery": "Yetkazib berish",
    "cart.free": "Bepul",
    "cart.to_pay": "To‘lov",
    "cart.checkout": "Buyurtma berish",
    "cart.continue": "Xaridni davom ettirish",
    "cart.remove": "O‘chirish",
    "cart.quantity": "Soni",

    // Favorites
    "favorites.title": "Sevimlilar",
    "favorites.empty": "Sevimlilar bo‘sh",
    "favorites.empty_desc": "Guldastalarni sevimlilarga qo‘shing",
    "favorites.go_catalog": "Katalogga o‘tish",

    // Search
    "search.title": "Guldasta qidirish",
    "search.placeholder": "Guldasta nomini kiriting...",
    "search.hint": "Masalan: atirgul, liliya, lola",
    "search.start_typing": "Qidirishni boshlang",
    "search.no_results": "Hech narsa topilmadi",

    // Account
    "account.title": "Shaxsiy kabinet",
    "account.subtitle": "Profil va buyurtmalaringizni boshqaring",
    "account.active_orders": "Faol buyurtmalar",
    "account.favorites": "Sevimlilar",
    "account.events": "Tadbirlar",
    "account.bonuses": "Bonuslar",
    "account.recent_orders": "Oxirgi buyurtmalar",
    "account.no_orders": "Hali buyurtmalaringiz yo‘q",
    "account.profile": "Profil",
    "account.orders": "Buyurtmalar",
    "account.orders_list": "Buyurtmalar ro‘yxati",
    "account.events_list": "Tadbirlar taqvimi",

    // Footer
    "footer.tagline":
      "Prestige Gallery – eng yaxshi guldastalar. Har kuni soat 9:00 dan 21:00 gacha ishlaymiz.",
    "footer.catalog": "Katalog",
    "footer.all_bouquets": "Barcha guldastalar",
    "footer.mono": "Mono guldastalar",
    "footer.premium": "Premium",
    "footer.gifts": "Sovg‘alar",
    "footer.info": "Ma'lumot",
    "footer.about": "Biz haqimizda",
    "footer.delivery": "Yetkazib berish",
    "footer.payment": "To‘lov",
    "footer.returns": "Qaytarish",
    "footer.account": "Shaxsiy kabinet",
    "footer.rights": "Barcha huquqlar himoyalangan.",
    "footer.order_via": "Buyurtma uchun",

    // Auth
    "auth.phone": "Telefon raqam",
    "auth.send_code": "Kodni yuborish",
    "auth.verify_code": "Tasdiqlash",
    "auth.code_sent": "Kod yuborildi",
    "auth.resend": "Qayta yuborish",
    "auth.resend_in": "Qayta yuborish",

    // Checkout
    "checkout.title": "Buyurtma rasmiylashtirish",
    "checkout.recipient": "Kimga yetkazish",
    "checkout.recipient_name": "Qabul qiluvchi ismi",
    "checkout.recipient_phone": "Qabul qiluvchi telefoni",
    "checkout.anonymous": "Anonim buyurtma (qabul qiluvchi kim jo‘natganini bilmaydi)",
    "checkout.address": "Yetkazib berish manzili",
    "checkout.street": "Ko‘cha va uy",
    "checkout.entrance": "Pod’ezd / Qavat",
    "checkout.apartment": "Kvartira",
    "checkout.date": "Yetkazib berish sanasi",
    "checkout.time": "Yetkazib berish vaqti",
    "checkout.greeting": "Tabriknoma",
    "checkout.greeting_placeholder": "Iliq so‘zlaringizni yozing...",
    "checkout.your_order": "Sizning buyurtmangiz",
    "checkout.empty_cart": "Savat bo‘sh — guldasta qo‘shing",
    "checkout.submit": "Buyurtmani tasdiqlash",
    "checkout.agree": "Buyurtmani tasdiqlash orqali siz yetkazib berish shartlariga rozilik bildirasiz",
  },
  ru: {
    // Nav
    "nav.home": "Главная",
    "nav.catalog": "Каталог",
    "nav.events": "Мероприятия",
    "nav.order": "Заказать",
    "nav.login": "Войти",
    "nav.search": "Поиск",
    "nav.cart": "Корзина",
    "nav.profile": "Профиль",
    "nav.favorites": "Избранное",

    // Hero
    "hero.badge": "Соберём букет на комфортный бюджет",
    "hero.title.part1": "Prestige",
    "hero.title.part2": "Gallery",
    "hero.subtitle":
      "Самые свежие цветы по лучшим ценам. Индивидуальный подход к каждому букету.",
    "hero.cta.catalog": "Выбрать букет",
    "hero.cta.telegram": "Заказать в Telegram",
    "hero.contact.address": "Шота Руставели 36",
    "hero.contact.telegram": "@prestigegallery_uz",
    "hero.scroll": "Листайте",

    // Catalog
    "catalog.title": "Каталог букетов",
    "catalog.subtitle": "Выберите идеальный букет для любого случая",
    "catalog.filters": "Фильтры",
    "catalog.filter.price": "Цена",
    "catalog.filter.from": "От",
    "catalog.filter.to": "До",
    "catalog.filter.sort": "Сортировка",
    "catalog.sort.default": "Стандартная",
    "catalog.sort.price_asc": "Цена (возрастание)",
    "catalog.sort.price_desc": "Цена (убывание)",
    "catalog.sort.rating": "По рейтингу",
    "catalog.sort.newest": "Новые",
    "catalog.sort.popular": "Популярные",
    "catalog.category.all": "Все",
    "catalog.category.mono": "Моно букеты",
    "catalog.category.premium": "Авторские",
    "catalog.category.gifts": "Подарки",
    "catalog.category.seasonal": "Сезонные",
    "catalog.show_all": "Посмотреть все",
    "catalog.all_bouquets": "Все букеты",
    "catalog.found": "найдено",
    "catalog.empty": "Ничего не найдено",
    "catalog.empty_desc": "Попробуйте другие фильтры",

    // Product Card
    "product.add_to_cart": "В корзину",
    "product.added": "Добавлено!",
    "product.in_cart": "В корзине",
    "product.add_to_wishlist": "В избранное",
    "product.remove_from_wishlist": "Убрать из избранного",
    "product.new": "Новинка",
    "product.popular": "Популярный",
    "product.discount": "Скидка",
    "product.reviews": "отзывов",
    "product.delivery_info": "Информация о доставке",
    "product.delivery_hours": "Доставка: 9:00 – 21:00",
    "product.delivery_free": "Бесплатная доставка",
    "product.payment": "Оплата: наличные / карта / терминал",

    // Filter colors
    "filter.color": "Цвет",
    "filter.color.qizil": "Красный",
    "filter.color.oq": "Белый",
    "filter.color.pushti": "Розовый",
    "filter.color.sariq": "Жёлтый",
    "filter.color.aralash": "Микс",
    "filter.clear": "Очистить",
    "filter.clear_all": "Очистить фильтры",

    // Cart
    "cart.title": "Корзина",
    "cart.empty": "Корзина пуста",
    "cart.empty_desc": "Добавьте букеты в корзину, чтобы оформить заказ",
    "cart.go_catalog": "Перейти в каталог",
    "cart.total": "Итого",
    "cart.items": "товаров",
    "cart.delivery": "Доставка",
    "cart.free": "Бесплатно",
    "cart.to_pay": "К оплате",
    "cart.checkout": "Оформить заказ",
    "cart.continue": "Продолжить покупки",
    "cart.remove": "Удалить",
    "cart.quantity": "Кол-во",

    // Favorites
    "favorites.title": "Избранное",
    "favorites.empty": "Избранное пусто",
    "favorites.empty_desc": "Добавьте букеты в избранное",
    "favorites.go_catalog": "Перейти в каталог",

    // Search
    "search.title": "Поиск букетов",
    "search.placeholder": "Введите название букета...",
    "search.hint": "Например: розы, лилии, тюльпаны",
    "search.start_typing": "Начните вводить название букета",
    "search.no_results": "Ничего не найдено",

    // Account
    "account.title": "Личный кабинет",
    "account.subtitle": "Управляйте профилем и заказами",
    "account.active_orders": "Активные заказы",
    "account.favorites": "Избранное",
    "account.events": "Мероприятия",
    "account.bonuses": "Бонусы",
    "account.recent_orders": "Последние заказы",
    "account.no_orders": "У вас ещё нет заказов",
    "account.profile": "Профиль",
    "account.orders": "Заказы",
    "account.orders_list": "Список заказов",
    "account.events_list": "Календарь мероприятий",

    // Footer
    "footer.tagline":
      "Prestige Gallery – лучшие букеты. Работаем ежедневно с 9:00 до 21:00.",
    "footer.catalog": "Каталог",
    "footer.all_bouquets": "Все букеты",
    "footer.mono": "Моно букеты",
    "footer.premium": "Премиум",
    "footer.gifts": "Подарки",
    "footer.info": "Информация",
    "footer.about": "О нас",
    "footer.delivery": "Доставка",
    "footer.payment": "Оплата",
    "footer.returns": "Возврат",
    "footer.account": "Личный кабинет",
    "footer.rights": "Все права защищены.",
    "footer.order_via": "Заказ через",

    // Auth
    "auth.phone": "Номер телефона",
    "auth.send_code": "Отправить код",
    "auth.verify_code": "Подтвердить",
    "auth.code_sent": "Код отправлен",
    "auth.resend": "Отправить повторно",
    "auth.resend_in": "Повторная отправка через",

    // Checkout
    "checkout.title": "Оформление заказа",
    "checkout.recipient": "Кому доставить",
    "checkout.recipient_name": "Имя получателя",
    "checkout.recipient_phone": "Телефон получателя",
    "checkout.anonymous": "Анонимный заказ (получатель не узнает, кто отправитель)",
    "checkout.address": "Адрес доставки",
    "checkout.street": "Улица и дом",
    "checkout.entrance": "Подъезд / Этаж",
    "checkout.apartment": "Квартира",
    "checkout.date": "Дата доставки",
    "checkout.time": "Время доставки",
    "checkout.greeting": "Открытка",
    "checkout.greeting_placeholder": "Напишите тёплые слова получателю...",
    "checkout.your_order": "Ваш заказ",
    "checkout.empty_cart": "Корзина пуста — добавьте букеты",
    "checkout.submit": "Подтвердить заказ",
    "checkout.agree": "Нажимая «Подтвердить заказ», вы соглашаетесь с условиями доставки",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  language: "uz",
  setLanguage: () => {},
  t: (key: string) => key,
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("prestige_lang") as Language | null;
      if (saved && (saved === "uz" || saved === "ru")) return saved;
    }
    return "uz";
  });

  const handleSetLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("prestige_lang", lang);
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[language]?.[key] || translations.uz[key] || key;
    },
    [language]
  );

  return createElement(
    LanguageContext.Provider,
    { value: { language, setLanguage: handleSetLanguage, t } },
    children
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
}

export function useTranslation() {
  const { t } = useLanguage();
  return { t };
}
