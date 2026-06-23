// URL -> controller. Ommaviy GET'lar ochiq, yozish/o'zgartirish faqat admin.
const express = require('express');
const router = express.Router();
const c = require('../controllers/flower.controller');
const { authRequired, adminOnly } = require('../middlewares/auth.middleware');

// --- Ommaviy ---
router.get('/', c.list);                 // ro'yxat (filtr/sort/sahifa)
router.get('/filters', c.filters);       // dinamik filtrlar (ranglar, combo)
router.get('/:id', c.getOne);            // bitta gul

// --- Admin ---
router.post('/', authRequired, adminOnly, c.create);
router.patch('/:id', authRequired, adminOnly, c.update);
router.patch('/:id/archive', authRequired, adminOnly, c.archive);

module.exports = router;
