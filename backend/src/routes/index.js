// Barcha route'lar shu yerda yig'iladi. Har yangi domen (auth, flowers...) shu yerga ulanadi.
const express = require('express');
const router = express.Router();

// Sog'liqni tekshirish — server tirikmi?
router.get('/health', (req, res) => {
  res.json({ success: true, message: 'API ishlayapti 🌹', time: new Date().toISOString() });
});

// Domenlar
router.use('/auth', require('./auth.route'));
router.use('/flowers', require('./flower.route'));
router.use('/search', require('./search.route'));
router.use('/favorites', require('./favorite.route'));
router.use('/orders', require('./order.route'));
router.use('/me', require('./me.route'));
router.use('/events', require('./event.route'));

module.exports = router;
