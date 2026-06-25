// req/res. Mantiq service'da. req.user — authRequired'dan keladi.
const subService = require('../services/subscription.service');

async function create(req, res) {
  const sub = subService.create(req.user.id, req.body);
  res.status(201).json({ success: true, message: 'Obuna yaratildi', data: sub });
}

async function mine(req, res) {
  res.json({ success: true, data: subService.listByUser(req.user.id) });
}

async function getOne(req, res) {
  res.json({ success: true, data: subService.getForUser(req.user, req.params.id) });
}

async function listAll(req, res) {
  res.json({ success: true, data: subService.listAll() });
}

// body: { action: 'pause' | 'resume' | 'cancel' }
async function setStatus(req, res) {
  const sub = subService.setStatus(req.user, req.params.id, req.body.action);
  res.json({ success: true, message: 'Obuna yangilandi', data: sub });
}

module.exports = { create, mine, getOne, listAll, setStatus };
