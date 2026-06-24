// req.user — authRequired'dan keladi.
const eventService = require('../services/event.service');

async function list(req, res) {
  res.json({ success: true, data: eventService.listByUser(req.user.id) });
}

async function create(req, res) {
  const event = eventService.create(req.user.id, req.body);
  res.status(201).json({ success: true, message: "Tadbir qo'shildi", data: event });
}

async function update(req, res) {
  const event = eventService.update(req.user.id, req.params.id, req.body);
  res.json({ success: true, message: 'Tadbir yangilandi', data: event });
}

async function remove(req, res) {
  const data = eventService.remove(req.user.id, req.params.id);
  res.json({ success: true, message: "Tadbir o'chirildi", data });
}

module.exports = { list, create, update, remove };
