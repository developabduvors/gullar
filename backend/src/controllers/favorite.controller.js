// req.user — authRequired middleware'dan keladi.
const favoriteService = require('../services/favorite.service');

async function list(req, res) {
  res.json({ success: true, data: favoriteService.list(req.user.id) });
}

async function add(req, res) {
  const data = favoriteService.add(req.user.id, req.params.flowerId);
  res.json({ success: true, message: "Sevimlilarga qo'shildi", data });
}

async function remove(req, res) {
  const data = favoriteService.remove(req.user.id, req.params.flowerId);
  res.json({ success: true, message: 'Sevimlilardan olindi', data });
}

module.exports = { list, add, remove };
