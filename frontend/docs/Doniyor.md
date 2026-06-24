# 🎨 REJA: DONIYOR — Luxury UI/UX & Frontend Core Base

📌 **Loyiha konteksti:** "Luxury/Premium Bloom" brendining vizual poydevorini va frontend asoslarini qurish. Sayt RichGarden.uz stilidan ancha yuqori va ko'rkam bo'lishi shart.

### 1. Figma UI/UX va Dizayn Tizimi (Mobile-First)
* **Ranglar Palitrasi:** To'q shokolad/qora (`#1A1A1A`), nozik och-oltin (`#D4AF37`), sut rangi (`#FFFDD0`).
* **Glassmorphism:** Bloklar va kartochkalarning chetlari juda yumshoq (`border-radius: 24px`), orqa foni esa shishasimon, orqadagi elementlarni xira ko'rsatadigan (backdrop-filter: blur) effektga ega bo'lsin.
* **Tipografika:** Sarlavhalar uchun hashamatli Elegant Serif (Playfair Display yoki Cinzel), matnlar uchun o'qishga juda qulay Inter shriftini Figmada sozlash.

### 2. Frontend Core Base (Next.js / Tailwind Layout)
* **Global Theme Setting:** Loyihaning Tailwind konfiguratsiyasiga barcha HEX kodlarni, premium shriftlarni joylab, umumiy Global Layout (Hashamatli Navbar, pastki Footer) qismini yaratish.
* **Hero Section & Tezkor Buket:** Bosh sahifaning eng yuqori qismida yirik, yuqori sifatli guldastalar bannerini joylashtiring. Shoshilayotgan erkaklar uchun "15 daqiqada yetkazib beriladigan tayyor buketlar" bo'limini orqaga hisoblovchi taymer (Countdown timer) komponenti bilan quring.
* **Gullar Grid Tizimi:** Gullar kartochkalari ustiga sichqoncha borganda (hover) yoki bosilganda rasm nozik kattalashuvchi (`scale: 1.05`, transition: 0.3s) responsive grid yarating.

🛠 **AI uchun eslatma:** Next.js, Tailwind CSS va Google Fonts (Playfair Display, Inter) yordamida loyihaning global styles, tailwind.config.js, Navbar, Footer va taymerli Bosh sahifa (Hero Section) kodlarini yozib ber.
