// /subscriptions — yozish amallari. O'z obunalarini o'qish /me/subscriptions da (me.route.js).
const express = require('express');
const router = express.Router();
const c = require('../controllers/subscription.controller');
const { authRequired, adminOnly } = require('../middlewares/auth.middleware');

router.use(authRequired);

router.post('/', c.create);                  // obuna yaratish
router.get('/all', adminOnly, c.listAll);     // ⚠️ '/:id' dan OLDIN
router.get('/:id', c.getOne);                 // bitta obuna (egasi yoki admin)
router.patch('/:id', c.setStatus);            // pause / resume / cancel (egasi yoki admin)

module.exports = router;
