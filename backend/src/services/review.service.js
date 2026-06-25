// Sharh biznes mantiqi. Faqat SOTIB OLGAN user baho bera oladi (feyk sharh oldini olish).
// Sharh 'pending' bo'lib tushadi -> admin tasdiqlagach saytda ko'rinadi.
const ApiError = require('../utils/ApiError');
const store = require('./review.store');
const flowerService = require('./flower.service');
const orderService = require('./order.service');

const STATUSES = ['pending', 'approved', 'rejected'];

// User shu gulni haqiqatdan sotib olganmi? — yetkazilgan (delivered) buyurtmada bo'lsa.
function hasPurchased(userId, flowerId) {
  const fid = Number(flowerId);
  return orderService
    .listByUser(userId)
    .some((o) => o.status === 'delivered' && o.items.some((it) => it.flowerId === fid));
}

// --- Sharh qoldirish ---
function create(userId, flowerId, data) {
  flowerService.getById(flowerId); // gul yo'q bo'lsa 404

  const rating = Math.floor(Number(data.rating));
  if (!(rating >= 1 && rating <= 5)) throw new ApiError(400, 'Baho 1 dan 5 gacha bo\'lishi kerak');

  const text = String(data.text || '').trim();

  if (!hasPurchased(userId, flowerId)) {
    throw new ApiError(403, 'Faqat ushbu gulni sotib olganlar baho bera oladi');
  }
  if (store.findByUserAndFlower(userId, flowerId)) {
    throw new ApiError(409, 'Siz bu gulga allaqachon sharh qoldirgansiz');
  }

  return store.insert({
    userId,
    flowerId: Number(flowerId),
    rating,
    text,
    status: 'pending', // admin tasdiqlagach ko'rinadi
  });
}

// --- Ommaviy: bitta gulning TASDIQLANGAN sharhlari + reyting xulosasi ---
function listForFlower(flowerId) {
  flowerService.getById(flowerId); // yo'q bo'lsa 404
  const approved = store.byFlower(flowerId, 'approved');
  const count = approved.length;
  const average = count ? Math.round((approved.reduce((s, r) => s + r.rating, 0) / count) * 10) / 10 : 0;
  return { average, count, reviews: approved };
}

// --- Admin: moderatsiya ro'yxati (default: kutilayotganlar) ---
function listForModeration(status) {
  if (status && !STATUSES.includes(status)) throw new ApiError(400, "Status noto'g'ri");
  return store.all(status || 'pending');
}

// --- Admin: tasdiqlash / rad etish ---
function moderate(id, status) {
  if (!['approved', 'rejected'].includes(status)) {
    throw new ApiError(400, "Status 'approved' yoki 'rejected' bo'lishi kerak");
  }
  const review = store.findById(id);
  if (!review) throw new ApiError(404, 'Sharh topilmadi');
  return store.update(id, { status });
}

module.exports = { create, listForFlower, listForModeration, moderate, hasPurchased, STATUSES };
