// /me/* — kirgan foydalanuvchining o'ziga tegishli o'qishlar (spec: 07, 10 vault).
const express = require('express');
const router = express.Router();
const orderC = require('../controllers/order.controller');
const walletC = require('../controllers/wallet.controller');
const { authRequired } = require('../middlewares/auth.middleware');

router.use(authRequired);

router.get('/orders', orderC.mine);     // mening buyurtmalarim
router.get('/cashback', walletC.me);    // mening keshbegim (balans + tarix)

module.exports = router;
