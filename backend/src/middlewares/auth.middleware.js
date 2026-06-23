// Himoyalangan route'larni qo'riqlaydi. Header: Authorization: Bearer <token>
const ApiError = require('../utils/ApiError');
const { verifyToken } = require('../utils/jwt');
const userStore = require('../services/user.store');

function authRequired(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) throw new ApiError(401, 'Token yo\'q. Avval kiring.');

  let payload;
  try {
    payload = verifyToken(token);
  } catch (e) {
    throw new ApiError(401, 'Token yaroqsiz yoki eskirgan');
  }

  const user = userStore.findById(payload.id);
  if (!user) throw new ApiError(401, 'Foydalanuvchi topilmadi');

  req.user = user; // keyingi controllerlar shu orqali kim kirganini biladi
  next();
}

// Faqat admin uchun
function adminOnly(req, res, next) {
  if (!req.user || req.user.role !== 'admin') throw new ApiError(403, 'Ruxsat yo\'q (admin emas)');
  next();
}

module.exports = { authRequired, adminOnly };
