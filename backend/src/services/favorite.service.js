// Sevimlilar mantiqi. Flowers bilan bog'liq — gul borligini tekshiradi, to'liq gulni qaytaradi.
const ApiError = require('../utils/ApiError');
const store = require('./favorite.store');
const flowerService = require('./flower.service');

// Qo'shish — gul mavjudligini tekshiradi (404 bo'lsa throw)
function add(userId, flowerId) {
  flowerService.getById(flowerId); // yo'q bo'lsa 404
  store.add(userId, flowerId);
  return list(userId);
}

function remove(userId, flowerId) {
  store.remove(userId, flowerId);
  return list(userId);
}

// To'liq gullar ro'yxati (arxivlangani tashlanadi)
function list(userId) {
  return store
    .ids(userId)
    .map((id) => {
      try {
        return flowerService.getById(id);
      } catch {
        return null; // gul o'chgan/topilmasa
      }
    })
    .filter((f) => f && !f.archived);
}

module.exports = { add, remove, list };
