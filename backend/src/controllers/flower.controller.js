// req/res. Mantiq service'da.
const flowerService = require('../services/flower.service');

async function list(req, res) {
  const data = flowerService.list(req.query);
  res.json({ success: true, data });
}

async function filters(req, res) {
  res.json({ success: true, data: flowerService.filters() });
}

async function getOne(req, res) {
  res.json({ success: true, data: flowerService.getById(req.params.id) });
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

module.exports = { list, filters, getOne, create, update, archive };
