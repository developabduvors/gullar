// Markaziy xato ushlovchi. Express 5 da async route'dagi throw shu yerga keladi.

// 404 — hech qaysi route topilmasa
function notFound(req, res, next) {
  res.status(404).json({ success: false, message: `Topilmadi: ${req.method} ${req.originalUrl}` });
}

// Asosiy error handler — har doim 4 ta argument (err, req, res, next)
function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  const message = err.message || 'Serverda xatolik';

  // dev rejimida stack ko'rsatamiz, productionda yashiramiz
  const body = { success: false, message };
  if (process.env.NODE_ENV !== 'production') body.stack = err.stack;

  res.status(status).json(body);
}

module.exports = { notFound, errorHandler };
