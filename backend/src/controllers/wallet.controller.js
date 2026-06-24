// req.user — authRequired'dan keladi.
const wallet = require('../services/wallet.service');

async function me(req, res) {
  res.json({ success: true, data: wallet.history(req.user.id) });
}

module.exports = { me };
