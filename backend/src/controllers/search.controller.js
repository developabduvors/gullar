const searchService = require('../services/search.service');

async function search(req, res) {
  const results = searchService.search(req.query.q);
  res.json({ success: true, data: results });
}

module.exports = { search };
