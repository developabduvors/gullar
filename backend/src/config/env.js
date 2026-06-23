// Barcha env o'zgaruvchilarni shu yerdan o'qiymiz — kod ichida process.env tarqatmaymiz
require('dotenv').config();

const env = {
  port: process.env.PORT || 8000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  jwt: {
    secret: process.env.JWT_SECRET || 'dev_secret',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  },
  // Shu raqamlar bilan kirgan user avtomatik admin bo'ladi
  adminPhones: (process.env.ADMIN_PHONES || '')
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean),
};

module.exports = env;
