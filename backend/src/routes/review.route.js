// /admin/reviews — sharh moderatsiyasi. Faqat admin.
const express = require('express');
const router = express.Router();
const c = require('../controllers/review.controller');
const { authRequired, adminOnly } = require('../middlewares/auth.middleware');

router.use(authRequired, adminOnly);

router.get('/', c.listForModeration);   // ?status=pending|approved|rejected (default: pending)
router.patch('/:id', c.moderate);        // { status: 'approved' | 'rejected' }

module.exports = router;
