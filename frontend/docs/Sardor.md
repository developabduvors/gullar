# 🚀 REJA: SARDOR — Sifat Nazorati, WOW-Effekt Bot & Infrastructure Deployment

📌 **Loyiha konteksti:** Loyihaning yakuniy sifatini tekshirish, kuryerlar bilan aloqani bog'lovchi marketing botini qurish va tizimni serverga yuklash. Faylni AI-ga o'qitib, avtomatizatsiya skriptlarini oling.

### 1. "Kuryer Ketdi" Telegram Bot Integratsiyasi (WOW-effekt)
* Kuryerlar uchun maxsus Telegram Bot dasturlang. 
* **Ishlash tartibi:** Kuryer buyurtmani olib yo'lga chiqishidan oldin guldastani chiroyli qilib rasmga yoki 5 soniyali videoga oladi va botga buyurtma ID-si bilan birga tashlaydi. Bot bu mediani qabul qilib, webhook orqali Abduvorisning bazasiga (MongoDB) yuklaydi.
* Natijada, mijozning shaxsiy profilida yoki unga borgan SMS havolada "Buketingiz yo'lda!" degan yozuv ostida aynan kuryer tushirgan jonli video ko'rinadi. Bu brend ishonchini 200% oshiradi.

### 2. Sifat Nazorati (QA Manual & Automation Testing)
* Tizimni to'liq testdan o'tkazing: SMS kodlar kechikmasdan kelyaptimi? Savatchada keshbek to'g'ri ayrilyaptimi va qo'shilyaptimi? Qidiruv tizimi yuklamani ko'taryaptimi?
* Mobil telefonlarda (iOS, Android) dizayn va Glassmorphism effektlari buzilib ketmayotganini, tugmalar joyida turganini DevTools va real qurilmalarda sinang.

### 3. DevOps, SEO va Serverga Joylashtirish
* Next.js/Nuxt.js loyihasining qidiruv tizimlarida (Google, Yandex) birinchi o'rinlarga chiqishi uchun Server-Side Rendering (SSR) va dinamik `sitemap.xml` sozlamalarini tekshiring.
* Butun loyihani Dockerfile yordamida konteynerlashtiring va Render, Vercel yoki shaxsiy VPS serverga xavfsiz deployment qiling.

🛠 **AI uchun eslatma:** Node.js Telegram Bot API yordamida rasm/video yuklovchi kuryer bot kodini yoz, loyihani ishlab ketishi uchun Dockerfile va GitHub Actions CI/CD skriptlarini tayyorla.
