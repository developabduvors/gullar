// Tadbir biznes mantiqi. req/res YO'Q.
const ApiError = require('../utils/ApiError');
const store = require('./event.store');

// Sanani 'MM-DD' (har yili takrorlanadigan) ko'rinishga keltiradi.
// Qabul qiladi: 'MM-DD', 'YYYY-MM-DD' yoki to'liq ISO sana.
function normalizeDate(raw) {
  const s = String(raw || '').trim();
  let m, d;

  if (/^\d{2}-\d{2}$/.test(s)) {
    [m, d] = s.split('-').map(Number);
  } else {
    const dt = new Date(s);
    if (Number.isNaN(dt.getTime())) throw new ApiError(400, "Sana noto'g'ri. Masalan: 12-25 yoki 1990-12-25");
    m = dt.getMonth() + 1;
    d = dt.getDate();
  }

  if (m < 1 || m > 12 || d < 1 || d > 31) throw new ApiError(400, "Sana noto'g'ri (oy/kun)");
  return `${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
}

function create(userId, data) {
  const personName = String(data.personName || '').trim();
  if (!personName) throw new ApiError(400, 'Kimning tadbiri? Ism kerak');
  const date = normalizeDate(data.date);

  return store.insert({
    userId,
    personName,
    relation: String(data.relation || '').trim(), // Onam / Ayolim / Do'stim ...
    type: data.type || 'birthday',                 // birthday | anniversary ...
    date,                                          // 'MM-DD'
  });
}

function listByUser(userId) {
  return store.byUser(userId);
}

// Faqat egasi ko'radi/o'zgartiradi
function owned(userId, id) {
  const event = store.findById(id);
  if (!event) throw new ApiError(404, 'Tadbir topilmadi');
  if (event.userId !== userId) throw new ApiError(403, "Ruxsat yo'q");
  return event;
}

function update(userId, id, data) {
  owned(userId, id);
  const patch = {};
  if (data.personName != null) patch.personName = String(data.personName).trim();
  if (data.relation != null) patch.relation = String(data.relation).trim();
  if (data.type != null) patch.type = data.type;
  if (data.date != null) {
    patch.date = normalizeDate(data.date);
    patch.lastNotifiedYear = null; // sana o'zgardi -> eslatma qayta yuborilishi mumkin
  }
  return store.update(id, patch);
}

function remove(userId, id) {
  owned(userId, id);
  store.remove(id);
  return { id: Number(id) };
}

module.exports = { create, listByUser, update, remove, normalizeDate };
