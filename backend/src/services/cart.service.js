// Savat biznes mantiqi. Narx HAR DOIM serverdagi guldan jonli hisoblanadi
// (savatda narx saqlanmaydi — narx-buzish himoyasi). Checkout order.service'ni chaqiradi.
const ApiError = require('../utils/ApiError');
const store = require('./cart.store');
const flowerService = require('./flower.service');
const orderService = require('./order.service');

// Savatning to'liq ko'rinishi: jonli narx + jami. O'chgan gullar avtomatik tozalanadi.
function getCart(userId) {
  const items = [];
  let subtotal = 0;

  for (const [flowerId, qty] of store.entries(userId)) {
    let flower;
    try {
      flower = flowerService.getById(flowerId);
    } catch {
      store.remove(userId, flowerId); // gul o'chgan — savatdan tushiramiz
      continue;
    }
    const unitPrice = flower.discountPrice != null ? flower.discountPrice : flower.price;
    const sum = unitPrice * qty;
    subtotal += flower.archived ? 0 : sum; // arxivlangani jamiga kirmaydi
    items.push({
      flowerId: flower.id,
      name: flower.name,
      image: flower.images && flower.images[0] ? flower.images[0] : null,
      unitPrice,
      qty,
      sum,
      archived: Boolean(flower.archived), // frontend "sotuvda yo'q" deb ko'rsatadi
    });
  }

  const count = items.reduce((n, it) => n + it.qty, 0);
  return { items, subtotal, count };
}

// Savatga qo'shish — mavjud bo'lsa miqdorni oshiradi
function addItem(userId, flowerId, qty = 1) {
  const flower = flowerService.getById(flowerId); // yo'q bo'lsa 404
  if (flower.archived) throw new ApiError(400, `"${flower.name}" hozir sotuvda yo'q`);
  const add = Math.max(1, Number(qty) || 1);

  const current = store.entries(userId).find(([id]) => id === flower.id);
  const next = (current ? current[1] : 0) + add;
  store.setQty(userId, flower.id, next);
  return getCart(userId);
}

// Miqdorni aniq o'rnatish (0 yoki kam -> o'chiradi)
function setQty(userId, flowerId, qty) {
  flowerService.getById(flowerId); // yo'q bo'lsa 404
  const n = Math.floor(Number(qty));
  if (Number.isNaN(n)) throw new ApiError(400, "Miqdor noto'g'ri");
  store.setQty(userId, flowerId, n);
  return getCart(userId);
}

function removeItem(userId, flowerId) {
  store.remove(userId, flowerId);
  return getCart(userId);
}

function clear(userId) {
  store.clear(userId);
  return getCart(userId);
}

// --- Checkout: savatni buyurtmaga aylantiradi (narx/keshbek order.service'da) ---
// Muvaffaqiyatli buyurtmadan keyingina savat tozalanadi.
function checkout(userId, data = {}) {
  const cart = getCart(userId);
  if (cart.items.length === 0) throw new ApiError(400, "Savat bo'sh");

  const items = cart.items.map((it) => ({ flowerId: it.flowerId, qty: it.qty }));
  const order = orderService.create(userId, {
    items,
    useCashback: data.useCashback,
    recipient: data.recipient,
    anonymous: data.anonymous,
    address: data.address,
    note: data.note,
    scheduledAt: data.scheduledAt,
  });

  store.clear(userId); // buyurtma yaratilgach savat bo'shaydi
  return order;
}

module.exports = { getCart, addItem, setQty, removeItem, clear, checkout };
