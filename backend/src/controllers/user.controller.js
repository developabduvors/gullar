// req.user — authRequired'dan keladi. Mantiq user.service'da.
const userService = require('../services/user.service');

async function getProfile(req, res) {
  res.json({ success: true, data: userService.getProfile(req.user.id) });
}

// body: { name?, email?, avatar? }
async function updateProfile(req, res) {
  const data = userService.updateProfile(req.user.id, req.body);
  res.json({ success: true, message: 'Profil yangilandi', data });
}

async function listAddresses(req, res) {
  res.json({ success: true, data: userService.listAddresses(req.user.id) });
}

// body: { address, label?, recipient?, phone?, isDefault? }
async function addAddress(req, res) {
  const data = userService.addAddress(req.user.id, req.body);
  res.status(201).json({ success: true, message: "Manzil qo'shildi", data });
}

async function removeAddress(req, res) {
  const data = userService.removeAddress(req.user.id, req.params.addressId);
  res.json({ success: true, message: "Manzil o'chirildi", data });
}

module.exports = { getProfile, updateProfile, listAddresses, addAddress, removeAddress };
