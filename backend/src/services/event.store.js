// Tadbirlar kalendari (tug'ilgan kunlar) — xotirada. KEYIN PostgreSQL ga ko'chadi.
// Qudratning kalendar UI'si shu yerga yozadi, cron job shu yerdan o'qiydi.
const events = new Map(); // id -> event
let nextId = 1;

function insert(data) {
  const event = { id: nextId++, lastNotifiedYear: null, createdAt: new Date().toISOString(), ...data };
  events.set(event.id, event);
  return event;
}

function findById(id) {
  return events.get(Number(id)) || null;
}

function byUser(userId) {
  return [...events.values()].filter((e) => e.userId === userId).sort((a, b) => a.date.localeCompare(b.date));
}

function all() {
  return [...events.values()];
}

function update(id, data) {
  const event = findById(id);
  if (!event) return null;
  Object.assign(event, data);
  return event;
}

function remove(id) {
  return events.delete(Number(id));
}

module.exports = { insert, findById, byUser, all, update, remove };
