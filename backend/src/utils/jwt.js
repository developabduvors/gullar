// JWT yaratish va tekshirish — bitta joyda
const jwt = require('jsonwebtoken');
const env = require('../config/env');

function signToken(payload) {
  return jwt.sign(payload, env.jwt.secret, { expiresIn: env.jwt.expiresIn });
}

function verifyToken(token) {
  return jwt.verify(token, env.jwt.secret); // noto'g'ri/eskirgan bo'lsa throw qiladi
}

module.exports = { signToken, verifyToken };
