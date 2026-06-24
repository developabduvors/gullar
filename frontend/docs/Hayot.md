# 🔍 REJA: HAYOT — Dinamik Interfeys & Aqlli Qidiruv (Frontend)

📌 **Loyiha konteksti:** "Premium Bloom" saytining foydalanuvchilar har bir klikda hayratda qoladigan, juda tez va dynamic ishlovchi frontend qismlarini yaratish. Ushbu faylni srazu Cursor/Windsurf kabi AI yordamchingizga bering.

### 1. Tezkor va Aqlli Qidiruv Tizimi (Instant Search UI)
* **Debouncing Logikasi:** Foydalanuvchi qidiruv satriga gul nomini yozayotganda, har bir harfda serverga so'rov yuborib serverni qiynamaslik uchun 300ms kechikish (debouncing) mexanizmini o'rnating.
* **Dropdown Drop:** Qidiruv natijalari sahifa yangilanmasdan, qidiruv satrining pastidan hashamatli sut rangli, orqa foni biroz xira bo'lgan oynada gulning kichik rasmi va narxi bilan "Instant Dropdown" bo'lib chiqishi shart.

### 2. Dinamik Avto-Filtr Paneli (Katalog)
* Abduvoris yozgan dynamic tags API-siga ulaning. Bazada qanday yangi rang yoki toifa paydo bo'lsa, filtrda srazu o'sha checkboxlar chiqishi kerak.
* **Narx Slayderi (Price Range Selector):** Foydalanuvchi barmog'i bilan suradigan (Double thumb range slider) hashamatli tilla rangli filtr komponentini yarating (arzondan qimmatga real-vaqtda saralovchi).

### 3. Mikromuloqotlar va Lottie Animatsiyalar
* Foydalanuvchi guldasta kartochkasidagi "Yurakcha (Sevimlilar)" tugmasini bosganda, tugma silliq aylanib qizil rangga kirishi, "Savatga qo'shish" bosilganda esa guldasta savatga "uchib" tushgandek effekt beruvchi silliq animatsiyalarni (Lottie / Framer Motion) integratsiya qiling.

🛠 **AI uchun eslatma:** Next.js va Tailwind CSS yordamida, `framer-motion` va `lottie-react` kutubxonalarini ishlatgan holda, to'liq responsive, yuqori animatsiyali dinamik katalog filtri va qidiruv komponentlarini clean code qilib yoz.
