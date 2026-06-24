// Tadbirlar kalendari — login talab qiladi (Qudratning UI'si shu yerga ulanadi).
const express = require('express');
const router = express.Router();
const c = require('../controllers/event.controller');
const { authRequired } = require('../middlewares/auth.middleware');

router.use(authRequired);

router.get('/', c.list);
router.post('/', c.create);
router.patch('/:id', c.update);
router.delete('/:id', c.remove);

module.exports = router;
