// Yagona SMS yuborish nuqtasi. Hozir konsolga chiqaradi — KEYIN Eskiz/Smsfly API ulanadi.
// Shu funksiyani almashtirsangiz, OTP ham, marketing eslatmalari ham avtomat ishlaydi.
async function sendSms(phone, text) {
  // TODO: Eskiz API — POST https://notify.eskiz.uz/api/message/sms/send
  console.log(`📲 SMS -> ${phone}: ${text}`);
  return { ok: true, phone };
}

module.exports = { sendSms };
