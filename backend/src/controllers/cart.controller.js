// req.user — authRequired middleware'dan keladi.
const cartService = require('../services/cart.service');

async function get(req, res) {
  res.json({ success: true, data: cartService.getCart(req.user.id) });
}

// body: { flowerId, qty? }
async function add(req, res) {
  const data = cartService.addItem(req.user.id, req.body.flowerId, req.body.qty);
  res.json({ success: true, message: "Savatga qo'shildi", data });
}

// body: { qty }
async function setQty(req, res) {
  const data = cartService.setQty(req.user.id, req.params.flowerId, req.body.qty);
  res.json({ success: true, message: 'Miqdor yangilandi', data });
}

async function remove(req, res) {
  const data = cartService.removeItem(req.user.id, req.params.flowerId);
  res.json({ success: true, message: 'Savatdan olindi', data });
}

async function clear(req, res) {
  const data = cartService.clear(req.user.id);
  res.json({ success: true, message: 'Savat tozalandi', data });
}

// body: { useCashback, recipient, anonymous, address, note, scheduledAt }
async function checkout(req, res) {
  const order = cartService.checkout(req.user.id, req.body);
  res.status(201).json({ success: true, message: 'Buyurtma yaratildi', data: order });
}

module.exports = { get, add, setQty, remove, clear, checkout };
