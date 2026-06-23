// Express ilovani QURADI va eksport qiladi (listen qilmaydi — test qulayligi uchun).
const express = require('express');
const cors = require('cors');

const env = require('./config/env');
const routes = require('./routes');
const { notFound, errorHandler } = require('./middlewares/error.middleware');

const app = express();

// --- Global middleware ---
app.use(cors({ origin: env.clientUrl, credentials: true }));
app.use(express.json());                          // JSON body o'qish
app.use(express.urlencoded({ extended: true }));  // form body o'qish

// --- Routes (barchasi /api ostida) ---
app.use('/api', routes);

// --- Xato ushlovchilar (har doim eng oxirida) ---
app.use(notFound);
app.use(errorHandler);

module.exports = app;
