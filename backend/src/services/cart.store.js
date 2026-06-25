// Savat — userId -> Map(flowerId -> qty). KEYIN DB (cart + cart_items) ga ko'chadi.
const byUser = new Map();

// Foydalanuvchi savatini oladi, bo'lmasa bo'sh ochadi
function cartOf(userId) {
  if (!byUser.has(userId)) byUser.set(userId, new Map());
  return byUser.get(userId);
}

// Miqdorni o'rnatadi (mavjud bo'lsa ustiga yozadi). qty <= 0 bo'lsa o'chiradi.
function setQty(userId, flowerId, qty) {
  const cart = cartOf(userId);
  const id = Number(flowerId);
  if (qty <= 0) cart.delete(id);
  else cart.set(id, qty);
}

function remove(userId, flowerId) {
  cartOf(userId).delete(Number(flowerId));
}

function clear(userId) {
  cartOf(userId).clear();
}

// [[flowerId, qty], ...]
function entries(userId) {
  return [...cartOf(userId).entries()];
}

module.exports = { setQty, remove, clear, entries };
