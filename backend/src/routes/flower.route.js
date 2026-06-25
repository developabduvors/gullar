// URL -> controller. Ommaviy GET'lar ochiq, yozish/o'zgartirish faqat admin.
const express = require('express');
const router = express.Router();
const c = require('../controllers/flower.controller');
const reviewC = require('../controllers/review.controller');
const { authRequired, adminOnly } = require('../middlewares/auth.middleware');

// --- Ommaviy ---
router.get('/', c.list);                 // ro'yxat (filtr/sort/sahifa)
router.get('/filters', c.filters);       // dinamik filtrlar (ranglar, combo)
router.get('/express', c.express);       // ⚠️ '/:id' dan OLDIN — tezkor buketlar
router.get('/:id', c.getOne);            // bitta gul

// --- Sharhlar (08) ---
router.get('/:id/reviews', reviewC.listForFlower);            // ommaviy: tasdiqlangan sharhlar + reyting
router.post('/:id/reviews', authRequired, reviewC.create);    // sotib olgan user: sharh qoldirish

// --- Admin ---
router.post('/', authRequired, adminOnly, c.create);
router.patch('/:id', authRequired, adminOnly, c.update);
router.patch('/:id/archive', authRequired, adminOnly, c.archive);
router.patch('/:id/express', authRequired, adminOnly, c.setExpress); // tezkor buket flag

module.exports = router;
