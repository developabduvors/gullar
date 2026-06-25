// Obunalarni vaqtinchalik xotirada saqlash. KEYIN PostgreSQL ga ko'chadi.
const subs = new Map(); // id -> subscription
let nextId = 1;

function insert(data) {
  const sub = { id: nextId++, createdAt: new Date().toISOString(), ...data };
  subs.set(sub.id, sub);
  return sub;
}

function findById(id) {
  return subs.get(Number(id)) || null;
}

function byUser(userId) {
  return [...subs.values()].filter((s) => s.userId === userId).sort((a, b) => b.id - a.id);
}

function all() {
  return [...subs.values()].sort((a, b) => b.id - a.id);
}

function update(id, data) {
  const sub = findById(id);
  if (!sub) return null;
  Object.assign(sub, data);
  return sub;
}

module.exports = { insert, findById, byUser, all, update };
