// /cart — savat. Hammasi login talab qiladi.
const express = require('express');
const router = express.Router();
const c = require('../controllers/cart.controller');
const { authRequired } = require('../middlewares/auth.middleware');

router.use(authRequired); // shu router'dagi BARCHA route himoyalangan

router.get('/', c.get);                       // savatni ko'rish (jonli narx + jami)
router.post('/items', c.add);                 // qo'shish { flowerId, qty? }
router.post('/checkout', c.checkout);         // ⚠️ '/items/:flowerId' bilan to'qnashmaydi, lekin oldinroq tursin
router.patch('/items/:flowerId', c.setQty);   // miqdorni o'rnatish { qty }
router.delete('/items/:flowerId', c.remove);  // bitta gulni olib tashlash
router.delete('/', c.clear);                  // savatni tozalash

module.exports = router;
