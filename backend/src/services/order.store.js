// Buyurtmalarni vaqtinchalik xotirada saqlash. KEYIN PostgreSQL ga ko'chadi.
const orders = new Map(); // id -> order
let nextId = 1;

function insert(data) {
  const order = { id: nextId++, createdAt: new Date().toISOString(), ...data };
  orders.set(order.id, order);
  return order;
}

function findById(id) {
  return orders.get(Number(id)) || null;
}

function byUser(userId) {
  return [...orders.values()].filter((o) => o.userId === userId).sort((a, b) => b.id - a.id);
}

function all() {
  return [...orders.values()].sort((a, b) => b.id - a.id);
}

function update(id, data) {
  const order = findById(id);
  if (!order) return null;
  Object.assign(order, data);
  return order;
}

module.exports = { insert, findById, byUser, all, update };
