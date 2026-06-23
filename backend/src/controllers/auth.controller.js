// req/res ni o'qiydi, service'ni chaqiradi, javob qaytaradi. Mantiq YO'Q.
// Express 5: async throw -> errorHandler avtomatik ushlaydi.
const authService = require('../services/auth.service');

async function sendOtp(req, res) {
  const { phone } = req.body;
  const result = authService.sendOtp(phone);
  res.json({ success: true, message: 'Kod yuborildi', data: result });
}

async function verifyOtp(req, res) {
  const { phone, code } = req.body;
  const { token, user } = authService.verifyOtp(phone, code);
  res.json({ success: true, message: 'Kirish muvaffaqiyatli', data: { token, user } });
}

module.exports = { sendOtp, verifyOtp };
