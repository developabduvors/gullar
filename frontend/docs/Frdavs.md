# 🛠 REJA: FIRDAVS — Auth, Gateway Integrations & Moderation API

📌 **Loyiha konteksti:** Tizim xavfsizligi, foydalanuvchilarni parolsiz autentifikatsiya qilish, tashqi provayderlar va admin panel xavfsizligini ta'minlash. AI-ga topshiriq berishda ushbu strukturadan foydalaning.

### 1. Parolsiz SMS OTP Login Tizimi (Backend)
* Telefon raqam kiritilganda Eskiz yoki Smsfly API shlyuzlariga so'rov yuborib, 4 yoki 6 xonali tasodifiy kod jo'natuvchi arxitekturani quring.
* Ushbu kodlarni vaqtinchalik (masalan, 2 daqiqa) saqlash uchun **Redis** yoki vaqtinchalik bazaviy model yarating. Kod to'g'ri kiritilsa, foydalanuvchiga xavfsiz JWT (JSON Web Token) generatsiya qilib bering.

### 2. Sharhlar va Reyting Moderatsiyasi API
* **Feyk sharhlarga qarshi xavfsizlik:** Saytda firibgarlikni oldini olish uchun, faqat ma'lum bir gulni haqiqatda sotib olgan (buyurtma statusi `Completed` bo'lgan va foydalanuvchi ID-si mos kelgan) odamgina o'sha gulga sharh va 5 yulduzlik reyting bera oladigan custom Middleware/Dekorator yozing.
* Admin paneldan tasdiqlash statusi (`status: 'approved'`) berilmaguncha, sharhlar ommaviy saytda ko'rinmasligini ta'minlang.

### 3. Core Admin Dashboard Rest API
* Gullarni boshqarish uchun barcha standart endpointlarni (GET, POST, PUT, DELETE) yozing. Rasmlarni yuklash uchun Multer logikasini yoki Cloudinary/AWS S3 integratsiyasini xavfsiz sozlang.

🛠 **AI uchun eslatma:** Node.js/Express yoki Python loyihasida JWT authentication, SMS OTP jo'natish logikasi, Redis integratsiyasi va faqat mahsulotni sotib olgan mijoz sharh yoza olishini tekshiruvchi backend kodini yozib ber.
