
// Faol obunalarni har kuni skaner qilib, muddati kelganlari uchun buyurtma yaratadi.
const cron = require('node-cron');
const env = require('../config/env');
const subService = require('../services/subscription.service');

// Cron'ni ishga tushiradi — har kuni belgilangan vaqtda (default 04:00, eslatmadan keyin).
function start() {
  cron.schedule(env.subscriptionCron, () => {
    subService.processDue().catch((e) => console.error('Obuna job xatosi:', e.message));
  }, { timezone: env.timezone });
  console.log(`🔁 Obuna cron yoqildi: "${env.subscriptionCron}" (${env.timezone})`);
}

module.exports = { start };
