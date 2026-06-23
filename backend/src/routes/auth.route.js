// URL -> controller mapping. Mantiq YO'Q.
const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { authRequired } = require('../middlewares/auth.middleware');

router.post('/send-otp', authController.sendOtp);
router.post('/verify-otp', authController.verifyOtp);

// Token ishlayotganini tekshirish uchun namuna (himoyalangan)
router.get('/me', authRequired, (req, res) => {
  res.json({ success: true, data: req.user });
});

module.exports = router;
