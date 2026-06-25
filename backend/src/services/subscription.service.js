// Obuna biznes mantiqi: premium obuna (haftalik/oylik gul yangilash).
// To'lov tizimi hali yo'q (10 vault) — shuning uchun obuna har siklda mavjud
// order.service orqali BUYURTMA yaratadi (narx/keshbek o'sha yerda hisoblanadi).
const ApiError = require('../utils/ApiError');
const store = require('./subscription.store');
const flowerService = require('./flower.service');
const orderService = require('./order.service');

// Qo'llab-quvvatlanadigan sikllar va navbatdagi sanani hisoblash
const INTERVALS = ['weekly', 'monthly'];
const STATUSES = ['active', 'paused', 'cancelled'];

// Berilgan sanadan keyingi yetkazish sanasini hisoblaydi (haftalik +7 kun, oylik +1 oy)
function nextDate(from, interval) {
  const d = new Date(from);
  if (interval === 'weekly') d.setDate(d.getDate() + 7);
  else d.setMonth(d.getMonth() + 1); // monthly
  return d.toISOString();
}

// --- Obuna yaratish ---
function create(userId, data) {
  const interval = data.interval;
  if (!INTERVALS.includes(interval)) throw new ApiError(400, "Interval 'weekly' yoki 'monthly' bo'lishi kerak");

  const flower = flowerService.getById(data.flowerId); // yo'q bo'lsa 404
  if (flower.archived) throw new ApiError(400, `"${flower.name}" hozir sotuvda yo'q`);

  const address = String(data.address || '').trim();
  if (!address) throw new ApiError(400, 'Yetkazish manzili kerak');

  const qty = Math.max(1, Number(data.qty) || 1);
  const unitPrice = flower.discountPrice != null ? flower.discountPrice : flower.price;

  // Birinchi yetkazish: startAt (default — hozir). Keyingi sikllar shu sanadan hisoblanadi.
  const startAt = data.startAt ? new Date(data.startAt).toISOString() : new Date().toISOString();

  return store.insert({
    userId,
    flowerId: flower.id,
    flowerName: flower.name,
    interval,
    qty,
    pricePerCycle: unitPrice * qty,   // ko'rsatish uchun snapshot (haqiqiy narx order'da qayta hisoblanadi)
    address,
    recipient: data.recipient || '',
    note: data.note || '',                 // tabriknoma matni
    anonymous: Boolean(data.anonymous),
    status: 'active',
    startAt,
    nextDeliveryAt: startAt,               // birinchi skanerda yetkaziladi
    deliveriesCount: 0,
    lastOrderId: null,
    lastError: null,
    history: [],                            // [{ orderId, at }]
  });
}

// --- O'qish ---
function getById(id) {
  const sub = store.findById(id);
  if (!sub) throw new ApiError(404, 'Obuna topilmadi');
  return sub;
}

// Faqat egasi yoki admin
function getForUser(user, id) {
  const sub = getById(id);
  if (user.role !== 'admin' && sub.userId !== user.id) throw new ApiError(403, "Ruxsat yo'q");
  return sub;
}

function listByUser(userId) {
  return store.byUser(userId);
}

function listAll() {
  return store.all();
}

// --- Holatni o'zgartirish: pause / resume / cancel (egasi yoki admin) ---
function setStatus(user, id, action) {
  const sub = getForUser(user, id);
  if (sub.status === 'cancelled') throw new ApiError(409, 'Obuna allaqachon bekor qilingan');

  if (action === 'pause') {
    return store.update(id, { status: 'paused' });
  }
  if (action === 'resume') {
    // Pauzada o'tib ketgan sana bo'lsa, keyingi yetkazishni hozirga surib qo'yamiz
    const next = new Date(sub.nextDeliveryAt) < new Date() ? new Date().toISOString() : sub.nextDeliveryAt;
    return store.update(id, { status: 'active', nextDeliveryAt: next });
  }
  if (action === 'cancel') {
    return store.update(id, { status: 'cancelled' });
  }
  throw new ApiError(400, "Amal noto'g'ri ('pause' | 'resume' | 'cancel')");
}

// --- Cron yadrosi: muddati kelgan obunalar uchun buyurtma yaratadi ---
// now'ni uzatsa bo'ladi (test uchun). Sof, qayta-ishonchli (idempotent) funksiya.
function processDue(now = new Date()) {
  const created = [];

  for (const sub of store.all()) {
    if (sub.status !== 'active') continue;
    if (new Date(sub.nextDeliveryAt) > now) continue; // hali muddati kelmagan

    try {
      const order = orderService.create(sub.userId, {
        items: [{ flowerId: sub.flowerId, qty: sub.qty }],
        address: sub.address,
        recipient: sub.recipient,
        note: sub.note,
        anonymous: sub.anonymous,
      });
      store.update(sub.id, {
        lastOrderId: order.id,
        lastError: null,
        deliveriesCount: sub.deliveriesCount + 1,
        nextDeliveryAt: nextDate(sub.nextDeliveryAt, sub.interval),
        history: [{ orderId: order.id, at: new Date().toISOString() }, ...sub.history],
      });
      created.push({ subscriptionId: sub.id, orderId: order.id, userId: sub.userId });
    } catch (e) {
      // Masalan, gul arxivlangan — bloklab qolmaslik uchun sanani baribir suramiz
      store.update(sub.id, {
        lastError: e.message,
        nextDeliveryAt: nextDate(sub.nextDeliveryAt, sub.interval),
      });
      console.error(`Obuna #${sub.id} yetkazib bo'lmadi:`, e.message);
    }
  }

  if (created.length) console.log(`🔁 Obuna: ${created.length} ta buyurtma yaratildi`);
  return created;
}

module.exports = {
  create, getById, getForUser, listByUser, listAll, setStatus, processDue, nextDate,
  INTERVALS, STATUSES,
};
