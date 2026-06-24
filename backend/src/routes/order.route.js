// /orders — yozish amallari. O'z buyurtmalarini o'qish /me/orders da (me.route.js).
const express = require('express');
const router = express.Router();
const c = require('../controllers/order.controller');
const { authRequired, adminOnly } = require('../middlewares/auth.middleware');

router.use(authRequired);

router.post('/', c.create);                            // buyurtma yaratish
router.get('/all', adminOnly, c.listAll);              // ⚠️ '/:id' dan OLDIN
router.get('/:id', c.getOne);                          // bitta buyurtma (egasi yoki admin)
router.patch('/:id/status', adminOnly, c.setStatus);   // holat (admin)
router.post('/:id/courier-status', adminOnly, c.courierStatus); // kuryer media (Sardor boti)

module.exports = router;
