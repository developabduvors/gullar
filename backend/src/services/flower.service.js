// Flowers biznes mantiqi. req/res YO'Q.
const ApiError = require('../utils/ApiError');
const { buildCombo } = require('../utils/color-combo');
const store = require('./flower.store');

// --- Yaratish (admin) ---
function create(data) {
  const { name, price } = data;
  if (!name || !String(name).trim()) throw new ApiError(400, 'Gul nomi kerak');
  if (price == null || Number(price) <= 0) throw new ApiError(400, "Narx noto'g'ri");

  const colors = Array.isArray(data.colors) ? data.colors : [];
  return store.insert({
    name: String(name).trim(),
    description: data.description || '',
    price: Number(price),
    discountPrice: data.discountPrice != null ? Number(data.discountPrice) : null,
    images: Array.isArray(data.images) ? data.images : [],
    colors,
    combo: buildCombo(colors), // avto rang-filtr tagi
  });
}

// --- Bitta gul ---
function getById(id) {
  const flower = store.findById(id);
  if (!flower) throw new ApiError(404, 'Gul topilmadi');
  return flower;
}

// --- Tahrirlash (admin) ---
function update(id, data) {
  getById(id); // yo'q bo'lsa 404
  const patch = { ...data };
  if (data.colors) patch.combo = buildCombo(data.colors); // ranglar o'zgarsa combo yangilanadi
  return store.update(id, patch);
}

// --- Arxivlash / qaytarish (admin) ---
function setArchived(id, archived) {
  getById(id);
  return store.update(id, { archived: Boolean(archived) });
}

// --- Ro'yxat: filtr + sort + sahifalash (ommaviy) ---
function list(query = {}) {
  let items = store.all().filter((f) => !f.archived); // arxivlangan ko'rinmaydi

  // rang bo'yicha filtr: ?colors=red,blue (shu ranglarning HAMMASI bo'lgan gullar)
  if (query.colors) {
    const wanted = String(query.colors).toLowerCase().split(',').map((c) => c.trim()).filter(Boolean);
    items = items.filter((f) => wanted.every((c) => f.colors.includes(c)));
  }

  // faqat chegirmadagilar: ?discount=true
  if (String(query.discount) === 'true') {
    items = items.filter((f) => f.discountPrice != null && f.discountPrice < f.price);
  }

  // saralash: ?sort=price_asc | price_desc | newest
  const sort = query.sort || 'newest';
  const priceOf = (f) => (f.discountPrice != null ? f.discountPrice : f.price);
  if (sort === 'price_asc') items.sort((a, b) => priceOf(a) - priceOf(b));
  else if (sort === 'price_desc') items.sort((a, b) => priceOf(b) - priceOf(a));
  else items.sort((a, b) => b.id - a.id); // newest

  // sahifalash: ?page=1&limit=12
  const page = Math.max(1, Number(query.page) || 1);
  const limit = Math.max(1, Math.min(50, Number(query.limit) || 12));
  const total = items.length;
  const start = (page - 1) * limit;

  return { items: items.slice(start, start + limit), total, page, limit, pages: Math.ceil(total / limit) };
}

// --- Dinamik filtrlar: mavjud ranglar va combo'lar (frontend filtr UI uchun) ---
function filters() {
  const active = store.all().filter((f) => !f.archived);
  const colors = new Set();
  const combos = new Map(); // tag -> label

  for (const f of active) {
    f.colors.forEach((c) => colors.add(c));
    if (f.combo && f.combo.colors.length > 1) combos.set(f.combo.tag, f.combo.label);
  }
  return {
    colors: [...colors],
    combos: [...combos].map(([tag, label]) => ({ tag, label })),
  };
}

module.exports = { create, getById, update, setArchived, list, filters };
