// req/res. Mantiq service'da. req.user — authRequired'dan keladi.
const reviewService = require('../services/review.service');

// POST /flowers/:id/reviews  (login + sotib olgan)  body: { rating, text }
async function create(req, res) {
  const review = reviewService.create(req.user.id, req.params.id, req.body);
  res.status(201).json({ success: true, message: 'Sharh qabul qilindi (moderatsiyada)', data: review });
}

// GET /flowers/:id/reviews  (ommaviy) — tasdiqlangan sharhlar + reyting
async function listForFlower(req, res) {
  res.json({ success: true, data: reviewService.listForFlower(req.params.id) });
}

// GET /admin/reviews?status=pending  (admin)
async function listForModeration(req, res) {
  res.json({ success: true, data: reviewService.listForModeration(req.query.status) });
}

// PATCH /admin/reviews/:id  (admin)  body: { status: 'approved' | 'rejected' }
async function moderate(req, res) {
  const review = reviewService.moderate(req.params.id, req.body.status);
  res.json({ success: true, message: 'Sharh yangilandi', data: review });
}

module.exports = { create, listForFlower, listForModeration, moderate };
