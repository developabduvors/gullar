// Sevimlilar — userId -> Set(flowerId). KEYIN DB (many-to-many) ga ko'chadi.
const byUser = new Map();

function setFor(userId) {
  if (!byUser.has(userId)) byUser.set(userId, new Set());
  return byUser.get(userId);
}

function add(userId, flowerId) {
  setFor(userId).add(Number(flowerId));
}

function remove(userId, flowerId) {
  setFor(userId).delete(Number(flowerId));
}

function ids(userId) {
  return [...setFor(userId)];
}

function has(userId, flowerId) {
  return setFor(userId).has(Number(flowerId));
}

module.exports = { add, remove, ids, has };
