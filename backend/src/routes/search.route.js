const express = require('express');
const router = express.Router();
const c = require('../controllers/search.controller');

router.get('/', c.search); // GET /api/search?q=atir

module.exports = router;
