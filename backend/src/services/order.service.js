// Buyurtma biznes mantiqi: narxni serverda hisoblash, keshbek bilan to'lov va keshbek qaytarish.
const ApiError = require('../utils/ApiError');
const env = require('../config/env');
const store = require('./order.store');
const flowerService = require('./flower.service');
const wallet = require('./wallet.service');

// Spec bo'yicha holat oqimi (09 vault). 'cancelled' — keshbek qaytarish uchun qo'shimcha.
const STATUSES = ['pending', 'confirmed', 'preparing', 'on_the_way', 'delivered', 'cancelled'];

// --- Buyurtma yaratish ---
function create(userId, data) {
  const rawItems = Array.isArray(data.items) ? data.items : [];
  if (rawItems.length === 0) throw new ApiError(400, "Buyurtma bo'sh");

  // Narxni MIJOZGA EMAS, serverdagi gulga ishonib hisoblaymiz
  const items = rawItems.map((it) => {
    const flower = flowerService.getById(it.flowerId); // yo'q bo'lsa 404
    if (flower.archived) throw new ApiError(400, `"${flower.name}" hozir sotuvda yo'q`);
    const qty = Math.max(1, Number(it.qty) || 1);
    const unitPrice = flower.discountPrice != null ? flower.discountPrice : flower.price;
    return { flowerId: flower.id, name: flower.name, qty, unitPrice, sum: unitPrice * qty };
  });

  const subtotal = items.reduce((s, it) => s + it.sum, 0);

  // Keshbek bilan qisman to'lov (ixtiyoriy): balansdan ham, summadan ham oshmaydi
  let cashbackUsed = 0;
  if (data.useCashback) {
    cashbackUsed = Math.min(wallet.getBalance(userId), subtotal);
  }
  const total = subtotal - cashbackUsed;

  // ⚠️ Tranzaksiya: avval pulni yechamiz (balans yetmasa shu yerda throw bo'ladi), keyin buyurtma yoziladi
  if (cashbackUsed > 0) wallet.debit(userId, cashbackUsed, 'Buyurtma uchun keshbek to\'lov');

  return store.insert({
    userId,
    items,
    subtotal,
    cashbackUsed,
    total,
    cashbackEarned: 0,          // completed bo'lganda to'ldiriladi
    status: 'pending',
    recipient: data.recipient || '',          // kimga
    anonymous: Boolean(data.anonymous),       // "Anonim sovg'a"
    address: data.address || '',
    note: data.note || '',                    // tabriknoma matni
    scheduledAt: data.scheduledAt || null,    // yetkazish vaqti
    courierMedia: null,                        // Sardor boti keyin to'ldiradi
  });
}

// --- O'qish ---
function getById(id) {
  const order = store.findById(id);
  if (!order) throw new ApiError(404, 'Buyurtma topilmadi');
  return order;
}

// Faqat egasi yoki admin ko'ra oladi
function getForUser(user, id) {
  const order = getById(id);
  if (user.role !== 'admin' && order.userId !== user.id) throw new ApiError(403, "Ruxsat yo'q");
  return order;
}

function listByUser(userId) {
  return store.byUser(userId);
}

function listAll() {
  return store.all();
}

// --- Status o'zgartirish (admin) + keshbek mantiqi ---
function setStatus(id, status) {
  if (!STATUSES.includes(status)) throw new ApiError(400, "Status noto'g'ri");
  const order = getById(id);

  // YETKAZILDI: 5% keshbek bir marta beriladi
  if (status === 'delivered' && order.cashbackEarned === 0) {
    const earned = Math.round(order.total * env.cashbackRate);
    if (earned > 0) {
      wallet.credit(order.userId, earned, `Buyurtma #${order.id} uchun keshbek`);
      order.cashbackEarned = earned;
    }
  }

  // BEKOR QILINDI: ishlatilgan keshbek qaytariladi (qayta bekorlashda takror qaytarilmaydi)
  if (status === 'cancelled' && order.status !== 'cancelled' && order.cashbackUsed > 0) {
    wallet.credit(order.userId, order.cashbackUsed, `Buyurtma #${order.id} bekor qilindi — keshbek qaytdi`);
  }

  return store.update(id, { status });
}

// --- Kuryer media (Sardor boti yuklaydi): "Buketingiz yo'lda!" ---
function setCourierMedia(id, media) {
  getById(id); // yo'q bo'lsa 404
  const url = String(media || '').trim();
  if (!url) throw new ApiError(400, 'Media (rasm/video) link kerak');
  return store.update(id, { courierMedia: url, status: 'on_the_way' });
}

module.exports = { create, getById, getForUser, listByUser, listAll, setStatus, setCourierMedia };
