// OTP kodlarni vaqtinchalik saqlash (xotirada). KEYIN Redis ga ko'chadi.
// Tuzilishi: phone -> { code, expiresAt }
const store = new Map();

const TTL_MS = 2 * 60 * 1000; // kod 2 daqiqa amal qiladi

function save(phone, code) {
  store.set(phone, { code, expiresAt: Date.now() + TTL_MS });
}

// Kod to'g'ri va eskirmaganmi? Tekshirgach o'chiramiz (bir martalik).
function verify(phone, code) {
  const entry = store.get(phone);
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) {
    store.delete(phone);
    return false;
  }
  if (entry.code !== code) return false;
  store.delete(phone); // ishlatildi
  return true;
}

module.exports = { save, verify };
