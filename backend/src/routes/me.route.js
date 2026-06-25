// /me/* — kirgan foydalanuvchining o'ziga tegishli o'qishlar (spec: 07, 10 vault).
const express = require('express');
const router = express.Router();
const orderC = require('../controllers/order.controller');
const walletC = require('../controllers/wallet.controller');
const subC = require('../controllers/subscription.controller');
const userC = require('../controllers/user.controller');
const { authRequired } = require('../middlewares/auth.middleware');

router.use(authRequired);

// Profil (02)
router.get('/', userC.getProfile);           // o'z profilim (+ keshbek balansi)
router.patch('/', userC.updateProfile);      // profilni yangilash { name?, email?, avatar? }

// Manzillar (02)
router.get('/addresses', userC.listAddresses);
router.post('/addresses', userC.addAddress);             // { address, label?, recipient?, phone?, isDefault? }
router.delete('/addresses/:addressId', userC.removeAddress);

// Bog'liq o'qishlar
router.get('/orders', orderC.mine);          // mening buyurtmalarim
router.get('/cashback', walletC.me);         // mening keshbegim (balans + tarix)
router.get('/subscriptions', subC.mine);     // mening obunalarim

module.exports = router;
