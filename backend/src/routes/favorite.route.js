// Hammasi login talab qiladi.
const express = require('express');
const router = express.Router();
const c = require('../controllers/favorite.controller');
const { authRequired } = require('../middlewares/auth.middleware');

router.use(authRequired); // shu router'dagi BARCHA route himoyalangan

router.get('/', c.list);
router.post('/:flowerId', c.add);
router.delete('/:flowerId', c.remove);

module.exports = router;
