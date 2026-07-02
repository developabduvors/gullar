# Gullar Loyihasi — Admin Panel API Hujjatlari (API Documentation)

Ushbu hujjat backend-dagi barcha API endpointlar, ularning so'rov (request) tuzilishi va javob (response) formatlarini o'z ichiga oladi. Admin panel dasturini tuzishda ushbu ma'lumotlardan foydalanishingiz mumkin.

## API Asosiy Ma'lumotlari (Base Configuration)
- **Asosiy URL (Base URL):** `http://localhost:5000/api` (yoki loyiha portiga qarab, masalan `/api` ko'rinishida)
- **Sog'liqni tekshirish:** `GET /health` (API ishlayotganini tekshirish uchun)

---

## 🔐 Avtorizatsiya va Sarlavhalar (Authorization Headers)
Barcha himoyalangan (Auth Required) va Admin uchun mo'ljallangan (Admin Only) API so'rovlariga foydalanuvchi tokenini `Authorization` sarlavhasi (header) orqali yuborish lozim:

```http
Authorization: Bearer <Sizning_JWT_Tokeningiz>
Content-Type: application/json
```

---

## 1. 🌹 GULLARNI BOSHQARISH (Flower Management)
Gullarni ro'yxatdan o'tkazish, tahrirlash va arxivdan chiqarish uchun barcha endpointlar `/api/flowers` domenida joylashgan.

### 1.1. Yangi Gul Qo'shish (Create Flower) — **ADMIN ONLY**
Yangi gul (buket) qo'shish uchun so'rov.
- **Metod:** `POST`
- **URL:** `/api/flowers`
- **Headers:** `Authorization: Bearer <Token>`
- **Request Body (JSON):**
```json
{
  "name": "Qizil Atirgullar",       // Majburiy (String)
  "price": 150000,                  // Majburiy (Number, >0)
  "description": "Premium darajadagi 15 ta qizil atirgullar to'plami.", // Ixtiyoriy (String)
  "discountPrice": 120000,          // Ixtiyoriy (Number, Chegirma narxi, yo'q bo'lsa null yoki yubormang)
  "images": [                       // Ixtiyoriy (Massiv, rasm URL-manzillari)
    "/images/card_1.jpg"
  ],
  "colors": ["red", "green"],       // Ixtiyoriy (Massiv, rang nomlari kichik harflarda)
  "express": true,                  // Ixtiyoriy (Boolean, tezkor buket flagi)
  "prepMinutes": 20                 // Ixtiyoriy (Number, agar express true bo'lsa tayyorlanish vaqti daqiqada, default: 15)
}
```
- **Response (201 Created):**
```json
{
  "success": true,
  "message": "Gul qo'shildi",
  "data": {
    "id": 1,
    "name": "Qizil Atirgullar",
    "description": "Premium darajadagi 15 ta qizil atirgullar to'plami.",
    "price": 150000,
    "discountPrice": 120000,
    "images": ["/images/card_1.jpg"],
    "colors": ["red", "green"],
    "combo": { "tag": "red-green", "colors": ["red", "green"], "label": "Qizil-Yashil" },
    "express": true,
    "prepMinutes": 20,
    "archived": false
  }
}
```

### 1.2. Gulni Tahrirlash (Update Flower) — **ADMIN ONLY**
Mavjud gul ma'lumotlarini qisman yangilash.
- **Metod:** `PATCH`
- **URL:** `/api/flowers/:id` (masalan `/api/flowers/1`)
- **Headers:** `Authorization: Bearer <Token>`
- **Request Body (JSON):** (faqat o'zgartiriladigan maydonlar yuboriladi)
```json
{
  "price": 160000,
  "discountPrice": 130000,
  "colors": ["red", "white"]
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Yangilandi",
  "data": {
    "id": 1,
    "name": "Qizil Atirgullar",
    "description": "Premium darajadagi 15 ta qizil atirgullar to'plami.",
    "price": 160000,
    "discountPrice": 130000,
    "images": ["/images/card_1.jpg"],
    "colors": ["red", "white"],
    "combo": { "tag": "red-white", "colors": ["red", "white"], "label": "Qizil-Oq" },
    "express": true,
    "prepMinutes": 20,
    "archived": false
  }
}
```

### 1.3. Gulni Arxivlash yoki Arxivdan Qaytarish (Archive / Restore) — **ADMIN ONLY**
Gulni butunlay o'chirmasdan arxivga solish (foydalanuvchilarga ko'rinmaydi) yoki qayta faollashtirish.
- **Metod:** `PATCH`
- **URL:** `/api/flowers/:id/archive`
- **Headers:** `Authorization: Bearer <Token>`
- **Query Parametrlari:**
  - `?restore=true` (Arxivdan chiqarish va faollashtirish)
  - `?restore=false` yoki parametr yozilmasa (Arxivlash)
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Arxivlandi" // yoki "Qaytarildi"
}
```

### 1.4. Tezkor Buket Holatini O'rnatish (Set Express) — **ADMIN ONLY**
Gulni "Tezkor Yetkazish" ro'yxatiga qo'shish yoki undan olib tashlash.
- **Metod:** `PATCH`
- **URL:** `/api/flowers/:id/express`
- **Headers:** `Authorization: Bearer <Token>`
- **Request Body (JSON):**
```json
{
  "express": true,       // Tezkor etish (true/false)
  "prepMinutes": 15      // Tayyorlanish vaqti daqiqalarda
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Tezkor buket yoqildi",
  "data": { ... }
}
```

### 1.5. Gullar Ro'yxatini Olish (List Flowers) — **PUBLIC**
Admin panelda ommaviy ro'yxatni ko'rsatish va qidirish uchun foydalaniladi (Arxivlanmagan gullar).
- **Metod:** `GET`
- **URL:** `/api/flowers`
- **Query Parametrlari (Ixtiyoriy):**
  - `?page=1` (Sahifa raqami)
  - `?limit=12` (Bir sahifadagi elementlar soni)
  - `?sort=price_asc | price_desc | newest` (Saralash turlari)
  - `?colors=red,white` (Ranglar bo'yicha süzgü)
  - `?discount=true` (Faqat chegirmali mahsulotlar)
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "items": [
      { "id": 1, "name": "Gul nomi", "price": 10000, "discountPrice": null, "images": [], "colors": ["red"], "archived": false }
    ],
    "total": 1,
    "page": 1,
    "limit": 12,
    "pages": 1
  }
}
```

### 1.6. Dinamik Filtrlarni Olish (Get Filters) — **PUBLIC**
Mavjud ranglar va kombinatsiyalar ro'yxatini olish.
- **Metod:** `GET`
- **URL:** `/api/flowers/filters`

### 1.7. Tezkor Buketlarni Olish (Get Express) — **PUBLIC**
- **Metod:** `GET`
- **URL:** `/api/flowers/express`

### 1.8. Bitta Gul Ma'lumotini Olish (Get One) — **PUBLIC**
- **Metod:** `GET`
- **URL:** `/api/flowers/:id`

---

## 2. 📦 BUYURTMALARNI BOSHQARISH (Order Management)
Buyurtmalar oqimi va keshbek tizimiga ta'sir qiluvchi holatlarni boshqarish.

### 2.1. Barcha Buyurtmalar Ro'yxatini Olish (List All Orders) — **ADMIN ONLY**
Tizimdagi barcha foydalanuvchilarning barcha buyurtmalarini ko'rish.
- **Metod:** `GET`
- **URL:** `/api/orders/all`
- **Headers:** `Authorization: Bearer <Token>`
- **Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1001,
      "userId": 5,
      "items": [
        { "flowerId": 1, "name": "Qizil Atirgullar", "qty": 1, "unitPrice": 120000, "sum": 120000 }
      ],
      "subtotal": 120000,
      "cashbackUsed": 10000,
      "total": 110000,
      "cashbackEarned": 0,
      "status": "pending",
      "recipient": "Onam uchun",
      "anonymous": false,
      "address": "Toshkent sh, Chilonzor 9-daha",
      "note": "Tug'ilgan kuningiz bilan!",
      "scheduledAt": "2026-07-05T12:00:00.000Z",
      "courierMedia": null
    }
  ]
}
```

### 2.2. Buyurtma Holatini O'zgartirish (Update Order Status) — **ADMIN ONLY**
Buyurtma holatini yangilash.
- **Holatlar ketma-ketligi (Statuses):** `pending` ➔ `confirmed` ➔ `preparing` ➔ `on_the_way` ➔ `delivered` / `cancelled`
- ⚠️ *Mantiq:* Agar holat `delivered` (yetkazildi) ga o'tkazilsa, tizim foydalanuvchiga avtomatik ravishda **5% keshbek** hisoblab o'tkazadi (`cashbackEarned` to'ldiriladi).
- ⚠️ *Mantiq:* Agar holat `cancelled` (bekor qilindi) ga o'tkazilsa, buyurtmada ishlatilgan keshbek foydalanuvchi balansiga qaytariladi.
- **Metod:** `PATCH`
- **URL:** `/api/orders/:id/status` (masalan `/api/orders/1001/status`)
- **Headers:** `Authorization: Bearer <Token>`
- **Request Body (JSON):**
```json
{
  "status": "confirmed" // 'pending' | 'confirmed' | 'preparing' | 'on_the_way' | 'delivered' | 'cancelled'
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1001,
    "status": "confirmed",
    "cashbackEarned": 0,
    ...
  }
}
```

### 2.3. Kuryer Rasmini Yuklash va Yo'lga Chiqarish (Courier Media Uplink) — **ADMIN ONLY**
Kuryer guldastani olib yo'lga chiqqanda rasm yoki video linkini yuklaydi. Bu API avtomatik ravishda statusni `on_the_way` ga o'zgartiradi.
- **Metod:** `POST`
- **URL:** `/api/orders/:id/courier-status`
- **Headers:** `Authorization: Bearer <Token>`
- **Request Body (JSON):**
```json
{
  "media": "https://server.com/uploads/courier-photo-1001.jpg" // rasm yoki video manzili (Sardor boti yuboradi)
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 1001,
    "status": "on_the_way",
    "courierMedia": "https://server.com/uploads/courier-photo-1001.jpg",
    ...
  }
}
```

### 2.4. Bitta Buyurtma Tafsilotini Ko'rish (Get Single Order) — **AUTH REQUIRED**
Buyurtma egasi yoki admin buyurtma tafsilotlarini olishi mumkin.
- **Metod:** `GET`
- **URL:** `/api/orders/:id`

---

## 3. ⭐ SHARHLARNI MODERATSIYA QILISH (Review Moderation)
Mijozlar qoldirgan sharhlarni tasdiqlash yoki rad etish.

### 3.1. Moderatsiyadagi Sharhlar Ro'yxati (List Reviews for Moderation) — **ADMIN ONLY**
Admin tasdiqlashi kerak bo'lgan sharhlarni filterlash orqali yuklab oladi.
- **Metod:** `GET`
- **URL:** `/api/admin/reviews`
- **Headers:** `Authorization: Bearer <Token>`
- **Query Parametrlari (Ixtiyoriy):**
  - `?status=pending` (Kutilayotgan sharhlar, default)
  - `?status=approved` (Tasdiqlangan sharhlar)
  - `?status=rejected` (Rad etilgan sharhlar)
- **Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": "rev_1",
      "userId": 5,
      "user": { "name": "Sardor", "phone": "+998901234567" }, // Agar foydalanuvchi ma'lumotlari bo'lsa
      "flowerId": 1,
      "rating": 5,
      "comment": "Gullar juda ajoyib ekan, onamga juda ham yoqdi!",
      "status": "pending",
      "createdAt": "2026-07-02T10:00:00.000Z"
    }
  ]
}
```

### 3.2. Sharhni Tasdiqlash yoki Rad Etish (Moderate Review) — **ADMIN ONLY**
- **Metod:** `PATCH`
- **URL:** `/api/admin/reviews/:id` (masalan `/api/admin/reviews/rev_1`)
- **Headers:** `Authorization: Bearer <Token>`
- **Request Body (JSON):**
```json
{
  "status": "approved" // 'approved' (tasdiqlash) yoki 'rejected' (rad etish)
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Sharh yangilandi",
  "data": {
    "id": "rev_1",
    "status": "approved",
    ...
  }
}
```

---

## 4. 🔁 OBUNALARNI BOSHQARISH (Subscription Management)
Premium foydalanuvchilarning davriy (haftalik yoki oylik) gul yetkazib berish obunalarini boshqarish.

### 4.1. Barcha Obunalar Ro'yxatini Olish (List All Subscriptions) — **ADMIN ONLY**
- **Metod:** `GET`
- **URL:** `/api/subscriptions/all`
- **Headers:** `Authorization: Bearer <Token>`
- **Response (200 OK):**
```json
{
  "success": true,
  "data": [
    {
      "id": 5001,
      "userId": 5,
      "flowerId": 1,
      "flowerName": "Qizil Atirgullar",
      "interval": "weekly", // 'weekly' | 'monthly'
      "qty": 1,
      "pricePerCycle": 120000,
      "address": "Toshkent sh, Chilonzor",
      "recipient": "Sardor",
      "note": "",
      "anonymous": false,
      "status": "active", // 'active' | 'paused' | 'cancelled'
      "startAt": "2026-07-01T12:00:00.000Z",
      "nextDeliveryAt": "2026-07-08T12:00:00.000Z",
      "deliveriesCount": 0,
      "lastOrderId": null,
      "lastError": null,
      "history": []
    }
  ]
}
```

### 4.2. Obunani Pauza, Aktiv yoki Bekor Qilish — **ADMIN & OWNER**
Obunani to'xtatib turish yoki bekor qilish.
- **Metod:** `PATCH`
- **URL:** `/api/subscriptions/:id` (masalan `/api/subscriptions/5001`)
- **Headers:** `Authorization: Bearer <Token>`
- **Request Body (JSON):**
```json
{
  "action": "pause" // 'pause' | 'resume' | 'cancel' amallaridan biri
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": 5001,
    "status": "paused", // yoki active/cancelled
    ...
  }
}
```

---

## 5. 👤 AUTH & FOYDALANUVCHILAR (Auth & User Profile)
Mijozlar va Adminlarni avtorizatsiya qilish amallari.

### 5.1. OTP Soddalashtirilgan Kirish (Send OTP) — **PUBLIC**
Foydalanuvchi telefoniga tasdiqlash kodini jo'natish (Simulyatsiya qilingan).
- **Metod:** `POST`
- **URL:** `/api/auth/send-otp`
- **Request Body (JSON):**
```json
{
  "phone": "+998901234567" // Telefon raqami
}
```
- **Response (200 OK):** (Dasturda simulyatsiya kodi qaytadi: `11111`)
```json
{
  "success": true,
  "message": "OTP yuborildi (Kod: 11111)"
}
```

### 5.2. OTP Kodini Tasdiqlash (Verify OTP) — **PUBLIC**
Kod to'g'ri bo'lsa JWT token qaytaradi.
- **Metod:** `POST`
- **URL:** `/api/auth/verify-otp`
- **Request Body (JSON):**
```json
{
  "phone": "+998901234567",
  "code": "11111"
}
```
- **Response (200 OK):**
```json
{
  "success": true,
  "message": "Kirish tasdiqlandi",
  "token": "eyJhbGciOiJIUzI1NiIsIn...", // Ushbu tokenni saqlab qolib Header'ga qo'yasiz
  "user": {
    "id": 5,
    "phone": "+998901234567",
    "role": "user", // Agar admin telefon raqami bo'lsa: "admin" bo'ladi
    "name": "Foydalanuvchi"
  }
}
```

---

## 🖥️ Javascript (React) Fetch Namunalari

Admin panelda so'rovlar yuborish uchun namuna funksiyalar:

### Gul qo'shish funksiyasi:
```javascript
async function addFlower(flowerData, token) {
  try {
    const response = await fetch('http://localhost:5000/api/flowers', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(flowerData)
    });
    
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Xatolik yuz berdi");
    
    console.log("Gul muvaffaqiyatli qo'shildi:", result.data);
    return result.data;
  } catch (error) {
    console.error("Xatolik:", error.message);
  }
}
```

### Buyurtma statusini o'zgartirish funksiyasi:
```javascript
async function updateOrderStatus(orderId, newStatus, token) {
  try {
    const response = await fetch(`http://localhost:5000/api/orders/${orderId}/status`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ status: newStatus })
    });
    
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "Xatolik yuz berdi");
    
    console.log("Buyurtma statusi yangilandi:", result.data);
    return result.data;
  } catch (error) {
    console.error("Xatolik:", error.message);
  }
}
```
