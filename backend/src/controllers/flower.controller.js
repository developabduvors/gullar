// req/res. Mantiq service'da.
const flowerService = require('../services/flower.service');

async function list(req, res) {
  const data = flowerService.list(req.query);
  res.json({ success: true, data });
}

async function filters(req, res) {
  res.json({ success: true, data: flowerService.filters() });
}

// GET /flowers/express — tezkor (15 daq) tayyor buketlar
async function express(req, res) {
  res.json({ success: true, data: flowerService.listExpress() });
}

async function getOne(req, res) {
  res.json({ success: true, data: flowerService.getById(req.params.id) });
}

// PATCH /flowers/:id/express (admin) — body: { express, prepMinutes? }
async function setExpress(req, res) {
  const flower = flowerService.setExpress(req.params.id, req.body);
  res.json({ success: true, message: flower.express ? 'Tezkor buket yoqildi' : "Tezkor buket o'chirildi", data: flower });
}

async function create(req, res) {
  const flower = flowerService.create(req.body);
  res.status(201).json({ success: true, message: "Gul qo'shildi", data: flower });
}

async function update(req, res) {
  const flower = flowerService.update(req.params.id, req.body);
  res.json({ success: true, message: 'Yangilandi', data: flower });
}

async function archive(req, res) {
  // ?restore=true bo'lsa qaytaradi, aks holda arxivlaydi
  const archived = String(req.query.restore) !== 'true';
  const flower = flowerService.setArchived(req.params.id, archived);
  res.json({ success: true, message: archived ? 'Arxivlandi' : 'Qaytarildi', data: flower });
}

module.exports = { list, filters, express, getOne, create, update, archive, setExpress };
