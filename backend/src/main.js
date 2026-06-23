// Entrypoint — faqat serverni ishga tushiradi.
const app = require('./app');
const env = require('./config/env');

app.listen(env.port, () => {
  console.log(`🌹 Server ishlayapti: http://localhost:${env.port}`);
  console.log(`   Health check:     http://localhost:${env.port}/api/health`);
});
