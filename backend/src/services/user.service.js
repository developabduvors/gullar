// Profil va manzillar biznes mantiqi. req/res YO'Q.
// Telefon — login identifikatori (OTP), shuning uchun bu yerda O'ZGARTIRILMAYDI.
const ApiError = require('../utils/ApiError');
const store = require('./user.store');
const wallet = require('./wallet.service');

// Tashqariga chiqadigan xavfsiz profil shakli (+ jonli keshbek balansi)
function publicProfile(user) {
  return {
    id: user.id,
    name: user.name || null,
    phone: user.phone,
    email: user.email || null,
    avatar: user.avatar || null,
    role: user.role,
    cashbackBalance: wallet.getBalance(user.id),
    createdAt: user.createdAt,
  };
}

function getProfile(userId) {
  const user = store.findById(userId);
  if (!user) throw new ApiError(404, 'Foydalanuvchi topilmadi');
  return publicProfile(user);
}

// Faqat ruxsat etilgan maydonlar yangilanadi (name, email, avatar). Telefon va rol O'ZGARMAYDI.
function updateProfile(userId, data) {
  const user = store.findById(userId);
  if (!user) throw new ApiError(404, 'Foydalanuvchi topilmadi');

  const patch = {};
  if (data.name !== undefined) {
    const name = String(data.name).trim();
    if (!name) throw new ApiError(400, "Ism bo'sh bo'lishi mumkin emas");
    patch.name = name;
  }
  if (data.email !== undefined) {
    const email = String(data.email).trim();
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new ApiError(400, "Email noto'g'ri");
    patch.email = email || null;
  }
  if (data.avatar !== undefined) {
    patch.avatar = String(data.avatar).trim() || null;
  }

  store.update(userId, patch);
  return publicProfile(store.findById(userId));
}

// --- Manzillar (user obyektida saqlanadi: user.addresses[]) ---
function listAddresses(userId) {
  const user = store.findById(userId);
  if (!user) throw new ApiError(404, 'Foydalanuvchi topilmadi');
  return user.addresses || [];
}

function addAddress(userId, data) {
  const user = store.findById(userId);
  if (!user) throw new ApiError(404, 'Foydalanuvchi topilmadi');

  const address = String(data.address || '').trim();
  if (!address) throw new ApiError(400, 'Manzil matni kerak');

  if (!user.addresses) user.addresses = [];
  if (!user.addressSeq) user.addressSeq = 0;

  const isDefault = Boolean(data.isDefault) || user.addresses.length === 0; // birinchisi avto-default
  if (isDefault) user.addresses.forEach((a) => { a.isDefault = false; }); // bittadan ortiq default bo'lmasin

  const item = {
    id: ++user.addressSeq,
    label: String(data.label || '').trim() || 'Manzil', // "Uy", "Ofis"
    address,
    recipient: String(data.recipient || '').trim(),
    phone: String(data.phone || '').trim(),
    isDefault,
    createdAt: new Date().toISOString(),
  };
  user.addresses.push(item);
  return user.addresses;
}

function removeAddress(userId, addressId) {
  const user = store.findById(userId);
  if (!user) throw new ApiError(404, 'Foydalanuvchi topilmadi');

  const id = Number(addressId);
  const list = user.addresses || [];
  const idx = list.findIndex((a) => a.id === id);
  if (idx === -1) throw new ApiError(404, 'Manzil topilmadi');

  const [removed] = list.splice(idx, 1);
  // O'chirilgani default bo'lsa, qolganlardan birinchisini default qilamiz
  if (removed.isDefault && list.length) list[0].isDefault = true;
  return list;
}

module.exports = { getProfile, updateProfile, listAddresses, addAddress, removeAddress, publicProfile };
