// req/res. Mantiq service'da. req.user — authRequired'dan keladi.
const orderService = require('../services/order.service');

async function create(req, res) {
  const order = orderService.create(req.user.id, req.body);
  res.status(201).json({ success: true, message: 'Buyurtma yaratildi', data: order });
}

async function mine(req, res) {
  res.json({ success: true, data: orderService.listByUser(req.user.id) });
}

async function getOne(req, res) {
  res.json({ success: true, data: orderService.getForUser(req.user, req.params.id) });
}

async function listAll(req, res) {
  res.json({ success: true, data: orderService.listAll() });
}

async function setStatus(req, res) {
  const order = orderService.setStatus(req.params.id, req.body.status);
  res.json({ success: true, message: 'Status yangilandi', data: order });
}

// Kuryer boti media yuklaydi (body: { media })
async function courierStatus(req, res) {
  const order = orderService.setCourierMedia(req.params.id, req.body.media);
  res.json({ success: true, message: "Buketingiz yo'lda! 🚚", data: order });
}

module.exports = { create, mine, getOne, listAll, setStatus, courierStatus };
