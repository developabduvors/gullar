// Tadbirlar kalendarini har kuni skaner qilib, 3 kun qolganda SMS eslatma yuboradi.
const cron = require('node-cron');
const env = require('../config/env');
const eventStore = require('../services/event.store');
const userStore = require('../services/user.store');
const { sendSms } = require('../utils/sms');

// 'MM-DD' tadbirgacha necha kun qolganini hisoblaydi (yil oxiriga o'tib ketsa keyingi yilga o'tadi).
// Qaytaradi: { days, year } — year = tadbir to'g'ri keladigan yil (idempotentlik uchun).
function daysUntilNext(monthDay, from = new Date()) {
  const [m, d] = monthDay.split('-').map(Number);
  const today = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  let next = new Date(today.getFullYear(), m - 1, d);
  if (next < today) next = new Date(today.getFullYear() + 1, m - 1, d);
  const days = Math.round((next - today) / 86400000);
  return { days, year: next.getFullYear() };
}

function buildMessage(event) {
  const who = event.relation ? `${event.relation}ingizning` : `${event.personName}ning`;
  return `🌹 ${env.reminderDays} kundan keyin ${who} tug'ilgan kunlari! `
    + `O'tgan yili tanlagan premium guldastangizni yana tayyorlab beraylikmi? Premium Bloom`;
}

// Asosiy skaner — testlanadigan sof funksiya. now'ni uzatsa bo'ladi (test uchun).
async function scanAndNotify(now = new Date()) {
  const sent = [];

  for (const event of eventStore.all()) {
    const { days, year } = daysUntilNext(event.date, now);
    if (days !== env.reminderDays) continue;        // aynan 3 kun qolgandagina
    if (event.lastNotifiedYear === year) continue;  // bu yil allaqachon yuborilgan

    const user = userStore.findById(event.userId);
    if (!user || !user.phone) continue;

    await sendSms(user.phone, buildMessage(event));
    eventStore.update(event.id, { lastNotifiedYear: year }); // takror yubormaslik uchun belgilash
    sent.push({ eventId: event.id, userId: event.userId, phone: user.phone });
  }

  if (sent.length) console.log(`⏰ Eslatma: ${sent.length} ta SMS yuborildi`);
  return sent;
}

// Cron'ni ishga tushiradi — har kuni belgilangan vaqtda (default 03:00).
function start() {
  cron.schedule(env.reminderCron, () => {
    scanAndNotify().catch((e) => console.error('Eslatma job xatosi:', e.message));
  }, { timezone: env.timezone });
  console.log(`⏰ Eslatma cron yoqildi: "${env.reminderCron}" (${env.timezone})`);
}

module.exports = { start, scanAndNotify, daysUntilNext, buildMessage };
