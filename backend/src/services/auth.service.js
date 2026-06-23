// Auth biznes mantiqi. req/res YO'Q — faqat sof funksiyalar.
const ApiError = require('../utils/ApiError');
const { signToken } = require('../utils/jwt');
const otpStore = require('./otp.store');
const userStore = require('./user.store');

// O'zbek raqami: +998XXXXXXXXX yoki 998XXXXXXXXX (12 raqam)
function normalizePhone(phone) {
  const digits = String(phone || '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('998')) return '+' + digits;
  if (digits.length === 9) return '+998' + digits;
  throw new ApiError(400, "Telefon raqam noto'g'ri. Masalan: +998901234567");
}

// 6 xonali kod
function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}

// 1) Kod yuborish
function sendOtp(rawPhone) {
  const phone = normalizePhone(rawPhone);
  const code = generateCode();
  otpStore.save(phone, code);

  // TODO: shu yerda Eskiz SMS API chaqiriladi. Hozir konsolga chiqaramiz.
  console.log(`📲 OTP -> ${phone}: ${code}`);

  return { phone };
}

// 2) Kodni tekshirish -> token
function verifyOtp(rawPhone, code) {
  const phone = normalizePhone(rawPhone);
  if (!code) throw new ApiError(400, 'Kod kiritilmadi');

  const ok = otpStore.verify(phone, String(code));
  if (!ok) throw new ApiError(401, "Kod noto'g'ri yoki eskirgan");

  const user = userStore.findOrCreate(phone);
  const token = signToken({ id: user.id, role: user.role });
  return { token, user };
}

module.exports = { sendOtp, verifyOtp, normalizePhone };
