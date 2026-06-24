# 🔐 REJA: QUDRAT — Shaxsiy Kabinet, Kalendar UI & Checkout Flow

📌 **Loyiha konteksti:** Foydalanuvchining shaxsiy kabinetini daxshat darajada interaktiv qilish va buyurtma berish jarayonini (Checkout) soddalashtirish. Ushbu faylni AI yordamchingizga taqdim eting.

### 1. Shaxsiy Kabinet va Parolsiz Kirish interfeysi
* Firdavs yozgan backendga ulanib, SMS OTP (bir martalik kod) orqali parolsiz va tezkor kirish formasini yarating.
* **Sevimlilar (Favorites) sahifasi:** Foydalanuvchi yurakcha bosgan hamma gullar shu yerda chiroyli ko'rinsin va ostida srazu "Sotib olish" tugmasi tursin.

### 2. Tadbirlar Kalendari (Kreativ UI komponenti)
* Foydalanuvchi o'z yaqinlarining tug'ilgan kunlarini qo'shadigan vizual kalendar yarating. Kalendarda tadbir egasining ismi, sanasi va u odam kimligi (Onam, Ayolim, Do'stim) chiroyli tilla rangli karta shaklida saqlansin va Abduvorisning backend bazasiga uzatilsin.

### 3. Interaktiv Checkout va Mapbox/Yandex Maps Integratsiyasi
* Savatdan sotib olish sahifasiga o'tganda chiquvchi forma:
  * Kimga yuborilishi: "Yashirin qolsin (Anonim sovg'a)" degan checkbox qo'shilsin (sotuvni oshirish uchun).
  * Sana va Vaqt tanlash: Maxsus vaqt oralig'ini tanlash select-boxlari (Masalan: 14:00 - 16:00).
  * Tabriknoma matni kiritish inputi.
* **Xarita integratsiyasi:** Mapbox GL JS yoki Yandex Maps API yordamida foydalanuvchining geolokatsiyasini aniqlab, xaritada unga eng yaqin filialni vizual ko'rsatadigan va kuryer kelish marshrutini jonli chizadigan interaktiv komponent yasang.

🛠 **AI uchun eslatma:** Next.js va React Hook Form yordamida barcha form validatsiyalarini qil, Mapbox/Yandex xaritasini loyihaga integratsiya qilib, silliq Checkout flow interfeysini yoz.
