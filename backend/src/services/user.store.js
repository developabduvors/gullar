// Foydalanuvchilarni vaqtinchalik xotirada saqlash. KEYIN PostgreSQL ga ko'chadi.
const env = require('../config/env');
const users = new Map(); // phone -> user
let nextId = 1;

function findByPhone(phone) {
  return users.get(phone) || null;
}

function findById(id) {
  for (const u of users.values()) if (u.id === id) return u;
  return null;
}

// Telefon bo'yicha topadi, bo'lmasa yaratadi (OTP login = avtomatik register)
function findOrCreate(phone) {
  let user = users.get(phone);
  if (!user) {
    const role = env.adminPhones.includes(phone) ? 'admin' : 'user';
    user = { id: nextId++, phone, name: null, role, createdAt: new Date().toISOString() };
    users.set(phone, user);
  }
  return user;
}

function update(id, data) {
  const user = findById(id);
  if (!user) return null;
  Object.assign(user, data);
  return user;
}

module.exports = { findByPhone, findById, findOrCreate, update };
