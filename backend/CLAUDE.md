# CLAUDE.md — Gullar Backend (Premium Flower Delivery API)

Bu fayl backend (Node.js) qismi uchun yagona manba. Yangi kod yozishdan oldin shu konvensiyalarga amal qil.
Til: kod va kommentlar **inglizcha**, foydalanuvchiga javob **o'zbekcha** bo'lishi mumkin.

---

## 1. Loyiha maqsadi (qisqa)

Premium gul yetkazib berish platformasi backendi. Faqat CRUD emas — **retention va marketing
triggerlari** (tadbirlar kalendari, cashback, "kuryer ketdi" status, anonim sovg'a) biznes mantiqning
markazida. Frontend alohida (Next.js/Nuxt) — bu repo faqat **REST API**.

To'liq spec: loyiha root'idagi 5 ta modul hujjati (README_PROJECT_OVERVIEW, FRONTEND_REQUIREMENTS,
BACKEND_ADMIN_PANEL, MARKETING_GROWTH_HACKS, TEAM_TASK_DISTRIBUTION).

---

## 2. Tech Stack

| Qatlam        | Tanlov                          | Izoh |
|---------------|---------------------------------|------|
| Runtime       | Node.js (LTS)                   | `type: commonjs` — `require`/`module.exports` ishlat, `import` emas |
| Framework     | **Express 5** (`^5.2.1`)        | Express 4 emas — pastdagi farqlarga e'tibor ber |
| DB            | PostgreSQL (tavsiya) + Prisma   | Hozircha ulanmagan — `src/models/` bo'sh. Relational data (orders, users, cashback) uchun SQL mos |
| Cache/Queue   | Redis                           | Cron SMS bildirishnomalar, rate-limit, session uchun |
| Auth          | OTP (SMS) + Google One-Tap, JWT | Parolsiz kirish asosiy oqim |
| SMS           | Eskiz.uz / SMSFly API           | OTP va kalendar eslatmalari |
| Validation    | zod yoki express-validator      | Har bir route input'ini validatsiya qil |
| Dev           | nodemon                         | `npm run dev` |

**Gotcha:** `package.json` dagi `"node": "^26.3.1"` dependency — bu xato o'rnatilgan npm paketi
(Node runtime emas). O'chir: `npm uninstall node`.

---

## 3. Express 5 farqlari (muhim)

```js
// ✅ Express 5: async route'dagi xato avtomatik error middleware'ga o'tadi — try/catch shart emas
app.get('/flowers', async (req, res) => {
  const flowers = await flowerService.list(req.query); // throw bo'lsa -> errorHandler
  res.json(flowers);
});

// ❌ Express 4 patternlari ishlamaydi:
//   app.del(...)            -> app.delete(...) ishlat
//   app.get('/*', ...)      -> app.get('/*splat', ...) (named wildcard)
//   req.param('id')         -> req.params.id
```

---

## 4. Papka strukturasi

```
backend/
├── src/
│   ├── main.js          # entrypoint: env load -> app -> listen
│   ├── app.js           # (yaratiladi) express() qurish, middleware, route mount — test uchun ajratilgan
│   ├── config/          # (yaratiladi) db, redis, env config
│   ├── routes/          # faqat URL -> controller mapping, mantiq YO'Q
│   ├── controllers/     # req/res ni o'qiydi, service chaqiradi, javob qaytaradi
│   ├── services/        # (yaratiladi) BIZNES MANTIQ shu yerda
│   ├── models/          # DB sxema/query qatlami (Prisma yoki query funksiyalar)
│   ├── middlewares/     # (yaratiladi) auth, validate, errorHandler, rateLimit
│   └── utils/           # (yaratiladi) sms, jwt, color-combination helper
└── CLAUDE.md
```

**Qatlam qoidasi (qat'iy):** `route -> controller -> service -> model`.
Controller'da DB so'rovi yozma. Service'da `req`/`res` ishlatma. Bu testlanadigan va o'sadigan struktura.

---

## 5. Kod konvensiyalari

- Fayl nomi: `kebab-case.js` (`flower.controller.js`, `auth.service.js`).
- Har bir resurs uchun uchlik: `<resource>.route.js`, `<resource>.controller.js`, `<resource>.service.js`.
- Controller har doim `async` + xatoni `throw` qiladi (Express 5 ushlaydi). `res.status().json()` bilan javob.
- Javob shakli izchil bo'lsin:
  ```js
  res.json({ success: true, data });          // muvaffaqiyat
  // xato -> errorHandler middleware: { success: false, message, code }
  ```
- Hech qachon sirlarni (API key, JWT secret, DB url) kodga yozma — `.env` + `process.env`.
- HTTP statuslar: 200 ok, 201 created, 400 validation, 401 auth yo'q, 403 ruxsat yo'q, 404, 409 conflict, 500.

---

## 6. Asosiy domenlar (qurish tartibi)

1. **Auth** — OTP yuborish/tekshirish, Google One-Tap, JWT issue/refresh. `middlewares/auth.js`.
2. **Flowers (CRUD)** — admin qo'shadi/tahrirlaydi; o'chirish o'rniga `archived` (SEO saqlanadi).
3. **Colors / Auto-filter** — gulga rang biriktirilganda kombinatsiya (masalan "Ko'k-Qizil Mix") avtomatik
   filtr tag sifatida yoziladi. Helper: `utils/color-combo.js`.
4. **Orders / Checkout** — anonim yuborish flag'i, yetkazish sanasi+vaqt oynasi, tabriknoma matni.
5. **Reviews** — faqat sotib olgan user baho beradi; admin moderatsiyadan keyin ko'rinadi.
6. **Marketing** — cashback (5%), tadbirlar kalendari (Cron + Redis -> SMS 3 kun oldin), "kuryer ketdi"
   status (Telegram bot -> media link), subscription (recurring).

---

## 7. Buyruqlar

```bash
npm run dev      # nodemon bilan ishga tushirish (hot reload)
npm start        # hozir dev bilan bir xil
npm test         # hali sozlanmagan — Jest/Vitest qo'shilsin
```

Server: `http://localhost:8000` (PORT `main.js` da hardcode — `.env` ga ko'chir: `process.env.PORT || 8000`).

---

## 8. Hozirgi holat (2026-06-24)

- Bor: Express 5 skeleton, `GET /` hello world, bo'sh `controllers/`, `models/`, `routes/`.
- Yo'q: DB, auth, `.env`, validation, test, error middleware, git repo.
- Keyingi qadam: `app.js` ajratish + `.env` + `errorHandler` + DB ulanish, keyin Auth domeni.

> Yangi narsa qo'shganda yoki qaror o'zgarganda **shu faylni yangila**.
